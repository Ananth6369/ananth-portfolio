"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineNode, { JourneyStage } from "./TimelineNode";

const journeyStages: JourneyStage[] = [
  {
    id: 1,
    year: "The Beginning",
    title: "Curiosity Sparked",
    subtitle: "Where it all began",
    description:
      "A deep-rooted curiosity about how digital products are built and why some just feel right while others don't. This initial spark drove a relentless desire to understand the full lifecycle of software — from concept to quality.",
    icon: "✨",
    color: "#a78bfa",
    glowColor: "#8b5cf6",
    skills: ["Problem Solving", "Critical Thinking", "Research"],
  },
  {
    id: 2,
    year: "Phase 02",
    title: "UI/UX Design",
    subtitle: "Designing with empathy",
    description:
      "Discovered the power of human-centered design. Learned to craft intuitive interfaces, create wireframes, and think from the user's perspective — building a foundation that would later inform every engineering decision.",
    icon: "🎨",
    color: "#f472b6",
    glowColor: "#ec4899",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Accessibility"],
  },
  {
    id: 3,
    year: "Phase 03",
    title: "Manual Testing",
    subtitle: "Finding the invisible cracks",
    description:
      "Stepped into QA and discovered the art of breaking things intentionally. Developed a sharp eye for edge cases, user flows, and defect patterns. Learned that quality isn't a phase — it's a mindset.",
    icon: "🔍",
    color: "#34d399",
    glowColor: "#10b981",
    skills: ["Test Cases", "Bug Reporting", "JIRA", "Exploratory Testing", "Regression"],
  },
  {
    id: 4,
    year: "Phase 04",
    title: "Automation Learning",
    subtitle: "Making testing scale",
    description:
      "Realized that great testing needs to scale with the product. Dove deep into automation frameworks, writing scripts that could run thousands of scenarios reliably — transforming repetitive manual work into intelligent, continuous validation.",
    icon: "⚙️",
    color: "#60a5fa",
    glowColor: "#3b82f6",
    skills: ["Selenium", "Python", "TestNG", "Playwright", "CI/CD Integration"],
  },
  {
    id: 5,
    year: "Phase 05",
    title: "System Thinking",
    subtitle: "Seeing the whole picture",
    description:
      "Evolved from testing features to understanding entire systems. Started thinking about architecture, data flows, interdependencies, and failure modes at a macro level — connecting the dots across engineering, product, and design.",
    icon: "🧠",
    color: "#fb923c",
    glowColor: "#f97316",
    skills: ["System Design", "Architecture Review", "API Testing", "Performance", "Monitoring"],
  },
  {
    id: 6,
    year: "Phase 06",
    title: "AI Testing Research",
    subtitle: "Engineering intelligence, testing it too",
    description:
      "Pioneered testing methodologies for AI and ML systems. Explored how to validate non-deterministic outputs, test model behavior under edge conditions, and build evaluation pipelines for LLM-powered products.",
    icon: "🤖",
    color: "#38bdf8",
    glowColor: "#0ea5e9",
    skills: ["LLM Testing", "Prompt Engineering", "AI Evaluation", "Python", "MLOps"],
  },
  {
    id: 7,
    year: "Now",
    title: "Full Stack Development",
    subtitle: "Building end-to-end solutions",
    description:
      "The culmination of the entire journey — combining design intuition, QA precision, automation mastery, and AI understanding to build complete, production-ready digital products. Creating with context that spans the full stack.",
    icon: "🚀",
    color: "#fbbf24",
    glowColor: "#f59e0b",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "DevOps", "Cloud"],
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Heading entrance animation driven by ScrollTrigger
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* Background atmospheric glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(139,92,246,0.12)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.3)",
            }}
          >
            The Story So Far
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            My{" "}
            <span
              className="text-glow-secondary"
              style={{ color: "#a78bfa" }}
            >
              Journey
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            From curiosity to craft — a continuous evolution driven by a passion
            for building, testing, and understanding complex systems.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Animated vertical center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                scaleY: lineScaleY,
                background:
                  "linear-gradient(to bottom, #8b5cf6, #3b82f6, #0ea5e9, #f59e0b)",
                boxShadow: "0 0 12px rgba(139,92,246,0.6)",
              }}
            />
          </div>

          {/* Nodes */}
          <div className="relative flex flex-col gap-20 py-10">
            {journeyStages.map((stage, index) => (
              <TimelineNode
                key={stage.id}
                stage={stage}
                index={index}
                isLast={index === journeyStages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-500 text-sm tracking-wide">
            And the journey continues — one commit at a time. 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
