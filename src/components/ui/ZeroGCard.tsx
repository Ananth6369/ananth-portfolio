"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ZeroGCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
}

export default function ZeroGCard({ 
  children, 
  className = "", 
  delay = 0,
  interactive = true 
}: ZeroGCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={interactive ? { 
        y: -8,
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      className={`glass-panel rounded-[2rem] relative overflow-hidden group transition-shadow hover:shadow-[0_20px_50px_rgba(0,255,209,0.1)] ${className}`}
    >
      {/* Subtle internal glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Animated accent border (top left) */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00FFD1] to-transparent" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#00FFD1] to-transparent" />
      </div>

      {/* Decorative dots in corners */}
      <div className="absolute top-4 right-4 flex gap-1.5 opacity-20">
        <div className="w-1 h-1 rounded-full bg-white" />
        <div className="w-1 h-1 rounded-full bg-white" />
      </div>

      {children}
    </motion.div>
  );
}
