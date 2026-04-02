"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    id: "req",
    title: "Requirement",
    icon: "📋",
    color: "#6366f1",
    glowColor: "#818cf8",
    explanation: "Deeply understanding the business logic, user needs, and acceptance criteria before writing a single line of test code.",
  },
  {
    id: "analysis",
    title: "System Analysis",
    icon: "🔍",
    color: "#8b5cf6",
    glowColor: "#a78bfa",
    explanation: "Breaking down the architecture to identify integration points, data flows, and potential failure zones.",
  },
  {
    id: "edge",
    title: "Edge Cases",
    icon: "⚡",
    color: "#ec4899",
    glowColor: "#f472b6",
    explanation: "Exploring boundries, constraints, negative paths, and security vulnerabilities that standard usage patterns miss.",
  },
  {
    id: "design",
    title: "Test Design",
    icon: "🏗️",
    color: "#f43f5e",
    glowColor: "#fb7185",
    explanation: "Structuring scalable test scenarios. Using BDD/TDD principles to maximize coverage with minimal redundancy.",
  },
  {
    id: "automation",
    title: "Automation",
    icon: "🤖",
    color: "#0ea5e9",
    glowColor: "#38bdf8",
    explanation: "Building robust, self-healing automation frameworks for UI, API, and Performance testing to ensure fast feedback loops.",
  },
  {
    id: "execution",
    title: "Execution",
    icon: "🚀",
    color: "#10b981",
    glowColor: "#34d399",
    explanation: "Integrating tests into CI/CD pipelines (Jenkins, GitHub Actions) for continuous, parallel, and reliable regression validation.",
  },
  {
    id: "reporting",
    title: "Reporting",
    icon: "📊",
    color: "#f59e0b",
    glowColor: "#fbbf24",
    explanation: "Generating actionable insights via Allure, Grafana, or dedicated dashboards. Translating test results into quality confidence.",
  },
];

export default function MindsetEngine() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1,
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

  return (
    <section
      ref={sectionRef}
      id="mindset"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, #10b981, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div ref={headingRef} className="text-center mb-20">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(16,185,129,0.1)",
              color: "#34d399",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Engineering Quality
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Testing Mindset{" "}
            <span style={{ color: "#34d399", textShadow: "0 0 30px #10b98188" }}>
              Engine
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            A systematic pipeline transforming raw requirement chaos into stable, production-ready deliverables.
          </p>
        </div>

        {/* Engine Pipeline */}
        <div className="relative mt-10">
          
          {/* Central connecting line for desktop */}
          <div className="hidden md:block absolute top-[60px] left-[5%] right-[5%] h-1 bg-white/5 rounded-full" />
          
          <div className="hidden md:block absolute top-[60px] left-[5%] right-[5%] h-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full w-full bg-gradient-to-r from-[#6366f1] via-[#ec4899] to-[#fbbf24]"
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-2 relative z-10">
            {steps.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={step.id} className="relative flex flex-col items-center group w-full md:w-32">
                  
                  {/* Vertical connecting line for mobile */}
                  {index !== 0 && (
                    <div className="md:hidden absolute -top-6 h-6 w-1 rounded-full overflow-hidden bg-white/5">
                      <motion.div 
                        className="h-full w-full"
                        style={{ background: step.color }}
                        initial={{ y: "-100%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      />
                    </div>
                  )}

                  <motion.button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}22, ${step.color}05)`,
                      border: `2px solid ${isActive ? step.glowColor : `${step.color}44`}`,
                      boxShadow: isActive ? `0 0 30px ${step.color}66` : `0 0 10px ${step.color}11`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, borderColor: step.glowColor }}
                  >
                    <span className="text-3xl md:text-4xl mb-2">{step.icon}</span>
                    <span 
                      className="text-[10px] uppercase font-bold tracking-wider"
                      style={{ color: isActive ? step.glowColor : step.color }}
                    >
                      {step.title}
                    </span>

                    {/* Animated data particle traveling to next node */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-20"
                        style={{ background: step.glowColor, boxShadow: `0 0 10px ${step.glowColor}` }}
                        initial={{ left: "100%", opacity: 0 }}
                        animate={{ left: ["100%", "200%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
                      />
                    )}
                  </motion.button>

                  {/* Panel connecting arrow / line for explanation */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="mt-4 md:mt-6 w-full max-w-sm md:max-w-none md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 md:w-64 z-30"
                      >
                        <div 
                          className="p-4 rounded-xl backdrop-blur-md"
                          style={{
                            background: `${step.color}11`,
                            border: `1px solid ${step.color}44`,
                            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                          }}
                        >
                          <div className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-t border-l" style={{ background: `${step.color}11`, borderColor: `${step.color}44` }} />
                          <h4 className="font-bold text-white mb-2" style={{ color: step.glowColor }}>{step.title}</h4>
                          <p className="text-sm text-zinc-300 leading-relaxed">{step.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
