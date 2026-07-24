export type ProjectCategory =
  | "All"
  | "Web Automation"
  | "Framework Architecture"
  | "CI/CD & DevOps";

export interface TechGroup {
  category: "Automation" | "Core & Framework" | "CI/CD & Reporting";
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  githubUrl: string;
  demoUrl?: string;
  techStack: TechGroup[];
  allTech: string[];
  architecture: {
    pattern: string;
    description: string;
    highlights: string[];
  };
  keyFeatures: string[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  gallery?: string[];
  date: string;
}
