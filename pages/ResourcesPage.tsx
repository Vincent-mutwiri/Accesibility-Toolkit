import React from 'react';
import { Link } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Resources</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Global Resources</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-8">
          A curated list of frameworks, standards, and tools to support your inclusive design journey.
        </p>

        <div className="grid gap-6">
          <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-bold text-primary mb-2">Web Content Accessibility Guidelines (WCAG)</h3>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">The international standard for web accessibility.</p>
            <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noreferrer" className="text-brand-blue hover:underline">Visit Website &rarr;</a>
          </div>

          <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-bold text-primary mb-2">Universal Design for Learning (UDL)</h3>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">Guidelines for optimizing teaching and learning for all people.</p>
            <a href="https://udlguidelines.cast.org/" target="_blank" rel="noreferrer" className="text-brand-blue hover:underline">Visit CAST.org &rarr;</a>
          </div>

          <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-bold text-primary mb-2">A11y Project</h3>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">A community-driven effort to make digital accessibility easier.</p>
            <a href="https://www.a11yproject.com/" target="_blank" rel="noreferrer" className="text-brand-blue hover:underline">Visit A11y Project &rarr;</a>
          </div>
        </div>

        {/* Publications / References */}
        <div className="mt-12 pt-10 border-t border-border-light dark:border-border-dark">
          <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">References</h2>
          <p className="text-subtle-light dark:text-subtle-dark mt-3 leading-relaxed">
            Disclaimer: This toolkit compiles external publications and guidelines for reference; all content remains the work of its original authors.
          </p>

          <div className="mt-8 space-y-8">
            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Visual impairment</h3>
              <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                <li>American Educational Research Association, American Psychological Association, &amp; National Council on Measurement in Education. (2014). <em>Standards for Educational and Psychological Testing</em> (7th ed.). Washington, DC: AERA.</li>
                <li>Meyer, A., Rose, D. H., &amp; Gordon, D. (2014). <em>Universal design for learning: Theory and practice</em>.</li>
                <li>World Wide Web Consortium. (2025). <em>Web Content Accessibility Guidelines (WCAG) 2.1</em> (W3C Recommendation). https://www.w3.org/TR/WCAG21/</li>
              </ul>
            </section>

            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Hearing impairment</h3>
              <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                <li>CAST. (2018). <em>Universal design for learning guidelines version 2.2</em>. http://udlguidelines.cast.org</li>
                <li>Mayer, R. E. (2009). <em>Multimedia learning</em> (2nd ed.). Cambridge University Press.</li>
                <li>World Wide Web Consortium (W3C). (2018). <em>Web content accessibility guidelines (WCAG) 2.1</em>. https://www.w3.org/TR/WCAG21/</li>
              </ul>
            </section>

            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark p-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Intellectual &amp; developmental disabilities (IDD)</h3>
              <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                <li>Bartoshesky, L. E., &amp; Wright, C. (2021). Intellectual developmental disabilities: Definitions, diagnosis, and delivery of care. <em>Delaware Journal of Public Health</em>, 7(2), 6.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;