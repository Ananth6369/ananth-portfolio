"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileText, BookOpen } from "lucide-react";

const cards = [
  {
    id: "email",
    testId: "contact-card-email",
    label: "Email",
    value: "ananthalagarsamy007@gmail.com",
    href: "mailto:ananthalagarsamy007@gmail.com",
    icon: Mail,
    color: "text-rose-400 bg-rose-400/10 border-rose-400/20 hover:border-rose-400/50",
    actionText: "Send Mail",
  },
  {
    id: "linkedin",
    testId: "contact-card-linkedin",
    label: "LinkedIn",
    value: "in/ananthalagarsamy",
    href: "https://linkedin.com/in/ananthalagarsamy",
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20 hover:border-blue-400/50",
    actionText: "Connect on LinkedIn",
  },
  {
    id: "github",
    testId: "contact-card-github",
    label: "GitHub",
    value: "Ananth-QA",
    href: "https://github.com/Ananth-QA",
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
    color: "text-slate-300 bg-slate-400/10 border-slate-400/20 hover:border-slate-300/50",
    actionText: "Explore Repos",
  },
  {
    id: "medium",
    testId: "contact-card-medium",
    label: "Medium",
    value: "@ananthalagarsamy",
    href: "https://medium.com/@ananthalagarsamy",
    icon: BookOpen,
    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20 hover:border-cyan-400/50",
    actionText: "Read Articles",
  },
  {
    id: "resume",
    testId: "contact-card-resume",
    label: "Resume",
    value: "Ananth_A_Resume.pdf",
    href: "/resume.pdf",
    icon: FileText,
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 hover:border-emerald-400/50",
    actionText: "Download Resume",
    download: true,
  },
];

export default function ContactCards() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-100 font-heading mb-4">
        Direct Contact &amp; Profiles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.a
              key={card.id}
              data-testid={card.testId}
              href={card.href}
              target={card.href.startsWith("http") || card.href.startsWith("mailto") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              download={card.download ? "Ananth_A_Resume.pdf" : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-2xl border ${card.color} group transition-all duration-300 flex items-center justify-between shadow-lg bg-slate-900/60 backdrop-blur-sm`}
              aria-label={`${card.label}: ${card.value}`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 rounded-xl bg-slate-900 border border-current/20 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {card.label}
                  </div>
                  <div className="text-sm font-bold text-slate-100 truncate">
                    {card.value}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
                <span>{card.actionText}</span>
                <Send size={12} />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
