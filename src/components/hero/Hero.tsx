"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene from "./Scene";
import HeroText from "./HeroText";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate zoom out and opacity fading on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Filter for backdrop blur as it scales down
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-[#030305]">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ 
          scale, 
          opacity, 
          y,
          filter
        }}
      >
        <Scene />
        <HeroText />
        <ScrollIndicator />
        
        {/* Vignette overlay for deeper immersion */}
        <div className="absolute inset-0 z-0 pointer-events-none" 
             style={{ background: 'radial-gradient(circle at center, transparent 0%, #030305 100%)' }} />
      </motion.div>
    </div>
  );
}
