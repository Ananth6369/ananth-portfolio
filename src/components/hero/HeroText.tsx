"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const lines = [
  "Hi, I'm Ananth A",
  "I Design Systems",
  "I Test Experiences",
  "I Build Intelligent Solutions",
];

const AnimatedLine = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div variants={childVariants} className={`flex flex-wrap gap-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pointer-events-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6"
      >
        <AnimatedLine 
          text={lines[0]} 
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 text-glow-primary tracking-tight" 
        />
        
        <div className="flex flex-col gap-2 md:gap-4 mt-4 glass-panel px-8 py-6 rounded-3xl">
          <AnimatedLine 
            text={lines[1]} 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-zinc-300 tracking-wide" 
          />
          <AnimatedLine 
            text={lines[2]} 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-color-primary tracking-wide text-glow-primary" 
          />
          <AnimatedLine 
            text={lines[3]} 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-zinc-300 tracking-wide" 
          />
        </div>
      </motion.div>
    </div>
  );
}
