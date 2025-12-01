import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';

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
    <div className="animate-fade-in-up">
      <Hero
        title={<>Designing For Equity and Inclusion <br className="hidden md:block" /> In EdTech Products</>}
        subtitle="A practical, implementation-focused toolkit connecting accessibility and inclusion principles directly to product design, development, and evaluation."
      >
        <a href="#categories" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10 transition-colors shadow-lg shadow-primary/30">
          Explore Toolkit
        </a>
        <a href="#about" className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 dark:border-slate-700 text-base font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 md:py-4 md:text-lg md:px-10 transition-colors">
          Learn More
        </a>
      </Hero>

      <div id="about" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Context */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Introduction & Problem Statement</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-slate-400">
                <p className="mb-4">
                  Across the world, EdTech has transformed access to education, yet gaps persist in who benefits and how. Many digital learning solutions, despite their innovation, fail to reach or serve marginalized learners effectively.
                </p>
                <p className="mb-4">
                  Learners from low-resource settings, those with disabilities, or students with limited connectivity often face barriers that limit full participation. While global frameworks exist, most were not created specifically for EdTech product teams.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl my-8">
                  <p className="font-medium text-slate-900 dark:text-white m-0">
                    <strong>The Goal:</strong> To equip educators, designers, and technologists with the knowledge, tools, and methodologies needed to design, implement, and evaluate digital learning experiences that promote equity and inclusion across diverse learner populations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Target Audience</h2>
              <p className="text-text-muted dark:text-slate-400 mb-6 text-lg">
                This toolkit is intended for professionals and teams working at the intersection of education, design, and technology, including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Learning Engineers', 'Instructional Designers', 'EdTech Developers', 'Product Managers', 'Educators', 'Curriculum Specialists'].map(role => (
                  <div key={role} className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="material-icons text-primary mr-3">check_circle</span>
                    <span className="font-medium text-slate-900 dark:text-white">{role}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Definitions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-8 border border-primary/10 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="material-icons mr-2">balance</span> Equity
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-8">
                In the context of this toolkit, Equity in EdTech ensures that all learners have fair access to opportunities, resources, and outcomes, taking into account systemic barriers and individual needs. Equity does not mean sameness; it means providing tailored support that recognizes learners’ diverse contexts.
              </p>

              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                <span className="material-icons mr-2">diversity_3</span> Inclusion
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Inclusion refers to designing products, content, and experiences so that every learner, regardless of ability, background, or identity, feels valued, represented, and supported. Inclusive design goes beyond accessibility to ensure cultural relevance and representation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section id="categories" className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">EdTech Product Categories</h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">Explore best practices and implementation guides for specific types of educational technology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Card
                key={cat.path}
                title={cat.title}
                description={cat.desc}
                icon={cat.icon}
                to={cat.path}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;