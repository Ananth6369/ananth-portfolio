"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/experienceData";
import ExperienceTimelineItem from "./experience/ExperienceTimelineItem";

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4"
        >
          <span>Career Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 font-heading text-slate-50"
        >
          Work Experience &amp; Impact
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 max-w-xl mx-auto text-base"
        >
          Detailed timeline of software test engineering roles, framework development, API regression suites, and quality assurance leadership.
        </motion.p>
      </div>

      {/* Interactive Timeline Wrapper */}
      <div
        data-testid="experience-timeline"
        className="relative border-l-2 border-slate-800 ml-4 md:ml-12"
      >
        {experienceData.map((item) => (
          <ExperienceTimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
