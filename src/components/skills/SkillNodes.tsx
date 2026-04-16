"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Skill {
  name: string;
  level: number; // 0-100
  tools: string[];
  description: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  glowColor: string;
  x: number; // % of container width
  y: number; // % of container height
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "web-automation",
    label: "Web Automation",
    icon: "🌐",
    color: "#00FFD1",
    glowColor: "#00FFD1",
    x: 50,
    y: 18,
    skills: [
      { name: "Selenium WebDriver", level: 95, tools: ["POM", "Grid", "Wait Hooks"], description: "Architecting modular, cross-browser automation suites." },
      { name: "Playwright", level: 82, tools: ["Trace Viewer", "TypeScript"], description: "Fast, modern web testing with native parallelization." },
      { name: "Cypress", level: 75, tools: ["JavaScript", "Mocha"], description: "Front-end focused E2E testing with real-time reload." },
    ],
  },
  {
    id: "api-testing",
    label: "API Testing",
    icon: "🔌",
    color: "#3B8BFF",
    glowColor: "#3B8BFF",
    x: 82,
    y: 35,
    skills: [
      { name: "Postman", level: 92, tools: ["Collection Runner", "Newman"], description: "Manual and automated validation of RESTful endpoints." },
      { name: "REST Assured", level: 88, tools: ["Java", "JSON Path"], description: "Fluent API automation for backend verification." },
      { name: "Swagger", level: 85, tools: ["OpenAPI", "Docs Retrieval"], description: "Contract testing and technical documentation audit." },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    color: "#FFAA33",
    glowColor: "#FFAA33",
    x: 82,
    y: 68,
    skills: [
      { name: "Java (Core)", level: 90, tools: ["OOPs", "Collections", "Multithreading"], description: "Robust backend logic for automation framework core." },
      { name: "JavaScript", level: 80, tools: ["ES6+", "Async/Await"], description: "Scripting for modern automation tools and web logic." },
      { name: "Python", level: 78, tools: ["Pytest", "Data Processing"], description: "Versatile scripting for utility tools and AI evaluation." },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    icon: "🧱",
    color: "#a78bfa",
    glowColor: "#a78bfa",
    x: 50,
    y: 85,
    skills: [
      { name: "TestNG", level: 95, tools: ["Annotations", "Data Providers"], description: "Comprehensive test execution and reporting engine." },
      { name: "Cucumber (BDD)", level: 88, tools: ["Gherkin", "Step Defs"], description: "Behavior-driven development for stakeholder transparency." },
      { name: "JUnit", level: 82, tools: ["Assertions", "Rules"], description: "Unit level validation and legacy test support." },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    icon: "⚡",
    color: "#fb7185",
    glowColor: "#fb7185",
    x: 18,
    y: 68,
    skills: [
      { name: "JMeter", level: 85, tools: ["Thread Groups", "Listeners"], description: "Load and stress testing for critical system endpoints." },
      { name: "LoadRunner", level: 78, tools: ["Vugen", "Controller"], description: "Enterprise-grade performance and scalability validation." },
      { name: "k6", level: 72, tools: ["JavaScript", "Cloud Metrics"], description: "Modern, developer-centric performance benchmarking." },
    ],
  },
  {
    id: "version-control",
    label: "Version Control",
    icon: "🌿",
    color: "#34d399",
    glowColor: "#34d399",
    x: 18,
    y: 35,
    skills: [
      { name: "Git", level: 92, tools: ["Branching", "Rebasing", "Merging"], description: "Robust source code management and collaborative flow." },
      { name: "GitHub", level: 90, tools: ["Actions", "PR Reviews"], description: "Centralized code hosting and automation integration." },
      { name: "Bitbucket", level: 82, tools: ["Pipelines", "Jira Sync"], description: "Enterprise-level code management and tool integration." },
    ],
  },
  {
    id: "cicd",
    label: "CI / CD",
    icon: "🔁",
    color: "#fbbf24",
    glowColor: "#fbbf24",
    x: 50,
    y: 50,
    skills: [
      { name: "Jenkins", level: 88, tools: ["Pipelines", "Groovy", "Plugins"], description: "Automated build and test triggers for continuous quality." },
      { name: "GitLab CI", level: 82, tools: ["YAML Config", "Shared Runners"], description: "Integrated DevOps workflows for efficient deployments." },
      { name: "Azure DevOps", level: 78, tools: ["Artifacts", "Releases"], description: "Cloud-based lifecycle management and tool collaboration." },
    ],
  },
  {
    id: "mobile-testing",
    label: "Mobile Testing",
    icon: "📱",
    color: "#0ea5e9",
    glowColor: "#0ea5e9",
    x: 20,
    y: 10,
    skills: [
       { name: "Appium", level: 85, tools: ["Android", "iOS", "Inspectors"], description: "Cross-platform mobile automation for native and hybrid apps." },
       { name: "BrowserStack", level: 90, tools: ["Parallel Clouds", "Live"], description: "Extensive cloud-based device and browser validation." },
       { name: "Espresso", level: 72, tools: ["Kotlin", "Unit Integration"], description: "Android-native UI testing with deep synchronization." },
    ]
  }
];

// Compute SVG connection edges between nearby categories
export function getEdges(categories: SkillCategory[], containerW: number, containerH: number) {
  const edges: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = i + 1; j < categories.length; j++) {
      const a = categories[i];
      const b = categories[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 45) {
        edges.push({
          x1: (a.x / 100) * containerW,
          y1: (a.y / 100) * containerH,
          x2: (b.x / 100) * containerW,
          y2: (b.y / 100) * containerH,
          id: `${a.id}-${b.id}`,
        });
      }
    }
  }
  return edges;
}

interface SkillNodeProps {
  category: SkillCategory;
  isSelected: boolean;
  isAnySelected: boolean;
  onClick: (id: string) => void;
  containerW: number;
  containerH: number;
}

export function SkillNode({ category, isSelected, isAnySelected, onClick, containerW, containerH }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const px = (category.x / 100) * containerW;
  const py = (category.y / 100) * containerH;
  const active = hovered || isSelected;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
      style={{ left: px, top: py, zIndex: isSelected ? 20 : 10 }}
      animate={{
        scale: isSelected ? 1.15 : hovered ? 1.1 : 1,
        opacity: isAnySelected && !isSelected ? 0.35 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={() => onClick(category.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Outer glow ring pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: category.glowColor }}
        animate={{ scale: active ? [1, 1.6, 1] : 1, opacity: active ? [0.3, 0, 0.3] : 0 }}
        transition={{ duration: 2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      />

      {/* Node body */}
      <motion.div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border-2 backdrop-blur-md transition-shadow"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${category.color}55, ${category.color}18)`,
          borderColor: active ? category.glowColor : `${category.color}55`,
          boxShadow: active
            ? `0 0 24px ${category.glowColor}88, 0 0 48px ${category.glowColor}33`
            : `0 0 8px ${category.color}22`,
        }}
      >
        <span className="text-xl md:text-2xl">{category.icon}</span>
        <span
          className="text-[9px] md:text-[11px] font-bold tracking-wider uppercase mt-0.5"
          style={{ color: category.glowColor }}
        >
          {category.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

interface DetailPanelProps {
  category: SkillCategory;
  onClose: () => void;
}

export function DetailPanel({ category, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={category.id}
        className="absolute inset-x-4 md:inset-x-auto md:right-6 md:w-80 top-4 bottom-4 z-30 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,18,0.92)",
          border: `1px solid ${category.color}44`,
          boxShadow: `0 0 40px ${category.color}22`,
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, x: 40, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 40, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: `${category.color}22` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{category.label}</h3>
              <p className="text-xs text-zinc-400">{category.skills.length} core skills</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Skills list */}
        <div className="overflow-y-auto h-full pb-20 px-5 py-4 space-y-4">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="rounded-xl p-4"
              style={{
                background: `${category.color}0d`,
                border: `1px solid ${category.color}22`,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">{skill.name}</span>
                <span className="text-xs font-bold" style={{ color: category.glowColor }}>
                  {skill.level}%
                </span>
              </div>

              {/* Level bar */}
              <div className="h-1.5 rounded-full bg-white/5 mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${category.color}, ${category.glowColor})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                />
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-3">{skill.description}</p>

              {/* Tool chips */}
              <div className="flex flex-wrap gap-1.5">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${category.color}18`,
                      color: category.glowColor,
                      border: `1px solid ${category.color}30`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
