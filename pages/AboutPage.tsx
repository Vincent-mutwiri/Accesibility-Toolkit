import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
const AboutPage: React.FC = () => <>
  <PageHeader title="Inclusion is a design decision." description="A practical toolkit for the teams creating digital learning experiences." breadcrumbs={[{ label: 'Toolkit', to: '/' }, { label: 'About' }]} />
  <div className="site-container about-grid">
    <section><h2>Why this toolkit exists</h2><p>Digital learning can open doors. But inaccessible interfaces, limited connectivity, and content that overlooks learners’ backgrounds can create new barriers.</p><p>The iHUB EdTech Inclusion Toolkit connects equity and inclusion principles to the everyday work of product design, development, and evaluation. It helps learning engineers, instructional designers, developers, and educators make informed choices.</p><h2>Our vision</h2><p>Learning experiences that are accessible, culturally responsive, and equitable, whatever a learner’s background, ability, or location.</p><Link to="/" className="brand-button">Explore the product guides</Link></section>
    <div><section className="content-panel"><h2>Use it in your work</h2><ol className="list-decimal pl-5 space-y-4"><li>Choose the guide that matches your product or the learner needs you want to understand.</li><li>Explore practical approaches and try the interactive activities with your team.</li><li>Use the checklists to review your product and identify the next improvements.</li></ol></section><section className="mt-8"><h2>About iHUB</h2><p>iHUB supports entrepreneurs and innovators through technology, collaboration, and experimentation.</p><p>This toolkit is a living resource. Your experience helps make its guidance more useful.</p><Link to="/feedback" className="text-link">Share your feedback</Link></section></div>
  </div>
  <section id="acknowledgements" className="site-container acknowledgements" aria-labelledby="acknowledgements-title">
    <h2 id="acknowledgements-title" tabIndex={-1}>Acknowledgements</h2>
    <p>The development and validation of the <strong>iHUB Equity &amp; Accessibility Toolkit</strong> reflect the collective dedication, research, and technical leadership of a multi-disciplinary team committed to advancing inclusive education across digital learning ecosystems.</p>
    <section aria-labelledby="acknowledgements-team">
      <h3 id="acknowledgements-team">Core Project Team &amp; Contributors</h3>
      <p>Sincere appreciation goes to the primary project leads, researchers, learning engineers, and developers whose technical contributions and structural guidance shaped this toolkit:</p>
      <ul>
        <li><strong>Nissi Madu</strong> – For strategic alignment, leadership, and review of overall project quality.</li>
        <li><strong>Lucy Thome</strong> – For subject-matter expertise in inclusive design and instructional accessibility.</li>
        <li><strong>Famous</strong> – For contributions to framework design and technical delivery.</li>
        <li><strong>Ayotunde Adetomiwa</strong> – For foundational research, document structure, and content architecture.</li>
        <li><strong>Pauline Kimathi</strong> – For program coordination, analytics tracking, and stakeholder communication.</li>
        <li><strong>Vincent Mutwiri</strong> – For platform engineering, front-end deployment, and technical implementation.</li>
        <li><strong>Longarves Dibondo</strong> – For concept formulation, session architecture, and program execution.</li>
        <li><strong>Nelius Karera</strong> – For operational support, feedback synthesis, and quality checks.</li>
        <li><strong>Kip'ngenoh Aaron</strong> – For user interface design, accessibility standards alignment, and technical review.</li>
      </ul>
    </section>
    <section aria-labelledby="acknowledgements-partners">
      <h3 id="acknowledgements-partners">Institutional Validation &amp; Partner Organizations</h3>
      <p>We extend our gratitude to our core validating institutions for ensuring the toolkit is grounded in rigorous pedagogical standards and real-world accessibility requirements:</p>
      <ul>
        <li><strong>Kenya Institute of Special Education (KISE)</strong> – For expert validation, field insight, and grounding the toolkit&apos;s guidelines in special education standards and lived experience.</li>
        <li><strong>Carnegie Mellon University (CMU)</strong> – For learning science deep-dives, academic alignment, and evidence-based validation.</li>
      </ul>
    </section>
    <section aria-labelledby="acknowledgements-ecosystem">
      <h3 id="acknowledgements-ecosystem">Ecosystem Support</h3>
      <ul>
        <li><strong>iHUB &amp; CcHUB</strong> – For institutional backing, platform infrastructure, and driving ecosystem socialization during EdTech Impact Week.</li>
        <li><strong>Mastercard Foundation EdTech Fellowship</strong> – For strategic partnership and support in scaling inclusive EdTech solutions across the region.</li>
      </ul>
    </section>
  </section>
</>;
export default AboutPage;
