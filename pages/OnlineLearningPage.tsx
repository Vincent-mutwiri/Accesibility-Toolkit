import React from 'react';
import Checklist from '../components/Checklist';
import { MultilingualToggleActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const OnlineLearningPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Online Learning"
        description="Online learning refers to educational experiences delivered primarily through digital platforms and internet-based tools. It enables learners to access courses, resources, and engage in interactions with educators and peers, all without being limited by geography or time."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Online Learning' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Introduction Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <p className="mb-4">Online learning can take many forms: self-paced modules, live virtual classrooms, and blended approaches, all designed to expand access, flexibility, and personalization in education.</p>
            </div>

            {/* Practical Applications Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Practical Applications (How To)</h2>
              <p className="mb-6">Ensuring online learning environments are designed for equity and inclusion requires embedding accessibility, fairness, and cultural responsiveness across all features that support learners and educators. The following key areas guide inclusive online learning design:</p>

              <div className="grid gap-6 not-prose">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-blue mb-3">Accessible Design</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Use clear fonts, high-contrast colors, and descriptive alt text.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Provide transcripts and captions for video/audio content.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Ensure full compatibility with assistive technologies.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm">Strive for WCAG 2.1 AAA compliance as the benchmark, with AA as the minimum standard. This ensures content is perceivable, operable, understandable, and robust for all learners. Consistently applying these standards ensures that learners with disabilities have equal access to content, thereby reducing accessibility gaps across digital learning environments.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-green mb-3">Flexible Learning Pathways</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Offer content in multiple formats (text, audio, video, interactive).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Allow learners to progress at their own pace.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Provide varied assignment options that match different strengths.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm">Align with UDL principles by giving learners multiple ways to engage with material, express knowledge, and pace themselves. This reduces barriers for learners who process content differently or face contextual challenges. This flexibility empowers learners to take ownership of their education, increasing motivation and long-term engagement.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">Culturally Responsive Content</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Use examples and case studies that reflect diverse backgrounds.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Avoid stereotypes; represent learners across race, gender, age, and ability.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Invite learners to share personal experiences to enrich content.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm mb-4">Aim for culturally relevant and bias-free learning design. UDL emphasizes engaging learners through content that connects to their identity and interests. Embedding cultural responsiveness creates a sense of belonging, which is critical for sustained participation and equitable learning outcomes.</p>
                  <div className="mt-4">
                    <MultilingualToggleActivity />
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">Equitable Access</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Optimize platforms for low-bandwidth and mobile use.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Provide downloadable or offline learning options.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Ensure core features are usable on low-cost devices.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm">Design for the broadest range of devices, connectivity levels, and economic realities. The benchmark should be that no learner should be excluded due to technical or economic barriers. When access is equitable, learners can focus on the content rather than struggling with infrastructure challenges, closing the digital divide.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-purple/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-purple mb-3">Inclusive Interaction</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Set clear guidelines for respectful communication.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Offer multiple ways to participate (chat, forums, polls, collaborative docs).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Moderate discussions to protect marginalized voices.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm">Foster collaboration by providing flexible ways to participate while ensuring moderation tools support safe, respectful spaces. The benchmark is that every learner should feel safe, respected, and able to participate fully, regardless of their background or communication style.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-red/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-red mb-3">Feedback and Support</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span>Give timely, personalized feedback in inclusive formats.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span>Provide multiple support channels (peer, mentor, live help, automated FAQs).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span>Create safe, open spaces for learners to express challenges.</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-200 text-sm">Set the benchmark of timely, constructive, and culturally appropriate feedback. Feedback should not only highlight areas for growth but also affirm learner strengths, building confidence and resilience. The benchmark is to ensure that no learner is left without meaningful guidance, regardless of their learning needs or circumstances.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Monitoring and Evaluation (Key Metrics)</h2>
              <p className="mb-6">To ensure online learning environments are equitable and inclusive, monitoring must go beyond counting log-ins or completions. Inclusivity in online learning can be measured in different ways as shown below:</p>

              <div className="grid gap-4 not-prose">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-blue mr-3 mt-1">analytics</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">1. Access</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Percentage of learners able to log in and access course materials without technical barriers</li>
                        <li>• Device type and internet connectivity used (mobile vs desktop, high vs low bandwidth)</li>
                        <li>• Availability and usage of accessibility features (captions, transcripts, screen readers, offline downloads)</li>
                        <li>• Geographic distribution of learners (urban, rural, remote)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-green mr-3 mt-1">groups</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">2. Participation</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Frequency of learner log-ins and attendance in live/recorded sessions</li>
                        <li>• Contribution rates in discussions, forums, and group activities</li>
                        <li>• Balance of participation across demographic groups (gender, disability, socioeconomic status)</li>
                        <li>• Drop-out points or disengagement trends across the course timeline</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-yellow mr-3 mt-1">school</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">3. Learning Outcomes</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Completion rates of modules/courses across different learner groups</li>
                        <li>• Performance in assessments or assignments disaggregated by demographic factors</li>
                        <li>• Evidence of skill acquisition and knowledge retention across populations</li>
                        <li>• Rate of learners meeting or exceeding stated learning objectives</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-orange mr-3 mt-1">support_agent</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">4. Support & Feedback</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Response times to learner questions and support requests</li>
                        <li>• Utilization of support services (tutoring, mentorship, help desk)</li>
                        <li>• Satisfaction with feedback: timeliness, clarity, and cultural sensitivity</li>
                        <li>• Equity in feedback patterns (whether all learners receive meaningful guidance)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-purple mr-3 mt-1">sentiment_satisfied</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">5. Inclusion & Belonging</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Learner survey results on feeling respected, represented, and safe in the learning space</li>
                        <li>• Presence of diverse examples, languages, and cultural references in content</li>
                        <li>• Peer interaction quality (collaboration, respect, and recognition of diverse perspectives)</li>
                        <li>• Participation in optional community-building features (study groups, discussion boards)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-red mr-3 mt-1">balance</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">6. System Fairness</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Algorithmic bias in recommendations, grading, or content delivery</li>
                        <li>• Equal visibility of diverse perspectives in suggested resources</li>
                        <li>• Monitoring whether interventions (low-data options, inclusive design tweaks) improve outcomes for marginalized groups</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Checklist
              title="Comprehensive Checklist for Assessing Equity & Inclusion in Online Learning"
              items={[
                "Conduct needs assessment to identify barriers (digital access, language, disability, socioeconomic)",
                "Gather input from diverse learners, educators, and community representatives",
                "Define equity and inclusion goals with measurable outcomes",
                "Secure partnerships for device access, connectivity, and community outreach",
                "Plan for multiple learning pathways (asynchronous, synchronous, blended)",
                "Apply accessibility standards (WCAG 2.1 AA minimum, AAA aspirational)",
                "Ensure interface works across devices (low-end smartphones, tablets, desktops)",
                "Incorporate multilingual navigation and right-to-left text support",
                "Provide customizable features (font size, color contrast, captions, transcripts)",
                "Design culturally responsive visuals, icons, and representations",
                "Embed Universal Design for Learning (UDL) principles in learning pathways",
                "Use examples and case studies reflecting diverse cultural and social contexts",
                "Avoid stereotypes; represent learners of varied identities and abilities",
                "Offer multiple formats (text, audio, video, interactive simulations)",
                "Ensure learning objectives are achievable through different modes of engagement",
                "Include content that affirms marginalized voices and perspectives",
                "Build in opportunities for learners to contribute personal knowledge/experiences",
                "Optimize platform for low-bandwidth environments and offline access",
                "Ensure compatibility with assistive technologies (screen readers, voice control)",
                "Implement flexible authentication (guest access, shared devices, family accounts)",
                "Provide scalable infrastructure for different class sizes and geographies",
                "Enable secure data storage with learner-controlled privacy settings",
                "Build progressive web apps (PWA) or mobile-friendly versions",
                "Create multiple support channels (chat, email, forums, phone)",
                "Offer multilingual helpdesk and FAQs",
                "Establish mentorship and peer-support systems",
                "Provide clear codes of conduct to ensure respectful communication",
                "Moderate forums to protect marginalized voices",
                "Facilitate parent/guardian or community engagement where relevant",
                "Test platform usability across devices, operating systems, and browsers",
                "Conduct accessibility audits (manual + automated checks)",
                "Pilot with diverse learner groups before full launch",
                "Collect feedback on cultural responsiveness and inclusivity",
                "Check equity in assessment formats (time allowances, varied formats)",
                "Evaluate data protection and algorithmic fairness",
                "Track enrollment diversity across gender, age, disability, and socioeconomic groups",
                "Monitor access patterns (devices, connectivity, geographic distribution)",
                "Assess early participation levels across demographics",
                "Gather learner satisfaction surveys on access, usability, and inclusion",
                "Provide ongoing technical support during launch",
                "Publicly communicate equity and inclusion commitments",
                "Regularly update the platform to meet evolving accessibility standards",
                "Audit algorithmic bias in content recommendations and assessments",
                "Continuously collect learner feedback on inclusivity and usability",
                "Provide regular training for educators on equity in online teaching",
                "Update content to reflect cultural relevance and representation",
                "Scale up support systems as user base grows (mentorship, community forums)",
                "Publish annual inclusivity reports with metrics on access and participation"
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-blue font-medium hover:underline">Practical Applications</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Accessible Design</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Flexible Learning Pathways</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Culturally Responsive Content</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Equitable Access</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Inclusive Interaction</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Feedback and Support</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Monitoring & Evaluation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineLearningPage;