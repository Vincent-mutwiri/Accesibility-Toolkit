import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => <footer className="site-footer"><div className="site-container footer-main">
  <div><Link to="/" aria-label="iHUB home"><img src="/logos/ihub-logo-dark.png" width="154" height="46" alt="iHUB, a CcHUB Company" /></Link><p>Practical tools for learning<br />that includes everyone.</p></div>
  <div className="footer-links"><strong>Explore the toolkit</strong><Link to="/">Product guides</Link><Link to="/resources">Global resources</Link><Link to="/references">References</Link></div>
  <div className="footer-links"><strong>Make it work for you</strong><Link to="/about">About the toolkit</Link><Link to="/settings">Accessibility settings</Link><Link to="/feedback">Share feedback</Link></div>
</div><div className="site-container footer-bottom"><span>© {new Date().getFullYear()} iHUB. All rights reserved.</span><span>EdTech Inclusion Toolkit</span></div></footer>;
export default Footer;
