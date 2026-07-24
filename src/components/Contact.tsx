"use client";

import React from "react";
import { motion } from "framer-motion";
import ContactCards from "./contact/ContactCards";
import ContactForm from "./contact/ContactForm";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4"
        >
          <span>Contact Center</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 font-heading text-slate-50"
        >
          Get In Touch
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
          Have a project in mind, need test automation architecture consulting, or interested in SDET opportunities? Send a message or reach out directly.
        </motion.p>
      </div>

      {/* Main SaaS Contact Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact & Social Cards */}
        <div className="lg:col-span-5">
          <ContactCards />
        </div>

        {/* Right Column: Interactive SaaS Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
