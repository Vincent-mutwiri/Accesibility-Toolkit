import React from 'react';

interface HeroProps {
    title: React.ReactNode;
    subtitle: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, children }) => {
    return (
        <div className="relative overflow-hidden bg-background-light dark:bg-background-dark pt-16 pb-24 lg:pt-24 lg:pb-32">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                    {title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-text-muted dark:text-slate-300">
                    {subtitle}
                </p>
                {children && (
                    <div className="mt-10 flex justify-center gap-4">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
