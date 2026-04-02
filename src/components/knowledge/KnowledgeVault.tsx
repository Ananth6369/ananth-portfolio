"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const vaultTopics = [
  {
    id: "qa",
    title: "QA Engineering",
    icon: "🛡️",
    color: "#6366f1",
    glowColor: "#818cf8",
    insights: [
      "Quality is built-in, not tested-in. Shift-left testing ensures fewer defects reach production.",
      "Effective manual testing focuses on exploratory heuristics rather than just following scripts.",
      "Accessibility and localization testing are critical non-functional areas often overlooked."
    ]
  },
  {
    id: "automation",
    title: "Test Automation",
    icon: "⚙️",
    color: "#8b5cf6",
    glowColor: "#a78bfa",
    insights: [
      "Avoid test flakiness by preferring strategic waits and unique element locators over hardcoded sleeps.",
      "The Page Object Model (POM) is essential for scalable UI automation, but App Actions can be faster for state setup.",
      "Visual regression testing catches UI regressions that standard DOM assertions miss."
    ]
  },
  {
    id: "devops",
    title: "DevOps & CI/CD",
    icon: "🔁",
    color: "#f59e0b",
    glowColor: "#fbbf24",
    insights: [
      "Continuous testing requires parallelization to keep pipelines fast and developers unblocked.",
      "Containerizing test environments with Docker ensures 'works on my machine' works everywhere.",
      "Quality gates in CI/CD should prevent merging logic that decreases test coverage below thresholds."
    ]
  },
  {
    id: "erp",
    title: "ERP Systems",
    icon: "🏭",
    color: "#10b981",
    glowColor: "#34d399",
    insights: [
      "ERP testing heavily depends on end-to-end integration testing across finance, HR, and supply chain modules.",
      "Data migration testing is the most high-risk phase of an ERP deployment.",
      "Role-Based Access Control (RBAC) validation is crucial for securing enterprise workflows."
    ]
  },
  {
    id: "crm",
    title: "CRM Platforms",
    icon: "🤝",
    color: "#ec4899",
    glowColor: "#f472b6",
    insights: [
      "Testing CRM workflows often involves complex state machines and multi-user interactions.",
      "API-first integration testing is preferred over UI testing when validating third-party CRM plugins.",
      "Audit logs and history tracking validate that data mutations are correctly logged."
    ]
  },
  {
    id: "ai-testing",
    title: "AI Testing",
    icon: "🤖",
    color: "#06b6d4",
    glowColor: "#22d3ee",
    insights: [
      "Validating LLMs requires human-in-the-loop evaluation and automated benchmarks like ROUGE/BLEU.",
      "Adversarial testing (prompt injection) is required to secure AI constraints.",
      "Non-deterministic systems need confidence intervals rather than boolean pass/fail assertions."
    ]
  },
  {
    id: "nfc",
    title: "NFC Technology",
    icon: "📱",
    color: "#f97316",
    glowColor: "#fb923c",
    insights: [
      "NDEF (NFC Data Exchange Format) standardization is crucial for cross-platform app compatibility.",
      "Security relies on incredibly short transmission ranges and secure elements.",
      "Hardware variability between Android and iOS requires extensive physical device lab testing."
    ]
  }
];

export default function KnowledgeVault() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
      id="vault"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* digital grid background effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(249,115,22,0.1)",
              color: "#fb923c",
              border: "1px solid rgba(249,115,22,0.25)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Insights & Lessons
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Knowledge{" "}
            <span style={{ color: "#fb923c", textShadow: "0 0 30px #f9731688" }}>
              Vault
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Distilled intelligence gathered across domains. Tap into the digital archives.
          </p>
        </div>

        {/* Vault Accordion */}
        <div className="space-y-4">
          {vaultTopics.map((topic, index) => {
            const isExpanded = expandedId === topic.id;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden transition-colors duration-300"
                style={{
                  background: isExpanded ? `${topic.color}0a` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isExpanded ? topic.glowColor + '55' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isExpanded ? `0 0 30px ${topic.color}11` : 'none',
                }}
              >
                {/* Vault Row Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left relative overflow-hidden group"
                >
                  <div className="flex items-center gap-5 z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ 
                        background: `${topic.color}15`,
                        border: `1px solid ${topic.color}33`,
                        boxShadow: isExpanded ? `0 0 15px ${topic.color}44` : 'none'
                      }}
                    >
                      {topic.icon}
                    </div>
                    <span 
                      className="text-lg md:text-xl font-bold tracking-wide transition-colors duration-300"
                      style={{ color: isExpanded ? topic.glowColor : '#e4e4e7' }}
                    >
                      {topic.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-white/30 transition-colors z-10">
                    <motion.span 
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-zinc-400 inline-block"
                    >
                      ▼
                    </motion.span>
                  </div>

                  {/* Vault digital scan line hover effect */}
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: topic.glowColor, boxShadow: `0 0 15px ${topic.glowColor}` }}
                    layoutId={`vault-scan-${topic.id}`}
                  />
                </button>

                {/* Vault Row Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="p-5 md:p-6 md:pl-24 pt-0 border-t border-white/5">
                        <ul className="space-y-4 pt-4">
                          {topic.insights.map((insight, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex gap-4"
                            >
                              <span 
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" 
                                style={{ background: topic.glowColor, boxShadow: `0 0 8px ${topic.glowColor}` }} 
                              />
                              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                {insight}
                              </p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
