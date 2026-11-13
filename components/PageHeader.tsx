import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const assessmentModules: Record<string, string> = {
  '/management-systems': 'management-systems', '/lms': 'management-systems',
  '/online-learning': 'online-learning', '/digital-learning': 'digital-learning',
  '/tutoring': 'tutoring', '/steam': 'steam', '/workforce': 'workforce',
  '/visual-impairment': 'visual-access', '/hearing-impairment': 'hearing-access',
  '/intellectual-developmental-disabilities': 'cognitive-access', '/dual-sensory-loss': 'dual-sensory-access',
};
interface PageHeaderProps { title: string; description?: string; breadcrumbs: { label: string; to?: string }[]; }
const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumbs }) => {
  const moduleId = assessmentModules[useLocation().pathname];
  return <div className="page-heading"><div className="site-container">
  <nav aria-label="Breadcrumb"><ol className="breadcrumbs">{breadcrumbs.map((crumb, index) => <li key={`${index}-${crumb.label}`}>
    {index > 0 && <span className="material-icons" aria-hidden="true">chevron_right</span>}{crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
  </li>)}</ol></nav><h1>{title}</h1>{description && <p>{description}</p>}
  {moduleId && <p><Link className="text-link" to={`/self-assessment?module=${encodeURIComponent(moduleId)}`}>Assess this category</Link><span className="sr-only"> — {title}</span></p>}
</div></div>;
};
export default PageHeader;
