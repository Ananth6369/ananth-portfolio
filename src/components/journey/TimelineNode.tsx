"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface JourneyStage {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
  skills: string[];
}

interface TimelineNodeProps {
  stage: JourneyStage;
  index: number;
  isLast: boolean;
}

export default function TimelineNode({ stage, index, isLast }: TimelineNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-full"
      style={{ minHeight: "160px" }}
    >
      {/* Vertical connector line (not on last) */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-full w-px origin-top z-0"
          style={{
            height: "80px",
            background: `linear-gradient(to bottom, ${stage.glowColor}, transparent)`,
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
        />
      )}

      {/* Left side — content for even nodes */}
      <div
        className={`absolute w-[44%] ${
          isEven ? "right-[53%] flex justify-end" : "left-[53%]"
        }`}
      >
        <motion.div
          className="cursor-pointer group w-full max-w-sm"
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: "easeOut" }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="relative rounded-2xl p-5 glass-panel border transition-all duration-300"
            style={{
              borderColor: isExpanded ? stage.glowColor : "rgba(255,255,255,0.07)",
              boxShadow: isExpanded
                ? `0 0 30px ${stage.glowColor}33, 0 0 60px ${stage.glowColor}11`
                : `0 0 0px transparent`,
            }}
          >
            {/* Year badge */}
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
              style={{
                background: `${stage.glowColor}22`,
                color: stage.glowColor,
                border: `1px solid ${stage.glowColor}44`,
              }}
            >
              {stage.year}
            </span>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{stage.icon}</span>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {stage.title}
                </h3>
                <p className="text-zinc-400 text-xs">{stage.subtitle}</p>
              </div>
            </div>

            {/* Expandable content */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-zinc-300 text-sm leading-relaxed mt-3 mb-3">
                {stage.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {stage.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: `${stage.glowColor}18`,
                      color: stage.glowColor,
                      border: `1px solid ${stage.glowColor}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Expand toggle hint */}
            <motion.div
              className="mt-3 flex items-center gap-1 text-xs"
              style={{ color: stage.glowColor }}
              animate={{ opacity: isExpanded ? 0.6 : 1 }}
            >
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                ▼
              </motion.span>
              <span>{isExpanded ? "Collapse" : "Explore this phase"}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Center node / dot */}
      <motion.div
        className="relative z-10 flex items-center justify-center flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + index * 0.08, type: "spring", stiffness: 200 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold relative"
          style={{
            background: `radial-gradient(circle, ${stage.glowColor}44, ${stage.glowColor}11)`,
            border: `2px solid ${stage.glowColor}`,
            boxShadow: `0 0 20px ${stage.glowColor}55, 0 0 40px ${stage.glowColor}22`,
          }}
        >
          {stage.icon}
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${stage.glowColor}` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
