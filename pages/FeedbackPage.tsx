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
  const [form, setForm] = React.useState<FeedbackForm>(defaultForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm({ ...defaultForm, ...parsed });
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
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
      setError('Please complete all dropdown questions before submitting.');
      return;
    }

    if (form.categories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    setSubmitting(true);

    const endpoint = import.meta.env.VITE_SHEETDB_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: form })
        });
      }
      localStorage.removeItem(STORAGE_KEY);
      navigate('/feedback/thank-you');
    } catch (err) {
      setError('Something went wrong while submitting. Please try again.');
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

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">What is your primary role?</label>
                <select
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
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
                <p className="text-sm font-medium text-text-light dark:text-text-dark">What is your category? (Allow for multiple selections)</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categoryOptions.map(option => (
                    <label key={option} className="flex items-start gap-2 text-sm text-subtle-light dark:text-subtle-dark">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                        checked={form.categories.includes(option)}
                        onChange={() => toggleCategory(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">What type of accessibility testing do you primarily need?</label>
                <select
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
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
                <label className="text-sm font-medium text-text-light dark:text-text-dark">How often do you perform accessibility testing?</label>
                <select
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
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
                <label className="text-sm font-medium text-text-light dark:text-text-dark">What is your experience level with accessibility?</label>
                <select
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
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
                <label className="text-sm font-medium text-text-light dark:text-text-dark">How would you rate the overall usability of this toolkit?</label>
                <select
                  className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
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
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  What specific accessibility features or tools are you missing that would make this toolkit more valuable for your work?
                </label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.missingTools}
                  onChange={event => updateField('missingTools', event.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  Describe any challenges or difficulties you encountered while using the toolkit. What could be improved?
                </label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.challenges}
                  onChange={event => updateField('challenges', event.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  What accessibility standards or guidelines do you most commonly work with, and how well does this toolkit support them?
                </label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.standards}
                  onChange={event => updateField('standards', event.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  If you could add one new feature to this toolkit, what would it be and why?
                </label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.newFeature}
                  onChange={event => updateField('newFeature', event.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  How does this toolkit compare to other accessibility tools you've used? What makes it better or worse?
                </label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  value={form.comparison}
                  onChange={event => updateField('comparison', event.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors disabled:opacity-60"
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
