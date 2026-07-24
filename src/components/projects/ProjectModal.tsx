"use client";

import React, { useEffect, useRef } from "react";
import { X, Code2, ExternalLink, CheckCircle2, Cpu, Wrench, ShieldAlert } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and set up ESC listener & focus trap
  useEffect(() => {
    if (!project) return;

    // Save previous active element to restore focus on close
    const previousFocus = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Auto focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap logic
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      data-testid={`project-modal-${project.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 space-y-8"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20 mb-3">
              <span>{project.category}</span>
            </div>
            <h2
              id="project-modal-title"
              className="text-2xl sm:text-4xl font-bold text-slate-50 font-heading"
            >
              {project.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            data-testid={`project-modal-close-${project.id}`}
            aria-label="Close project modal"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview Description */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Cpu size={16} className="text-accent" />
            <span>Project Overview</span>
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Architecture Breakdown */}
        {project.architecture && (
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 font-heading">
                <Wrench size={16} className="text-cyan-400" />
                <span>Architecture &amp; Design Pattern</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-accent border border-slate-700">
                {project.architecture.pattern}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.architecture.description}
            </p>
            {project.architecture.highlights && (
              <ul className="space-y-2 pt-2">
                {project.architecture.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Tech Stack Grouped */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Technology Stack Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.techStack.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80"
              >
                <div className="text-xs font-bold text-accent mb-2">{group.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded border border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        {project.keyFeatures && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Key Automation Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-start gap-3 text-sm text-slate-200"
                >
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {project.challenges && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-400" />
              <span>Technical Challenges &amp; SDET Solutions</span>
            </h3>
            <div className="space-y-3">
              {project.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-sm"
                >
                  <div className="text-amber-400 font-bold">Challenge: {item.challenge}</div>
                  <div className="text-slate-300">
                    <span className="text-emerald-400 font-bold">Solution: </span>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Links */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Code2 size={18} />
              <span>Explore GitHub Repository</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
