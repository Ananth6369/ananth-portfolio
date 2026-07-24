"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, RotateCw } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Project, ProjectCategory } from "@/types/project";
import ProjectCard from "./projects/ProjectCard";
import ProjectModal from "./projects/ProjectModal";

const categories: ProjectCategory[] = [
  "All",
  "Web Automation",
  "Framework Architecture",
  "CI/CD & DevOps",
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [sortBy, setSortBy] = useState<"newest" | "title">("newest");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter & Sort projects
  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        // Category condition
        const matchesCategory =
          selectedCategory === "All" || project.category === selectedCategory;

        if (!matchesCategory) return false;

        // Search query condition
        if (!searchQuery.trim()) return true;

        const term = searchQuery.toLowerCase().trim();
        const titleMatch = project.title.toLowerCase().includes(term);
        const descMatch = project.shortDescription.toLowerCase().includes(term);
        const techMatch = project.allTech.some((tech) =>
          tech.toLowerCase().includes(term)
        );

        return titleMatch || descMatch || techMatch;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        // newest first (by date string)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
  };

  return (
    <section id="projects" data-testid="projects-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4"
          >
            <span>Automation &amp; SDET Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 font-heading text-slate-50"
          >
            Featured Projects Showcase
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
            className="text-slate-400 max-w-2xl mx-auto text-base"
          >
            Explore production test automation frameworks, Page Object Model architectures, dynamic file upload handlers, and CI/CD pipelines.
          </motion.p>
        </div>

        {/* Controls Bar: Search, Category Pills & Sort Selector */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                data-testid="project-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, Selenium, Playwright..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm shadow-xl"
                aria-label="Search projects"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-semibold text-slate-400">Sort:</span>
              <select
                data-testid="project-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "title")}
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs font-bold focus:outline-none focus:border-accent transition-colors"
                aria-label="Sort projects"
              >
                <option value="newest">Newest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            data-testid="project-category-filter"
            className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto"
          >
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
              <Filter size={14} className="text-slate-500" />
              Category:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const testId = `project-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
              return (
                <button
                  key={cat}
                  data-testid={testId}
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

        {/* Project Grid / Empty State */}
        {filteredProjects.length === 0 ? (
          <div
            data-testid="project-no-results"
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto my-12 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2 font-heading">
              No matching projects
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              No automation projects match your active search terms or category filter. Try clearing filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-accent font-bold text-sm rounded-xl border border-slate-700 hover:border-accent/40 transition-all shadow-md"
            >
              <RotateCw size={16} />
              <span>Clear Search &amp; Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
