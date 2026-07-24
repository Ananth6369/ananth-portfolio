"use client";

import React from "react";
import { ExternalLink, Code2, Layers } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  if (!project) return null;

  return (
    <article
      data-testid={`project-card-${project.id}`}
      className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300 shadow-xl hover:-translate-y-2 flex flex-col justify-between"
    >
      <div>
        {/* Card Header Illustration / Banner */}
        <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950/40 border-b border-slate-800 flex items-center justify-center p-6 text-center overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-accent group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-lg">
            <Layers size={32} />
          </div>

          {/* Category Badge overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Main Body */}
        <div className="p-6 sm:p-8">
          {/* Title */}
          <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors font-heading leading-tight">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.allTech.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700/80"
              >
                {tech}
              </span>
            ))}
            {project.allTech.length > 6 && (
              <span className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs font-medium rounded-lg">
                +{project.allTech.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-3 border-t border-slate-800/80 mt-auto">
        <div className="flex items-center gap-2">
          {/* GitHub Repo Button */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-github-link-${project.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
            aria-label={`View ${project.title} code on GitHub`}
          >
            <Code2 size={15} />
            <span>GitHub</span>
          </a>

          {/* Live Demo Link if applicable */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`project-demo-link-${project.id}`}
              className="p-2 text-slate-400 hover:text-accent transition-colors"
              aria-label={`View live demo for ${project.title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* View Case Study / Details Button */}
        <button
          onClick={() => onSelect(project)}
          data-testid={`project-details-button-${project.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-accent font-bold text-xs rounded-xl border border-cyan-500/30 transition-all group-hover:scale-105"
        >
          <span>View Case Study</span>
        </button>
      </div>
    </article>
  );
}
