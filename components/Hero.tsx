import React from 'react';

interface HeroProps {
    title: React.ReactNode;
    subtitle: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, children }) => {
    return (
        <div className="relative overflow-hidden bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark tracking-tight mb-6">
                    {title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-subtle-light dark:text-subtle-dark mb-10">
                    {subtitle}
                </p>
                {children && (
                    <div className="flex justify-center gap-4">
                        {children}
                    </div>
                )}
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Hero;
