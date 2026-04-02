"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categoryColor: string;
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
    id: "ai-test-prioritization",
    title: "AI Test Case Prioritization",
    tagline: "ML-powered intelligent test selection",
    category: "AI / QA",
    categoryColor: "#22d3ee",
    icon: "🤖",
    tags: ["Python", "ML", "OpenAI", "Automation"],
    problem: "Thousands of test cases, limited CI/CD time — which tests matter most before a release? Running all tests was slow; skipping them was risky.",
    approach: "Built a machine learning model trained on historical defect data, test coverage, and code change patterns to rank and select the highest-risk test cases per deployment.",
    tools: ["Python", "Scikit-learn", "OpenAI API", "GitHub Actions", "Pandas", "Pytest"],
    results: [
      "Reduced regression suite runtime by 62%",
      "Detected 94% of critical defects with top-30% of tests",
      "Integrated into CI pipeline with zero manual steps",
    ],
    gradient: "linear-gradient(135deg, #0d1117 0%, #0c1a2e 100%)",
    glowColor: "#22d3ee",
  },
  {
    id: "cococraft-testing",
    title: "CocoCraft Testing",
    tagline: "End-to-end QA for an e-commerce platform",
    category: "E-Commerce / QA",
    categoryColor: "#a78bfa",
    icon: "🛒",
    tags: ["Selenium", "TestNG", "JIRA", "BDD"],
    problem: "CocoCraft's web platform had complex checkout flows, dynamic pricing, and multi-currency support — all requiring thorough validation before each release.",
    approach: "Designed a modular test framework using Selenium WebDriver with a Page Object Model, BDD specs via Cucumber, and a data-driven approach for multi-scenario checkout coverage.",
    tools: ["Selenium WebDriver", "Java", "TestNG", "Cucumber", "JIRA", "Maven"],
    results: [
      "Achieved 87% automation coverage across checkout flows",
      "Cut release cycle testing time from 3 days to 6 hours",
      "Zero critical payment defects in production post-launch",
    ],
    gradient: "linear-gradient(135deg, #0d0d1e 0%, #150d2e 100%)",
    glowColor: "#a78bfa",
  },
  {
    id: "admin-panel-automation",
    title: "Admin Panel Automation",
    tagline: "Full regression suite for internal SaaS dashboard",
    category: "Automation",
    categoryColor: "#818cf8",
    icon: "⚙️",
    tags: ["Playwright", "TypeScript", "CI/CD", "Allure"],
    problem: "A large SaaS admin panel with 200+ features and frequent deployments had no automated regression coverage, leading to frequent production regressions.",
    approach: "Built a Playwright-based test suite in TypeScript, structured around feature modules. Integrated Allure reports and parallelized execution across Chrome, Firefox, and Safari.",
    tools: ["Playwright", "TypeScript", "Allure Report", "GitHub Actions", "Docker"],
    results: [
      "Created 400+ automated test cases covering all critical user flows",
      "Reduced regression time from 2 days to under 1 hour",
      "Achieved cross-browser coverage across 3 major browsers",
    ],
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #0f1228 100%)",
    glowColor: "#818cf8",
  },
  {
    id: "banner-validation",
    title: "Banner Validation System",
    tagline: "Automated visual regression for campaign banners",
    category: "Visual Testing",
    categoryColor: "#f472b6",
    icon: "🖼️",
    tags: ["Playwright", "Percy", "Node.js", "Chromatic"],
    problem: "Marketing campaign banners needed pixel-perfect validation across 30+ device sizes and 12 locales. Manual checking was error-prone and took days.",
    approach: "Built a visual regression pipeline using Playwright + Percy to capture and diff banners at defined breakpoints. Automated locale-specific content injection and screenshot comparison.",
    tools: ["Playwright", "Percy", "Node.js", "Chromatic", "GitHub Actions"],
    results: [
      "Reduced banner QA turnaround from 3 days to 2 hours",
      "Caught 47 visual regressions in first 3 weeks of deployment",
      "Supported 30+ device viewports and 12 locale variants",
    ],
    gradient: "linear-gradient(135deg, #170010 0%, #2a0020 100%)",
    glowColor: "#f472b6",
  },
  {
    id: "jmeter-performance",
    title: "JMeter Performance Testing",
    tagline: "Load & stress testing for high-traffic APIs",
    category: "Performance",
    categoryColor: "#fb7185",
    icon: "⚡",
    tags: ["JMeter", "Grafana", "InfluxDB", "k6"],
    problem: "A public-facing API serving 500K+ daily users had no performance baseline. The engineering team had no visibility into throughput limits, error rates under load, or slow endpoints.",
    approach: "Designed JMeter test plans simulating real-world traffic patterns. Set up a real-time Grafana dashboard backed by InfluxDB, and automated load tests within the CI pipeline.",
    tools: ["Apache JMeter", "Grafana", "InfluxDB", "k6", "Jenkins", "AWS EC2"],
    results: [
      "Identified 3 critical bottlenecks causing 8s+ response times at 500 VUs",
      "Improved P95 response time by 72% after optimizations",
      "Established SLA baselines for 1K, 5K, and 10K concurrent users",
    ],
    gradient: "linear-gradient(135deg, #1a0505 0%, #2a0808 100%)",
    glowColor: "#fb7185",
  },
  {
    id: "erp-system-design",
    title: "ERP System Design",
    tagline: "UX architecture for enterprise resource planning",
    category: "UX / Design",
    categoryColor: "#34d399",
    icon: "🏗️",
    tags: ["Figma", "UX Research", "System Design", "Wireframing"],
    problem: "A manufacturing company's legacy ERP was causing 40% of users to make data entry errors due to poor UX. Navigation was complex and workflows were non-intuitive.",
    approach: "Conducted stakeholder interviews and usability audits. Redesigned the IA and navigation with role-based dashboards. Created a full Figma design system covering 60+ components.",
    tools: ["Figma", "FigJam", "Storybook", "Hotjar", "Maze", "Notion"],
    results: [
      "Reduced average task completion time by 38%",
      "Data entry errors dropped by 51% in pilot testing",
      "Delivered 60+ component design system used by 4 dev teams",
    ],
    gradient: "linear-gradient(135deg, #021a10 0%, #052e1a 100%)",
    glowColor: "#34d399",
  },
  {
    id: "crm-documentation",
    title: "CRM Documentation Suite",
    tagline: "Comprehensive technical documentation for CRM platform",
    category: "Documentation",
    categoryColor: "#fbbf24",
    icon: "📚",
    tags: ["Confluence", "Notion", "API Docs", "Swagger"],
    problem: "A custom CRM platform had zero developer documentation. Onboarding new engineers took 3+ weeks, and support tickets were flooded with queries that docs could have answered.",
    approach: "Audited all features, interviewed developers and support teams, then built a structured documentation suite including API references, usage guides, onboarding flows, and a changelog system.",
    tools: ["Confluence", "Swagger/OpenAPI", "Notion", "Markdown", "DrawIO"],
    results: [
      "Reduced developer onboarding time from 3 weeks to 4 days",
      "Support ticket volume dropped by 43% within 2 months",
      "Created 120+ documentation pages covering all platform features",
    ],
    gradient: "linear-gradient(135deg, #1a1200 0%, #2e1f00 100%)",
    glowColor: "#fbbf24",
  },
  {
    id: "nfc-app-concept",
    title: "NFC App Concept",
    tagline: "Tap-to-connect digital identity experience",
    category: "Innovation",
    categoryColor: "#f97316",
    icon: "📱",
    tags: ["NFC", "React Native", "UX", "Prototype"],
    problem: "Physical business cards are wasteful and outdated. Existing digital alternatives like QR codes create friction. A designer envisioned a seamless tap-to-connect experience.",
    approach: "Designed and prototyped a React Native app concept leveraging NFC tags. Users tap their phone on a card to instantly receive a contact digital profile with portfolio, socials, and a call-to-action.",
    tools: ["React Native", "Figma", "NFC APIs", "Firebase", "Expo"],
    results: [
      "Designed 28-screen interactive prototype in Figma",
      "Built working NFC proof-of-concept with React Native + Expo",
      "Concept validated with 15 users — 93% preferred over QR codes",
    ],
    gradient: "linear-gradient(135deg, #1a0800 0%, #2e1200 100%)",
    glowColor: "#f97316",
  },
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
