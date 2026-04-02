"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 pointer-events-auto cursor-pointer group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">
        Scroll to Explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-white/40 transition-colors group-hover:shadow-[0_0_15px_rgba(82,113,255,0.4)]"
      >
        <motion.div 
          className="w-1.5 h-3 bg-color-primary rounded-full shadow-[0_0_10px_rgba(82,113,255,1)]"
          animate={{ y: [0, 16, 0], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <ChevronDown className="text-white/30 group-hover:text-color-primary transition-colors mt-2" size={20} />
    </motion.div>
  );
}
