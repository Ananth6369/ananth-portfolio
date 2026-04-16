"use client";

import { motion } from "framer-motion";
import { Code2, Network, Globe, MapPin, Briefcase } from "lucide-react";
import ZeroGCard from "../ui/ZeroGCard";

const METRICS = [
  { label: "Experience", value: "1 Year" },
  { label: "Public Frameworks", value: "2" },
  { label: "Testing Domains", value: "5+" },
  { label: "Automation Coverage", value: "87%+" }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-4 bg-transparent z-10 w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-12">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Identity <span className="text-[#3B8BFF] text-glow-secondary">& Payload</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#3B8BFF]/50 to-transparent" />
          </div>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em]">System Scan Incoming _</p>
        </motion.div>

        {/* Two-Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Panel: Identity Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[380px] shrink-0"
          >
            <ZeroGCard className="h-full p-8 flex flex-col items-center text-center">
              {/* Avatar Space */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#00FFD1]/50 p-1 relative z-10 bg-[#0A0A0F]">
                   <img 
                    src="/profile-headshot.png" 
                    alt="Ananth A" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                </div>
                {/* Orbital rings around avatar */}
                <motion.div 
                  className="absolute inset-[-15px] rounded-full border border-[#00FFD1]/20 border-t-[#00FFD1] pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <h3 className="text-3xl font-black text-white mb-1 tracking-tight">Ananth A</h3>
              <p className="text-[#00FFD1] font-mono text-sm mb-6 flex items-center justify-center gap-2">
                <Briefcase size={14} /> QA Engineer · Coimbatore
              </p>

              <div className="w-full flex-1 flex flex-col justify-end gap-5">
                <div className="flex items-center justify-between text-sm text-zinc-400 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2"><MapPin size={16} /> Base</span>
                  <span className="text-white">India 🇮🇳</span>
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-400 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFD1]"></span>
                     </span>
                     Status
                  </span>
                  <span className="text-white font-medium">Open to Work</span>
                </div>
                
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#00FFD1]/20 hover:text-[#00FFD1] transition-colors border border-white/10 text-zinc-400"><Code2 size={20} /></a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#3B8BFF]/20 hover:text-[#3B8BFF] transition-colors border border-white/10 text-zinc-400"><Network size={20} /></a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#FFAA33]/20 hover:text-[#FFAA33] transition-colors border border-white/10 text-zinc-400"><Globe size={20} /></a>
                </div>
              </div>
            </ZeroGCard>
          </motion.div>

          {/* Right Panel: Narrative & Logs */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center"
          >
            <ZeroGCard className="p-8 md:p-12 mb-8 border-l-4 border-l-[#00FFD1]">
              <h4 className="text-[#3B8BFF] font-mono text-xs uppercase tracking-widest mb-4">Transmission Incoming _</h4>
              <p className="text-zinc-300 text-lg leading-relaxed font-light">
                "I'm a QA Engineer with 1 year of hands-on experience building test frameworks that scale. My toolkit spans <strong className="text-white font-medium">Selenium WebDriver (Java)</strong>, <strong className="text-white font-medium">TestNG</strong>, <strong className="text-white font-medium">Postman REST APIs</strong>, and <strong className="text-white font-medium">Apache JMeter</strong> — applied across real ERP, CRM, e-commerce, and mobile platforms at Shrewd Business Solutions, Coimbatore. 
                <span className="text-white font-medium"> I believe testing isn't a phase — it's the engineering culture.</span> Currently sharpening REST Assured and SDET skills."
              </p>
            </ZeroGCard>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {METRICS.map((metric, i) => (
            <ZeroGCard 
              key={i} 
              delay={i * 0.15} 
              className="p-6 flex flex-col items-center justify-center text-center border-t border-t-white/10 group hover:border-t-[#FFAA33]"
            >
              <span className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-[#FFAA33] transition-colors font-mono">
                {metric.value}
              </span>
              <span className="text-xs text-zinc-400 uppercase tracking-widest">
                {metric.label}
              </span>
            </ZeroGCard>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
