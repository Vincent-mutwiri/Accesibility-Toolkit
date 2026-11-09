import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
const links = [{ to: '/', label: 'Toolkit' }, { to: '/about', label: 'About' }, { to: '/resources', label: 'Resources' }, { to: '/feedback', label: 'Feedback' }];
const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(function closeOnRouteChange() { setOpen(false); }, [pathname]);
  useEffect(function dismissMenu() {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header"><div className="site-container header-inner">
    <Link to="/" className="brand-home" aria-label="iHUB EdTech Inclusion Toolkit home">
      <img src="/logos/ihub-logo.png" width="150" height="45" alt="iHUB, a CcHUB Company" className="logo-light" />
      <img src="/logos/ihub-logo-dark.png" width="150" height="45" alt="iHUB, a CcHUB Company" className="logo-dark" />
      <span className="brand-product"> <strong>iHUB's EdTech </strong><br /><strong>Inclusion Toolkit</strong></span>
    </Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'}>{link.label}</NavLink>)}<NavLink to="/settings" className="settings-link"><span className="material-icons" aria-hidden="true">tune</span><span>Accessibility</span></NavLink></nav>
    <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}><span className="material-icons" aria-hidden="true">{open ? 'close' : 'menu'}</span></button>
  </div>{open && <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-nav site-container">{links.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setOpen(false)}>{link.label}</NavLink>)}<NavLink to="/settings" onClick={() => setOpen(false)}>Accessibility settings</NavLink></nav>}</header>;
};
export default Navbar;
