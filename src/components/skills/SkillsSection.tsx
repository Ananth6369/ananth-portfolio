"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories, SkillNode, DetailPanel, getEdges } from "./SkillNodes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fixed canvas size (we use % positioning inside it)
const CANVAS_W = 700;
const CANVAS_H = 500;

export default function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedCategory = skillCategories.find((c) => c.id === selectedId) ?? null;
  const edges = getEdges(skillCategories, CANVAS_W, CANVAS_H);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
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

      gsap.from(canvasRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* Atmospheric glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(99,102,241,0.12)",
              color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tech Ecosystem
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Skills{" "}
            <span style={{ color: "#818cf8", textShadow: "0 0 30px #6366f188" }}>
              Universe
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            An interconnected ecosystem of tools, frameworks, and disciplines —
            click any node to explore the skills within.
          </p>
        </div>

        {/* Network canvas + detail panel */}
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: CANVAS_W }}>
            {/* Canvas container */}
            <div
              ref={canvasRef}
              className="relative rounded-3xl overflow-hidden border border-white/5"
              style={{
                height: CANVAS_H,
                background: "radial-gradient(ellipse at 50% 50%, #0d0d1a, #030305)",
                boxShadow: "0 0 80px rgba(99,102,241,0.08) inset",
              }}
            >
              {/* SVG connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {skillCategories.map((cat) => (
                    <filter key={cat.id} id={`glow-${cat.id}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  ))}
                </defs>
                {edges.map((edge) => {
                  const catA = skillCategories.find((c) =>
                    edge.id.startsWith(c.id)
                  );
                  const isHighlighted =
                    selectedId &&
                    (edge.id.includes(selectedId));
                  return (
                    <motion.line
                      key={edge.id}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke={isHighlighted ? catA?.glowColor ?? "#6366f1" : "#6366f122"}
                      strokeWidth={isHighlighted ? 1.5 : 0.8}
                      strokeDasharray="4 6"
                      animate={{
                        strokeDashoffset: [0, -20],
                        opacity: isHighlighted ? 0.9 : 0.3,
                      }}
                      transition={{
                        strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.3 },
                      }}
                    />
                  );
                })}
              </svg>

              {/* Skill nodes */}
              {skillCategories.map((cat) => (
                <SkillNode
                  key={cat.id}
                  category={cat}
                  isSelected={selectedId === cat.id}
                  isAnySelected={!!selectedId}
                  onClick={handleSelect}
                  containerW={CANVAS_W}
                  containerH={CANVAS_H}
                />
              ))}

              {/* Hint text */}
              {!selectedId && (
                <motion.p
                  className="absolute bottom-4 left-0 right-0 text-center text-zinc-600 text-xs tracking-wider"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Click any node to explore
                </motion.p>
              )}
            </div>

            {/* Detail panel — overlays on the right on desktop, bottom on mobile */}
            {selectedCategory && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto h-full">
                  <DetailPanel
                    category={selectedCategory}
                    onClose={() => setSelectedId(null)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category legend pills below canvas */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background:
                  selectedId === cat.id ? `${cat.color}33` : "rgba(255,255,255,0.04)",
                border: `1px solid ${selectedId === cat.id ? cat.glowColor : "rgba(255,255,255,0.08)"}`,
                color: selectedId === cat.id ? cat.glowColor : "#71717a",
                boxShadow:
                  selectedId === cat.id ? `0 0 16px ${cat.color}44` : "none",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
