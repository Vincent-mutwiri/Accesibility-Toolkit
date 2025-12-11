import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
    label: string;
    to?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs: Breadcrumb[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumbs }) => {
    return (
        <div className="bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark mb-8">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <nav className="flex mb-4" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && <span className="material-icons text-subtle-light dark:text-subtle-dark text-sm mx-2">chevron_right</span>}
                                {crumb.to ? (
                                    <Link to={crumb.to} className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-sm font-medium text-text-light dark:text-text-dark" aria-current="page">
                                        {crumb.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">{title}</h1>
                {description && <p className="text-lg text-subtle-light dark:text-subtle-dark max-w-3xl">{description}</p>}
            </div>
        </div>
    );
};

export default PageHeader;
