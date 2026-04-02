"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "automation",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate network request
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", projectType: "automation", message: "" });
      
      // Reset back to idle after a few seconds
      setTimeout(() => setFormState("idle"), 4000);
    }, 2500);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
      gsap.from(formRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-[#030305] py-24 px-4 overflow-hidden">
      {/* Control Panel Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(82, 113, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(82, 113, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            className="inline-block text-[10px] uppercase font-mono tracking-widest mb-4 px-3 py-1 rounded-sm border border-[#5271ff]/30 text-[#5271ff] bg-[#5271ff]/10"
          >
            SYS.COMMS.TERMINAL
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 uppercase tracking-wider">
            Initiate <span style={{ color: "#5271ff", textShadow: "0 0 20px #5271ff88" }}>Protocol</span>
          </h2>
        </div>

        {/* Control Panel UI */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative bg-[#080812] border border-[#5271ff]/20 p-6 md:p-10 rounded-none shadow-[0_0_50px_rgba(82,113,255,0.05)]"
        >
          {/* Cyberpunk corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#5271ff] opacity-50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#5271ff] opacity-50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#5271ff] opacity-50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#5271ff] opacity-50" />

          {/* Glitch lines top & bottom */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#5271ff]/30 to-transparent" />
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#5271ff]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input: Name */}
            <div className="relative group">
              <label className="block text-[10px] font-mono text-[#5271ff] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>[VAR: IDENT] Name</span>
                <span className="opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse text-[#00ffaa] drop-shadow-[0_0_5px_#00ffaa]">ACTIVE</span>
              </label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={formState !== "idle"}
                className="w-full bg-[#030305] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#5271ff] focus:shadow-[0_0_15px_rgba(82,113,255,0.2)] transition-all disabled:opacity-50"
                placeholder="Enter designation..."
              />
            </div>

            {/* Input: Email */}
            <div className="relative group">
              <label className="block text-[10px] font-mono text-[#5271ff] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>[VAR: ROUTE] Email</span>
                <span className="opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse text-[#00ffaa] drop-shadow-[0_0_5px_#00ffaa]">ACTIVE</span>
              </label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={formState !== "idle"}
                className="w-full bg-[#030305] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#5271ff] focus:shadow-[0_0_15px_rgba(82,113,255,0.2)] transition-all disabled:opacity-50"
                placeholder="Establish comm link..."
              />
            </div>

            {/* Select: Project Type */}
            <div className="relative group md:col-span-2">
              <label className="block text-[10px] font-mono text-[#5271ff] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>[PARAM: CLASSIFICATION] Project Type</span>
              </label>
              <div className="relative">
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={formState !== "idle"}
                  className="w-full bg-[#030305] border border-white/10 text-white px-4 py-3 font-mono text-sm appearance-none focus:outline-none focus:border-[#5271ff] transition-all disabled:opacity-50"
                >
                  <option value="automation">Test Automation Architecture</option>
                  <option value="qa">QA Ecosystem Audit</option>
                  <option value="freelance">Freelance Development / App</option>
                  <option value="consulting">DevOps & Cloud Consulting</option>
                  <option value="other">Unclassified / Other Signal</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5271ff]">
                  ▼
                </div>
              </div>
            </div>

            {/* TextArea: Message */}
            <div className="relative group md:col-span-2">
              <label className="block text-[10px] font-mono text-[#5271ff] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>[PAYLOAD: DATA] Message</span>
                <span className="opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse text-[#00ffaa] drop-shadow-[0_0_5px_#00ffaa]">ACTIVE</span>
              </label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={formState !== "idle"}
                rows={5}
                className="w-full bg-[#030305] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#5271ff] focus:shadow-[0_0_15px_rgba(82,113,255,0.2)] transition-all resize-none disabled:opacity-50"
                placeholder="Input coordinates and mission details..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button Block */}
          <div className="mt-8 flex justify-end items-center gap-4 relative">
            <div className="flex-1 border-t border-dashed border-[#5271ff]/30" />
            
            <button
              type="submit"
              disabled={formState !== "idle"}
              className="relative bg-[#5271ff]/10 border border-[#5271ff] px-10 py-4 font-mono font-bold text-sm uppercase tracking-widest text-white hover:bg-[#5271ff]/20 transition-all overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed group"
            >
              {formState === "idle" && (
                <>
                  <span className="relative z-10 text-[#5271ff] group-hover:text-white transition-colors">Transmit</span>
                  <div className="absolute inset-0 bg-[#5271ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                </>
              )}
              {formState === "sending" && (
                <div className="flex items-center gap-2">
                  <span className="text-[#a78bfa] animate-pulse">Uplinking</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              {formState === "success" && (
                <span className="text-[#00ffaa] drop-shadow-[0_0_5px_#00ffaa]">Confirmed</span>
              )}
            </button>
          </div>

          {/* Success Overlay Animation */}
          <AnimatePresence>
            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#030305]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-16 h-16 border-2 border-[#00ffaa] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,170,0.3)]"
                >
                  <span className="text-3xl text-[#00ffaa] drop-shadow-[0_0_10px_#00ffaa]">✓</span>
                </motion.div>
                <h3 className="font-mono text-[#00ffaa] text-xl font-bold uppercase tracking-widest mb-2">Transmission Successful</h3>
                <p className="text-zinc-400 font-mono text-xs max-w-sm">
                  Your coordinates have been received. Systems are analyzing the payload. A return comm link will be established shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </form>

        {/* Footer info terminal */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
          <p>Terminal Status: <span className="text-[#00ffaa]">ONLINE</span></p>
          <div className="flex items-center gap-4 border-t border-white/5 pt-4 w-full justify-center">
            <a href="#" className="hover:text-[#5271ff] transition-colors">[ LINKEDIN_NODE ]</a>
            <a href="#" className="hover:text-[#5271ff] transition-colors">[ GITHUB_NODE ]</a>
            <a href="#" className="hover:text-[#5271ff] transition-colors">[ TWITTER_NODE ]</a>
          </div>
          <p className="mt-8 text-zinc-700">© 2026 ANANTH A. ALL PROTOCOLS SECURED.</p>
        </div>

      </div>
    </section>
  );
}
