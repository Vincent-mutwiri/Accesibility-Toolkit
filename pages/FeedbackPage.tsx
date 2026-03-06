import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';

const STORAGE_KEY = 'equity-toolkit-feedback';

type FeedbackForm = {
  name: string;
  email: string;
  role: string;
  organization: string;
  category: string;
  rating: string;
  message: string;
  consent: boolean;
};

const defaultForm: FeedbackForm = {
  name: '',
  email: '',
  role: '',
  organization: '',
  category: 'general',
  rating: '5',
  message: '',
  consent: false
};

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

  const updateField = (key: keyof FeedbackForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!form.message.trim()) {
      setError('Please share a short message before submitting.');
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
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Share your feedback</h2>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Tell us what worked, what didn’t, and what you want to see next.
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Name</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    value={form.name}
                    onChange={event => updateField('name', event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Email (optional)</label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    value={form.email}
                    onChange={event => updateField('email', event.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Role</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    placeholder="e.g., Product Manager"
                    value={form.role}
                    onChange={event => updateField('role', event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Organization</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    placeholder="Company or school"
                    value={form.organization}
                    onChange={event => updateField('organization', event.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Feedback category</label>
                  <select
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    value={form.category}
                    onChange={event => updateField('category', event.target.value)}
                  >
                    <option value="general">General</option>
                    <option value="content">Content</option>
                    <option value="design">Design & UX</option>
                    <option value="accessibility">Accessibility</option>
                    <option value="bug">Bug / Issue</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-light dark:text-text-dark">Overall rating</label>
                  <select
                    className="mt-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                    value={form.rating}
                    onChange={event => updateField('rating', event.target.value)}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Okay</option>
                    <option value="2">2 - Needs work</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-light dark:text-text-dark">Your message</label>
                <textarea
                  className="mt-2 w-full min-h-[140px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 px-3 py-2 text-sm text-text-light dark:text-text-dark"
                  placeholder="What should we improve or keep?"
                  value={form.message}
                  onChange={event => updateField('message', event.target.value)}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-subtle-light dark:text-subtle-dark">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                  checked={form.consent}
                  onChange={event => updateField('consent', event.target.checked)}
                />
                I’m okay with CcHUB following up about this feedback.
              </label>

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
