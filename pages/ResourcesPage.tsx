import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
const resources = [
  { title: 'Web Content Accessibility Guidelines (WCAG)', description: 'Explore guidance for making web content more accessible to people with disabilities.', href: 'https://www.w3.org/WAI/standards-guidelines/wcag/', label: 'Explore W3C guidance' },
  { title: 'Universal Design for Learning (UDL)', description: 'Consider different ways for learners to engage, access information, and express what they know.', href: 'https://udlguidelines.cast.org/', label: 'Explore CAST guidelines' },
  { title: 'The A11y Project', description: 'Find community resources and practical guidance for making digital accessibility part of your work.', href: 'https://www.a11yproject.com/', label: 'Explore The A11y Project' },
];
const ResourcesPage: React.FC = () => <>
  <PageHeader title="Keep building your understanding." description="Frameworks, guidance, and practical resources to support your inclusive design work." breadcrumbs={[{ label: 'Toolkit', to: '/' }, { label: 'Resources' }]} />
  <div className="site-container"><div className="resource-list">{resources.map(resource => <article key={resource.href} className="resource-card"><h2>{resource.title}</h2><p>{resource.description}</p><a href={resource.href} target="_blank" rel="noreferrer" className="text-link">{resource.label}<span className="material-icons" aria-hidden="true">open_in_new</span><span className="sr-only"> (opens in a new tab)</span></a></article>)}<div className="content-panel"><h2 className="text-xl font-bold mb-3">Looking for source material?</h2><p className="text-subtle-light dark:text-subtle-dark mb-4">Find the publications and guidance referenced throughout the toolkit.</p><Link to="/references" className="text-link">View references</Link></div></div></div>
</>;
export default ResourcesPage;
