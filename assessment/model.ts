import { QUESTION_VERSION, questions } from './questions';
import type { Question, Source } from './questions';

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
}

export const STORAGE_KEY = 'ihub-accessibility-self-assessment:v1';
export const SCHEMA_VERSION = 1;
export const TEXT_LIMIT = 4000;
export const PROJECT_LIMIT = 160;
export const SCOPE_LIMIT = 1000;

export type DraftStatus = 'new' | 'restored' | 'unavailable' | 'invalid' | 'incompatible';

const labels: Record<Answer | 'unanswered', string> = {
  yes: 'Yes', no: 'No / Not yet fully', unsure: 'Not sure',
  na: 'Not applicable', unanswered: 'Unanswered',
};
const questionById = new Map(questions.map(question => [question.id, question]));

export function emptyResponse(): Response {
  return { options: [], other: '', notes: '', context: '', naReason: '' };
}

/** Pure in-memory creation: neither this nor readDraft writes to storage. */
export function emptyDraft(): Draft {
  return {
    schemaVersion: SCHEMA_VERSION,
    questionVersion: QUESTION_VERSION,
    project: '', scope: '',
    responses: Object.fromEntries(questions.map(question => [question.id, emptyResponse()])),
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

type ParsedDraft = { draft: Draft; status: 'restored' } | { status: 'invalid' | 'incompatible' };

function parseDraft(value: unknown): ParsedDraft {
  if (!isRecord(value) || !Number.isInteger(value.schemaVersion)
    || typeof value.questionVersion !== 'string') return { status: 'invalid' };
  // Never reinterpret answers from different wording/schema versions.
  if (value.schemaVersion !== SCHEMA_VERSION || value.questionVersion !== QUESTION_VERSION) {
    return { status: 'incompatible' };
  }
  if (!isText(value.project, PROJECT_LIMIT) || !isText(value.scope, SCOPE_LIMIT)
    || !isTimestamp(value.updatedAt) || !isRecord(value.responses)) return { status: 'invalid' };
  const responses: Record<string, Response> = {};
  for (const [id, response] of Object.entries(value.responses)) {
    const question = questionById.get(id);
    if (!question || !isResponse(response, question)) return { status: 'invalid' };
    // Construct fresh objects: do not merge arbitrary stored keys/prototypes.
    responses[id] = {
      ...(response.answer === undefined ? {} : { answer: response.answer }),
      options: [...response.options], other: response.other, notes: response.notes,
      context: response.context, naReason: response.naReason,
    };
  }
  for (const question of questions) responses[question.id] ??= emptyResponse();
  return {
    status: 'restored',
    draft: {
      schemaVersion: SCHEMA_VERSION, questionVersion: QUESTION_VERSION,
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
    if (raw.length > 3_000_000) return { draft: emptyDraft(), status: 'invalid' };
    const parsed = parseDraft(JSON.parse(raw));
    return parsed.status === 'restored' ? parsed : { draft: emptyDraft(), status: parsed.status };
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
    if (!response.naReason.trim()) errors.push('Explain why this content type is absent from your scope.');
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
  const items = questions.map((question): ReportItem => {
    const response = draft.responses[question.id] ?? emptyResponse();
    const answer = isAnswer(response.answer) ? response.answer : 'unanswered';
    counts[answer] += 1;
    return {
      id: question.id, sectionId: question.sectionId, question: question.text,
      answer, label: labels[answer], details: activeDetails(question, response),
      guidance: question.guidance, verify: question.verify, source: { ...question.source },
      errors: responseErrors(question, response),
    };
  });
  const pending = items.filter(item => item.errors.length > 0).length;
  return {
    project: draft.project, scope: draft.scope, generatedAt: new Date().toISOString(),
    questionVersion: draft.questionVersion, answered: questions.length - counts.unanswered,
    total: questions.length, complete: counts.unanswered === 0 && pending === 0, pending, counts, items,
  };
}