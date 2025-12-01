import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    title: string;
    description: string;
    icon?: string;
    to?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, to, className = "" }) => {
    const Content = () => (
        <div className={`h-full p-6 bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark shadow-soft hover:shadow-glow transition-all duration-300 group ${className}`}>
            {icon && (
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-2xl">{icon}</span>
                </div>
            )}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-text-muted dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="block h-full">
                <Content />
            </Link>
        );
    }

    return <Content />;
};

export default Card;
