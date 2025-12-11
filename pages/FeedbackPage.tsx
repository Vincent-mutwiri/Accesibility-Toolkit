import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'feedback-form-data';

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryRole: '',
    categories: [] as string[],
    testingType: '',
    testingFrequency: '',
    experienceLevel: '',
    usabilityRating: '',
    missingFeatures: '',
    challenges: '',
    standards: '',
    newFeature: '',
    comparison: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved form data:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Clear saved data after successful submission
    localStorage.removeItem(STORAGE_KEY);
    // Redirect to thank you page
    navigate('/feedback/thank-you');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Feedback</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Feedback</h1>
        <p className="text-subtle-light dark:text-subtle-dark mb-8">
          Help us improve the Accessibility Toolkit by sharing your experience and suggestions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dropdown Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">About You</h2>
            
            {/* Primary Role */}
            <div>
              <label htmlFor="primaryRole" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What is your primary role?
              </label>
              <select
                id="primaryRole"
                value={formData.primaryRole}
                onChange={(e) => handleSelectChange('primaryRole', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select your role</option>
                <option value="developer">Developer/Engineer</option>
                <option value="founder">Founder</option>
                <option value="cto">CTO</option>
                <option value="designer">Designer/UX Professional</option>
                <option value="product-manager">Product Manager</option>
                <option value="qa-tester">QA/Tester</option>
                <option value="accessibility-specialist">Accessibility Specialist</option>
                <option value="content-creator">Content Creator</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What is your category? (Select all that apply)
              </label>
              <div className="space-y-2">
                {['Online Learning', 'Digital Learning', 'Tutoring & Test Prep', 'STEAM', 'Workforce & Skills', 'Management Systems'].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-3 h-4 w-4 text-primary focus:ring-primary border-border-light dark:border-border-dark rounded"
                    />
                    <span className="text-text-light dark:text-text-dark">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Testing Type */}
            <div>
              <label htmlFor="testingType" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What type of accessibility testing do you primarily need?
              </label>
              <select
                id="testingType"
                value={formData.testingType}
                onChange={(e) => handleSelectChange('testingType', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select testing type</option>
                <option value="web">Web accessibility (WCAG compliance)</option>
                <option value="mobile">Mobile app accessibility</option>
                <option value="desktop">Desktop application accessibility</option>
                <option value="document">Document accessibility</option>
                <option value="all">All of the above</option>
              </select>
            </div>

            {/* Testing Frequency */}
            <div>
              <label htmlFor="testingFrequency" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                How often do you perform accessibility testing?
              </label>
              <select
                id="testingFrequency"
                value={formData.testingFrequency}
                onChange={(e) => handleSelectChange('testingFrequency', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="occasionally">Occasionally</option>
                <option value="first-time">This is my first time</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What is your experience level with accessibility?
              </label>
              <select
                id="experienceLevel"
                value={formData.experienceLevel}
                onChange={(e) => handleSelectChange('experienceLevel', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Usability Rating */}
            <div>
              <label htmlFor="usabilityRating" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                How would you rate the overall usability of this toolkit?
              </label>
              <select
                id="usabilityRating"
                value={formData.usabilityRating}
                onChange={(e) => handleSelectChange('usabilityRating', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select rating</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="very-poor">Very Poor</option>
              </select>
            </div>
          </div>

          {/* Open-Ended Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Your Feedback</h2>
            
            <div>
              <label htmlFor="missingFeatures" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What specific accessibility features or tools are you missing that would make this toolkit more valuable for your work?
              </label>
              <textarea
                id="missingFeatures"
                rows={4}
                value={formData.missingFeatures}
                onChange={(e) => handleTextChange('missingFeatures', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe the features or tools you'd like to see..."
              />
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Describe any challenges or difficulties you encountered while using the toolkit. What could be improved?
              </label>
              <textarea
                id="challenges"
                rows={4}
                value={formData.challenges}
                onChange={(e) => handleTextChange('challenges', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Share any challenges you faced..."
              />
            </div>

            <div>
              <label htmlFor="standards" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                What accessibility standards or guidelines do you most commonly work with, and how well does this toolkit support them?
              </label>
              <textarea
                id="standards"
                rows={4}
                value={formData.standards}
                onChange={(e) => handleTextChange('standards', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us about the standards you work with..."
              />
            </div>

            <div>
              <label htmlFor="newFeature" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                If you could add one new feature to this toolkit, what would it be and why?
              </label>
              <textarea
                id="newFeature"
                rows={4}
                value={formData.newFeature}
                onChange={(e) => handleTextChange('newFeature', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your ideal new feature..."
              />
            </div>

            <div>
              <label htmlFor="comparison" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                How does this toolkit compare to other accessibility tools you've used? What makes it better or worse?
              </label>
              <textarea
                id="comparison"
                rows={4}
                value={formData.comparison}
                onChange={(e) => handleTextChange('comparison', e.target.value)}
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Compare this toolkit to others you've used..."
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;