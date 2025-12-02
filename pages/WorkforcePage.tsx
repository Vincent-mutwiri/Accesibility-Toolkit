import React from 'react';
import Checklist from '../components/Checklist';
import { AuthChoiceActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const WorkforcePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Workforce & Skills"
        description="Workforce & Skills EdTech should expand opportunity, not gatekeep it. This toolkit focuses on practical, product-facing guidance for embedding equity and inclusion into workforce learning platforms, content, and services."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Workforce & Skills' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Introduction Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Introduction</h2>
              <p className="mb-4">Workforce & Skills EdTech should expand opportunity, not gatekeep it. This toolkit focuses on practical, product-facing guidance for embedding equity and inclusion into workforce learning platforms, content, and services. It maps inclusive practices directly to platform features, delivery models, and team processes so teams can build systems that are fair, accessible, and relevant for learners who are often excluded (women, people with disabilities, low-income and rural learners, informal workers, and other underrepresented professionals).</p>
            </div>

            {/* Practical Applications Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Practical Applications</h2>
              <p className="mb-6">Ensuring your workforce & skills product is developed with inclusive features and workflows requires attention across several areas: Inclusive Access & Onboarding; Inclusive Learning Content; Inclusive Assessment & Certification; Career Services & Job Matching; Mentorship & Community; Monitoring, Evaluation & Accountability; and Ready-to-Use Templates & Tools.</p>

              <div className="grid gap-6 not-prose">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-red/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-red mb-3">1. Inclusive Access & Onboarding</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">The signup and first learning experience determine whether learners stay or drop out. If this process assumes high literacy, strong internet, or expensive devices, many learners are excluded before they even begin.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span><strong>Multiple registration paths</strong> - Provide options like phone-first (SMS/USSD), social logins, or email. Some learners may not have email or prefer low-tech options, so offering flexibility ensures no one is blocked.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span><strong>Offline onboarding</strong> - Share printable guides or facilitator-led sessions in community centers. Many learners start on shared or offline devices, so offline orientation ensures equal start points.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span><strong>Inclusive learner profiles</strong> - Allow learners to describe informal skills (e.g., tailoring, farming, caregiving). Many adults do not have formal resumes, and profiles should celebrate real-world, practical experience.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span><strong>Accessible onboarding content</strong> - Offer instructions in simple text, audio, and video with captions and sign language. This ensures learners with disabilities or low literacy can understand the process.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span><strong>Family/shared-device support</strong> - Enable easy sign-outs, guest access, or family accounts. In many contexts, multiple learners share one device, so clear user flows prevent mix-ups.</li>
                  </ul>
                  <div className="not-prose">
                    <AuthChoiceActivity />
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">2. Inclusive Learning Content</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">If content assumes only one culture, language, or delivery style, it excludes learners. Content must reflect learners' real lives, jobs, and economies.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><strong>Language accessibility</strong> - Translate into local languages and add audio. Language is often the first barrier to comprehension, so this step opens access.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><strong>Representation</strong> - Use examples from multiple sectors, like mechanics, tailoring, farming, and freelancing. This prevents reinforcing stereotypes (e.g., only showing men in engineering or women in caregiving).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><strong>Multi-modal delivery</strong> - Deliver every lesson in at least two ways (e.g., text + video, or audio + slides). Learners differ in digital comfort; multi-modal ensures all can follow.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><strong>Cultural relevance</strong> - Include familiar objects, workplaces, and informal jobs (e.g., open-air markets, boda-boda driving). Learners connect faster when content mirrors their context.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><strong>Content review</strong> - Have local experts and learners review lessons before release. They can spot cultural insensitivity or bias that outsiders may miss.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">3. Inclusive Assessment & Certification</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Traditional, exam-style testing excludes many learners, especially those with low literacy or test anxiety. Alternative assessment recognizes skill in multiple ways.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><strong>Flexible assessment formats</strong> - Offer projects, hands-on tasks, and portfolios, not just quizzes. This lets learners demonstrate skills in ways that fit their strengths.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><strong>Alternative submissions</strong> - Accept video or audio uploads. A learner who struggles with written English may demonstrate strong spoken or practical skills.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><strong>Accessible testing tools</strong> - Provide extra time, text-to-speech, or offline testing modes. These adaptations ensure learners with disabilities are not disadvantaged.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><strong>Inclusive certification</strong> - Design digital badges and partner with local employers to validate them. If employers accept these certifications, learners' opportunities expand.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-green mb-3">4. Career Services & Job Matching</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Even when learners gain skills, bias in hiring or poor job-matching tools can block access to work. Career services must be designed for fairness.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span><strong>Bias-checked algorithms</strong> - Audit job-matching tools so they don't down-rank candidates based on gender, education gaps, or informal experience. Skills should weigh more than formal titles.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span><strong>CV & job search tools for informal experience</strong> - Create templates that highlight transferable skills (e.g., a market trader = inventory management). This helps learners showcase hidden competencies.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span><strong>Multi-format career guidance</strong> - Offer coaching and guides in text, video, and audio. Learners without strong literacy still need career support.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span><strong>Employer engagement</strong> - Partner with employers to raise awareness about alternative credentials. If employers respect digital badges, learners get hired faster.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-blue mb-3">5. Mentorship & Community</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Learning is social. Without diverse mentors and safe peer networks, many learners remain isolated and disconnected from opportunities.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><strong>Diverse mentor pools</strong> - Recruit across gender, region, sector, and disability. Representation signals to learners: "people like me succeed here."</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><strong>Low-data and asynchronous channels</strong> - Support WhatsApp chats, SMS check-ins, or voice notes. Many learners can't afford constant video calls.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><strong>Safe spaces</strong> - Moderate discussions and create affinity groups (e.g., women in trades). Learners need psychological safety to share openly.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-purple/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-purple mb-3">6. Monitoring, Evaluation & Accountability</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Without measurement, inclusion stays an intention, not a reality. Teams must track outcomes and make changes based on evidence.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">How to:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span><strong>Disaggregated equity metrics</strong> - Collect data by gender, disability, income, and region. This helps identify which groups are struggling.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span><strong>User feedback loops</strong> - Use surveys, in-app questions, or audio feedback. Hearing directly from learners highlights barriers you may not see.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span><strong>Transparency & reporting</strong> - Share equity scorecards publicly. Learners and partners trust platforms that show accountability.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span><strong>Actionable analysis</strong> - Track where learners drop out and which features they ignore. Use this to guide improvements.</li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Ready-to-Use Templates & Tools</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Teams work faster and more consistently with templates. Pre-built tools reduce guesswork and ensure equity steps aren't skipped.</p>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start">
                      <span className="material-icons text-brand-blue text-sm mr-2 mt-1">description</span>
                      <div><strong>Inclusive Onboarding Script</strong> - A ready orientation guide that includes plain language, audio/video cues, and instructions for low-data users.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-green text-sm mr-2 mt-1">checklist</span>
                      <div><strong>Inclusive Content Design Checklist</strong> - Ensures each lesson is available in multiple formats and culturally relevant.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-yellow text-sm mr-2 mt-1">assignment</span>
                      <div><strong>Inclusive Assessment Planning Sheet</strong> - A table that prompts designers to map each skill to multiple assessment methods with accommodations.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-orange text-sm mr-2 mt-1">work</span>
                      <div><strong>Inclusive Job Matching Rubric</strong> - A scoring guide to prevent algorithms from prioritizing degrees over demonstrated skills.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-purple text-sm mr-2 mt-1">dashboard</span>
                      <div><strong>Equity Monitoring Dashboard</strong> - A simple sheet showing completion rates, placement outcomes, and satisfaction, broken down by learner demographics.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Checklist
                title="Comprehensive Checklist for Workforce & Skills EdTech"
                items={[
                  "Sign-up works on low-bandwidth and basic phones",
                  "Profiles capture informal & non-traditional skills",
                  "Onboarding materials in multiple formats (text, audio, video, captions, sign language)",
                  "Simple language guides available",
                  "Content provided in multiple formats (text, video, audio, offline PDFs)",
                  "Examples reflect diverse local economies and job roles",
                  "Avoids stereotypes in case studies and imagery",
                  "Plain-language definitions for jargon and technical terms",
                  "Content reviewed by local experts before launch",
                  "Multiple assessment types (quizzes, projects, practical demonstrations, portfolios)",
                  "Accessibility features built-in (text-to-speech, extra time, offline options)",
                  "Video/audio submission options for assessments",
                  "Certifications recognized by employers and local associations",
                  "Digital badges shareable beyond LinkedIn",
                  "Algorithms audited for bias (e.g., not down-ranking women or informal workers)",
                  "Skills and projects weighted more than formal degrees",
                  "CV-building tools allow informal work experience",
                  "Career guidance available in multiple formats (text, audio, video)",
                  "Employers trained on inclusive hiring practices",
                  "Mentors represent diverse backgrounds (gender, age, geography, disability, profession)",
                  "Peer mentorship encouraged alongside expert mentorship",
                  "Multiple engagement modes (chat, voice notes, low-data calls)",
                  "Safe, moderated community spaces",
                  "Affinity groups available (e.g., women in trades, learners with disabilities)",
                  "Participation data disaggregated by gender, disability, income, and region",
                  "Completion, job placement, and retention tracked for different groups",
                  "Learner feedback collected in multiple formats (surveys, audio, in-app prompts)",
                  "Marginalized learners compensated for research participation",
                  "Annual equity scorecard published",
                  "Improvements shared with users and employers",
                  "Inclusive Onboarding Script available",
                  "Content Design Checklist ensures accessibility and relevance",
                  "Assessment Planning Sheet maps skills to multiple assessment types",
                  "Job Matching Rubric prevents over-weighting of formal degrees",
                  "Equity Monitoring Dashboard provides demographic participation data"
                ]}
              />
              
              <div className="mt-8 p-6 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 rounded-2xl border border-brand-blue/20">
                <p className="text-slate-700 dark:text-slate-200 italic">
                  Workforce & skills platforms have the potential to either reinforce inequities or open doors. By embedding equity from design to implementation, your product ensures that learners from all backgrounds, not just the privileged, can access real opportunities for employment, growth, and dignity.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-red font-medium hover:underline">Introduction</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Inclusive Access & Onboarding</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Learning Content</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Assessment & Certification</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Career Services</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Mentorship & Community</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Monitoring & Evaluation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Templates & Tools</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkforcePage;