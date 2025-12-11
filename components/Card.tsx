import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    title: string;
    description: string;
    icon?: string;
    to?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, to, className = '' }) => {
    const Content = () => (
        <div className={`bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark hover:shadow-md transition-all duration-200 h-full flex flex-col ${className}`}>
            {icon && (
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <span className="material-icons text-primary text-2xl">{icon}</span>
                </div>
            )}
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{title}</h3>
            <p className="text-subtle-light dark:text-subtle-dark text-sm leading-relaxed flex-grow">{description}</p>
            {to && (
                <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:underline">
                    Learn more <span className="material-icons text-sm ml-1">arrow_forward</span>
                </div>
            )}
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="block h-full group">
                <Content />
            </Link>
        );
    }

    return <Content />;
};

export default Card;
