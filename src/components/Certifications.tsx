"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, RotateCw } from "lucide-react";
import { certificationsData } from "@/data/certificationsData";
import { CertificationCategory } from "@/types/certification";
import ResumeHub from "./resume/ResumeHub";
import CertificationCard from "./certifications/CertificationCard";

const categories: CertificationCategory[] = [
  "All",
  "Automation",
  "Software Engineering",
  "Database",
];

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CertificationCategory>("All");

  const filteredCertifications = useMemo(() => {
    return certificationsData.filter((cert) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || cert.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery.trim()) return true;

      const term = searchQuery.toLowerCase().trim();
      const nameMatch = cert.name.toLowerCase().includes(term);
      const issuerMatch = cert.issuer.toLowerCase().includes(term);
      const descMatch = cert.description.toLowerCase().includes(term);
      const tagMatch = cert.tags.some((tag) => tag.toLowerCase().includes(term));

      return nameMatch || issuerMatch || descMatch || tagMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <section id="certifications" data-testid="certifications-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4"
          >
            <span>Resume &amp; Certifications Center</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 font-heading text-slate-50"
          >
            Resume &amp; Verified Certifications
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
            Preview official resume documentation and verified technical certifications in QA Automation, Full Stack Java, and Database Engineering.
          </motion.p>
        </div>

        {/* Integrated Resume Hub */}
        <ResumeHub />

        {/* Certifications Header Controls: Search & Category Pills */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                data-testid="cert-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications, Java, SQL, Selenium..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm shadow-xl"
                aria-label="Search certifications"
              />
            </div>

            {/* Category Pills */}
            <div
              data-testid="cert-category-filter"
              className="flex flex-wrap items-center justify-center gap-2"
            >
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
                <Filter size={14} className="text-slate-500" />
                Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-slate-950 border-accent shadow-lg shadow-cyan-500/20 scale-105"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications Grid / Empty State */}
        {filteredCertifications.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center max-w-xl mx-auto my-8 shadow-xl">
            <h3 className="text-xl font-bold text-slate-100 mb-2 font-heading">
              No matching certifications
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              No certifications match your query. Try clearing your active filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-accent font-bold text-xs rounded-xl border border-slate-700 transition-all"
            >
              <RotateCw size={14} />
              <span>Clear Search</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCertifications.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
