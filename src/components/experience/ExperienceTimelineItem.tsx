"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Search, Zap, ShieldCheck, ChevronDown, Award } from "lucide-react";
import { ExperienceItem } from "@/data/experienceData";

interface ExperienceTimelineItemProps {
  item: ExperienceItem;
}

export default function ExperienceTimelineItem({ item }: ExperienceTimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryIcon = (index: number) => {
    if (index === 0) return <Search size={22} />;
    if (index === 1) return <Zap size={22} />;
    return <ShieldCheck size={22} />;
  };

  return (
    <div className="relative pl-8 md:pl-16 pb-12 last:pb-0" data-testid={`experience-card-${item.id}`}>
      {/* Timeline Dot Indicator */}
      <div className="absolute top-1.5 left-0 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.6)] z-10" />

      {/* Main Experience Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-all duration-300"
      >
        {/* Subtle background highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

        {/* Card Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-2">
              <span>{item.type}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-accent font-heading">
              {item.role}
            </h3>
            <h4 className="text-lg font-semibold text-slate-100 mt-1">
              {item.company}
            </h4>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80">
              <Calendar size={14} className="text-accent" />
              <span>{item.period}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80">
              <MapPin size={14} className="text-emerald-400" />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* High-level Overview */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {item.overview}
        </p>

        {/* 3 Columns Responsibilities Grid (Preserving exact existing items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {item.responsibilities.map((section, idx) => (
            <div
              key={section.title}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-slate-900 border border-slate-800 text-accent rounded-xl w-fit mb-4">
                  {getCategoryIcon(idx)}
                </div>
                <h5 className="font-bold text-slate-100 text-base mb-3 font-heading">
                  {section.title}
                </h5>
                <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                  {section.items.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Key Achievements & Technologies Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 pt-4 border-t border-slate-800 overflow-hidden"
            >
              {/* Key Achievements */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Award size={15} className="text-amber-400" />
                  <span>Key SDET Achievements</span>
                </h5>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs sm:text-sm text-slate-200 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag Cloud */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Technologies &amp; Tools Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / Collapse Toggle Trigger */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid={`experience-expand-${item.id}`}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-slate-700 text-accent font-bold text-xs rounded-xl border border-slate-700 transition-all shadow-md group"
          >
            <span>{isExpanded ? "Hide Details & Achievements" : "Show Achievements & Tech Stack"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
