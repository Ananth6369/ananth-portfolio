"use client";

import { motion } from "framer-motion";
import { ExternalLink, Package } from "lucide-react";

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    title: "Alatron Vendor Web Automation",
    github: "https://github.com/Ananth-QA/alatron-vendor-web-automation",
    description: "End-to-end automation of vendor portal including login, form submissions, booking flows, and multi-file PDF/image uploads. Integrated Allure reporting with failure screenshots and Jenkins CI pipeline.",
    tech: ["Selenium", "Java", "TestNG", "POM", "Maven", "Allure", "Jenkins", "Git"],
  },
  {
    title: "Poppy Admin Automation",
    github: "https://github.com/Ananth-QA/poppy-admin-automation",
    description: "Automated key functionalities including login, poster and video creation, management (edit/delete), and file download features. Implemented data-driven testing and Allure reporting for comprehensive results.",
    tech: ["Selenium", "Java", "TestNG", "POM", "Maven", "Allure", "Git"],
  },
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Featured Projects
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-accent/40 transition-all shadow-xl hover:-translate-y-2 flex flex-col"
          >
            {/* Project Header/Image Placeholder */}
            <div className="h-48 bg-slate-800 flex items-center justify-center border-b border-slate-700/50 group-hover:bg-accent/5 transition-colors">
              <Package size={64} className="text-slate-600 group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
            </div>

            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-slate-100 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 font-bold text-sm"
                >
                  <GithubIcon size={18} /> GitHub Code
                </a>
                <a
                  href="#"
                  className="p-2.5 text-slate-400 hover:text-accent transition-colors"
                  aria-label="View Live Project"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
