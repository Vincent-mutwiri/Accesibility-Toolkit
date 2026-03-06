import React from 'react';
import PageHeader from '../components/PageHeader';

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
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Dual sensory loss encompasses full deafblindness through partial hearing/vision impairments, requiring
              EdTech platforms to prioritize tactile primacy over visual/auditory channels. This framework ensures
              equitable digital learning by embedding tactile access from design inception across content delivery, user
              flow, engagement, and outcomes measurement.
            </p>
          </section>

          <section className="bg-brand-orange/5 rounded-2xl p-6 border border-brand-orange/10">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Core Design Principles</h2>
            <ul className="mt-3 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>Access independence through touch-based interfaces.</li>
              <li>Predictable haptic/Braille patterns platform-wide.</li>
              <li>Zero reliance on residual sight/sound capabilities.</li>
              <li>Scalable from severe to mild DSL spectrums.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 1: Content Delivery</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Challenge: Information locked in visual/auditory formats blocks tactile comprehension.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Static images/charts without touch equivalents.</li>
                  <li>Video lectures lacking vibration-encoded transcripts.</li>
                  <li>Color/audio cues for progress or errors.</li>
                  <li>Non-exportable interactive modules.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Content Pipeline</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Auto-convert all assets to Grade 2 Braille + haptic sequences.</li>
                    <li>Generate 3D-printable models for spatial concepts.</li>
                    <li>Embed vibration dictionaries for alerts (short/long patterns).</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Interface Requirements</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Universal refreshable Braille output support.</li>
                    <li>Device-agnostic haptic protocols (phone/watch compatible).</li>
                    <li>Tactile preview mode before full content load.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 2: Platform Flow</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Challenge: Disorientation in spatial/audio-guided environments erodes user autonomy.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Visual hierarchy without tactile mapping.</li>
                  <li>Time-sensitive navigation prompts.</li>
                  <li>Dynamic layouts shifting focus points.</li>
                  <li>Mouse/gesture-exclusive controls.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Structural Engineering</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Sequential Braille keyboard pathways (no branching dead-ends).</li>
                    <li>Section-specific vibration signatures (e.g., 3 short pulses = lessons).</li>
                    <li>Persistent “where am I” haptic status updates.</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Validation Protocol</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>End-to-end testing via Braille display + screen reader stack.</li>
                    <li>Multi-device haptic consistency audit.</li>
                    <li>Zero-sight/zero-sound completion certification.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 3: Active Engagement</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Challenge: Visual-timed or audio-collaborative activities exclude tactile participants.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Live sessions without real-time Braille feed.</li>
                  <li>Spatial manipulation games.</li>
                  <li>Rapid visual feedback loops.</li>
                  <li>Group tools requiring sight/sound sync.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Engagement Redesign</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Visual activities → Braille selection hierarchies.</li>
                    <li>Replace timers with escalating vibration countdowns.</li>
                    <li>Shared Braille documents for collaboration.</li>
                    <li>Haptic “turn indicators” for discussions.</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Feedback Architecture</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Layered vibration responses (intensity = urgency).</li>
                    <li>Braille confirmation receipts for all actions.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Access Layer 4: Outcome Capture</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Challenge: Assessment formats measuring sensory agility rather than knowledge mastery.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-brand-red/5 rounded-lg p-4 border border-brand-red/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Risk Indicators</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Image-heavy question banks.</li>
                  <li>Fixed-duration response windows.</li>
                  <li>Graphical data interpretation tasks.</li>
                  <li>Audio narration of results.</li>
                </ul>
              </div>
              <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/10">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Implementation Roadmap</h4>
                <div className="mt-2 text-subtle-light dark:text-subtle-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">Evaluation Engineering</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Nemeth Braille for all mathematics/notation.</li>
                    <li>Tactile graph templates + data tables.</li>
                    <li>Flexible response windows with haptic prompts.</li>
                    <li>Multi-modal proof options (Braille input, pattern selection).</li>
                  </ul>
                  <p className="font-medium text-text-light dark:text-text-dark mt-4">Analytics Layer</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Braille-accessible performance dashboards.</li>
                    <li>Haptic trend notifications.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">DSL Edtech Compliance Matrix</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Content Delivery</h4>
                <ul className="mt-2 space-y-1 text-subtle-light dark:text-subtle-dark">
                  <li>□ 100% Braille-convertible assets</li>
                  <li>□ Haptic alert dictionary implemented</li>
                  <li>□ Tactile previews for complex modules</li>
                  <li>□ Zero visual/audio content dependency</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Platform Flow</h4>
                <ul className="mt-2 space-y-1 text-subtle-light dark:text-subtle-dark">
                  <li>□ Linear Braille navigation paths</li>
                  <li>□ Distinct haptic section markers</li>
                  <li>□ No-sight/zero-sound certification</li>
                  <li>□ Device-consistent vibration patterns</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Active Engagement</h4>
                <ul className="mt-2 space-y-1 text-subtle-light dark:text-subtle-dark">
                  <li>□ Visual tasks re-engineered for touch</li>
                  <li>□ Haptic timing + turn-taking signals</li>
                  <li>□ Braille-collaborative workspaces</li>
                  <li>□ Layered vibration feedback system</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Outcome Capture</h4>
                <ul className="mt-2 space-y-1 text-subtle-light dark:text-subtle-dark">
                  <li>□ Nemeth Braille mathematics rendering</li>
                  <li>□ Tactile assessment alternatives</li>
                  <li>□ Flexible response accommodations</li>
                  <li>□ Haptic progress communication</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Deployment Readiness</h4>
                <ul className="mt-2 space-y-1 text-subtle-light dark:text-subtle-dark">
                  <li>□ Full workflow tested with production Braille hardware</li>
                  <li>□ Cross-platform haptic validation complete</li>
                  <li>□ User independence benchmark: 95% task completion solo</li>
                  <li>□ Ongoing tactile access monitoring pipeline</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DualSensoryLossPage;
