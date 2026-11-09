import React from 'react';
import { Link } from 'react-router-dom';
const categories = [
  { title: 'Online learning', path: '/online-learning', icon: 'laptop_chromebook', desc: 'Make internet-based lessons, virtual classrooms, and courses accessible to more learners.' },
  { title: 'Digital learning', path: '/digital-learning', icon: 'auto_stories', desc: 'Build inclusive digital content and learning tools, whether learners are online or offline.' },
  { title: 'Tutoring & test prep', path: '/tutoring', icon: 'quiz', desc: 'Design personalised support, practice materials, and exam preparation for different needs.' },
  { title: 'STEAM', path: '/steam', icon: 'science', desc: 'Open up science, technology, engineering, arts, and maths through inclusive experiences.' },
  { title: 'Workforce & skills', path: '/workforce', icon: 'work_outline', desc: 'Help learners develop vocational, professional, and employability skills without barriers.' },
  { title: 'Management systems', path: '/management-systems', icon: 'dashboard_customize', desc: 'Make administration, communication, reporting, and content delivery work for everyone.' },
];
const learnerGuides = [
  { title: 'Visual impairment', path: '/visual-impairment', icon: 'visibility', desc: 'Readable content, assistive technology, and keyboard access.' },
  { title: 'Intellectual & developmental disabilities', path: '/intellectual-developmental-disabilities', icon: 'psychology', desc: 'Clear instructions, flexible pacing, and cognitive support.' },
  { title: 'Hearing impairment', path: '/hearing-impairment', icon: 'hearing', desc: 'Captions, visual communication, and accessible media.' },
  { title: 'Dual sensory loss', path: '/dual-sensory-loss', icon: 'accessibility_new', desc: 'Multiple ways to communicate, navigate, and participate.' },
];
const LandingPage: React.FC = () => <>
  <section className="landing-hero site-container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <h1 id="hero-title">Better learning starts with inclusive design.</h1><p>Turn equity and inclusion into everyday product decisions. Practical guidance, interactive activities, and checklists for the people building learning experiences.</p>
      <div className="hero-actions"><button type="button" className="brand-button" onClick={() => document.getElementById('product-guides')?.scrollIntoView({ behavior: 'auto' })}>Explore the toolkit <span className="material-icons" aria-hidden="true">south</span></button><Link to="/about" className="text-link">About this resource</Link></div>
      <div className="hero-audience"><span className="material-icons" aria-hidden="true">groups</span><span>For educators, designers, and EdTech product teams.</span></div>
    </div><div className="hero-art"><div className="hero-pattern" aria-hidden="true" /><div className="hero-note"><span className="material-icons" aria-hidden="true">diversity_3</span><h2>Different learners.<br />Shared possibilities.</h2><p>Make room for more ways to learn.</p></div></div>
  </section>
  <section id="product-guides" className="product-section site-container" aria-labelledby="products-title">
    <div className="section-heading"><div><h2 id="products-title">What are you building?</h2><p>Choose your product type to find guidance you can put to work.</p></div><span className="section-count">6 product guides</span></div>
    <div className="product-grid">{categories.map(cat => <Link key={cat.path} to={cat.path} className="product-card"><div className="product-card-top"><span className="guide-icon material-icons" aria-hidden="true">{cat.icon}</span><span className="material-icons card-arrow" aria-hidden="true">north_east</span></div><h3>{cat.title}</h3><p>{cat.desc}</p><span className="card-action">Explore guide</span></Link>)}</div>
  </section>
  <section className="learner-section" aria-labelledby="learners-title"><div className="site-container learner-layout">
    <div className="learner-intro"><span className="material-icons learner-mark" aria-hidden="true">accessibility_new</span><h2 id="learners-title">Start with the learner.</h2><p>Understand specific access needs and build experiences that support different abilities.</p><p className="learner-context">Explore practical design approaches, try interactive activities, and check your work.</p></div>
    <div className="learner-grid">{learnerGuides.map(guide => <Link key={guide.path} to={guide.path} className="learner-card"><span className="material-icons" aria-hidden="true">{guide.icon}</span><h3>{guide.title}</h3><p>{guide.desc}</p><span className="learner-action">Read the guide <span className="material-icons" aria-hidden="true">arrow_forward</span></span></Link>)}</div>
  </div></section>
  <section className="foundations-section site-container" aria-labelledby="foundations-title">
    <div className="foundations-intro"><h2 id="foundations-title">Good design considers everyone.</h2><p>Innovation alone does not remove barriers. Limited connectivity, low-resource settings, and inaccessible interfaces can prevent learners from taking part.</p><p>This toolkit connects inclusion principles to product design, development, and evaluation, so your team can make more informed decisions.</p><Link to="/resources" className="text-link">Explore supporting resources <span className="material-icons" aria-hidden="true">arrow_forward</span></Link></div>
    <div className="foundation-definitions"><article><h3>Equity</h3><p>Recognise different starting points. Give each learner the support, resources, and opportunities they need, rather than assuming one approach fits all.</p></article><article><h3>Inclusion</h3><p>Create experiences where every learner feels valued, represented, and supported, across abilities, backgrounds, identities, and cultures.</p></article></div>
  </section>
  <section className="audience-section site-container" aria-labelledby="audience-title"><div><h2 id="audience-title">Built for teams shaping education.</h2><p>Bring an inclusion perspective to every stage of your work.</p></div><ul>{['Learning engineers', 'Instructional designers', 'EdTech developers', 'Product managers', 'Educators', 'Curriculum specialists'].map(role => <li key={role}><span className="material-icons" aria-hidden="true">check</span>{role}</li>)}</ul></section>
  <section className="feedback-band"><div className="site-container feedback-band-inner"><div><h2>A better toolkit starts with your experience.</h2><p>Tell us what worked, what is missing, and what would help your team.</p></div><Link to="/feedback" className="brand-button brand-button-dark">Share your feedback <span className="material-icons" aria-hidden="true">arrow_forward</span></Link></div></section>
</>;
export default LandingPage;
