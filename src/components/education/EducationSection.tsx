"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ZeroGCard from "../ui/ZeroGCard";

const EDUCATION = [
  {
    degree: "MCA",
    institution: "SNS College of Technology, Coimbatore",
    affiliation: "(Anna University)",
    metrics: "CGPA: 8.04",
    period: "2023 - 2025",
    icon: "🎓",
    color: "#00FFD1",
  },
  {
    degree: "BCA",
    institution: "Yadava College, Madurai",
    metrics: "CGPA: 7.5",
    period: "2020 - 2023",
    icon: "📜",
    color: "#3B8BFF",
  },
];

const CERTIFICATIONS = [
  {
    title: "Manual Testing Fundamentals",
    issuer: "Great Learning",
    color: "#FFAA33",
  },
  {
    title: "SQL for Beginners",
    issuer: "Prepinsta",
    color: "#00FFD1",
  },
];

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const railProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={containerRef} id="education" className="relative py-32 px-4 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-32">
           <motion.span
             className="inline-block text-xs uppercase tracking-[0.4em] text-[#3B8BFF] font-black mb-4"
           >
             Academic Foundation _
           </motion.span>
           <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
             Academic <span className="text-[#3B8BFF] text-glow-secondary">Training</span>
           </h2>
        </div>

        {/* Degrees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 relative">
           {/* Vertical Rail behind (on mobile it works like a separator, on desktop it's between) */}
           <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5 overflow-hidden hidden md:block">
              <motion.div 
                className="w-full h-full bg-[#3B8BFF] origin-top"
                style={{ scaleY: railProgress }}
              />
           </div>

           {EDUCATION.map((edu, index) => (
             <motion.div
               key={edu.degree}
               initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className={index % 2 === 0 ? "md:pr-12" : "md:pl-12"}
             >
               <ZeroGCard className="p-8 h-full border-t flex flex-col items-center md:items-start text-center md:text-left" 
                          style={{ borderTopColor: edu.color }}>
                  <span className="text-4xl mb-6">{edu.icon}</span>
                  <h3 className="text-3xl font-black text-white mb-2">{edu.degree}</h3>
                  <p className="text-zinc-300 font-bold mb-1">{edu.institution}</p>
                  <p className="text-zinc-500 text-xs mb-6 italic">{edu.affiliation}</p>
                  
                  <div className="mt-auto w-full grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                     <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Merit</p>
                        <p className="text-white font-mono font-bold">{edu.metrics}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Period</p>
                        <p className="text-white font-mono font-bold text-xs">{edu.period}</p>
                     </div>
                  </div>
               </ZeroGCard>
             </motion.div>
           ))}
        </div>

        {/* Certifications - Mission Patches */}
        <div className="text-center pt-16 border-t border-white/5">
           <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-16">Training Mission Patches</h3>
           <div className="flex flex-wrap justify-center gap-12">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity" 
                       style={{ background: cert.color }} />
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 flex flex-col items-center justify-center p-4 bg-[#0A0A0F] shadow-2xl transition-all duration-300"
                       style={{ borderColor: `${cert.color}44` }}>
                    <div className="text-[10px] uppercase text-zinc-500 mb-2 font-black">Certified</div>
                    <div className="text-white font-black text-[10px] md:text-xs leading-tight text-center mb-2 px-1">
                      {cert.title}
                    </div>
                    <div className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border"
                         style={{ color: cert.color, borderColor: `${cert.color}44`, background: `${cert.color}11` }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     <span className="text-[8px] font-bold text-white bg-black/60 px-2 py-1 rounded">Validation Complete</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
