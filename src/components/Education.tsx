"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, MapPin, Award } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "MCA (Master of Computer Applications)",
      college: "SNS College of Technology",
      location: "Coimbatore, Tamil Nadu",
      cgpa: "8.04",
      period: "2023 - 2025",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      college: "Yadava College",
      location: "Madurai, Tamil Nadu",
      cgpa: "7.5",
      period: "2020 - 2023",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Education
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900 border border-slate-800 rounded-3xl relative group hover:border-accent/40 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-slate-800 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <span className="text-slate-500 font-bold bg-slate-800/50 px-4 py-1.5 rounded-full text-sm border border-slate-700/50">
                {edu.period}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-2 leading-tight">
              {edu.degree}
            </h3>
            <p className="text-lg text-slate-400 font-medium mb-6 flex items-center gap-2">
              <BookOpen size={18} className="text-accent" /> {edu.college}
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin size={18} />
                <span className="text-sm">{edu.location}</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400 font-bold">
                <Award size={18} />
                <span className="text-lg">CGPA: {edu.cgpa}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
