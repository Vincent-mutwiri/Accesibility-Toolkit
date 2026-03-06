import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Online Learning",
    path: "/online-learning",
    icon: "laptop_chromebook",
    desc: "Products that deliver instruction, lessons, or courses entirely over the internet through virtual platforms.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "hover:border-brand-blue/50"
  },
  {
    title: "Digital Learning",
    path: "/digital-learning",
    icon: "article",
    desc: "Products that use digital tools, content, or media online or offline to support or enhance the learning process.",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "hover:border-brand-green/50"
  },
  {
    title: "Tutoring & Test Prep",
    path: "/tutoring",
    icon: "quiz",
    desc: "Products that provide personalized academic support, practice materials, or exam preparation for learners",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
    border: "hover:border-brand-yellow/50"
  },
  {
    title: "STEAM",
    path: "/steam",
    icon: "science",
    desc: "Products that provide interactive technologies for Science, Technology, Engineering, Arts, and Math (STEAM)",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "hover:border-brand-purple/50"
  },
  {
    title: "Workforce & Skills",
    path: "/workforce",
    icon: "work",
    desc: "Products that help learners build employability, vocational, or professional skills for the modern workplace.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    border: "hover:border-brand-red/50"
  },
  {
    title: "Management Systems",
    path: "/management-systems",
    icon: "settings_suggest",
    desc: "Products that supports the operations of schools or training institutions such as administration, communication, reporting, or content delivery.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
    border: "hover:border-brand-cyan/50"
  }
];

const disabilityCategories = [
  {
    title: "Visual Impairment in EdTech Systems",
    icon: "visibility_off",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "hover:border-brand-blue/50"
  },
  {
    title: "Intellectual and Developmental Disabilities (IDD)",
    icon: "psychology",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "hover:border-brand-green/50"
  },
  {
    title: "Hearing Impairment in EdTech Systems",
    icon: "hearing_disabled",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "hover:border-brand-purple/50"
  },
  {
    title: "Dual Sensory Loss (DSL)",
    icon: "accessibility_new",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
    border: "hover:border-brand-orange/50"
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
          Designing For <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">Equity and Inclusion</span> <br className="hidden md:block" /> In EdTech Products
        </h1>
        <p className="text-xl text-subtle-light dark:text-subtle-dark max-w-3xl mx-auto leading-relaxed">
          A practical, implementation-focused toolkit connecting accessibility and inclusion principles directly to product design, development, and evaluation.
        </p>
      </div>

      {/* Key Words Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Keywords:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-blue/10 to-transparent rounded-2xl p-8 border border-brand-blue/20">
            <h3 className="text-xl font-bold text-brand-blue mb-3">Equity</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              Equity refers to intentionally designing products, content, and experiences that address the different needs, barriers, and starting points of learners. Equitable design ensures that each learner receives the specific support, resources, and opportunities they need to thrive, rather than assuming a one size fits all approach.
            </p>
          </div>
          <div className="bg-gradient-to-br from-brand-purple/10 to-transparent rounded-2xl p-8 border border-brand-purple/20">
            <h3 className="text-xl font-bold text-brand-purple mb-3">Inclusion</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              Inclusion refers to designing products, content, and experiences so that every learner, regardless of ability, background, or identity, feels valued, represented, and supported. Inclusive design goes beyond accessibility to ensure cultural relevance and representation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {/* Main Content */}
        <div className="space-y-8">
          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
            <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Have you ever wondered why digital learning solutions,
despite their innovation, often fail to reach or effectively serve marginalized
learners?</h2>
            <div className="prose dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
              <p className="mb-4">
                Across the world, EdTech has transformed access to education, yet gaps persist in who benefits and how.
              </p>
              <p className="mb-4">
                Learners from low-resource settings, those with disabilities, or students with limited connectivity often face barriers that limit full participation. While global frameworks exist, most were not created specifically for EdTech product teams.
              </p>
              <p>
                <strong className="text-brand-pink">The Goal:</strong> To equip educators, designers, and technologists with the knowledge, tools, and methodologies needed to design, implement, and evaluate digital learning experiences that promote equity and inclusion across diverse learner populations.
              </p>
            </div>
          </section>

          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-green"></div>
            <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Target Audience</h2>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">
              This toolkit is intended for professionals and teams working at the intersection of education, design, and technology, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Learning Engineers', 'Instructional Designers', 'EdTech Developers', 'Product Managers', 'Educators', 'Curriculum Specialists'].map(role => (
                <li key={role} className="flex items-center text-text-light dark:text-text-dark">
                  <span className="material-icons text-brand-green text-sm mr-2">check_circle</span>
                  {role}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Additional Info */}
        <div className="space-y-6">
          {/* This column can be used for additional content if needed */}
        </div>
      </div>

      {/* Disability Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-text-light dark:text-text-dark">Designing for Specific Disabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {disabilityCategories.map((item) => (
            <div
              key={item.title}
              className={`group bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark ${item.border} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${item.bg} rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                  <span className="material-icons text-2xl">{item.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Visual Impairment Deep Dive */}
        <div className="mt-10 bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-lg">
              <span className="material-icons text-2xl">visibility_off</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Visual Impairment in Edtech Systems</h3>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                Visual Impairment is made up of a wide spectrum, such as low vision, color blindness, blindness, contrast sensitivity challenges, visual field loss, and light sensitivity. It is not a single condition but a range of visual access differences.
              </p>
              <p className="text-subtle-light dark:text-subtle-dark mt-3">
                In Edtech, it affects how learners perceive, navigate, and interact with learning content within a digital environment. Equitable EdTech design ensures that learning does not depend on sight as the primary access pathway.
              </p>
            </div>
          </div>

          <div className="bg-brand-blue/5 rounded-xl p-5 border border-brand-blue/10 mb-8">
            <p className="text-text-light dark:text-text-dark font-medium">
              Equitable design removes this structural dependency on sight. Inclusion in this case operates within the following layers;
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-subtle-light dark:text-subtle-dark">
              <li>Perception barriers (seeing the content)</li>
              <li>Navigation barriers (moving through the platform)</li>
              <li>Interaction barriers (participating in learning)</li>
              <li>Assessment barriers (demonstrating learning)</li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* 1. Perception barriers */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">1. Perception barriers</h4>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                Perception barriers arise when crucial information is conveyed visually without equivalent alternatives. If learners cannot perceive learning content, cognitive resources are diverted towards decoding access rather than processing meaning.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h5>
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
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h5>
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
            </div>

            {/* 2. Navigation barriers */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">2. Navigation barriers</h4>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                Navigation barriers occur when the structure of a platform makes independent movement difficult, confusing, or conditional. If learners require assistance to navigate, autonomy is compromised, and participation becomes conditional.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h5>
                  <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                    <li>Mouse-only interfaces</li>
                    <li>Inconsistent layout structures</li>
                    <li>Unlabeled form fields</li>
                    <li>Hover-dependent menus</li>
                    <li>Pop-ups are inaccessible to assistive technologies</li>
                  </ul>
                </div>
                <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h5>
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
            </div>

            {/* 3. Interaction barriers */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">3. Interaction barriers</h4>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                Interaction barriers occur when a platform requires quick visual responses, precise positioning or movement of interface elements, or interpretation of visual information. Participation mechanisms that privilege visual agility tend to measure visual processing instead of knowledge, resulting in inequity.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h5>
                  <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                    <li>Drag and drop only activities</li>
                    <li>Fast-moving visual whiteboards</li>
                    <li>Visual-only collaborative tools</li>
                    <li>Timed visual quizzes</li>
                    <li>“As you can see…” instructional practices</li>
                  </ul>
                </div>
                <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h5>
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
            </div>

            {/* 4. Assessment barriers */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">4. Assessment barriers</h4>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                Assessment is where inequity becomes measurable. If learners cannot access or interpret assessment formats, performance data becomes invalid. Inaccessible assessment distorts achievement measurement.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Common structural failures</h5>
                  <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                    <li>Image-based questions</li>
                    <li>Visual dashboards inaccessible to screen readers</li>
                    <li>Rigid time limits</li>
                    <li>Mathematical notation rendered as images</li>
                    <li>Graph interpretation without textual alternatives</li>
                  </ul>
                </div>
                <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">Practical applications (How to)</h5>
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
            </div>

            {/* 5. Downloadable Checklist */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">5. Downloadable Checklist</h4>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">
                <span className="font-medium text-text-light dark:text-text-dark">Visual Impairment – EdTech Systems Audit Tool</span>. Use this checklist during product design, procurement, content development, QA testing, and institutional audits. It serves as a quick reference tool that provides actionable steps to ensure that visually impaired learners aren’t sidelined.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                  <h5 className="font-semibold text-text-light dark:text-text-dark">1. Content & Perception</h5>
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
                  <h5 className="font-semibold text-text-light dark:text-text-dark">2. Navigation & Structure</h5>
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
                  <h5 className="font-semibold text-text-light dark:text-text-dark">3. Interaction & Participation</h5>
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
                  <h5 className="font-semibold text-text-light dark:text-text-dark">4. Assessment</h5>
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
            </div>

            {/* References */}
            <div>
              <h4 className="text-xl font-bold text-text-light dark:text-text-dark">References</h4>
              <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                <li>American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). Standards for Educational and Psychological Testing (7th ed.). Washington, DC: AERA</li>
                <li>Meyer, A., Rose, D. H., & Gordon, D. (2014). Universal design for learning: Theory and practice. (No Title).</li>
                <li>World Wide Web Consortium. (2025). Web Content Accessibility Guidelines (WCAG) 2.1 (W3C Recommendation). Retrieved from https://www.w3.org/TR/WCAG21/</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-text-light dark:text-text-dark">EdTech Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.path} 
              to={cat.path}
              className={`group bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark ${cat.border} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${cat.bg} rounded-lg ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <span className="material-icons text-2xl">{cat.icon}</span>
                </div>
                <span className={`material-icons text-subtle-light dark:text-subtle-dark hover:${cat.color} transition-colors`}>arrow_forward</span>
              </div>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{cat.title}</h3>
              <p className="text-subtle-light dark:text-subtle-dark text-sm leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;