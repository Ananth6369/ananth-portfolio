"use client";

import Image from "next/image";
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
          className="text-3xl md:text-5xl font-bold mb-4 font-heading text-slate-50"
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

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center max-w-5xl mx-auto">
        {/* Left: Avatar/Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group shrink-0 mx-auto lg:mx-0"
        >
          <div className="w-full max-w-[300px] sm:max-w-[320px] h-[380px] sm:h-[420px] md:h-[450px] rounded-3xl border-4 border-accent/20 p-2 transition-all duration-500 group-hover:border-accent shadow-2xl relative mx-auto lg:mx-0">
            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-slate-700 relative">
              <Image
                src="/profile-headshot.png"
                alt="Ananth A - QA Automation Engineer"
                width={400}
                height={600}
                quality={95}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-800">
                <User size={120} className="text-slate-600 group-hover:text-accent transition-colors duration-500" />
              </div>
            </div>
          </div>
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
          className="flex-1 max-w-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-slate-100 flex items-center gap-3 font-heading">
            Passionate about <span className="text-accent">Quality Assurance</span>
          </h3>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            QA Software Tester with 1.5+ years of experience in manual and automation 
            testing across ERP, CRM, web, and mobile applications. Skilled in 
            Selenium WebDriver (Java), Playwright, TestNG, and Page Object Model (POM) with hands-on experience 
            building end-to-end automation frameworks and Jenkins CI/CD pipelines.
          </p>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Seeking opportunities as a QA Engineer, Automation QA Engineer, or Software Test Engineer to contribute to quality engineering, test automation, and continuous delivery initiatives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, label: "Reliable Testing", desc: "Building robust POM frameworks" },
              { icon: Zap, label: "Fast Integration", desc: "Automated Jenkins CI/CD pipelines" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-start gap-4 hover:border-accent/30 transition-colors"
              >
                <item.icon size={28} className="text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-200 font-heading">{item.label}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
