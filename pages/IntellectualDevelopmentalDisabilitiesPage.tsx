import React from 'react';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';

const IntellectualDevelopmentalDisabilitiesPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Intellectual Developmental Disabilities (IDD)"
        description="Design guidance for inclusive digital learning that supports cognitive, adaptive, and functional needs."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'IDD' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Intellectual Developmental Disability (IDD) is a progressive condition characterized by major deficiencies
              in intellectual, adaptive, and functional behaviour. These are typically lifelong conditions that appear
              before the age of 22 years, reportedly with significant limitations in both intellectual functioning
              (learning, reasoning, problem-solving) and adaptive behaviour (conceptual, social, and practical daily
              skills).
            </p>
            <p>
              Hence, a need for universal design in digital learning to ensure that learners living with these
              disabilities are supported to learn effectively.
            </p>
          </section>

          <section className="bg-brand-green/5 rounded-2xl p-6 border border-brand-green/10">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">How do we achieve inclusivity for learners with IDD?</h2>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Learners living with IDD are not fully independent while learning online, so they require special support in
              the following key areas.
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-subtle-light dark:text-subtle-dark">
              <li>Content design flexibility</li>
              <li>Accessibility and interaction design</li>
              <li>Personalized and adaptive learning</li>
              <li>Assessment and progress monitoring</li>
            </ul>
          </section>

          {/* Practical Applications */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Practical Application (How to?)</h3>

            <div className="space-y-8 mt-4">
              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">Content Design for Cognitive Accessibility</h4>
                <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-2">
                  <li>Use simple, plain language: prioritizes clear, straightforward, and concise communication, minimizing unnecessary complexity that can confuse or exhaust learners.</li>
                  <li>Apply the segmenting principle: by breaking instructions into granular steps. Presenting one task at a time (e.g., select → respond → confirm) reduces extraneous cognitive load, preventing working memory overload.</li>
                  <li>Provide visual support with text: Pair words with images, symbols, or icons to reinforce understanding, especially helpful for learners with Down syndrome and Autism Spectrum Disorder, providing essential visual scaffolding.</li>
                  <li>Include audio narration options: Supports learners with reading delays and allows multimodal input.</li>
                  <li>Present short learning content: This improves engagement for learners with Attention hyperactivity disorder (ADHD) and reduces mental fatigue.</li>
                  <li>Limit on-screen clutter and animations: This prevents sensory overload, particularly important for learners with Autism Spectrum Disorder.</li>
                  <li>Provide immediate, supportive feedback: This ensures that the learner is not stuck or bored and reinforces effort while gently clarifying errors.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">Accessibility & Interaction Design</h4>
                <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-2">
                  <li>Use large, clearly labeled buttons: Supports motor challenges and reduces accidental clicks.</li>
                  <li>Ensure touch-friendly and keyboard accessibility: Enables use by learners with motor impairments such as Cerebral Palsy.</li>
                  <li>Offer alternative input methods (voice, drag-and-drop, switch access): Supports learners with limited fine motor control.</li>
                  <li>Provide adjustable audio and visual settings: Sensory sensitivity can vary; allow brightness and sound control.</li>
                  <li>Include a low-stimulation mode: Remove background music and excessive animation to support sensory regulation. This is most beneficial for learners with Autism Spectrum Disorder (ASD), ADHD, or Sensory Processing Disorder (SPD), as it minimizes extraneous stimuli to prevent sensory overload and cognitive distraction.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">Personalization & Adaptive Learning</h4>
                <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-2">
                  <li>Allow adjustable difficulty levels: Modify the number of answer choices or the reading level to match ability. This provides essential scaffolding that keeps the task within their Zone of Proximal Development, reducing frustration and fostering self-efficacy by ensuring the challenge matches their specific functional level.</li>
                  <li>Include customizable learner profiles: Give the parent, teacher, or caregiver the option to indicate strengths, triggers, and goals for personalized support.</li>
                  <li>Incorporate visual progress tracking: Provide clear progress bars that support predictability.</li>
                  <li>Enable adjustable pacing: Some learners require slower audio, extended time, or a reduced task load depending on their intellectual disability.</li>
                  <li>Embed positive reinforcement systems: Use badges, stars, or affirmations to motivate and encourage the learner during the learning activities for social and emotional support SEL.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">Assessment & Progress Monitoring</h4>
                <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-2">
                  <li>Use game-based or performance-based assessments: Reduces test anxiety and improves the measurement of authentic skills. For example, a learner with Down Syndrome demonstrating money skills through a mock grocery store game rather than a written test reduces pressure while accurately measuring their ability to handle real-world transactions.</li>
                  <li>Spread assessments across short interactions: Avoid long quizzes; use micro-assessments over time.</li>
                  <li>Track skill growth visually for caregivers: Clear graphs help parents or caregivers monitor the learner’s progress and offer support afterward.</li>
                  <li>Allow demonstration through multiple formats (voice, image): Some learners may understand but struggle with written responses, but can relate to images and audio, such as narrations, depending on their disability.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Downloadable checklist</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              <span className="font-medium text-text-light dark:text-text-dark">Inclusive Design Checklist for learners living with Intellectual Developmental Disabilities (IDD)</span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Content Design for Cognitive Accessibility</h4>
                <ul className="mt-2 space-y-2 text-subtle-light dark:text-subtle-dark">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Use simple, plain language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Apply the segmenting principle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Provide visual support with text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Include audio narration options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Present short learning content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Limit on-screen clutter and animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Provide immediate, supportive feedback</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Accessibility & Interaction Design</h4>
                <ul className="mt-2 space-y-2 text-subtle-light dark:text-subtle-dark">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Use large, clearly labeled buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Ensure touch-friendly and keyboard accessibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Offer alternative input methods (voice, drag-and-drop, switch access)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Provide adjustable audio and visual settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Include a low-stimulation mode</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Personalization & Adaptive Learning</h4>
                <ul className="mt-2 space-y-2 text-subtle-light dark:text-subtle-dark">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Allow adjustable difficulty levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Include customizable learner profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Incorporate visual progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Enable adjustable pacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Embed positive reinforcement systems</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Assessment & Progress Monitoring</h4>
                <ul className="mt-2 space-y-2 text-subtle-light dark:text-subtle-dark">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Use game-based or performance-based assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Spread assessments across short interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Track skill growth visually for caregivers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                    <span>Allow demonstration through multiple formats (voice, image)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Ref</h3>
            <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>Bartoshesky, L. E., & Wright, C. (2021). Intellectual developmental disabilities: Definitions, diagnosis, and delivery of care. Delaware Journal of Public Health, 7(2), 6.</li>
            </ul>
          </section>
        </div>
      </div>
      <FloatingBackButton />
    </div>
  );
};

export default IntellectualDevelopmentalDisabilitiesPage;
