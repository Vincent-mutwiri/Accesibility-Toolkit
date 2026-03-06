import React from 'react';
import PageHeader from '../components/PageHeader';

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
          <section className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Introduction</h2>
            <p>
              Hearing impairment refers to partial or complete loss of hearing that may affect a learner’s ability to
              access audio-based information. Some learners use hearing aids or cochlear implants, some rely on lip
              reading, and others use sign language as their primary mode of communication.
            </p>
            <p>
              In EdTech, hearing impairment affects how learners receive instruction, interpret communication,
              participate in live learning environments and demonstrate mastery within digitally mediated systems. When
              audio is the primary mode of communication for the instructional content, learners with hearing impairments
              may experience:
            </p>
            <ul>
              <li>Reduced comprehension</li>
              <li>Delayed participation</li>
              <li>Social exclusion in group interactions</li>
              <li>Cognitive overload from trying to lip-read or interpret incomplete cues</li>
            </ul>
            <p>
              Designing EdTech systems for learners with hearing impairments requires intentional planning across
              content, communication, interaction and platform features. The goal is not just to “add captions,” but to
              ensure meaningful access to learning experiences.
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
              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Content & Multimedia</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>All videos include accurate, human-reviewed captions.</li>
                  <li>Captions are synchronized and readable.</li>
                  <li>Sound cues are described in captions.</li>
                  <li>Full transcripts are available for all audio/video content.</li>
                  <li>Sign language interpretation is provided where appropriate.</li>
                  <li>Essential concepts are not dependent on spoken explanation alone.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Communication & Interaction</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>All verbal instructions are also available in writing.</li>
                  <li>Text-based discussion options are available.</li>
                  <li>Live sessions provide captioning where possible.</li>
                  <li>Breakout room instructions are provided in written format.</li>
                  <li>Collaborative tools support written participation.</li>
                  <li>Notifications include visual alerts.</li>
                  <li>Key discussions are summarized in text.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Assessment Design</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Listening is required only when it is the explicit learning objective.</li>
                  <li>All assessment instructions are provided in text.</li>
                  <li>Audio-based tasks have equivalent text-based alternatives where appropriate.</li>
                  <li>Alternative modalities maintain equal rigor.</li>
                  <li>Extended time is available where needed.</li>
                  <li>Assessment measures conceptual mastery, not auditory decoding.</li>
                  <li>Performance does not depend on the speed of auditory processing.</li>
                </ul>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
                <h4 className="font-semibold text-text-light dark:text-text-dark">Platform & System</h4>
                <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
                  <li>Caption customization is supported by the video player.</li>
                  <li>Learners can adjust caption size, style, and contrast.</li>
                  <li>Transcripts are downloadable.</li>
                  <li>The platform supports persistent visual alerts.</li>
                  <li>AI tools offer full text-based functionality.</li>
                  <li>Accessibility audits are conducted before release.</li>
                  <li>Accessibility standards are embedded into development workflows.</li>
                  <li>Deaf/hard-of-hearing users are included in usability testing where possible.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-brand-purple/5 rounded-2xl p-5 border border-brand-purple/10 text-subtle-light dark:text-subtle-dark">
              Designing for hearing impairment often improves learning for everyone. Captions benefit non-native language
              learners, learners in noisy environments, learners reviewing material in quiet settings, and learners who
              process text better than audio. Therefore, designing for the margins improves the experience for all.
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">References</h3>
            <ul className="mt-2 list-disc list-inside text-subtle-light dark:text-subtle-dark space-y-1">
              <li>CAST. (2018). Universal design for learning guidelines version 2.2. http://udlguidelines.cast.org</li>
              <li>Mayer, R. E. (2009). Multimedia learning (2nd ed.). Cambridge University Press.</li>
              <li>World Wide Web Consortium (W3C). (2018). Web content accessibility guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HearingImpairmentPage;
