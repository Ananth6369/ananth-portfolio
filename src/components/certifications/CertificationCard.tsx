"use client";

import React from "react";
import { Award, CheckCircle, Download } from "lucide-react";
import { Certification } from "@/types/certification";

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  if (!certification) return null;

  const isLinkedIn = certification.issuer.toLowerCase().includes("linkedin");
  const Icon = isLinkedIn ? Award : CheckCircle;

  return (
    <article
      data-testid={`cert-card-${certification.id}`}
      className={`p-6 sm:p-8 rounded-3xl border ${certification.color} relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-xl bg-slate-900/60 backdrop-blur-sm`}
    >
      {/* Background Glow */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-current opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Card Header & Icon */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-current/20 shadow-lg group-hover:scale-110 transition-transform">
            <Icon size={28} />
          </div>

          <span className="px-3 py-1 bg-slate-900/90 text-slate-300 text-xs font-bold rounded-full border border-slate-800">
            {certification.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight font-heading">
          {certification.name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {certification.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {certification.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-slate-950/80 text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Info & Download Action */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="text-xs text-slate-400 font-medium">
          <span className="text-slate-300 font-semibold">{certification.issuer}</span> • {certification.issueDate}
        </div>

        <a
          href={certification.pdfUrl}
          download={certification.pdfUrl.replace("/", "")}
          data-testid={`cert-download-${certification.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-current text-xs font-bold rounded-xl border border-current/20 transition-all hover:scale-105"
          aria-label={`Download ${certification.name} verified certificate`}
        >
          <Download size={14} />
          <span>Verified Credential</span>
        </a>
      </div>
    </article>
  );
}
