import React from 'react';
import { Link } from 'react-router-dom';

const LMSPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">LMS Definition</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden">
        <div className="p-8 sm:p-12">
          
          <div className="border-b border-border-light dark:border-border-dark pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
              Learning Management System (LMS)
            </h1>
            <p className="text-lg text-subtle-light dark:text-subtle-dark">
              A comprehensive guide to understanding LMS and its role in creating accessible learning environments.
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-indigo dark:prose-invert">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">What is an LMS?</h2>
            <p className="text-subtle-light dark:text-subtle-dark leading-relaxed mb-6">
              A Learning Management System (LMS) is a software application or web-based technology used to plan, implement, and assess a specific learning process. It's used for e-learning practices and, in its most common form, consists of two elements: a server that performs the base functionality and a user interface that is operated by instructors, students, and administrators.
            </p>

            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Core Features</h2>
            <p className="text-subtle-light dark:text-subtle-dark leading-relaxed mb-4">
              An LMS provides a platform for instructors to create and deliver content, monitor student participation, and assess student performance. Key features often include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-subtle-light dark:text-subtle-dark marker:text-primary">
              <li><strong className="text-text-light dark:text-text-dark">Content Management:</strong> Uploading and organizing course materials like documents, videos, and presentations.</li>
              <li><strong className="text-text-light dark:text-text-dark">Assessment Tools:</strong> Creating quizzes, assignments, and exams.</li>
              <li><strong className="text-text-light dark:text-text-dark">Communication Tools:</strong> Forums, messaging, and announcements to facilitate interaction.</li>
              <li><strong className="text-text-light dark:text-text-dark">Tracking and Reporting:</strong> Monitoring student progress, grades, and engagement.</li>
            </ul>

            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">LMS and Accessibility</h2>
            <p className="text-subtle-light dark:text-subtle-dark leading-relaxed mb-4">
              Accessibility within an LMS is crucial for providing equitable education to all students, including those with disabilities. A truly accessible LMS ensures that all features and content are usable by everyone, regardless of their physical or cognitive abilities. This involves several key aspects:
            </p>
            <ol className="list-decimal pl-5 space-y-4 mb-6 text-subtle-light dark:text-subtle-dark marker:text-primary font-medium">
              <li className="pl-2">
                <strong className="text-text-light dark:text-text-dark block mb-1">Platform Compliance</strong>
                <span className="font-normal">The LMS interface itself should comply with web accessibility standards like WCAG (Web Content Accessibility Guidelines). This includes keyboard navigability, screen reader compatibility, and proper color contrast.</span>
              </li>
              <li className="pl-2">
                <strong className="text-text-light dark:text-text-dark block mb-1">Authoring Tools</strong>
                <span className="font-normal">The system should enable and encourage instructors to create accessible content. For example, providing tools to add alt text to images, create accessible tables, and offer captions for videos.</span>
              </li>
              <li className="pl-2">
                <strong className="text-text-light dark:text-text-dark block mb-1">User Customization</strong>
                <span className="font-normal">Allowing users to adjust settings like font size, contrast, and layout can significantly improve usability for individuals with specific needs.</span>
              </li>
            </ol>
            
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8">
                <p className="text-subtle-light dark:text-subtle-dark m-0">
                By prioritizing these features, an LMS becomes more than just a content repository; it transforms into an inclusive and supportive learning ecosystem for all students.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSPage;