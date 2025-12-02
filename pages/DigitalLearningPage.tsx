import React from 'react';
import Checklist from '../components/Checklist';
import { UDLPreviewActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';
import DigitalLearningMobileNav from '../components/DigitalLearningMobileNav';
import FloatingBackButton from '../components/FloatingBackButton';

const DigitalLearningPage: React.FC = () => {
  const navigationItems = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Practical Applications', href: '#practical-applications' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Representation', href: '#representation' },
    { label: 'Usability & Navigation', href: '#usability' },
    { label: 'Flexibility', href: '#flexibility' },
    { label: 'Monitoring & Evaluation', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Designing for Equity and Inclusion Toolkit"
        description="Digital content has the power to expand access to learning opportunities, but without intentional design, it can also create barriers. This toolkit ensures all learners can fully engage with content."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Digital Learning Content' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Introduction Section */}
            <div id="introduction" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">1. Introduction</h2>
              <p className="mb-4">Digital content is any material created, stored, and shared in digital format—such as text, images, audio, video, graphics, or interactive media—delivered through computers, mobile devices and other digital platforms. In learning, this includes text-based resources (e-books, PDFs, articles), multimedia (videos, podcasts, narrated slides), visuals (infographics, charts), and interactive elements (quizzes, simulations, polls, discussion boards).</p>
              <p className="mb-4">Digital content has the power to expand access to learning opportunities, but without intentional design, it can also create barriers. Designing for equity and inclusion ensures that all learners—regardless of ability, background, or context—can fully engage with content.</p>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 not-prose">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Inclusive digital content is:</h3>
                <div className="grid gap-2 sm:gap-3">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-blue text-sm mr-3 mt-1">accessibility</span>
                    <div>
                      <strong className="text-brand-blue">Accessible</strong> – usable by people with diverse abilities (e.g., compatible with screen readers, captions, alt text).
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-brand-green text-sm mr-3 mt-1">diversity_3</span>
                    <div>
                      <strong className="text-brand-green">Representative</strong> – reflects diverse voices, perspectives, and imagery.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-brand-yellow text-sm mr-3 mt-1">devices</span>
                    <div>
                      <strong className="text-brand-yellow">Usable</strong> – structured, easy to navigate, and adaptable to different devices and bandwidths.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-brand-orange text-sm mr-3 mt-1">tune</span>
                    <div>
                      <strong className="text-brand-orange">Flexible</strong> – offered in multiple formats to accommodate varied learning preferences and needs.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Applications Section */}
            <div id="practical-applications" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">2. Practical Applications</h2>
              <p className="mb-6">Applying equity and inclusion to digital content requires a deliberate focus on design choices that reduce barriers and expand access. It's not just about compliance with accessibility standards, it's about creating meaningful learning experiences that reflect the diversity of learners and empower them to participate fully.</p>

              <div className="grid gap-4 sm:gap-6 not-prose">
                <div id="accessibility" className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-blue mb-3">Accessibility</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Accessibility ensures that learners with disabilities or diverse needs can interact with digital content fully. It is not just a compliance requirement but a way of designing content that benefits everyone. For example, captions help both deaf learners and those who prefer to read along, while clear alt text makes visuals understandable to learners using screen readers.</p>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">How to Ensure Accessibility:</h4>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Add alt text to all images, charts, graphs, and diagrams. Alt text should be descriptive but concise (e.g., "Bar chart showing a 30% increase in maize yield between 2020 and 2022").</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Provide captions and transcripts for all video and audio. Captions support learners who are deaf/hard of hearing and benefit non-native speakers or learners in noisy environments.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Use sufficient color contrast (minimum 4.5:1) between text and background. Tools such as WebAIM Contrast Checker can help verify compliance.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Avoid conveying meaning with color alone. Pair color with labels, patterns, or symbols.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Create structured, accessible files (e.g., properly tagged PDFs, semantic HTML). Headings, lists, and tables should follow logical reading order.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Ensure interactivity (e.g., quizzes, simulations) is keyboard navigable and works with assistive technologies.</li>
                  </ul>
                </div>

                <div id="representation" className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-green mb-3">Representation</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Representation is about more than just images, it's the voices, stories, and perspectives learners encounter in content. When learners see themselves reflected, they are more likely to feel valued, respected, and motivated, while poor representation, on the other hand, reinforces stereotypes or alienates learners.</p>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">How to Ensure Representation:</h4>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Use inclusive and diverse imagery that reflects a range of genders, ethnicities, ages, and abilities. Avoid tokenism by ensuring representation is natural and varied.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Apply bias-free and culturally sensitive language. Replace terms with neutral alternatives (e.g., "chairperson" instead of "chairman").</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Integrate case studies and examples from multiple contexts so learners can connect with the material. For example, sustainability lessons could feature practices from rural Africa, Asia, and Europe.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Be mindful of cultural cues and idioms. Avoid metaphors or jokes that may not translate well across cultures.</li>
                  </ul>
                </div>

                <div id="usability" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">Usability & Navigation</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Usability focuses on how intuitive and consistent the learner's experience is, that is, it ensures that digital content is clear, consistent, and easy to use across devices. Poorly structured content, inconsistent layouts, overly complex text or navigation can make content harder to engage with hence discourage learners, especially for learners with low digital literacy or limited technical experience.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to Ensure Usability & Navigation:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Organize content into logical, clearly labeled sections with headings and subheadings. This aids both learners and screen readers.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Use plain language whenever possible. If technical terms are necessary, provide definitions or glossaries.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Maintain consistent navigation. Place menus, buttons, and controls in the same location across modules.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Optimize for mobile-first design, as many learners, particularly in low-resource contexts, rely on smartphones.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Compress images and provide low-bandwidth alternatives, such as downloadable PDFs or text-only versions.</li>
                  </ul>
                </div>

                <div id="flexibility" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">Flexibility</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Flexibility means offering multiple ways for learners to access and interact with content. No two learners access content in exactly the same way. Some may prefer watching videos, while others rely on reading text or listening to audio. Flexibility allows learners to engage in the format that best suits their needs, increasing both access and learning effectiveness, that is, learning adapts to the learner, not the other way around.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to Ensure Flexibility:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Offer content in multiple formats: Text (articles, summaries), Audio (narrations, podcasts), Video (demonstrations, animations), Interactive elements (quizzes, polls, reflective questions).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Provide downloadable or offline options for learners with unreliable internet.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Design assessments with multiple means of expression (e.g., allow learners to submit text, audio, or visual responses).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Encourage self-pacing by enabling learners to pause, replay, or skip content as needed.</li>
                  </ul>
                  <div className="mt-4">
                    <UDLPreviewActivity />
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring & Evaluation Section */}
            <div id="monitoring" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">3. Monitoring & Evaluation</h2>
              <p className="mb-6">Designing for equity and inclusion is only effective if we can measure progress. Monitoring and evaluation (M&E) help identify what is working and where barriers remain. Using a combination of accessibility audits, learner analytics, and feedback ensures that inclusivity is not an assumption but a measurable outcome.</p>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 not-prose">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Suggested Metrics:</h3>
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-2">Accessibility:</h4>
                    <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• % of images/graphics with accurate alt text</li>
                      <li>• % of multimedia with captions and transcripts</li>
                      <li>• Accessibility audit scores (using tools like WAVE or Axe)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-green mb-2">Representation:</h4>
                    <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Proportion of content featuring diverse images, examples, and case studies</li>
                      <li>• Internal Diversity, equity, and inclusion (DEI) review of content before publishing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-yellow mb-2">Engagement & Usability:</h4>
                    <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Completion rates across different content formats</li>
                      <li>• Drop-off rates at specific sections or modules</li>
                      <li>• Error rates in navigation (e.g., failed clicks, broken links)</li>
                      <li>• Learner satisfaction with ease of use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-orange mb-2">Equity of Reach:</h4>
                    <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Demographic analysis to see if usage differs across groups</li>
                      <li>• Internet/device type breakdown to ensure design meets diverse access needs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="checklist">
              <Checklist
              title="Equity & Inclusion Checklist for Digital Content"
              items={[
                "All images, icons, graphs, and diagrams include meaningful alt text",
                "Decorative images are marked as decorative (so they are ignored by screen readers)",
                "Videos include closed captions and transcripts",
                "Audio files include transcripts",
                "Interactive elements (quizzes, buttons, simulations) are keyboard-accessible",
                "Content is compatible with screen readers and assistive technologies",
                "Text and background colors meet WCAG contrast standards (minimum 4.5:1)",
                "Information is not conveyed by color alone (use labels, patterns, or symbols too)",
                "Headings and subheadings follow logical, hierarchical structure (H1 → H2 → H3)",
                "Tables include headers and are properly tagged for accessibility",
                "Links are descriptive (e.g., 'Read more about equity' instead of 'Click here')",
                "PDFs and documents are tagged, structured, and tested for accessibility",
                "Images reflect diversity in gender, race, ethnicity, age, ability, and culture",
                "Examples and case studies come from varied cultural and geographic contexts",
                "Content avoids stereotypes, tokenism, and bias",
                "Gender-neutral or inclusive language is used where appropriate",
                "Cultural references (idioms, metaphors, humor) are reviewed for cross-cultural relevance",
                "Multiple perspectives are presented (not a single dominant narrative)",
                "Content is broken into clear, well-labeled sections",
                "Headings, bullet points, and white space are used for readability",
                "Navigation is consistent across modules/pages",
                "Buttons and links are clearly labeled and easy to identify",
                "Plain language is used; jargon and technical terms are explained",
                "Font size, style, and spacing support readability (minimum 12–14pt)",
                "Content layout adapts well across devices (desktop, tablet, mobile)",
                "Content loads quickly and efficiently (optimized images, compressed media)",
                "A low-bandwidth version (e.g., text-only or downloadable file) is available",
                "Instructions for activities/quizzes are clear and concise",
                "Content follows predictable patterns (no sudden navigation changes)",
                "Content is available in multiple formats (text, audio, video, interactive)",
                "Learners can download materials for offline use",
                "Audio and video can be paused, replayed, or sped up",
                "Assessments offer multiple ways of response (e.g., written, oral, visual)",
                "Alternative text-only versions are provided for multimedia-heavy resources",
                "Learners can control pacing (self-paced navigation, skip/review options)",
                "Interactive elements are optional, not mandatory, for progression",
                "Different learning styles are supported (visual, auditory, kinesthetic, reading/writing)",
                "Mechanisms for learner feedback are included (surveys, comment forms, forums)",
                "Learner feedback on accessibility and inclusivity is regularly reviewed",
                "Analytics track learner engagement across formats (video, text, audio)",
                "Drop-off points are monitored to identify usability barriers",
                "Accessibility audits are conducted before release",
                "Content is tested on multiple devices and browsers",
                "Updates are made based on learner feedback and analytics",
                "Peer or expert review includes a check for DEI (Diversity, Equity, Inclusion)"
              ]}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-blue font-medium hover:underline">Introduction</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Practical Applications</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Monitoring & Evaluation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <DigitalLearningMobileNav />
      <FloatingBackButton />
    </div>
  );
};

export default DigitalLearningPage;