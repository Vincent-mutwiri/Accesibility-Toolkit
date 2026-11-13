import { QUESTION_VERSION, questions } from './questions';
import type { Question, Source } from './questions';
import { allQuestions, getActiveQuestions, modules, modulesForQuestion } from './catalog';
import type { AssessmentModule } from './catalog';

export type Answer = 'yes' | 'no' | 'unsure' | 'na';

export interface Response {
  answer?: Answer;
  options: string[];
  other: string;
  /** Optional Yes explanation, or the open-ended Q21/Q22 Yes response. */
  notes: string;
  /** Optional No / Not sure context; never reported as Yes evidence. */
  context: string;
  naReason: string;
}

export interface Draft {
  schemaVersion: number;
  questionVersion: string;
  selectedModules: string[];
  /** All catalog versions, including modules with retained inactive responses. */
  moduleVersions: Record<string, string>;
  project: string;
  scope: string;
  responses: Record<string, Response>;
  updatedAt: string;
}

export interface ReportItem {
  id: string;
  sectionId: string;
  question: string;
  answer: Answer | 'unanswered';
  /** Human-readable main answer; Yes is self-reported, not certification. */
  label: string;
  details: string[];
  guidance: string;
  verify: string;
  source: Source;
  errors: string[];
  /** Active module titles; shared questions may belong to multiple modules. */
  modules: string[];
}

export interface CompletionSummary {
  total: number;
  answered: number;
  pending: number;
  complete: boolean;
}

export interface ModuleSummary extends CompletionSummary {
  id: string;
  title: string;
  family: AssessmentModule['family'];
  version: string;
}

export interface Report {
  project: string;
  scope: string;
  generatedAt: string;
  questionVersion: string;
  /** Main answers, even when a required conditional detail is missing. */
  answered: number;
  total: number;
  complete: boolean;
  /** Answered questions with active validation errors, not unanswered items. */
  pending: number;
  counts: Record<Answer | 'unanswered', number>;
  items: ReportItem[];
  modules: ModuleSummary[];
  notAssessed: string[];
  core: CompletionSummary;
}

export const STORAGE_KEY = 'ihub-accessibility-self-assessment:v1';
export const SCHEMA_VERSION = 2;
export const TEXT_LIMIT = 4000;
export const PROJECT_LIMIT = 160;
export const SCOPE_LIMIT = 1000;

export type DraftStatus = 'new' | 'restored' | 'migrated' | 'unavailable' | 'invalid' | 'incompatible';

const labels: Record<Answer | 'unanswered', string> = {
  yes: 'Yes', no: 'No / Not yet fully', unsure: 'Not sure',
  na: 'Not applicable', unanswered: 'Unanswered',
};
const questionById = new Map(allQuestions.map(question => [question.id, question]));
const coreQuestionIds = new Set(questions.map(question => question.id));
const moduleById = new Map(modules.map(module => [module.id, module]));

function currentModuleVersions(): Record<string, string> {
  return Object.fromEntries(modules.map(module => [module.id, module.version]));
}

export function emptyResponse(): Response {
  return { options: [], other: '', notes: '', context: '', naReason: '' };
}

/** Pure in-memory creation: neither this nor readDraft writes to storage. */
export function emptyDraft(): Draft {
  return {
    schemaVersion: SCHEMA_VERSION,
    questionVersion: QUESTION_VERSION,
    selectedModules: [], moduleVersions: currentModuleVersions(),
    project: '', scope: '',
    responses: Object.fromEntries(allQuestions.map(question => [question.id, emptyResponse()])),
    updatedAt: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isAnswer(value: unknown): value is Answer {
  return value === 'yes' || value === 'no' || value === 'unsure' || value === 'na';
}

function isText(value: unknown, limit: number): value is string {
  return typeof value === 'string' && value.length <= limit;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 40
    && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
}

/** Validate every persisted field, including retained inactive inputs. */
function isResponse(value: unknown, question: Question): value is Response {
  if (!isRecord(value)) return false;
  const allowedKeys = ['answer', 'options', 'other', 'notes', 'context', 'naReason'];
  if (Object.keys(value).some(key => !allowedKeys.includes(key))) return false;
  if (value.answer !== undefined && !isAnswer(value.answer)) return false;
  if (value.answer === 'na' && !question.allowNA) return false;
  if (!Array.isArray(value.options) || value.options.length > question.options.length + (question.openPrompt ? 0 : 1)) return false;
  const optionIds = new Set(question.options.map(option => option.id));
  if (!question.openPrompt) optionIds.add('other');
  if (!value.options.every(id => typeof id === 'string' && optionIds.has(id))) return false;
  if (new Set(value.options).size !== value.options.length) return false;
  return ['other', 'notes', 'context', 'naReason'].every(key => isText(value[key], TEXT_LIMIT));
}

type ParsedDraft = { draft: Draft; status: 'restored' | 'migrated' } | { status: 'invalid' | 'incompatible' };

function parseDraft(value: unknown): ParsedDraft {
  if (!isRecord(value) || !Number.isInteger(value.schemaVersion)
    || typeof value.questionVersion !== 'string') return { status: 'invalid' };
  // Schema 1 has one explicit migration; never reinterpret other versions.
  const legacy = value.schemaVersion === 1;
  if ((!legacy && value.schemaVersion !== SCHEMA_VERSION)
    || value.questionVersion !== QUESTION_VERSION
    || (legacy && value.questionVersion !== '1.0.0')) {
    return { status: 'incompatible' };
  }
  const allowedKeys = ['schemaVersion', 'questionVersion', 'project', 'scope', 'responses', 'updatedAt'];
  if (!legacy) allowedKeys.push('selectedModules', 'moduleVersions');
  if (Object.keys(value).some(key => !allowedKeys.includes(key))) return { status: 'invalid' };
  if (!isText(value.project, PROJECT_LIMIT) || !isText(value.scope, SCOPE_LIMIT)
    || !isTimestamp(value.updatedAt) || !isRecord(value.responses)) return { status: 'invalid' };

  let selectedModules: string[] = [];
  if (!legacy) {
    if (!Array.isArray(value.selectedModules)
      || !value.selectedModules.every(id => typeof id === 'string' && moduleById.has(id))
      || new Set(value.selectedModules).size !== value.selectedModules.length
      || !isRecord(value.moduleVersions)) return { status: 'invalid' };
    const versions = value.moduleVersions;
    if (Object.keys(versions).length !== modules.length
      || Object.keys(versions).some(id => !moduleById.has(id))
      || modules.some(module => typeof versions[module.id] !== 'string')) return { status: 'invalid' };
    // Inactive responses are retained too: every module version must match.
    if (modules.some(module => versions[module.id] !== module.version)) return { status: 'incompatible' };
    selectedModules = [...value.selectedModules];
  }
  const responses: Record<string, Response> = {};
  for (const [id, response] of Object.entries(value.responses)) {
    const question = questionById.get(id);
    if (!question || (legacy && (!/^Q(?:0[1-9]|1[0-9]|2[0-2])$/.test(id) || !coreQuestionIds.has(id)))
      || !isResponse(response, question)) return { status: 'invalid' };
    // Construct fresh objects: do not merge arbitrary stored keys/prototypes.
    responses[id] = {
      ...(response.answer === undefined ? {} : { answer: response.answer }),
      options: [...response.options], other: response.other, notes: response.notes,
      context: response.context, naReason: response.naReason,
    };
  }
  for (const question of allQuestions) responses[question.id] ??= emptyResponse();
  return {
    status: legacy ? 'migrated' : 'restored',
    draft: {
      schemaVersion: SCHEMA_VERSION, questionVersion: QUESTION_VERSION,
      selectedModules, moduleVersions: currentModuleVersions(),
      project: value.project, scope: value.scope, responses, updatedAt: value.updatedAt,
    },
  };
}

/** Invalid/incompatible records remain untouched until an explicit save/clear. */
export function readDraft(): { draft: Draft; status: DraftStatus } {
  let raw: string | null;
  try {
    if (typeof window === 'undefined') return { draft: emptyDraft(), status: 'unavailable' };
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return { draft: emptyDraft(), status: 'unavailable' };
  }
  if (raw === null) return { draft: emptyDraft(), status: 'new' };
  try {
    // Bound work on untrusted storage; enough for all allowed escaped text.
    if (raw.length > allQuestions.length * TEXT_LIMIT * 4 * 6 + 100_000) return { draft: emptyDraft(), status: 'invalid' };
    const parsed = parseDraft(JSON.parse(raw));
    return 'draft' in parsed ? parsed : { draft: emptyDraft(), status: parsed.status };
  } catch {
    return { draft: emptyDraft(), status: 'invalid' };
  }
}

/** Explicit caller action only. Missing required follow-ups may still be saved. */
export function saveDraft(draft: Draft): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const parsed = parseDraft(draft);
    if (parsed.status !== 'restored') return false;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...parsed.draft, updatedAt: new Date().toISOString(),
    }));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** Only the active branch affects completion; No itself is not an error. */
export function responseErrors(question: Question, response: Response): string[] {
  const errors: string[] = [];
  if (response.answer === undefined) return [];
  if (!isAnswer(response.answer)) return ['Choose a valid answer.'];
  if (response.answer === 'na') {
    if (!question.allowNA) errors.push('Not applicable is not available for this question.');
    if (!response.naReason.trim()) errors.push('Explain why this feature or content is absent from your scope.');
    if (response.naReason.length > TEXT_LIMIT) errors.push(`Not applicable explanation must be ${TEXT_LIMIT} characters or fewer.`);
  } else if (response.answer === 'yes') {
    if (!question.openPrompt) {
      const allowed = new Set(question.options.map(option => option.id));
      allowed.add('other');
      if (response.options.some(id => !allowed.has(id))) errors.push('Choose only listed implementation options.');
      if (response.options.includes('other')) {
        if (!response.other.trim()) errors.push('Describe the Other implementation method.');
        if (response.other.length > TEXT_LIMIT) errors.push(`Other description must be ${TEXT_LIMIT} characters or fewer.`);
      }
    }
    if (response.notes.length > TEXT_LIMIT) errors.push(`Implementation explanation must be ${TEXT_LIMIT} characters or fewer.`);
  } else if (response.context.length > TEXT_LIMIT) {
    errors.push(`Context must be ${TEXT_LIMIT} characters or fewer.`);
  }
  return errors;
}

/** Cross-question applicability is validated without discarding saved input. */
export function draftResponseErrors(question: Question, response: Response, draft: Draft): string[] {
  const errors = responseErrors(question, response);
  const missingSharedCaptions = draft.responses.SH01?.answer === 'no'
    && modulesForQuestion('SH01', draft.selectedModules).length > 0;
  if (question.id === 'HEAR01' && response.answer === 'na'
    && (draft.responses.Q06?.answer === 'no' || missingSharedCaptions)) {
    errors.push('Not applicable cannot be used when Q06 or SH01 reports missing captions. Provide captions rather than exempting missing support.');
  }
  return errors;
}

function activeDetails(question: Question, response: Response): string[] {
  const details: string[] = [];
  if (response.answer === 'yes') {
    if (!question.openPrompt) {
      for (const option of question.options) {
        if (!response.options.includes(option.id)) continue;
        details.push(option.label);
      }
      if (response.options.includes('other') && response.other.trim()) details.push(`Other: ${response.other.trim()}`);
    }
    if (response.notes.trim()) details.push(`Implementation explanation: ${response.notes.trim()}`);
    if (!details.length) details.push('Implementation details not provided');
  } else if (response.answer === 'no' || response.answer === 'unsure') {
    if (response.context.trim()) details.push(`Context: ${response.context.trim()}`);
  } else if (response.answer === 'na' && response.naReason.trim()) {
    details.push(`Not applicable reason: ${response.naReason.trim()}`);
  }
  return details;
}

/** Shared HTML/PDF results; no scoring, evidence judgement, storage, or mutation. */
export function buildReport(draft: Draft): Report {
  const counts: Report['counts'] = { yes: 0, no: 0, unsure: 0, na: 0, unanswered: 0 };
  const items = getActiveQuestions(draft.selectedModules).map((question): ReportItem => {
    const response = draft.responses[question.id] ?? emptyResponse();
    const answer = isAnswer(response.answer) ? response.answer : 'unanswered';
    counts[answer] += 1;
    return {
      id: question.id, sectionId: question.sectionId, question: question.text,
      answer, label: labels[answer], details: activeDetails(question, response),
      guidance: question.guidance, verify: question.verify, source: { ...question.source },
      errors: draftResponseErrors(question, response, draft),
      modules: modulesForQuestion(question.id, draft.selectedModules).map(module => module.title),
    };
  });
  const summary = summarizeItems(items);
  return {
    project: draft.project, scope: draft.scope, generatedAt: new Date().toISOString(),
    questionVersion: draft.questionVersion, ...summary, counts, items,
    core: summarizeItems(items.filter(item => coreQuestionIds.has(item.id))),
    modules: modules.filter(module => draft.selectedModules.includes(module.id)).map(module => ({
      id: module.id, title: module.title, family: module.family, version: module.version,
      ...summarizeItems(items.filter(item => module.questionIds.includes(item.id))),
    })),
    notAssessed: modules.filter(module => !draft.selectedModules.includes(module.id)).map(module => module.title),
  };
}

function summarizeItems(items: readonly ReportItem[]): CompletionSummary {
  const answered = items.filter(item => item.answer !== 'unanswered').length;
  const pending = items.filter(item => item.answer !== 'unanswered' && item.errors.length > 0).length;
  return { total: items.length, answered, pending, complete: answered === items.length && pending === 0 };
}