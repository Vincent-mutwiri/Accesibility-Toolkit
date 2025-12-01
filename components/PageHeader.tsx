import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
    title: string;
    breadcrumbs: { label: string; to?: string }[];
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, description }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <nav className="flex mb-4" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <span className="material-icons text-text-muted text-sm mx-2">chevron_right</span>
                                )}
                                {crumb.to ? (
                                    <Link to={crumb.to} className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-sm font-medium text-primary">
                                        {crumb.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 text-xl text-text-muted dark:text-slate-400 max-w-3xl">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
