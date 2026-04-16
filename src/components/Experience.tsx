"use client";

import { motion } from "framer-motion";
import { Search, Zap, ShieldCheck, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Work Experience
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 pl-10 md:pl-20 py-4">
        {/* Timeline Dot */}
        <div className="absolute top-0 -left-3 w-6 h-6 bg-accent rounded-full border-4 border-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.5)]" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle background highlight */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-all pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-accent mb-2">Software Test Engineer</h3>
              <h4 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                Shrewd Business Solutions
              </h4>
            </div>
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full text-sm font-medium border border-slate-700/50">
                <Calendar size={16} /> Apr 2025 – Present
              </span>
              <span className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full text-sm font-medium border border-slate-700/50">
                <MapPin size={16} /> Coimbatore, TN
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Manual Testing */}
            <div className="space-y-4 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-accent/20 transition-all">
              <div className="p-3 bg-slate-800 rounded-xl text-accent w-fit mb-4">
                <Search size={24} />
              </div>
              <h5 className="font-bold text-slate-200">Manual Testing</h5>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                <li>ERP & CRM web applications</li>
                <li>Functional & Regression testing</li>
                <li>Defect tracking & reporting</li>
                <li>Mobile APP testing (iOS/Android)</li>
              </ul>
            </div>

            {/* Automation Testing */}
            <div className="space-y-4 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-accent/20 transition-all">
              <div className="p-3 bg-slate-800 rounded-xl text-accent w-fit mb-4">
                <Zap size={24} />
              </div>
              <h5 className="font-bold text-slate-200">Automation Testing</h5>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                <li>Selenium WebDriver + Java</li>
                <li>TestNG Framework & POM</li>
                <li>Allure & Extent reporting</li>
                <li>Maven & Jenkins CI integration</li>
              </ul>
            </div>

            {/* API & Security */}
            <div className="space-y-4 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-accent/20 transition-all">
              <div className="p-3 bg-slate-800 rounded-xl text-accent w-fit mb-4">
                <ShieldCheck size={24} />
              </div>
              <h5 className="font-bold text-slate-200">Specialized Testing</h5>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                <li>Postman API testing</li>
                <li>JMeter load & spike testing</li>
                <li>Security Exposure (IDOR, XSS)</li>
                <li>Database SQL validation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
