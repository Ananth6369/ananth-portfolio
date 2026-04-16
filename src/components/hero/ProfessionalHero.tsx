"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Rocket, Zap, Target, ShieldCheck } from "lucide-react";

const TITLES = [
  "QA Engineer",
  "Automation Architect",
  "Bug Hunter",
  "SDET in Progress"
];

const ORBIT_BADGES = [
  { icon: <Zap size={20} />, label: "Selenium", color: "#00FFD1", angle: 0 },
  { icon: <Target size={20} />, label: "Java", color: "#3B8BFF", angle: 72 },
  { icon: <ShieldCheck size={20} />, label: "TestNG", color: "#FFAA33", angle: 144 },
  { icon: <Rocket size={20} />, label: "Postman", color: "#a78bfa", angle: 216 },
  { icon: <Zap size={20} />, label: "JMeter", color: "#00FFD1", angle: 288 },
];

export default function ProfessionalHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-[#0A0A0F]">
      
      {/* Background Orbital Rings - Responsive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none opacity-20">
        <div className="relative w-[min(90vw,800px)] h-[min(90vw,800px)]">
           {/* Primary Rings */}
           <motion.div 
             className="absolute inset-0 rounded-full border border-white/10"
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           />
           <motion.div 
             className="absolute inset-[15%] rounded-full border border-white/5"
             animate={{ rotate: -360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           />
           
           {/* Floating Badges */}
           {ORBIT_BADGES.map((badge, i) => (
             <motion.div
               key={badge.label}
               className="absolute top-1/2 left-1/2"
               initial={false}
               animate={{
                 rotate: 360,
               }}
               transition={{ duration: 30 + i * 5, repeat: Infinity, ease: "linear" }}
               style={{ 
                 width: '40vw',
                 maxWidth: '400px',
                 transformOrigin: '0% 0%'
               }}
             >
                <div 
                  className="p-3 rounded-2xl glass-panel flex flex-col items-center gap-1 border-t transition-all hover:scale-110 pointer-events-auto"
                  style={{ 
                    borderColor: `${badge.color}44`,
                    transform: `translate(-50%, -50%) rotate(-${360}deg)` // Counter-rotate to stay upright
                  }}
                >
                  <div style={{ color: badge.color }} className="animate-pulse">{badge.icon}</div>
                  <span className="text-[10px] font-mono tracking-widest text-white/60">{badge.label}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-zinc-500 font-mono text-sm md:text-base tracking-[0.4em] uppercase mb-4">
            Mission Launch Sequence _
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            ANANTH A
          </h1>
          <div className="h-12 flex items-center justify-center mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={TITLES[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#3B8BFF] font-mono"
              >
                &gt; {TITLES[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4"
        >
          "I find what others miss. <span className="text-white font-medium">Selenium · Java · TestNG</span> · 1 year of real-world QA from Coimbatore."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button className="px-8 py-4 bg-[#00FFD1] text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,209,0.3)]">
            Explore Missions
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            Contact Base
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Initiating Launch Sequence</span>
        <ChevronDown size={20} />
      </motion.div>

    </section>
  );
}
