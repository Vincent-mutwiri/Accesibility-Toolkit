import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Online Learning",
    path: "/online-learning",
    icon: "laptop_chromebook",
    desc: "Platforms delivering structured courses or programs over the internet."
  },
  {
    title: "Digital Learning",
    path: "/digital-learning",
    icon: "article",
    desc: "Instruction delivered through digital formats like text, video, and interactive media."
  },
  {
    title: "Tutoring & Test Prep",
    path: "/tutoring",
    icon: "quiz",
    desc: "Personalized support and exam preparation tools."
  },
  {
    title: "STEAM",
    path: "/steam",
    icon: "science",
    desc: "Interactive technologies for Science, Technology, Engineering, Arts, and Math."
  },
  {
    title: "Workforce & Skills",
    path: "/workforce",
    icon: "work",
    desc: "Platforms for employment preparation and professional development."
  },
  {
    title: "Management Systems",
    path: "/management-systems",
    icon: "settings_suggest",
    desc: "LMS, SIS, and analytics platforms managing the learning journey."
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
          Designing For Equity and Inclusion <br className="hidden md:block" /> In EdTech Products
        </h1>
        <p className="text-xl text-subtle-light dark:text-subtle-dark max-w-3xl mx-auto leading-relaxed">
          A practical, implementation-focused toolkit connecting accessibility and inclusion principles directly to product design, development, and evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column: Context */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-bold mb-4 text-primary">Introduction & Problem Statement</h2>
            <div className="prose dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
              <p className="mb-4">
                Across the world, EdTech has transformed access to education, yet gaps persist in who benefits and how. Many digital learning solutions, despite their innovation, fail to reach or serve marginalized learners effectively.
              </p>
              <p className="mb-4">
                Learners from low-resource settings, those with disabilities, or students with limited connectivity often face barriers that limit full participation. While global frameworks exist, most were not created specifically for EdTech product teams.
              </p>
              <p>
                <strong>The Goal:</strong> To equip educators, designers, and technologists with the knowledge, tools, and methodologies needed to design, implement, and evaluate digital learning experiences that promote equity and inclusion across diverse learner populations.
              </p>
            </div>
          </section>

          <section className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-sm border border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-bold mb-4 text-primary">Target Audience</h2>
            <p className="text-subtle-light dark:text-subtle-dark mb-4">
              This toolkit is intended for professionals and teams working at the intersection of education, design, and technology, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Learning Engineers', 'Instructional Designers', 'EdTech Developers', 'Product Managers', 'Educators', 'Curriculum Specialists'].map(role => (
                <li key={role} className="flex items-center text-text-light dark:text-text-dark">
                  <span className="material-icons text-primary text-sm mr-2">check_circle</span>
                  {role}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Definitions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-3">Equity</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              In the context of this toolkit, Equity in EdTech ensures that all learners have fair access to opportunities, resources, and outcomes, taking into account systemic barriers and individual needs. Equity does not mean sameness; it means providing tailored support that recognizes learners’ diverse contexts.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-3">Inclusion</h3>
            <p className="text-text-light dark:text-text-dark text-sm leading-relaxed">
              Inclusion refers to designing products, content, and experiences so that every learner, regardless of ability, background, or identity, feels valued, represented, and supported. Inclusive design goes beyond accessibility to ensure cultural relevance and representation.
            </p>
          </div>
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
              className="group bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-background-light dark:bg-background-dark rounded-lg text-primary group-hover:scale-110 transition-transform duration-200">
                  <span className="material-icons text-2xl">{cat.icon}</span>
                </div>
                <span className="material-icons text-subtle-light dark:text-subtle-dark group-hover:text-primary transition-colors">arrow_forward</span>
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