import { projectsData } from "@/data/projectsData";
import { certificationsData } from "@/data/certificationsData";
import { experienceData } from "@/data/experienceData";

export interface GlobalSearchResult {
  id: string;
  title: string;
  description: string;
  type: "Project" | "Blog" | "Skill" | "Experience" | "Certification" | "Resume";
  url: string;
  badge: string;
}

const staticSkillItems: GlobalSearchResult[] = [
  {
    id: "skill-playwright",
    title: "Playwright Automation",
    description: "End-to-end web testing framework with TypeScript, parallel execution, dynamic fixtures, and Trace Viewer diagnostics.",
    type: "Skill",
    url: "/#skills",
    badge: "Automation Tool",
  },
  {
    id: "skill-selenium",
    title: "Selenium WebDriver",
    description: "Java & TestNG test automation with Page Object Model architecture, cross-browser support, and dynamic waits.",
    type: "Skill",
    url: "/#skills",
    badge: "Automation Tool",
  },
  {
    id: "skill-postman",
    title: "API Testing & Postman",
    description: "RESTful API test collection execution, JSON schema validation, and header token authentication.",
    type: "Skill",
    url: "/#skills",
    badge: "API Testing",
  },
  {
    id: "skill-jmeter",
    title: "JMeter Performance Testing",
    description: "Load, stress, and spike testing script design, response latency analysis, and throughput profiling.",
    type: "Skill",
    url: "/#skills",
    badge: "Performance",
  },
  {
    id: "skill-sql",
    title: "SQL & Relational Databases",
    description: "Database state verification, complex SQL join queries, index tuning, and backend data integrity.",
    type: "Skill",
    url: "/#skills",
    badge: "Database",
  },
  {
    id: "resume-doc",
    title: "Official Resume (Ananth A)",
    description: "Download official PDF resume or preview SDET experience, certifications, and test automation achievements.",
    type: "Resume",
    url: "/resume.pdf",
    badge: "PDF Document",
  },
];

/**
 * Searches across all indexed portfolio items (Projects, Skills, Experience, Certifications, Resume).
 */
export function searchGlobalIndex(query: string): GlobalSearchResult[] {
  if (!query || !query.trim()) return [];

  const term = query.toLowerCase().trim();
  const results: GlobalSearchResult[] = [];

  // 1. Search Projects
  projectsData.forEach((project) => {
    const titleMatch = project.title.toLowerCase().includes(term);
    const descMatch = project.shortDescription.toLowerCase().includes(term);
    const techMatch = project.allTech.some((tech) => tech.toLowerCase().includes(term));

    if (titleMatch || descMatch || techMatch) {
      results.push({
        id: `project-${project.id}`,
        title: project.title,
        description: project.shortDescription,
        type: "Project",
        url: `/#projects`,
        badge: project.category,
      });
    }
  });

  // 2. Search Experience
  experienceData.forEach((exp) => {
    const roleMatch = exp.role.toLowerCase().includes(term);
    const companyMatch = exp.company.toLowerCase().includes(term);
    const overviewMatch = exp.overview.toLowerCase().includes(term);
    const techMatch = exp.technologies.some((tech) => tech.toLowerCase().includes(term));

    if (roleMatch || companyMatch || overviewMatch || techMatch) {
      results.push({
        id: `exp-${exp.id}`,
        title: `${exp.role} @ ${exp.company}`,
        description: exp.overview,
        type: "Experience",
        url: `/#experience`,
        badge: exp.period,
      });
    }
  });

  // 3. Search Certifications
  certificationsData.forEach((cert) => {
    const nameMatch = cert.name.toLowerCase().includes(term);
    const issuerMatch = cert.issuer.toLowerCase().includes(term);
    const descMatch = cert.description.toLowerCase().includes(term);
    const tagMatch = cert.tags.some((tag) => tag.toLowerCase().includes(term));

    if (nameMatch || issuerMatch || descMatch || tagMatch) {
      results.push({
        id: `cert-${cert.id}`,
        title: cert.name,
        description: `${cert.issuer} • ${cert.description}`,
        type: "Certification",
        url: `/#certifications`,
        badge: cert.issuer,
      });
    }
  });

  // 4. Search Static Skills & Resume
  staticSkillItems.forEach((item) => {
    const titleMatch = item.title.toLowerCase().includes(term);
    const descMatch = item.description.toLowerCase().includes(term);

    if (titleMatch || descMatch) {
      results.push(item);
    }
  });

  return results.slice(0, 8); // Limit to top 8 items for fast UI
}
