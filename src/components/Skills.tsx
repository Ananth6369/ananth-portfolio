"use client";

import { motion } from "framer-motion";
import { 
  Zap, Code, Globe, FileBarChart, Shield, GitBranch, Search 
} from "lucide-react";

const skillGroups = [
  {
    title: "Automation",
    icon: Zap,
    skills: ["Selenium WebDriver", "TestNG", "POM", "Maven"],
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Java", "SQL", "JavaScript"],
  },
  {
    title: "API Testing",
    icon: Globe,
    skills: ["Postman", "REST API", "JSON Validation", "DevTools"],
  },
  {
    title: "Reporting",
    icon: FileBarChart,
    skills: ["Allure Reports", "Extent Reports", "Apache POI"],
  },
  {
    title: "Security & Performance",
    icon: Shield,
    skills: ["JMeter", "Basic Security Testing"],
  },
  {
    title: "CI/CD & Version Control",
    icon: GitBranch,
    skills: ["Git", "GitHub", "Jenkins"],
  },
  {
    title: "Manual Testing",
    icon: Search,
    skills: ["Functional", "Regression", "UI/UX", "Mobile"],
  },
];

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Technical Skills
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1.5 bg-accent mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-accent/40 transition-all group overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-slate-800 rounded-xl text-accent group-hover:scale-110 transition-transform">
                <group.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">{group.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-800/50 text-slate-400 text-sm rounded-lg border border-slate-700/50 hover:border-accent hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
