"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PODS = [
  {
    id: "scenario",
    title: "Scenario-Based Testing Mindset",
    icon: "🧠",
    color: "#00FFD1",
    description: "Designs test cases reflecting real user behaviour and business logic — not just spec coverage."
  },
  {
    id: "layer",
    title: "Full-Layer Coverage",
    icon: "🛡️",
    color: "#3B8BFF",
    description: "Tests across UI, API, and backend layers with consistent quality — nothing slips through."
  },
  {
    id: "driven",
    title: "Self-Driven Builder",
    icon: "⚙️",
    color: "#FFAA33",
    description: "Built two public Selenium automation frameworks while working full-time — zero shortcuts."
  },
  {
    id: "defect",
    title: "Structured Defect Reporting",
    icon: "📊",
    color: "#a78bfa",
    description: "Clear, reproducible bug reports with severity classification, steps, and visual evidence."
  },
  {
    id: "collab",
    title: "Dev-Collaboration Ready",
    icon: "🤝",
    color: "#fb7185",
    description: "Comfortable with DevTools, log analysis, and working closely with development teams."
  }
];

export default function MindsetEngine() {
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
      id="strengths"
      className="relative bg-[#0A0A0F] py-32 px-4 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, #00FFD1, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div ref={headingRef} className="text-center mb-24">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.4em] font-black mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,255,209,0.1)",
              color: "#00FFD1",
              border: "1px solid rgba(0,255,209,0.2)",
            }}
          >
            Core Systems
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 leading-tight uppercase">
            Key{" "}
            <span className="text-[#00FFD1] text-glow-primary">
              Strengths
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed font-light">
            The core operating system that drives my passion for finding what others miss.
          </p>
        </div>

        {/* Pods Grid */}
        <div className="flex flex-wrap justify-center gap-8">
           {PODS.map((pod, i) => (
             <motion.div
               key={pod.id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className="w-full md:w-[320px]"
             >
               <div className="relative group p-8 glass-panel rounded-[2rem] border-t-2 transition-all hover:translate-y-[-8px]"
                    style={{ borderTopColor: pod.color }}>
                 
                 {/* Internal glow icon */}
                 <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl">{pod.icon}</span>
                 </div>
                 
                 <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight leading-tight">
                    {pod.title}
                 </h3>
                 <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {pod.description}
                 </p>

                 {/* Pulse indicator */}
                 <div className="absolute top-6 right-6 w-2 h-2 rounded-full animate-pulse" 
                      style={{ background: pod.color, boxShadow: `0 0 10px ${pod.color}` }} />
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

