"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

const certs = [
  {
    name: "Test Automation Foundations",
    issuer: "LinkedIn Learning",
    icon: Award,
    color: "bg-blue-600/10 text-blue-400 border-blue-600/20",
    description: "Fundamentals of automated testing, Selenium, and quality assurance workflows.",
    pdf: "/Test Automation Foundations.pdf"
  },
  {
    name: "Java Full Stack Certification",
    issuer: "Wipro TalentNext",
    icon: CheckCircle,
    color: "bg-emerald-600/10 text-emerald-400 border-emerald-600/20",
    description: "End-to-end Java development, including infrastructure setup and web architecture.",
    pdf: "/Wipro TalentNext  Java Full Stack Certification.pdf"
  },
  {
    name: "SQL for Beginners",
    issuer: "Prepinsta",
    icon: Award,
    color: "bg-orange-600/10 text-orange-400 border-orange-600/20",
    description: "Database management, querying, and relational data modeling.",
    pdf: "/certificate_SQL.pdf"
  },
];

export default function Certifications() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Certifications
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certs.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-8 rounded-3xl border ${cert.color} relative overflow-hidden group hover:scale-[1.02] transition-transform`}
          >
            {/* Background Glow */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-current opacity-5 rounded-full blur-3xl" />
            
            <div className={`p-4 rounded-2xl bg-slate-900 border border-current/20 w-fit mb-6 shadow-xl`}>
              <cert.icon size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight">
              {cert.name}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              {cert.description}
            </p>
            <p className="text-slate-400 font-medium tracking-wide border-t border-slate-800 pt-4 mt-auto">
              {cert.issuer}
            </p>

            <a 
              href={cert.pdf}
              download={cert.pdf.replace("/", "")}
              className="mt-6 flex items-center gap-2 text-current text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Verified Credential
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
