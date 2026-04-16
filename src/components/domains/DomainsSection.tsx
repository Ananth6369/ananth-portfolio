"use client";

import { motion } from "framer-motion";
import { Factory, Handshake, Repeat, ShoppingCart, Smartphone } from "lucide-react";
import ZeroGCard from "../ui/ZeroGCard";

const DOMAINS = [
  {
    icon: <Factory size={32} />,
    title: "ERP",
    subtitle: "Electronics Industry",
    description: "Managed end-to-end testing for inventory and manufacturing workflows.",
    color: "#00FFD1",
  },
  {
    icon: <Handshake size={32} />,
    title: "CRM",
    subtitle: "Pest Control Domain",
    description: "Optimized client relationship management tools with automated stability.",
    color: "#3B8BFF",
  },
  {
    icon: <Repeat size={32} />,
    title: "ERP + CRM",
    subtitle: "Trust Systems (Integrated)",
    description: "Bridging departments with seamless data flow and zero-defect deployments.",
    color: "#FFAA33",
  },
  {
    icon: <ShoppingCart size={32} />,
    title: "E-Commerce",
    subtitle: "Consumer Applications",
    description: "Ensuring checkout precision and user experience for high-traffic stores.",
    color: "#a78bfa",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Apps",
    subtitle: "Consulting & Digital Gold",
    description: "Cross-platform QA for mobile-first financial and service-based solutions.",
    color: "#fb7185",
  },
];

export default function DomainsSection() {
  return (
    <section id="domains" className="relative py-32 px-4 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-24">
           <motion.span
             className="inline-block text-xs uppercase tracking-[0.4em] text-[#FFAA33] font-black mb-4"
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             System Sector Scan _
           </motion.span>
           <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
             Testing <span className="text-[#FFAA33] text-glow-accent">Domains</span>
           </h2>
           <p className="text-zinc-500 text-lg mt-6 max-w-2xl mx-auto">
             Exploration of specialized industry sectors where I have deployed high-precision automation payloads.
           </p>
        </div>

        {/* Hexagonal / Grid Cluster */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {DOMAINS.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full md:w-[320px]"
            >
              <ZeroGCard className="p-8 h-full flex flex-col items-start gap-4 border-l-2 bg-[#0A0A0F]/50 backdrop-blur-md"
                         style={{ borderColor: domain.color }}>
                <div style={{ color: domain.color }} className="p-3 rounded-2xl bg-white/5 mb-2">
                  {domain.icon}
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white mb-1">{domain.title}</h3>
                   <p className="text-[#FFAA33] font-mono text-[10px] uppercase tracking-widest mb-4">{domain.subtitle}</p>
                   <p className="text-zinc-400 text-sm leading-relaxed font-light">
                     {domain.description}
                   </p>
                </div>
              </ZeroGCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
