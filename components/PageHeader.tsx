import React from 'react';
import { Link } from 'react-router-dom';
interface PageHeaderProps { title: string; description?: string; breadcrumbs: { label: string; to?: string }[]; }
const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumbs }) => <div className="page-heading"><div className="site-container">
  <nav aria-label="Breadcrumb"><ol className="breadcrumbs">{breadcrumbs.map((crumb, index) => <li key={`${index}-${crumb.label}`}>
    {index > 0 && <span className="material-icons" aria-hidden="true">chevron_right</span>}{crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
  </li>)}</ol></nav><h1>{title}</h1>{description && <p>{description}</p>}
</div></div>;
export default PageHeader;
