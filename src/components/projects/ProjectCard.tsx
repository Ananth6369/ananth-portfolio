"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categoryColor?: string;
  icon: string;
  tags: string[];
  problem: string;
  approach: string;
  tools: string[];
  results: string[];
  gradient: string;
  glowColor: string;
}

export const projects: Project[] = [
  {
    id: "alatron-automation",
    title: "Alatron Vendor Automation",
    tagline: "End-to-end framework for industrial procurement",
    category: "Automation",
    categoryColor: "#00FFD1",
    icon: "🏭",
    tags: ["Selenium", "Java", "TestNG", "Maven"],
    problem: "Alatron's vendor ecosystem required exhaustive manual regression across procurement, onboarding, and logistics flows, leading to slow release cycles.",
    approach: "Architected a modular Page Object Model (POM) framework in Java. Automated 150+ critical paths including vendor registration, order bidding, and invoice processing.",
    tools: ["Selenium WebDriver", "Java", "TestNG", "Maven", "GitHub Actions", "Extent Reports"],
    results: [
      "Achieved 85% automation coverage across the vendor portal",
      "Reduced regression suite execution time by 60%",
      "Identified 30+ high-severity bugs before production deployment"
    ],
    gradient: "linear-gradient(135deg, #051a1a 0%, #0a2525 100%)",
    glowColor: "#00FFD1",
  },
  {
    id: "poppy-admin-qa",
    title: "Poppy Admin CRM Suite",
    tagline: "Regression automation for pest control CRM",
    category: "Automation",
    categoryColor: "#3B8BFF",
    icon: "🤝",
    tags: ["Selenium", "Java", "TestNG", "Postman"],
    problem: "The Poppy Admin panel managed critical customer data and scheduling. Manual regression for frequent UI updates was bottlenecking the development team.",
    approach: "Developed a comprehensive regression suite using Selenium and TestNG. Focused on dynamic table data validation and user permission security checks.",
    tools: ["Selenium WebDriver", "Java", "TestNG", "Postman", "Jenkins", "Apache POI"],
    results: [
      "Automated over 200 regression scenarios with 98% reliability",
      "Achieved 100% traceability between test cases and defects",
      "Ensured zero critical regressions across 12 consecutive production launches"
    ],
    gradient: "linear-gradient(135deg, #050a1a 0%, #0a152e 100%)",
    glowColor: "#3B8BFF",
  }
];

// ---- ProjectCard ----

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5"
      style={{ background: project.gradient }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onClick(project)}
    >
      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${project.glowColor}55, 0 0 30px ${project.glowColor}22`,
        }}
      />

      {/* Top glow streak */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.glowColor}, transparent)` }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{project.icon}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${project.glowColor}18`,
              color: project.glowColor,
              border: `1px solid ${project.glowColor}30`,
            }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg leading-tight mb-1.5">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full text-zinc-400 bg-white/5 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: project.glowColor }}
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <span>View Case Study</span>
          <span>→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---- ProjectModal ----

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="fixed inset-4 md:inset-x-[10%] md:inset-y-[5%] z-50 rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: project.gradient,
              border: `1px solid ${project.glowColor}33`,
              boxShadow: `0 0 80px ${project.glowColor}22`,
            }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Top glow line */}
            <div
              className="h-px w-full flex-shrink-0"
              style={{ background: `linear-gradient(90deg, transparent, ${project.glowColor}, transparent)` }}
            />

            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-6 border-b flex-shrink-0"
              style={{ borderColor: `${project.glowColor}1a` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{project.icon}</span>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block"
                    style={{
                      background: `${project.glowColor}18`,
                      color: project.glowColor,
                      border: `1px solid ${project.glowColor}30`,
                    }}
                  >
                    {project.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
                  <p className="text-zinc-400 text-sm mt-0.5">{project.tagline}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Problem */}
                <motion.div
                  className="rounded-2xl p-6 border"
                  style={{ background: `${project.glowColor}08`, borderColor: `${project.glowColor}20` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎯</span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">The Problem</h3>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{project.problem}</p>
                </motion.div>

                {/* Approach */}
                <motion.div
                  className="rounded-2xl p-6 border"
                  style={{ background: `${project.glowColor}08`, borderColor: `${project.glowColor}20` }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🧠</span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">The Approach</h3>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{project.approach}</p>
                </motion.div>

                {/* Tools */}
                <motion.div
                  className="rounded-2xl p-6 border"
                  style={{ background: `${project.glowColor}08`, borderColor: `${project.glowColor}20` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🛠️</span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Tools Used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <motion.span
                        key={tool}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{
                          background: `${project.glowColor}18`,
                          color: project.glowColor,
                          border: `1px solid ${project.glowColor}35`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.04 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Results */}
                <motion.div
                  className="rounded-2xl p-6 border"
                  style={{ background: `${project.glowColor}08`, borderColor: `${project.glowColor}20` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">📈</span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Results</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {project.results.map((result, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.07 }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: project.glowColor, boxShadow: `0 0 6px ${project.glowColor}` }}
                        />
                        {result}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
