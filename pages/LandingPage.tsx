import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Online Learning",
    path: "/online-learning",
    icon: "laptop_chromebook",
    desc: "Products that deliver instruction, lessons, or courses entirely over the internet through virtual platforms.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "hover:border-brand-blue/50"
  },
  {
    title: "Digital Learning",
    path: "/digital-learning",
    icon: "article",
    desc: "Products that use digital tools, content, or media online or offline to support or enhance the learning process.",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "hover:border-brand-green/50"
  },
  {
    title: "Tutoring & Test Prep",
    path: "/tutoring",
    icon: "quiz",
    desc: "Products that provide personalized academic support, practice materials, or exam preparation for learners",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
    border: "hover:border-brand-yellow/50"
  },
  {
    title: "STEAM",
    path: "/steam",
    icon: "science",
    desc: "Products that provide interactive technologies for Science, Technology, Engineering, Arts, and Math (STEAM)",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "hover:border-brand-purple/50"
  },
  {
    title: "Workforce & Skills",
    path: "/workforce",
    icon: "work",
    desc: "Products that help learners build employability, vocational, or professional skills for the modern workplace.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    border: "hover:border-brand-red/50"
  },
  {
    title: "Management Systems",
    path: "/management-systems",
    icon: "settings_suggest",
    desc: "Products that supports the operations of schools or training institutions such as administration, communication, reporting, or content delivery.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
    border: "hover:border-brand-cyan/50"
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
          Designing For <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">Equity and Inclusion</span> <br className="hidden md:block" /> In EdTech Products
        </h1>
        <p className="text-xl text-subtle-light dark:text-subtle-dark max-w-3xl mx-auto leading-relaxed">
          A practical, implementation-focused toolkit connecting accessibility and inclusion principles directly to product design, development, and evaluation.
        </p>
      </div>

      {/* Key Words Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Keywords:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-blue/10 to-transparent rounded-2xl p-8 border border-brand-blue/20">
            <h3 className="text-xl font-bold text-brand-blue mb-3">Equity</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              Equity refers to intentionally designing products, content, and experiences that address the different needs, barriers, and starting points of learners. Equitable design ensures that each learner receives the specific support, resources, and opportunities they need to thrive, rather than assuming a one size fits all approach.
            </p>
          </div>
          <div className="bg-gradient-to-br from-brand-purple/10 to-transparent rounded-2xl p-8 border border-brand-purple/20">
            <h3 className="text-xl font-bold text-brand-purple mb-3">Inclusion</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              Inclusion refers to designing products, content, and experiences so that every learner, regardless of ability, background, or identity, feels valued, represented, and supported. Inclusive design goes beyond accessibility to ensure cultural relevance and representation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {/* Main Content */}
        <div className="space-y-8">
          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
            <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Have you ever wondered why digital learning solutions,
despite their innovation, often fail to reach or effectively serve marginalized
learners?</h2>
            <div className="prose dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
              <p className="mb-4">
                Across the world, EdTech has transformed access to education, yet gaps persist in who benefits and how.
              </p>
              <p className="mb-4">
                Learners from low-resource settings, those with disabilities, or students with limited connectivity often face barriers that limit full participation. While global frameworks exist, most were not created specifically for EdTech product teams.
              </p>
              <p>
                <strong className="text-brand-pink">The Goal:</strong> To equip educators, designers, and technologists with the knowledge, tools, and methodologies needed to design, implement, and evaluate digital learning experiences that promote equity and inclusion across diverse learner populations.
              </p>
            </div>
          </section>

          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-green"></div>
            <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Target Audience</h2>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">
              This toolkit is intended for professionals and teams working at the intersection of education, design, and technology, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Learning Engineers', 'Instructional Designers', 'EdTech Developers', 'Product Managers', 'Educators', 'Curriculum Specialists'].map(role => (
                <li key={role} className="flex items-center text-text-light dark:text-text-dark">
                  <span className="material-icons text-brand-green text-sm mr-2">check_circle</span>
                  {role}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Additional Info */}
        <div className="space-y-6">
          {/* This column can be used for additional content if needed */}
        </div>
      </div>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-text-light dark:text-text-dark">EdTech Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.path} 
              to={cat.path}
              className={`group bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark ${cat.border} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${cat.bg} rounded-lg ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <span className="material-icons text-2xl">{cat.icon}</span>
                </div>
                <span className={`material-icons text-subtle-light dark:text-subtle-dark hover:${cat.color} transition-colors`}>arrow_forward</span>
              </div>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{cat.title}</h3>
              <p className="text-subtle-light dark:text-subtle-dark text-sm leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;