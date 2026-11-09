import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
const AboutPage: React.FC = () => <>
  <PageHeader title="Inclusion is a design decision." description="A practical toolkit for the teams creating digital learning experiences." breadcrumbs={[{ label: 'Toolkit', to: '/' }, { label: 'About' }]} />
  <div className="site-container about-grid">
    <section><h2>Why this toolkit exists</h2><p>Digital learning can open doors. But inaccessible interfaces, limited connectivity, and content that overlooks learners’ backgrounds can create new barriers.</p><p>The iHUB EdTech Inclusion Toolkit connects equity and inclusion principles to the everyday work of product design, development, and evaluation. It helps learning engineers, instructional designers, developers, and educators make informed choices.</p><h2>Our vision</h2><p>Learning experiences that are accessible, culturally responsive, and equitable, whatever a learner’s background, ability, or location.</p><Link to="/" className="brand-button">Explore the product guides</Link></section>
    <div><section className="content-panel"><h2>Use it in your work</h2><ol className="list-decimal pl-5 space-y-4"><li>Choose the guide that matches your product or the learner needs you want to understand.</li><li>Explore practical approaches and try the interactive activities with your team.</li><li>Use the checklists to review your product and identify the next improvements.</li></ol></section><section className="mt-8"><h2>About iHUB</h2><p>iHUB supports entrepreneurs and innovators through technology, collaboration, and experimentation.</p><p>This toolkit is a living resource. Your experience helps make its guidance more useful.</p><Link to="/feedback" className="text-link">Share your feedback</Link></section></div>
  </div>
</>;
export default AboutPage;
