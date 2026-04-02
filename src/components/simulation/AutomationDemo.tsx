"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SCRIPT_LINES = [
  "import { test, expect } from '@playwright/test';",
  "",
  "test('User can complete checkout', async ({ page }) => {",
  "  await page.goto('https://cococraft.shop');",
  "  await page.click('[data-testid=\"add-to-cart\"]');",
  "  await page.click('#checkout-btn');",
  "  await page.fill('#email', 'tester@example.com');",
  "  await page.click('#submit-order');",
  "  await expect(page.locator('.success-msg')).toBeVisible();",
  "});"
];

type Phase = "idle" | "scripting" | "executing" | "results";

export default function AutomationDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Restart animation loop
  const startSimulation = () => {
    setPhase("scripting");
    setTypedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  };

  // Typing effect logic
  useEffect(() => {
    if (phase !== "scripting") return;

    if (currentLineIndex < SCRIPT_LINES.length) {
      if (currentCharIndex < SCRIPT_LINES[currentLineIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 20); // typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTypedLines((prev) => [...prev, SCRIPT_LINES[currentLineIndex]]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 100); // delay between lines
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(() => setPhase("executing"), 800);
    }
  }, [phase, currentLineIndex, currentCharIndex]);

  const currentDisplayLines = [...typedLines];
  if (phase === "scripting" && currentLineIndex < SCRIPT_LINES.length) {
    currentDisplayLines.push(SCRIPT_LINES[currentLineIndex].substring(0, currentCharIndex) + "█");
  } else if (phase !== "idle") {
    currentDisplayLines.push(...SCRIPT_LINES.slice(currentLineIndex));
  }

  // Executing to Results transition
  useEffect(() => {
    if (phase === "executing") {
      setTimeout(() => setPhase("results"), 3500);
    }
  }, [phase]);

  // Scroll Entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#030305] py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(139,92,246,0.1)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Live Simulation
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
            Automation <span style={{ color: "#a78bfa", textShadow: "0 0 30px #8b5cf688" }}>In Action</span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto">
            Experience the flow of a modern UI automation pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Flow Diagram & Code Editor */}
          <div className="flex flex-col gap-6">
            
            {/* Status Flow Tracker */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
              
              <StatusNode label="Script" active={phase !== "idle"} pulse={phase === "scripting"} color="#a78bfa" />
              <StatusLine active={phase === "executing" || phase === "results"} />
              <StatusNode label="Execute" active={phase === "executing" || phase === "results"} pulse={phase === "executing"} color="#34d399" />
              <StatusLine active={phase === "results"} />
              <StatusNode label="Result" active={phase === "results"} pulse={phase === "results"} color="#fbbf24" />
              
              {phase === "idle" && (
                <button 
                  onClick={startSimulation}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm font-bold text-[#a78bfa] hover:text-white transition-colors"
                >
                  ▶ START DEMO
                </button>
              )}
            </div>

            {/* Code Editor */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.15)] h-64 flex flex-col">
              <div className="bg-[#1a1a2e] px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-zinc-500 ml-2 font-mono">checkout.spec.ts</span>
              </div>
              <div className="p-4 font-mono text-sm overflow-hidden text-[#a8b2d1]">
                {currentDisplayLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-zinc-600 w-6 select-none">{i + 1}</span>
                    <span className="whitespace-pre">{line.replace("█", "")}</span>
                    {line.includes("█") && <span className="animate-pulse">█</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Browser & Console */}
          <div className="flex flex-col gap-6 relative">
            
            {/* The Browser */}
            <div className={`rounded-2xl overflow-hidden border transition-all duration-500 ${phase === "executing" ? "border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]" : "border-white/10"}`}>
              {/* Browser toolbar */}
              <div className="bg-zinc-900 border-b border-white/10 px-4 py-3 flex items-center gap-4">
                <div className="flex gap-4 text-zinc-500">
                  <span>←</span><span>→</span><span>↻</span>
                </div>
                <div className="flex-1 bg-black/50 rounded-full px-4 py-1 text-xs text-zinc-400 font-mono text-center border border-white/5">
                  https://cococraft.shop
                </div>
              </div>
              
              {/* Browser viewport simulation */}
              <div className="h-48 bg-zinc-950 relative overflow-hidden flex items-center justify-center p-6">
                {phase === "idle" || phase === "scripting" ? (
                  <div className="text-zinc-700 font-mono text-sm flex flex-col items-center gap-2">
                    <span className="text-4xl">🌐</span>
                    Waiting for execution...
                  </div>
                ) : phase === "executing" ? (
                  <BrowserExecutionFlow />
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                      <span className="text-2xl text-emerald-400">✓</span>
                    </div>
                    <span className="text-emerald-400 font-medium">Order Successful</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Execution Dashboard / Console */}
            <div className="rounded-2xl border border-white/10 bg-black overflow-hidden h-28 p-4 font-mono text-xs">
              <div className="text-zinc-500 mb-2">// Test Execution Reporter</div>
              <AnimatePresence>
                {phase === "executing" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="text-[#a78bfa] mb-1">▶ Running checkout.spec.ts (1 test)</div>
                    <div className="text-zinc-400 animate-pulse">Running on headless chromium...</div>
                  </motion.div>
                )}
                {phase === "results" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-emerald-400 mb-1">✓ User can complete checkout (1.2s)</div>
                    <div className="text-zinc-400 mt-2">
                      1 passed <span className="text-zinc-600">(1.2s)</span>
                    </div>
                    <button onClick={startSimulation} className="text-[#a78bfa] hover:text-white mt-2 block underline underline-offset-2">Re-run simulation</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// Mini components

function StatusNode({ label, active, pulse, color }: { label: string, active: boolean, pulse: boolean, color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 z-10">
      <motion.div 
        className="w-4 h-4 rounded-full border-2 transition-colors duration-300 relative"
        style={{ 
          borderColor: active ? color : "#3f3f46",
          background: active ? `${color}44` : "transparent"
        }}
      >
        {pulse && (
          <motion.div 
            className="absolute inset-[-4px] rounded-full"
            style={{ border: `1px solid ${color}` }}
            animate={{ scale: [1, 1.8], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400" style={{ color: active ? "white" : "" }}>
        {label}
      </span>
    </div>
  );
}

function StatusLine({ active }: { active: boolean }) {
  return (
    <div className="flex-1 h-[2px] bg-zinc-800 relative mx-2 z-0">
      <motion.div 
        className="absolute inset-y-0 left-0 bg-white"
        initial={{ width: "0%" }}
        animate={{ width: active ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

function BrowserExecutionFlow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 800),  // Add to cart
      setTimeout(() => setStep(2), 1600), // Go to checkout
      setTimeout(() => setStep(3), 2400), // Fill details
      setTimeout(() => setStep(4), 3100)  // Submit
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 max-w-xs mx-auto justify-center">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded bg-zinc-800 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-3/4 bg-zinc-800 rounded" />
          <div className="h-3 w-1/2 bg-zinc-800 rounded" />
          <motion.div 
            className="h-6 mt-auto rounded text-[10px] text-center leading-6 transition-colors"
            animate={{ 
              background: step >= 1 ? "#34d399" : "#27272a",
              color: step >= 1 ? "black" : "white" 
            }}
          >
            {step >= 1 ? "Added!" : "Add to Cart"}
          </motion.div>
        </div>
      </div>
      
      {step >= 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="border-t border-zinc-800 pt-3 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500">Email</span>
            <motion.div 
              className="flex-1 h-5 bg-zinc-800 rounded px-2 leading-5 text-[10px] text-white overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: step >= 3 ? "100%" : 0 }}
            >
              <span className="opacity-0 animate-[fade-in_0s_0.2s_forwards]">tester@</span>
              <span className="opacity-0 animate-[fade-in_0s_0.4s_forwards]">example.com</span>
            </motion.div>
          </div>
          <motion.button 
            className="w-full h-6 rounded bg-[#a78bfa] text-black font-bold text-[10px]"
            animate={{ scale: step >= 4 ? 0.95 : 1, opacity: step >= 4 ? 0.5 : 1 }}
          >
            Submit Order
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
