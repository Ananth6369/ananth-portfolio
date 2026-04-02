"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, ProjectCard, ProjectModal, type Project } from "./ProjectCard";

const CATEGORIES = ["All", "AI / QA", "Automation", "E-Commerce / QA", "Performance", "Visual Testing", "UX / Design", "Documentation", "Innovation"] as const;

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleOpen = useCallback((p: Project) => setSelectedProject(p), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        filter: "blur(12px)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* Atmospheric glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-60 w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(34,211,238,0.1)",
              color: "#22d3ee",
              border: "1px solid rgba(34,211,238,0.25)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Case Studies
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Project{" "}
            <span style={{ color: "#22d3ee", textShadow: "0 0 30px #22d3ee55" }}>
              Universe
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Real-world engineering challenges — solved with precision, creativity,
            and an obsession for quality.
          </p>
        </div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: activeFilter === cat ? "#22d3ee22" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeFilter === cat ? "#22d3ee" : "rgba(255,255,255,0.08)"}`,
                color: activeFilter === cat ? "#22d3ee" : "#71717a",
                boxShadow: activeFilter === cat ? "0 0 16px #22d3ee33" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={handleOpen}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20 text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.div>
        )}

        {/* Stats strip */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[
            { label: "Projects Delivered", value: "8+", color: "#22d3ee" },
            { label: "Automation Coverage", value: "87%", color: "#a78bfa" },
            { label: "Defect Detection Rate", value: "94%", color: "#34d399" },
            { label: "CI/CD Integrations", value: "12+", color: "#fbbf24" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 text-center glass-panel border border-white/5"
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}55` }}
              >
                {stat.value}
              </div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  );
}
