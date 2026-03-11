import React from 'react';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';
import { CaptionsAndTranscriptActivity, AlertModalityActivity } from '../components/DisabilityActivities';

const HearingImpairmentPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Hearing Impairment in EdTech Systems"
        description="Design guidance to ensure meaningful access to learning without relying on auditory pathways."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Hearing Impairment' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-5">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Introduction</h2>
            <p>
              Hearing impairment is a partial or complete loss of hearing that can limit access to audio-based
              information.
            </p>
            <p className="text-subtle-light dark:text-subtle-dark">Common communication modes include:</p>
            <ul className="list-disc list-inside">
              <li>Hearing aids or cochlear implants</li>
              <li>Lip-reading</li>
              <li>Sign language as a primary language</li>
              <li>Text-based communication</li>
            </ul>
            <p>
              In EdTech, this affects how learners receive instruction, interpret communication, participate in live
              sessions, and demonstrate mastery. When audio is the primary channel, learners with hearing impairments may
              experience:
            </p>
            <ul>
              <li>Reduced comprehension</li>
              <li>Delayed participation</li>
              <li>Social exclusion during group work</li>
              <li>Cognitive overload from lip-reading or missing cues</li>
            </ul>
            <p>
              Designing for hearing accessibility requires intentional planning across content, communication,
              interaction, and platform features. The goal isn’t just to “add captions,” but to ensure meaningful access to
              learning experiences.
            </p>
          </section>

          <section className="bg-brand-purple/5 rounded-2xl p-6 border border-brand-purple/10">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Understanding Hearing Impairment in Digital Learning Contexts</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Hearing impairment exists on a spectrum and may include:
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-subtle-light dark:text-subtle-dark">
              <li>Mild to profound hearing loss</li>
              <li>Deaf or hard-of-hearing learners</li>
              <li>Learners who use hearing aids or cochlear implants</li>
              <li>Learners who rely primarily on sign language</li>
              <li>Learners who prefer text-based communication</li>
            </ul>
            <p className="text-subtle-light dark:text-subtle-dark mt-4">
              In EdTech systems, barriers often arise from: Video without captions, audio-only explanations, live sessions
              without transcription, notifications delivered only via sound, group discussions relying solely on verbal
              interaction. Inclusive design addresses these barriers systematically.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Designing for Hearing Accessibility</h3>
            <p className="text-subtle-light dark:text-subtle-dark mt-2">
              Equitable EdTech systems ensure that learners can perceive content, participate in interaction, and
              demonstrate mastery without relying on auditory access. Inclusion must be embedded into content design,
              assessment strategy, communication structures, and platform architecture.
            </p>

            <div className="space-y-8 mt-4">
              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">A. Multimedia Content Design</h4>
                <p className="text-subtle-light dark:text-subtle-dark mt-2">
                  Audio must never be the sole carrier of instructional meaning. If removing audio breaks comprehension,
                  the instructional design is incomplete. Audio must always have a visual equivalent.
                </p>
                <h5 className="font-semibold text-text-light dark:text-text-dark mt-4">Practical Application</h5>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Provide accurate, human-reviewed closed captions for all instructional videos.</li>
                  <li>Ensure captions are synchronized, readable, and contextually complete.</li>
                  <li>Include non-verbal auditory cues in captions (e.g., [applause], [music fades], [door closes]).</li>
                  <li>Provide full, structured transcripts for video and audio content.</li>
                  <li>Where feasible, provide sign language interpretation for instructional video.</li>
                  <li>Avoid instructional phrasing that assumes hearing (e.g., “as you can hear…”).</li>
                  <li>Ensure essential concepts are understandable through visual and textual elements independently of narration.</li>
                </ul>

                <div className="not-prose">
                  <CaptionsAndTranscriptActivity />
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">B. Communication & Interaction Design</h4>
                <p className="text-subtle-light dark:text-subtle-dark mt-2">
                  Learning interaction should not depend solely on hearing.
                </p>
                <h5 className="font-semibold text-text-light dark:text-text-dark mt-4">Practical Application</h5>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Provide written instructions alongside all verbal instructions.</li>
                  <li>Offer text-based discussion options as alternatives to voice-based forums.</li>
                  <li>Ensure live sessions support real-time captioning where possible.</li>
                  <li>Provide written breakout room instructions before transitions.</li>
                  <li>Enable chat-first participation in synchronous sessions.</li>
                  <li>Ensure collaborative tools fully support written communication.</li>
                  <li>Replace sound-only notifications with persistent visual alerts.</li>
                  <li>Provide written summaries of key live session discussions.</li>
                </ul>

                <div className="not-prose">
                  <AlertModalityActivity />
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">C. Assessment Design</h4>
                <p className="text-subtle-light dark:text-subtle-dark mt-2">
                  Assessment should measure what a learner understands or can do, not their ability to access information
                  through sound.
                </p>
                <h5 className="font-semibold text-text-light dark:text-text-dark mt-4">Practical Application</h5>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Provide written instructions for all assessment items.</li>
                  <li>Offer modality flexibility (audio and text-based access) when listening is not the learning objective.</li>
                  <li>Ensure alternative modalities maintain equal rigor and cognitive demand.</li>
                  <li>Provide extended time where necessary to account for reading and processing differences.</li>
                  <li>Use visual-based comprehension items where appropriate.</li>
                  <li>Avoid grading mechanisms that privilege verbal or auditory participation.</li>
                  <li>Confirm that listening tasks are used only when auditory discrimination is the intended objective.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h4 className="text-xl font-semibold text-text-light dark:text-text-dark">D. Platform & System Features</h4>
                <p className="text-subtle-light dark:text-subtle-dark mt-2">
                  Accessibility must be built into the system, not added later.
                </p>
                <h5 className="font-semibold text-text-light dark:text-text-dark mt-4">Practical Application</h5>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Ensure video players support customizable captions (size, style, contrast).</li>
                  <li>Allow learners to control caption display settings.</li>
                  <li>Provide downloadable transcripts for offline access.</li>
                  <li>Ensure the platform supports persistent visual notifications and alerts.</li>
                  <li>Avoid voice-only AI interactions; ensure text-first functionality with full feature parity.</li>
                  <li>Conduct structured accessibility audits before product release.</li>
                  <li>Include deaf and hard-of-hearing users in usability testing where possible.</li>
                  <li>Embed accessibility standards into product development guidelines and QA processes.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">Comprehensive Checklist: Hearing Impairment in EdTech</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              {[
                {
                  title: 'Content & Multimedia',
                  items: [
                    'All videos include accurate, human-reviewed captions.',
                    'Captions are synchronized and readable.',
                    'Sound cues are described in captions.',
                    'Full transcripts are available for all audio/video content.',
                    'Sign language interpretation is provided where appropriate.',
                    'Essential concepts are not dependent on spoken explanation alone.'
                  ]
                },
                {
                  title: 'Communication & Interaction',
                  items: [
                    'All verbal instructions are also available in writing.',
                    'Text-based discussion options are available.',
                    'Live sessions provide captioning where possible.',
                    'Breakout room instructions are provided in written format.',
                    'Collaborative tools support written participation.',
                    'Notifications include visual alerts.',
                    'Key discussions are summarized in text.'
                  ]
                },
                {
                  title: 'Assessment Design',
                  items: [
                    'Listening is required only when it is the explicit learning objective.',
                    'All assessment instructions are provided in text.',
                    'Audio-based tasks have equivalent text-based alternatives where appropriate.',
                    'Alternative modalities maintain equal rigor.',
                    'Extended time is available where needed.',
                    'Assessment measures conceptual mastery, not auditory decoding.',
                    'Performance does not depend on the speed of auditory processing.'
                  ]
                },
                {
                  title: 'Platform & System',
                  items: [
                    'Caption customization is supported by the video player.',
                    'Learners can adjust caption size, style, and contrast.',
                    'Transcripts are downloadable.',
                    'The platform supports persistent visual alerts.',
                    'AI tools offer full text-based functionality.',
                    'Accessibility audits are conducted before release.',
                    'Accessibility standards are embedded into development workflows.',
                    'Deaf/hard-of-hearing users are included in usability testing where possible.'
                  ]
                }
              ].map((section) => (
                <div
                  key={section.title}
                  className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark"
                >
                  <h4 className="font-semibold text-text-light dark:text-text-dark">{section.title}</h4>
                  <ul className="mt-3 space-y-3">
                    {section.items.map((item) => {
                      const inputId = `${section.title}-${item}`.replace(/\s+/g, '-').toLowerCase();
                      return (
                        <li key={item} className="flex items-start gap-3 text-subtle-light dark:text-subtle-dark">
                          <input
                            id={inputId}
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-border-light dark:border-border-dark text-brand-purple focus:ring-brand-purple"
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

            <div className="mt-6 bg-brand-purple/5 rounded-2xl p-5 border border-brand-purple/10 text-subtle-light dark:text-subtle-dark">
              Designing for hearing impairment often improves learning for everyone. Captions benefit non-native language
              learners, learners in noisy environments, learners reviewing material in quiet settings, and learners who
              process text better than audio. Therefore, designing for the margins improves the experience for all.
            </div>
          </section>

        </div>
      </div>
      <FloatingBackButton />
    </div>
  );
};

export default HearingImpairmentPage;
