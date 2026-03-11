import React from 'react';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';
import { HapticPatternDictionaryActivity, BrailleFirstNavigationActivity } from '../components/DisabilityActivities';

const DualSensoryLossPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dual Sensory Loss (DSL)"
        description="A tactile-first design framework for equitable learning access across deafblindness and partial hearing/vision impairments."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Dual Sensory Loss' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Dual sensory loss encompasses full deafblindness through partial hearing/vision impairments, requiring
              EdTech platforms to prioritize tactile primacy over visual/auditory channels. This framework ensures
              equitable digital learning by embedding tactile access from design inception across content delivery, user
              flow, engagement, and outcomes measurement.
            </p>
          </section>

          <section className="bg-brand-orange/5 rounded-2xl p-6 border border-brand-orange/10 space-y-3">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Core Design Principles</h2>
            <ul className="list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>Access independence through touch-based interfaces.</li>
              <li>Predictable haptic/Braille patterns platform-wide.</li>
              <li>Zero reliance on residual sight/sound capabilities.</li>
              <li>Scalable from severe to mild DSL spectrums.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 1: Content Delivery</h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Challenge: Information locked in visual/auditory formats blocks tactile comprehension.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-brand-red/5 rounded-lg p-5 border border-brand-red/10 space-y-2">
                <h3 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h3>
                <ul className="list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Static images/charts without touch equivalents.</li>
                  <li>Video lectures lacking vibration-encoded transcripts.</li>
                  <li>Color/audio cues for progress or errors.</li>
                  <li>Non-exportable interactive modules.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-5 border border-brand-green/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">Content Pipeline</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Auto-convert all assets to Grade 2 Braille + haptic sequences.</li>
                    <li>Generate 3D-printable models for spatial concepts.</li>
                    <li>Embed vibration dictionaries for alerts (short/long patterns).</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">Interface Requirements</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Universal refreshable Braille output support.</li>
                    <li>Device-agnostic haptic protocols (phone/watch compatible).</li>
                    <li>Tactile preview mode before full content load.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 2: Platform Flow</h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Challenge: Disorientation in spatial/audio-guided environments erodes user autonomy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-brand-red/5 rounded-lg p-5 border border-brand-red/10 space-y-2">
                <h3 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h3>
                <ul className="list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Visual hierarchy without tactile mapping.</li>
                  <li>Time-sensitive navigation prompts.</li>
                  <li>Dynamic layouts shifting focus points.</li>
                  <li>Mouse/gesture-exclusive controls.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-5 border border-brand-green/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">Structural Engineering</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Sequential Braille keyboard pathways (no branching dead-ends).</li>
                    <li>Section-specific vibration signatures (e.g., 3 short pulses = lessons).</li>
                    <li>Persistent “where am I” haptic status updates.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">Validation Protocol</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>End-to-end testing via Braille display + screen reader stack.</li>
                    <li>Multi-device haptic consistency audit.</li>
                    <li>Zero-sight/zero-sound completion certification.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="not-prose">
              <BrailleFirstNavigationActivity />
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 3: Active Engagement</h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Challenge: Visual-timed or audio-collaborative activities exclude tactile participants.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-brand-red/5 rounded-lg p-5 border border-brand-red/10 space-y-2">
                <h3 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h3>
                <ul className="list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Live sessions without real-time Braille feed.</li>
                  <li>Spatial manipulation games.</li>
                  <li>Rapid visual feedback loops.</li>
                  <li>Group tools requiring sight/sound sync.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-5 border border-brand-green/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">Engagement Redesign</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Visual activities → Braille selection hierarchies.</li>
                    <li>Replace timers with escalating vibration countdowns.</li>
                    <li>Shared Braille documents for collaboration.</li>
                    <li>Haptic “turn indicators” for discussions.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">Feedback Architecture</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Layered vibration responses (intensity = urgency).</li>
                    <li>Braille confirmation receipts for all actions.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="not-prose">
              <HapticPatternDictionaryActivity />
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 4: Outcome Capture</h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Challenge: Assessment formats measuring sensory agility rather than knowledge mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-brand-red/5 rounded-lg p-5 border border-brand-red/10 space-y-2">
                <h3 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h3>
                <ul className="list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Image-heavy question banks.</li>
                  <li>Fixed-duration response windows.</li>
                  <li>Graphical data interpretation tasks.</li>
                  <li>Audio narration of results.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-5 border border-brand-green/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h3>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">Evaluation Engineering</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Nemeth Braille for all mathematics/notation.</li>
                    <li>Tactile graph templates + data tables.</li>
                    <li>Flexible response windows with haptic prompts.</li>
                    <li>Multi-modal proof options (Braille input, pattern selection).</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark">Analytics Layer</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-subtle-light dark:text-subtle-dark">
                    <li>Braille-accessible performance dashboards.</li>
                    <li>Haptic trend notifications.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">DSL EdTech Compliance Matrix</h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Use this checklist to validate tactile-first readiness across the entire product experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: 'Content Delivery',
                  items: [
                    '100% Braille-convertible assets',
                    'Haptic alert dictionary implemented',
                    'Tactile previews for complex modules',
                    'Zero visual/audio content dependency'
                  ]
                },
                {
                  title: 'Platform Flow',
                  items: [
                    'Linear Braille navigation paths',
                    'Distinct haptic section markers',
                    'No-sight/zero-sound certification',
                    'Device-consistent vibration patterns'
                  ]
                },
                {
                  title: 'Active Engagement',
                  items: [
                    'Visual tasks re-engineered for touch',
                    'Haptic timing + turn-taking signals',
                    'Braille-collaborative workspaces',
                    'Layered vibration feedback system'
                  ]
                },
                {
                  title: 'Outcome Capture',
                  items: [
                    'Nemeth Braille mathematics rendering',
                    'Tactile assessment alternatives',
                    'Flexible response accommodations',
                    'Haptic progress communication'
                  ]
                },
                {
                  title: 'Deployment Readiness',
                  items: [
                    'Full workflow tested with production Braille hardware',
                    'Cross-platform haptic validation complete',
                    'User independence benchmark: 95% task completion solo',
                    'Ongoing tactile access monitoring pipeline'
                  ]
                }
              ].map((section) => (
                <div
                  key={section.title}
                  className="bg-card-light dark:bg-card-dark rounded-lg p-5 border border-border-light dark:border-border-dark space-y-3"
                >
                  <h3 className="font-semibold text-text-light dark:text-text-dark">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => {
                      const inputId = `${section.title}-${item}`.replace(/\s+/g, '-').toLowerCase();
                      return (
                        <li key={item} className="flex items-start gap-3 text-subtle-light dark:text-subtle-dark">
                          <input
                            id={inputId}
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-border-light dark:border-border-dark text-brand-green focus:ring-brand-green"
                          />
                          <label htmlFor={inputId} className="leading-relaxed">
                            {item}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      <FloatingBackButton />
    </div>
  );
};

export default DualSensoryLossPage;
