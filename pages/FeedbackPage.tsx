import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';

const STORAGE_KEY = 'equity-toolkit-feedback';

type FeedbackForm = {
  role: string;
  categories: string[];
  testingType: string;
  testingFrequency: string;
  experienceLevel: string;
  usabilityRating: string;
  missingTools: string;
  challenges: string;
  standards: string;
  newFeature: string;
  comparison: string;
};

const defaultForm: FeedbackForm = {
  role: '',
  categories: [],
  testingType: '',
  testingFrequency: '',
  experienceLevel: '',
  usabilityRating: '',
  missingTools: '',
  challenges: '',
  standards: '',
  newFeature: '',
  comparison: ''
};

const roleOptions = [
  'Developer/Engineer',
  'Founder',
  'CTO',
  'Designer/UX Professional',
  'Product Manager',
  'QA/Tester',
  'Accessibility Specialist',
  'Content Creator',
  'Other'
];

const categoryOptions = [
  'Online Learning',
  'Digital Learning',
  'Tutoring & Test Prep',
  'STEAM',
  'Workforce & Skills',
  'Management Systems'
];

const testingTypeOptions = [
  'Web accessibility (WCAG compliance)',
  'Mobile app accessibility',
  'Desktop application accessibility',
  'Document accessibility',
  'All of the above'
];

const testingFrequencyOptions = [
  'Daily',
  'Weekly',
  'Monthly',
  'Occasionally',
  'This is my first time'
];

const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const usabilityOptions = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'];

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState<FeedbackForm>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const value = { ...defaultForm };
      for (const key of Object.keys(defaultForm) as (keyof FeedbackForm)[]) {
        if (key === 'categories') value.categories = Array.isArray(saved?.categories) ? saved.categories.filter((item: unknown) => typeof item === 'string' && categoryOptions.includes(item)) : [];
        else if (typeof saved?.[key] === 'string') value[key] = saved[key];
      }
      return value;
    } catch { return defaultForm; }
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [errorAttempt, setErrorAttempt] = React.useState(0);
  const errorRef = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(function focusFeedbackError() { if (error) errorRef.current?.focus(); }, [error, errorAttempt]);
  const reportError = (message: string) => { setError(message); setErrorAttempt(attempt => attempt + 1); };
  React.useEffect(function saveDraft() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch { /* Optional draft storage. */ }
  }, [form]);

  const updateField = (key: keyof FeedbackForm, value: string | string[]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(item => item !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!form.role || !form.testingType || !form.testingFrequency || !form.experienceLevel || !form.usabilityRating) {
      reportError('Please complete all dropdown questions before submitting.');
      return;
    }

    if (form.categories.length === 0) {
      reportError('Please select at least one category.');
      return;
    }

    setSubmitting(true);

    const endpoint = import.meta.env.VITE_SHEETDB_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: form })
        });
        if (!response.ok) throw new Error('Submission failed');
      }
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Optional draft storage. */ }
      navigate('/feedback/thank-you');
    } catch (err) {
      reportError('Something went wrong while submitting. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Feedback"
        description="Help us improve the toolkit by sharing quick, practical feedback."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Feedback' }
        ]}
      />

      <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-6 sm:p-8 border border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Dropdown Questions</h2>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Select the options that best describe your role and usage.
            </p>

            <form noValidate className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="feedback-role" className="text-sm font-medium text-text-light dark:text-text-dark">What is your primary role?</label>
                <select id="feedback-role"
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  aria-required="true" aria-invalid={!!error && !form.role} aria-describedby={error && !form.role ? 'feedback-error' : undefined}
                  value={form.role}
                  onChange={event => updateField('role', event.target.value)}
                >
                  <option value="">Select an option</option>
                  {roleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <p id="feedback-categories-label" className="text-sm font-medium text-text-light dark:text-text-dark">What is your category? (select at least one)</p>
                <div role="group" aria-labelledby="feedback-categories-label" aria-describedby={error && !form.categories.length ? 'feedback-error' : undefined} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categoryOptions.map(option => (
                    <label key={option} className="flex items-start gap-2 text-sm text-subtle-light dark:text-subtle-dark">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary dark:bg-gray-700 dark:border-gray-600"
                        checked={form.categories.includes(option)}
                        onChange={() => toggleCategory(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedback-testingType" className="text-sm font-medium text-text-light dark:text-text-dark">What type of accessibility testing do you primarily need?</label>
                <select id="feedback-testingType"
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  aria-required="true" aria-invalid={!!error && !form.testingType} aria-describedby={error && !form.testingType ? 'feedback-error' : undefined}
                  value={form.testingType}
                  onChange={event => updateField('testingType', event.target.value)}
                >
                  <option value="">Select an option</option>
                  {testingTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="feedback-testingFrequency" className="text-sm font-medium text-text-light dark:text-text-dark">How often do you perform accessibility testing?</label>
                <select id="feedback-testingFrequency"
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  aria-required="true" aria-invalid={!!error && !form.testingFrequency} aria-describedby={error && !form.testingFrequency ? 'feedback-error' : undefined}
                  value={form.testingFrequency}
                  onChange={event => updateField('testingFrequency', event.target.value)}
                >
                  <option value="">Select an option</option>
                  {testingFrequencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="feedback-experienceLevel" className="text-sm font-medium text-text-light dark:text-text-dark">What is your experience level with accessibility?</label>
                <select id="feedback-experienceLevel"
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  aria-required="true" aria-invalid={!!error && !form.experienceLevel} aria-describedby={error && !form.experienceLevel ? 'feedback-error' : undefined}
                  value={form.experienceLevel}
                  onChange={event => updateField('experienceLevel', event.target.value)}
                >
                  <option value="">Select an option</option>
                  {experienceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="feedback-usabilityRating" className="text-sm font-medium text-text-light dark:text-text-dark">How would you rate the overall usability of this toolkit?</label>
                <select id="feedback-usabilityRating"
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  aria-required="true" aria-invalid={!!error && !form.usabilityRating} aria-describedby={error && !form.usabilityRating ? 'feedback-error' : undefined}
                  value={form.usabilityRating}
                  onChange={event => updateField('usabilityRating', event.target.value)}
                >
                  <option value="">Select an option</option>
                  {usabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Open-Ended Questions</h3>
                <p className="text-subtle-light dark:text-subtle-dark mt-2">
                  Share context so we can prioritize improvements.
                </p>
              </div>

              <div>
                <label htmlFor="feedback-missingTools" className="text-sm font-medium text-text-light dark:text-text-dark">
                  What specific accessibility features or tools are you missing that would make this toolkit more valuable for your work?
                </label>
                <textarea id="feedback-missingTools"
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.missingTools}
                  onChange={event => updateField('missingTools', event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="feedback-challenges" className="text-sm font-medium text-text-light dark:text-text-dark">
                  Describe any challenges or difficulties you encountered while using the toolkit. What could be improved?
                </label>
                <textarea id="feedback-challenges"
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.challenges}
                  onChange={event => updateField('challenges', event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="feedback-standards" className="text-sm font-medium text-text-light dark:text-text-dark">
                  What accessibility standards or guidelines do you most commonly work with, and how well does this toolkit support them?
                </label>
                <textarea id="feedback-standards"
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.standards}
                  onChange={event => updateField('standards', event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="feedback-newFeature" className="text-sm font-medium text-text-light dark:text-text-dark">
                  If you could add one new feature to this toolkit, what would it be and why?
                </label>
                <textarea id="feedback-newFeature"
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.newFeature}
                  onChange={event => updateField('newFeature', event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="feedback-comparison" className="text-sm font-medium text-text-light dark:text-text-dark">
                  How does this toolkit compare to other accessibility tools you've used? What makes it better or worse?
                </label>
                <textarea id="feedback-comparison"
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.comparison}
                  onChange={event => updateField('comparison', event.target.value)}
                />
              </div>

              <p role="status">{submitting ? 'Submitting feedback…' : ''}</p>
              {error && (
                <p ref={errorRef} id="feedback-error" tabIndex={-1} role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-ink text-white font-semibold hover:bg-brand-ink/80 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit feedback'}
              </button>
            </form>
          </section>
        </div>
      </div>

      <FloatingBackButton />
    </div>
  );
};

export default FeedbackPage;
