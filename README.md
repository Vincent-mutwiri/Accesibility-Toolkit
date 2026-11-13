
# iHUB's EdTech Inclusion Toolkit

A comprehensive, interactive toolkit designed to help EdTech professionals create more accessible and inclusive digital learning experiences. This practical resource connects accessibility and inclusion principles directly to product design, development, and evaluation.

## 🎯 Purpose

The iHUB's EdTech Inclusion Toolkit addresses the growing need for practical guidance in designing inclusive educational technology. While EdTech has transformed access to education globally, gaps persist in who benefits and how. This toolkit ensures that no learner is left behind due to design choices made in digital products.

## ✨ Features

- **Interactive Categories**: Explore 6 EdTech product categories with tailored guidance
- **Practical Resources**: Implementation-focused tools and methodologies
- **Accessibility Guidelines**: WCAG compliance and best practices
- **User Feedback System**: Integrated feedback collection with Google Sheets
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Auto-save Forms**: Prevents data loss with localStorage caching

## 🎓 Target Audience

This toolkit is designed for professionals working at the intersection of education, design, and technology:

- Learning Engineers
- Instructional Designers
- EdTech Developers
- Product Managers
- Educators
- Curriculum Specialists
- Accessibility Specialists
- UX/UI Designers

## 🏗️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data Storage**: Google Sheets via SheetDB API
- **Local Storage**: Browser localStorage for form caching

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://gitlab.com/cchub/accessibility-toolkit.git
   cd accessibility-toolkit/Accesibility-Toolkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Product Categories

The toolkit covers six main EdTech product categories:

1. **Online Learning** - Virtual platforms delivering instruction over the internet
2. **Digital Learning** - Digital tools supporting learning processes online/offline
3. **Tutoring & Test Prep** - Personalized academic support and exam preparation
4. **STEAM** - Interactive technologies for Science, Technology, Engineering, Arts, and Math
5. **Workforce & Skills** - Professional and vocational skill development
6. **Management Systems** - Administrative and operational support for educational institutions

## 🔧 Key Components

### Pages
- **Landing Page**: Overview and category navigation
- **Category Pages**: Specific guidance for each EdTech category
- **About Page**: Project background and mission
- **Resources Page**: Additional tools and references
- **Feedback Page**: User feedback collection with auto-save
- **Settings Page**: User preferences and customization
- **Self-Assessment Page**: A 22-question reflection with instant guidance, implementation details, browser drafts, and a text-based PDF improvement report

### Features
- **Responsive Navigation**: Desktop and mobile-friendly navigation
- **Theme Support**: Automatic dark/light mode switching
- **Form Persistence**: Auto-save functionality prevents data loss
- **Google Sheets Integration**: Feedback data automatically stored
- **Accessibility Compliant**: WCAG guidelines implemented throughout

## Self-assessment

Open `/#/self-assessment`, or use **Self-assessment** in the navigation or the
landing-page assessment link. Existing guide checklists remain separate.

- Answer Yes, No / Not yet fully, or Not sure. Not applicable is limited to
  questions about absent image, prerecorded video, audio/video, or document content.
- Yes reveals implementation examples plus Other, or an open-ended prompt.
  Other descriptions and Not applicable explanations are required; incomplete
  answers remain exportable as a clearly marked partial assessment.
- No reveals immediate improvement guidance. Not sure explains how to check.
- Review findings to edit answers and download the report. Findings are
  self-reported, not an accessibility score, audit, or certification.
- Drafts use the dedicated `ihub-accessibility-self-assessment:v1` local-storage
  record. Answers are not submitted to the feedback service or another server.
  Do not enter sensitive learner details; clear drafts on shared devices.
- Invalid or incompatible drafts are not automatically overwritten. If storage
  is blocked, the assessment continues in memory with a visible warning. This
  session-only draft survives same-tab toolkit navigation, but not a page reload
  or closing the tab.

Question content and verification prompts live in `assessment/questions.ts`.
Update the question-set version when wording/options/applicability changes.
`assessment/model.ts` validates drafts and derives the shared HTML/PDF report.
Toolkit links use a `section` query parameter inside the HashRouter route.

PDF generation dynamically loads the installed jsPDF dependency and the local,
licensed DejaVu font. The PDF contains selectable text and page numbers, but is
**not a tagged accessible PDF**. The full report remains available as structured
HTML. Unsupported characters or writing systems produce an explicit export
error rather than silently changing user text; use the HTML report in that case.
The export can be retried after a font/network failure.

### Verification

With the existing local Python Playwright, pypdf, and Brave installation:

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm dev
# In another terminal, while the server is running:
python3 tests/check_self_assessment.py --url http://localhost:3000
python3 tests/check_accessibility.py --url http://localhost:3000 --axe /tmp/ihub-axe.min.js
python3 tests/check_pdf_export.py
```

The optional local axe bundle is not a project dependency. The assessment suite
covers branching, active-only report details, drafts, errors, PDF extraction,
keyboard focus, and mobile layouts. Real screen-reader/device checks and PDF
accessibility review remain necessary before making conformance claims.

## 🤝 Contributing

We welcome contributions to improve the toolkit! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Feedback

Your feedback helps us improve the toolkit. Use the integrated feedback form in the application or contact us directly.

## 🏢 About CcHUB

This toolkit is developed by CcHUB (Co-creation Hub), a leading technology innovation ecosystem in Africa, committed to accelerating the application of science, technology, and social innovation for economic prosperity.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- All contributors who have helped shape this toolkit
- The global accessibility community for their ongoing advocacy
- EdTech professionals who provided valuable feedback and insights

---

**Making digital learning accessible and inclusive for everyone.**
