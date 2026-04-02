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
    id: "testing",
    label: "Testing",
    icon: "🛡️",
    color: "#6366f1",
    glowColor: "#818cf8",
    x: 50,
    y: 18,
    skills: [
      { name: "Manual Testing", level: 95, tools: ["JIRA", "TestRail", "Zephyr"], description: "Exploratory, regression, and UAT testing with a sharp eye for edge cases." },
      { name: "API Testing", level: 88, tools: ["Postman", "REST Assured", "Swagger"], description: "Validating REST & GraphQL APIs for correctness, performance, and security." },
      { name: "Mobile Testing", level: 78, tools: ["Appium", "BrowserStack", "XCTest"], description: "Cross-platform mobile testing across Android & iOS devices." },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    icon: "⚙️",
    color: "#8b5cf6",
    glowColor: "#a78bfa",
    x: 82,
    y: 35,
    skills: [
      { name: "Selenium", level: 92, tools: ["Java", "TestNG", "Maven", "Grid"], description: "End-to-end browser automation with robust Page Object Model architecture." },
      { name: "Playwright", level: 85, tools: ["TypeScript", "Node.js", "CI/CD"], description: "Modern web automation with parallel execution and visual testing." },
      { name: "Cypress", level: 80, tools: ["JavaScript", "Mocha", "GitHub Actions"], description: "Fast, reliable E2E testing for modern web applications." },
    ],
  },
  {
    id: "ai",
    label: "AI",
    icon: "🤖",
    color: "#06b6d4",
    glowColor: "#22d3ee",
    x: 82,
    y: 68,
    skills: [
      { name: "LLM Testing", level: 82, tools: ["OpenAI API", "LangChain", "Python"], description: "Designing evaluation pipelines and test suites for non-deterministic AI outputs." },
      { name: "Prompt Engineering", level: 78, tools: ["GPT-4", "Claude", "Llama"], description: "Crafting and optimizing prompts for reliable, context-aware AI responses." },
      { name: "AI Automation", level: 75, tools: ["Python", "HuggingFace", "Pandas"], description: "Building intelligent test data generators and AI-assisted QA workflows." },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "🔁",
    color: "#f59e0b",
    glowColor: "#fbbf24",
    x: 50,
    y: 85,
    skills: [
      { name: "CI/CD", level: 85, tools: ["Jenkins", "GitHub Actions", "GitLab CI"], description: "Designing automated pipelines from commit to production deployment." },
      { name: "Containerization", level: 75, tools: ["Docker", "Kubernetes", "Helm"], description: "Containerizing test environments for consistent, repeatable execution." },
      { name: "Cloud", level: 70, tools: ["AWS", "GCP", "Azure DevOps"], description: "Deploying and scaling applications and test infrastructure on cloud platforms." },
    ],
  },
  {
    id: "development",
    label: "Development",
    icon: "💻",
    color: "#10b981",
    glowColor: "#34d399",
    x: 18,
    y: 68,
    skills: [
      { name: "React / Next.js", level: 82, tools: ["TypeScript", "Tailwind", "Zustand"], description: "Building high-performance, accessible web applications with modern frameworks." },
      { name: "Python", level: 90, tools: ["FastAPI", "Django", "Pytest"], description: "Backend development, scripting, and automation engineering with Python." },
      { name: "Node.js", level: 75, tools: ["Express", "NestJS", "Socket.io"], description: "Server-side JavaScript development for APIs and real-time applications." },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    icon: "⚡",
    color: "#f43f5e",
    glowColor: "#fb7185",
    x: 18,
    y: 35,
    skills: [
      { name: "Load Testing", level: 85, tools: ["JMeter", "k6", "Gatling"], description: "Stress testing systems to find throughput limits and performance bottlenecks." },
      { name: "Profiling", level: 78, tools: ["Lighthouse", "WebPageTest", "DevTools"], description: "Analyzing frontend and backend performance metrics and optimization opportunities." },
      { name: "Monitoring", level: 72, tools: ["Grafana", "Prometheus", "Datadog"], description: "Setting up dashboards and alerts for real-time system health observability." },
    ],
  },
  {
    id: "ux",
    label: "UX",
    icon: "🎨",
    color: "#ec4899",
    glowColor: "#f472b6",
    x: 50,
    y: 50,
    skills: [
      { name: "UI Design", level: 80, tools: ["Figma", "Adobe XD", "Sketch"], description: "Designing pixel-perfect, accessible interfaces with strong visual hierarchy." },
      { name: "Prototyping", level: 78, tools: ["Figma", "InVision", "Framer"], description: "Creating interactive prototypes for user testing and stakeholder validation." },
      { name: "Design Systems", level: 82, tools: ["Storybook", "Tokens Studio", "Zeroheight"], description: "Building and maintaining component libraries and design tokens at scale." },
    ],
  },
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
