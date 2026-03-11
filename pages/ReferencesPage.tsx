import React from 'react';
import { Link } from 'react-router-dom';

const ReferencesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">References</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">References</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed">
          Disclaimer: This toolkit compiles external publications and guidelines for reference; all content remains the work of its original authors.
        </p>

        <div className="mt-10 space-y-8">
          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Visual impairment</h2>
            <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>American Educational Research Association, American Psychological Association, &amp; National Council on Measurement in Education. (2014). <em>Standards for Educational and Psychological Testing</em> (7th ed.). Washington, DC: AERA.</li>
              <li>Meyer, A., Rose, D. H., &amp; Gordon, D. (2014). <em>Universal design for learning: Theory and practice</em>.</li>
              <li>World Wide Web Consortium. (2025). <em>Web Content Accessibility Guidelines (WCAG) 2.1</em> (W3C Recommendation). https://www.w3.org/TR/WCAG21/</li>
            </ul>
          </section>

          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Hearing impairment</h2>
            <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>CAST. (2018). <em>Universal design for learning guidelines version 2.2</em>. http://udlguidelines.cast.org</li>
              <li>Mayer, R. E. (2009). <em>Multimedia learning</em> (2nd ed.). Cambridge University Press.</li>
              <li>World Wide Web Consortium (W3C). (2018). <em>Web content accessibility guidelines (WCAG) 2.1</em>. https://www.w3.org/TR/WCAG21/</li>
            </ul>
          </section>

          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Intellectual &amp; developmental disabilities (IDD)</h2>
            <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>Bartoshesky, L. E., &amp; Wright, C. (2021). Intellectual developmental disabilities: Definitions, diagnosis, and delivery of care. <em>Delaware Journal of Public Health</em>, 7(2), 6.</li>
            </ul>
          </section>
        </div>

        <div className="mt-10">
          <Link to="/resources" className="text-brand-blue hover:underline">Go to Global Resources &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;
