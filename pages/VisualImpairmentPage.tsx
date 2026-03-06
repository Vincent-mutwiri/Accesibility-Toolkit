import React from 'react';
import PageHeader from '../components/PageHeader';

const VisualImpairmentPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Visual Impairment in Edtech Systems"
        description="Design guidance for equitable access when learning cannot depend on sight as the primary pathway."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Visual Impairment' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Visual Impairment is made up of a wide spectrum, such as low vision, color blindness, blindness, contrast
              sensitivity challenges, visual field loss, and light sensitivity. It is not a single condition but a range
              of visual access differences.
            </p>
            <p>
              In Edtech, it affects how learners perceive, navigate, and interact with learning content within a digital
              environment. Equitable EdTech design ensures that learning does not depend on sight as the primary access
              pathway.
            </p>
          </section>

          <section className="bg-brand-blue/5 rounded-2xl p-6 border border-brand-blue/10">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Inclusion layers</h2>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Equitable design removes this structural dependency on sight. Inclusion in this case operates within the
              following layers;
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-subtle-light dark:text-subtle-dark">
              <li>Perception barriers (seeing the content)</li>
              <li>Navigation barriers (moving through the platform)</li>
              <li>Interaction barriers (participating in learning)</li>
              <li>Assessment barriers (demonstrating learning)</li>
            </ul>
          </section>

          {/* 1. Perception barriers */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">1. Perception barriers</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Perception barriers arise when crucial information is conveyed visually without equivalent alternatives. If
              learners cannot perceive learning content, cognitive resources are diverted towards decoding access rather
              than processing meaning.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Infographics are uploaded as flat images.</li>
                  <li>Charts without text explanations</li>
                  <li>Text embedded inside images</li>
                  <li>Low contrast color combinations</li>
                  <li>Fixed small font sizes</li>
                  <li>Color only feedback (e.g., red/green for correct and wrong).</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Content Design</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Write meaningful alt text that explains instructional significance, not just objects.</li>
                    <li>Provide structured text summaries beneath graphs and charts.</li>
                    <li>Avoid embedding critical texts within images.</li>
                    <li>Provide transcripts for all audio and video content.</li>
                    <li>Provide audio descriptions for demonstrations that rely on visual cues.</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Visual & interface standards</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Maintain a minimum 4.5:1 contrast ratio (7.1 preferred for critical content).</li>
                    <li>Allow text resizing up to 200%-400% without layout distortion.</li>
                    <li>Provide both light and dark mode options.</li>
                    <li>Do not rely on color alone to convey meaning.</li>
                  </ul>
                  <p className="mt-3">Ensure that all instructional information is available in non-visual formats.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Navigation barriers */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">2. Navigation barriers</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Navigation barriers occur when the structure of a platform makes independent movement difficult, confusing,
              or conditional. If learners require assistance to navigate, autonomy is compromised, and participation
              becomes conditional.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Mouse-only interfaces</li>
                  <li>Inconsistent layout structures</li>
                  <li>Unlabeled form fields</li>
                  <li>Hover-dependent menus</li>
                  <li>Pop-ups are inaccessible to assistive technologies</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Technical Implementation</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Ensure full keyboard-only navigation</li>
                    <li>Provide visible focus indicators for all interactive elements</li>
                    <li>Use semantic structure with proper heading hierarchy</li>
                    <li>Apply ARIA labels where native HTML is insufficient</li>
                    <li>Ensure pop-ups and modals are screen reader detectable</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Assistive technology testing</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Test complete workflows (login → lesson → quiz → submission) using JAWS, NVDA, or VoiceOver</li>
                    <li>Test navigation at multiple zoom levels</li>
                    <li>Test on low-cost devices and older operating systems</li>
                  </ul>
                  <p className="mt-3">A visually impaired user should complete enrollment, participation, and assessment tasks independently.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Interaction barriers */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">3. Interaction barriers</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Interaction barriers occur when a platform requires quick visual responses, precise positioning or movement
              of interface elements, or interpretation of visual information. Participation mechanisms that privilege
              visual agility tend to measure visual processing instead of knowledge, resulting in inequity.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Drag and drop only activities</li>
                  <li>Fast-moving visual whiteboards</li>
                  <li>Visual-only collaborative tools</li>
                  <li>Timed visual quizzes</li>
                  <li>“As you can see…” instructional practices</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Instructional Design</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Provide alternatives for drag-and-drop tasks (e.g., selection lists)</li>
                    <li>Ensure collaborative documents are screen-reader accessible</li>
                    <li>Allow audio-based participation options</li>
                    <li>Avoid sight-dependent language</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Platform controls</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Provide audio notifications alongside visual alerts</li>
                  </ul>
                  <p className="mt-3">Participation mechanisms should measure cognitive engagement, not visual agility.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Assessment barriers */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">4. Assessment barriers</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Assessment is where inequity becomes measurable. If learners cannot access or interpret assessment formats,
              performance data becomes invalid. Inaccessible assessment distorts achievement measurement.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Image-based questions</li>
                  <li>Visual dashboards inaccessible to screen readers</li>
                  <li>Rigid time limits</li>
                  <li>Mathematical notation rendered as images</li>
                  <li>Graph interpretation without textual alternatives</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Assessment Design</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Use MathML for mathematical notation</li>
                    <li>Provide text equivalents for diagrams</li>
                    <li>Standardize extended time accommodations</li>
                    <li>Offer multiple valid demonstration formats (written, oral, audio)</li>
                  </ul>
                  <p className="mt-3">Performance gaps should not be attributable to inaccessible format design.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Downloadable Checklist */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">5. Downloadable Checklist</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              <span className="font-medium text-text-light dark:text-text-dark">Visual Impairment – EdTech Systems Audit Tool</span>. Use this checklist during product design, procurement, content development, QA testing, and institutional audits. It serves as a quick reference tool that provides actionable steps to ensure that visually impaired learners aren’t sidelined.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">1. Content & Perception</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>All images include meaningful, instructional alt text</li>
                  <li>Decorative images are ignored by screen readers</li>
                  <li>No essential information is embedded inside images</li>
                  <li>Charts and graphs include structured text summaries</li>
                  <li>Complex visuals include long descriptions where needed</li>
                  <li>Color is not the sole method of conveying meaning</li>
                  <li>Minimum contrast ratio of 4.5:1 (7:1 preferred for key content)</li>
                  <li>Text can be resized to at least 200–400% without layout breakage</li>
                  <li>The platform supports light and dark modes</li>
                  <li>All videos include transcripts</li>
                  <li>Audio descriptions provided where visuals carry critical meaning</li>
                  <li>Playback controls are keyboard accessible</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">2. Navigation & Structure</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>All functions are operable without a mouse</li>
                  <li>Logical tab order across the platform</li>
                  <li>Visible keyboard focus indicators</li>
                  <li>No keyboard traps</li>
                  <li>Proper semantic structure (headings, landmarks)</li>
                  <li>ARIA labels used appropriately</li>
                  <li>All form fields are properly labeled</li>
                  <li>Error messages announced by screen readers</li>
                  <li>Pop-ups are detectable and dismissible</li>
                  <li>Consistent navigation layout</li>
                  <li>Skip-to-content option available</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">3. Interaction & Participation</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Drag-and-drop activities have accessible alternatives</li>
                  <li>Timed tasks allow extensions</li>
                  <li>Animations can be paused or disabled</li>
                  <li>Interactive simulations include non-visual equivalents</li>
                  <li>Collaborative tools compatible with assistive technology</li>
                  <li>Notifications are available in both audio and visual formats</li>
                  <li>No hover-only actions required</li>
                  <li>Live instruction includes verbal description of visuals</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">4. Assessment</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>No assessment relies solely on image-based prompts</li>
                  <li>Mathematical notation rendered accessibly (e.g., MathML)</li>
                  <li>Diagrams accompanied by text alternatives</li>
                  <li>Extended time available when required</li>
                  <li>Alternative response formats permitted</li>
                  <li>Quiz navigation keyboard accessible</li>
                  <li>Feedback accessible in text format</li>
                  <li>Performance disparities monitored</li>
                  <li>Assessment measures knowledge, not visual speed</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">References</h3>
            <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). Standards for Educational and Psychological Testing (7th ed.). Washington, DC: AERA</li>
              <li>Meyer, A., Rose, D. H., & Gordon, D. (2014). Universal design for learning: Theory and practice. (No Title).</li>
              <li>World Wide Web Consortium. (2025). Web Content Accessibility Guidelines (WCAG) 2.1 (W3C Recommendation). Retrieved from https://www.w3.org/TR/WCAG21/</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VisualImpairmentPage;
