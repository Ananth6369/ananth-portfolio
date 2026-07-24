"use client";

import React, { useState } from "react";
import { Download, Eye, FileText, Calendar, CheckCircle2, X } from "lucide-react";

export default function ResumeHub() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Information & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20">
            <FileText size={14} />
            <span>Official Resume &amp; Career Credentials</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-slate-50 font-heading">
            Resume &amp; Professional Profile
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Detailed breakdown of QA Software Tester experience (1.5+ Years), Selenium &amp; Playwright automation frameworks, Postman API validation, and Jenkins CI/CD pipelines.
          </p>

          {/* Resume File Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 rounded-lg border border-slate-800">
              <FileText size={14} className="text-cyan-400" />
              <span>Format: PDF</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 rounded-lg border border-slate-800">
              <Calendar size={14} className="text-emerald-400" />
              <span>Updated: June 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 rounded-lg border border-slate-800">
              <CheckCircle2 size={14} className="text-purple-400" />
              <span>Verified Credential</span>
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="/resume.pdf"
              download="Ananth_A_Resume.pdf"
              data-testid="resume-download-button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => setIsPreviewOpen(true)}
              data-testid="resume-preview-button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              <Eye size={18} className="text-accent" />
              <span>Preview PDF</span>
            </button>
          </div>
        </div>

        {/* Right Column: Statistics Grid */}
        <div className="lg:col-span-5" data-testid="resume-stats-card">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading">
                1.5+ Years
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                QA &amp; SDET Experience
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-heading">
                500+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Test Cases Executed
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                100%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                CI/CD Automation Pipeline
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                3 Certs
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Verified Credentials
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Interactive Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Resume PDF Preview"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2 text-slate-100 font-bold text-base font-heading">
                <FileText size={18} className="text-accent" />
                <span>Ananth_A_Resume.pdf</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Ananth_A_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-all"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 bg-slate-950 relative">
              <iframe
                src="/resume.pdf#toolbar=1"
                className="w-full h-full border-0"
                title="Ananth A Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
