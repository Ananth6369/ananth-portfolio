export type CertificationCategory =
  | "All"
  | "Automation"
  | "Software Engineering"
  | "Database";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  category: CertificationCategory;
  description: string;
  tags: string[];
  pdfUrl: string;
  credentialId?: string;
  color: string;
}
