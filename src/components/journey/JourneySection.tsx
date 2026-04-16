"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineNode, { JourneyStage } from "./TimelineNode";

const journeyStages: JourneyStage[] = [
  {
    id: 1,
    year: "Present",
    title: "Software Test Engineer",
    subtitle: "Scaling Quality & Frameworks",
    company: "Shrewd Business Solutions, Coimbatore",
    period: "Apr 2024 – Present",
    domains: "ERP, CRM, E-Commerce, Mobile Apps",
    description:
      "Spearheading end-to-end quality assurance for large-scale enterprise systems. Responsible for building automated validation pipelines that ensure consistent performance across web and mobile platforms.",
    icon: "🚀",
    color: "#00FFD1",
    glowColor: "#00FFD1",
    skills: ["Selenium", "Java", "TestNG", "Postman", "JMeter"],
    tabs: [
      {
        title: "Manual Testing",
        content: "Drafting scenarios for complex user flows in ERP/CRM. Expert in functional, regression, and exploratory testing across multi-layered web eco-systems."
      },
      {
        title: "Automation (Selenium+Java)",
        content: "Architected modular automation suites. Implementing hybrid frameworks with POM for Alatron Vendor and Poppy Admin platforms."
      },
      {
        title: "API Testing",
        content: "Validating RESTful endpoints with Postman and REST Assured. Ensuring data integrity across microservices for industrial and consulting clients."
      },
      {
         title: "Security & Performance",
         content: "Basic vulnerability scanning and load testing using JMeter. Ensuring systems remain robust under critical peak transaction volumes."
      }
    ]
  }
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Heading entrance animation driven by ScrollTrigger
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-[#030305] py-24 px-4 overflow-hidden"
    >
      {/* Background atmospheric glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] font-semibold mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(139,92,246,0.12)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.3)",
            }}
          >
            The Story So Far
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            My{" "}
            <span
              className="text-glow-secondary"
              style={{ color: "#a78bfa" }}
            >
              Journey
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            From curiosity to craft — a continuous evolution driven by a passion
            for building, testing, and understanding complex systems.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Animated vertical center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                scaleY: lineScaleY,
                background:
                  "linear-gradient(to bottom, #8b5cf6, #3b82f6, #0ea5e9, #f59e0b)",
                boxShadow: "0 0 12px rgba(139,92,246,0.6)",
              }}
            />
          </div>

          {/* Nodes */}
          <div className="relative flex flex-col gap-20 py-10">
            {journeyStages.map((stage, index) => (
              <TimelineNode
                key={stage.id}
                stage={stage}
                index={index}
                isLast={index === journeyStages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-500 text-sm tracking-wide">
            And the journey continues — one commit at a time. 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
