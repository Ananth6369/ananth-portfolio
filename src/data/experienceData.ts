export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: {
    title: string;
    items: string[];
  }[];
  achievements: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "shrewd-business-solutions",
    role: "QA Software Tester",
    company: "Shrewd Business Solutions",
    period: "Apr 2025 – Jun 2026",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-Time",
    overview:
      "QA Software Tester with 1.5+ years of experience in Functional Testing, Regression Testing, API Testing, Responsive Testing, Test Case Design, and Defect Management across ERP, CRM, web, and mobile applications.",
    responsibilities: [
      {
        title: "Manual Testing & Quality Assurance",
        items: [
          "Executed 500+ functional, regression, smoke, sanity, and UI test cases across ERP, CRM, and enterprise web/mobile applications, achieving 95%+ test coverage across critical modules.",
          "Designed and executed 150+ test scenarios for positive, negative, and edge conditions across dashboards, multi-step forms, RBAC flows, and e-commerce checkout.",
          "Performed responsive testing across 4+ browsers (Chrome, Firefox, Edge, Safari) and mobile app testing across 3 applications (consulting, pest control, digital gold).",
          "Logged, tracked, and managed defects in JIRA with severity classification (Critical/Major/Minor), maintaining 90%+ resolution rate within sprint cycles.",
          "Collaborated in Agile/Scrum sprint cycles for requirement analysis, test planning, defect triage, sprint testing, and release validation.",
        ],
      },
      {
        title: "Automation Testing (Selenium + Java)",
        items: [
          "Developed and maintained a Selenium WebDriver (Java) automation framework using TestNG and Page Object Model (POM) architecture, automating 30+ test scenarios and reducing manual regression time by ~60%.",
          "Automated 10+ end-to-end workflows (login, multi-step forms, booking flows, smoke/regression suites) handling dynamic XPath, explicit waits, modals, and toast notifications.",
          "Implemented PDF/image file upload automation; integrated Allure HTML reporting with failure screenshots; enabled Apache POI Excel data-driven testing.",
          "Configured Maven build lifecycle and TestNG XML suites; set up Jenkins CI/CD pipeline (Jenkinsfile) cutting feedback loops to under 30 minutes.",
        ],
      },
      {
        title: "API, Security & Performance Testing",
        items: [
          "Validated 50+ REST API endpoints via Postman (GET, POST, PUT, DELETE), verifying JSON responses, status codes, and UI-to-backend data consistency.",
          "Performed security testing (IDOR, XSS, CSRF, parameter tampering) on authentication and RBAC flows across 2+ applications.",
          "Designed and executed JMeter load and spike test plans; analyzed throughput, response time, and error rates to identify bottlenecks before production deployment.",
        ],
      },
    ],
    achievements: [
      "Automated 30+ regression scenarios reducing manual execution time by ~60%.",
      "Achieved 95%+ test coverage across critical enterprise ERP/CRM modules.",
      "Maintained a 90%+ JIRA defect resolution rate within active sprint cycles.",
    ],
    technologies: [
      "Selenium WebDriver",
      "Java",
      "TestNG",
      "POM",
      "Maven",
      "Allure Reports",
      "Jenkins",
      "Postman",
      "JMeter",
      "SQL",
      "Git",
      "JIRA",
      "Agile/Scrum",
    ],
  },
];
