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
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedCategory = skillCategories.find((c) => c.id === selectedId) ?? null;
  const edges = getEdges(skillCategories, CANVAS_W, CANVAS_H);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

      if (!isMobile) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#0A0A0F] py-32 px-4 overflow-hidden"
    >
      {/* Space glow atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(ellipse, #00FFD1, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.4em] font-black mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,255,209,0.1)",
              color: "#00FFD1",
              border: "1px solid rgba(0,255,209,0.2)",
            }}
          >
            Tech Ecosystem
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 leading-tight uppercase tracking-tight">
            Skills{" "}
            <span className="text-[#00FFD1] text-glow-primary">
              Universe
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-light">
            An interconnected ecosystem of tools, frameworks, and disciplines —
            {isMobile ? " explore the vertical payload stack below." : " click any node to explore the skills within."}
          </p>
        </div>

        {isMobile ? (
          /* Mobile: Vertical Payload Stack */
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full"
                onClick={() => handleSelect(cat.id)}
              >
                <div 
                  className="p-6 glass-panel rounded-2xl border-l-4 transition-all"
                  style={{ borderLeftColor: cat.color }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cat.icon}</span>
                      <h3 className="text-white font-bold text-lg uppercase tracking-tight">{cat.label}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedId === cat.id ? 180 : 0 }}
                      className="text-[#00FFD1]"
                    >
                      ▼
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {selectedId === cat.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-2">
                           {cat.skills.map((skill) => (
                             <div key={skill.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
                               <div className="flex justify-between items-center mb-2">
                                 <span className="text-white font-bold text-sm">{skill.name}</span>
                                 <span className="text-[10px] font-mono font-black" style={{ color: cat.color }}>{skill.tools[0]}</span>
                               </div>
                               <p className="text-zinc-400 text-xs font-light">{skill.description}</p>
                             </div>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop: Interactive Canvas Map */
          <div className="flex justify-center">
            <div className="relative w-full" style={{ maxWidth: CANVAS_W }}>
              <div
                ref={canvasRef}
                className="relative rounded-[3rem] overflow-hidden border border-white/5"
                style={{
                  height: CANVAS_H,
                  background: "radial-gradient(ellipse at 50% 50%, #0d0d1a, #0A0A0F)",
                  boxShadow: "0 0 80px rgba(0,255,209,0.05) inset",
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {edges.map((edge) => {
                    const catA = skillCategories.find((c) => edge.id.startsWith(c.id));
                    const isHighlighted = selectedId && edge.id.includes(selectedId);
                    return (
                      <motion.line
                        key={edge.id}
                        x1={edge.x1}
                        y1={edge.y1}
                        x2={edge.x2}
                        y2={edge.y2}
                        stroke={isHighlighted ? catA?.glowColor ?? "#00FFD1" : "#ffffff11"}
                        strokeWidth={isHighlighted ? 1.5 : 0.5}
                        strokeDasharray={isHighlighted ? "none" : "4 6"}
                        animate={{ opacity: isHighlighted ? 1 : 0.3 }}
                      />
                    );
                  })}
                </svg>

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

                {!selectedId && (
                  <motion.p
                    className="absolute bottom-6 left-0 right-0 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Select Payload to Scan
                  </motion.p>
                )}
              </div>

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
        )}

        {!isMobile && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                style={{
                  background: selectedId === cat.id ? `${cat.color}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedId === cat.id ? cat.glowColor : "rgba(255,255,255,0.05)"}`,
                  color: selectedId === cat.id ? cat.glowColor : "#52525b",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

