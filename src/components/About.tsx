"use client";

import { motion } from "framer-motion";
import { User, Code2, ShieldCheck, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Avatar/Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group mx-auto lg:mx-0"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-accent/20 p-4 transition-all duration-500 group-hover:border-accent">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-700 relative">
               <img 
                src="/profile-headshot.png" 
                alt="Ananth A" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
               />
              {/* Fallback pattern in case image is missing */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-800">
                <User size={120} className="text-slate-600 group-hover:text-accent transition-colors duration-500" />
              </div>
            </div>
          </div>
          {/* Decorative badges around avatar */}
          <div className="absolute -top-4 -right-4 p-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform">
            <ShieldCheck size={32} className="text-accent" />
          </div>
          <div className="absolute -bottom-4 -left-4 p-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform">
            <Code2 size={32} className="text-accent" />
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-slate-100 flex items-center gap-3">
            Passionate about <span className="text-accent">Quality Assurance</span>
          </h3>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            QA Engineer with 1 year of experience in manual and automation 
            testing across ERP, CRM, e-commerce, and mobile applications. Skilled in 
            Selenium (Java), TestNG, and Page Object Model with hands-on experience 
            building end-to-end automation frameworks.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            I am passionate about delivering scalable, reliable, and high-quality 
            testing solutions that streamline development cycles and enhance user 
            experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, label: "Reliable Testing", desc: "Building robust frameworks" },
              { icon: Zap, label: "Fast Integration", desc: "Automated CI/CD pipelines" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-start gap-4 hover:border-accent/30 transition-colors"
              >
                <item.icon size={28} className="text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-200">{item.label}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
