import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "alatron-vendor-web-automation",
    title: "Alatron Vendor Web Automation",
    category: "Web Automation",
    shortDescription:
      "End-to-end automation of vendor portal including login, form submissions, booking flows, and multi-file PDF/image uploads with Allure reporting and Jenkins CI.",
    fullDescription:
      "Comprehensive web test automation suite engineered for the Alatron Vendor Portal. Built with Selenium WebDriver and Java using the Page Object Model (POM) pattern. Automates complex end-to-end business workflows such as authentication, vendor onboarding, multi-step booking forms, and dynamic file upload interactions. Integrates Allure reporting for interactive test logs and failure screenshots, configured to run headlessly in Jenkins CI/CD pipelines.",
    thumbnail: "/images/blog-placeholder.jpg",
    githubUrl: "https://github.com/Ananth-QA/alatron-vendor-web-automation",
    demoUrl: "https://github.com/Ananth-QA/alatron-vendor-web-automation",
    date: "2024-05-15",
    techStack: [
      {
        category: "Automation",
        items: ["Selenium WebDriver", "TestNG", "Page Object Model (POM)"],
      },
      {
        category: "Core & Framework",
        items: ["Java", "Maven", "Data-Driven Testing"],
      },
      {
        category: "CI/CD & Reporting",
        items: ["Allure Reports", "Jenkins", "Git"],
      },
    ],
    allTech: ["Selenium", "Java", "TestNG", "POM", "Maven", "Allure", "Jenkins", "Git"],
    architecture: {
      pattern: "Page Object Model (POM) & Data-Driven Architecture",
      description:
        "Decoupled test scripts from web page element locators using POM design pattern. Centralized configuration management and dynamic file upload utility wrappers.",
      highlights: [
        "Explicit wait strategies handling dynamic JS modals & async file uploads",
        "Allure listener integration capturing failure screenshots automatically",
        "Jenkinsfile pipeline definition for automated nightly regression runs",
      ],
    },
    keyFeatures: [
      "Automated multi-file PDF/Image upload handling",
      "Dynamic vendor booking form workflow validation",
      "Interactive Allure HTML reporting dashboard",
      "Jenkins CI integration with automated email notifications",
    ],
    challenges: [
      {
        challenge: "Handling flaky multi-file upload inputs on slow staging servers.",
        solution:
          "Created robust custom WebDriver wait wrappers targeting hidden file inputs and validated POST response payloads before assertion.",
      },
      {
        challenge: "Dynamic elements with changing XPath IDs on re-render.",
        solution:
          "Implemented CSS selector strategies using stable accessibility attributes and relative axes.",
      },
    ],
  },
  {
    id: "poppy-admin-automation",
    title: "Poppy Admin Automation",
    category: "Web Automation",
    shortDescription:
      "Automated key admin portal functionalities including login, poster & video creation, edit/delete workflows, and file downloads with data-driven testing.",
    fullDescription:
      "Production-grade test automation suite designed for the Poppy Admin Portal. Focuses on critical administrative operations including poster media management, video publishing workflows, dynamic file exports, and role-based permissions. Utilizes TestNG Data Providers for parameterizing test cases across multiple environments.",
    thumbnail: "/images/blog-placeholder.jpg",
    githubUrl: "https://github.com/Ananth-QA/poppy-admin-automation",
    demoUrl: "https://github.com/Ananth-QA/poppy-admin-automation",
    date: "2024-03-20",
    techStack: [
      {
        category: "Automation",
        items: ["Selenium WebDriver", "TestNG", "Page Object Model"],
      },
      {
        category: "Core & Framework",
        items: ["Java", "Maven", "Apache POI"],
      },
      {
        category: "CI/CD & Reporting",
        items: ["Allure Reports", "Git"],
      },
    ],
    allTech: ["Selenium", "Java", "TestNG", "POM", "Maven", "Allure", "Git"],
    architecture: {
      pattern: "Data-Driven TestNG Architecture",
      description:
        "Externalized test data into Excel/JSON files using Apache POI, feeding TestNG DataProviders to achieve 100% test scenario parameterization.",
      highlights: [
        "Media asset generation validation (Posters & Videos)",
        "Automated file download verification utilities",
        "Clean POM class structure for admin portal pages",
      ],
    },
    keyFeatures: [
      "Poster and Video asset creation & deletion workflow validation",
      "Automated file download verification in Chrome options",
      "Data-driven execution across multi-tenant test environments",
      "Rich Allure visual execution reports",
    ],
    challenges: [
      {
        challenge: "Verifying file downloads without hardcoded directory paths.",
        solution:
          "Configured Chrome options with custom temporary download directory and implemented Java File I/O polling assertions.",
      },
    ],
  },
  {
    id: "playwright-ts-e2e-framework",
    title: "Playwright TypeScript E2E Framework",
    category: "Framework Architecture",
    shortDescription:
      "Next-generation Playwright TypeScript framework with parallel execution, fixture isolation, trace viewer debugging, and CI pipeline integration.",
    fullDescription:
      "Modern end-to-end automation architecture designed with Playwright and TypeScript. Features custom fixture extensions, network request interception/mocking, multi-browser parallel execution (Chromium, Firefox, WebKit), and full Trace Viewer integration for rapid failure diagnostics.",
    thumbnail: "/images/blog-placeholder.jpg",
    githubUrl: "https://github.com/Ananth-QA",
    demoUrl: "https://github.com/Ananth-QA",
    date: "2024-07-10",
    techStack: [
      {
        category: "Automation",
        items: ["Playwright", "Page Object Model", "Custom Fixtures"],
      },
      {
        category: "Core & Framework",
        items: ["TypeScript", "Node.js", "ES6+"],
      },
      {
        category: "CI/CD & Reporting",
        items: ["GitHub Actions", "Trace Viewer", "HTML Report"],
      },
    ],
    allTech: ["Playwright", "TypeScript", "POM", "Node.js", "CI/CD", "Allure", "Git"],
    architecture: {
      pattern: "Playwright Fixture & POM Architecture",
      description:
        "Utilized Playwright custom test fixtures to instantiate page object instances automatically, guaranteeing clean context isolation for parallel test runs.",
      highlights: [
        "Zero-flakiness auto-waiting locators",
        "API response mocking for deterministic UI states",
        "Parallel test matrix running on GitHub Actions runner",
      ],
    },
    keyFeatures: [
      "Cross-browser testing across Chromium, Firefox & WebKit",
      "Automatic video & trace artifact generation on failure",
      "API request intercepter and mock data handlers",
      "GitHub Actions workflow with parallel worker matrix",
    ],
    challenges: [
      {
        challenge: "Managing authentication state across multiple test specs efficiently.",
        solution:
          "Implemented Playwright global setup `storageState` reuse, saving 60% of test execution time.",
      },
    ],
  },
];
