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
    subject: "Job Opportunity",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", subject: "Job Opportunity", message: "" });
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
    <section ref={sectionRef} id="contact" className="relative bg-[#0A0A0F] py-32 px-4 overflow-hidden">
      {/* Space Radar Ping - Simplified visualization */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.05]">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#00FFD1] rounded-full"
            animate={{ width: ["0%", "150%"], height: ["0%", "150%"], opacity: [1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#00FFD1] rounded-full"
            animate={{ width: ["0%", "150%"], height: ["0%", "150%"], opacity: [1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
          />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-24">
          <motion.span
            className="inline-block text-[10px] uppercase font-black tracking-[0.4em] mb-4 px-3 py-1.5 rounded-sm border border-[#00FFD1]/30 text-[#00FFD1] bg-[#00FFD1]/5"
          >
            Channel Established _
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 uppercase">
            Transmit <span className="text-[#00FFD1] text-glow-primary">a Signal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Detailed Info Panel */}
          <div className="lg:col-span-5 space-y-8">
             <div className="p-8 glass-panel rounded-[2rem] border-l-4 border-l-[#3B8BFF]">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#3B8BFF] mb-6">Mission Telemetry</h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#3B8BFF]/10 text-[#3B8BFF] group-hover:bg-[#3B8BFF] group-hover:text-white transition-all">📧</div>
                      <div>
                         <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5 tracking-widest">COMMS_LINK</p>
                         <p className="text-white font-mono text-xs">ananthalagarsamy007@gmail.com</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#00FFD1]/10 text-[#00FFD1] group-hover:bg-[#00FFD1] group-hover:text-white transition-all">📞</div>
                      <div>
                         <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5 tracking-widest">SIGNAL_LINE</p>
                         <p className="text-white font-mono text-xs">+91 6369473532</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFAA33]/10 text-[#FFAA33] group-hover:bg-[#FFAA33] group-hover:text-white transition-all">📍</div>
                      <div>
                         <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5 tracking-widest">SECTOR</p>
                         <p className="text-white font-bold text-xs uppercase tracking-tight">Coimbatore, TN (Open to Chennai)</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 glass-panel rounded-[2rem] border-l-4 border-l-[#a78bfa]">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a78bfa] mb-6">Network Nodes</h3>
                <div className="flex gap-4">
                   <a href="https://linkedin.com/in/ananthalagarsamy" target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#3B8BFF] hover:bg-[#3B8BFF]/10 text-white transition-all">
                      <span className="text-xl">👤</span>
                   </a>
                   <a href="https://github.com/Ananth-QA" target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00FFD1] hover:bg-[#00FFD1]/10 text-white transition-all">
                      <span className="text-xl">💻</span>
                   </a>
                   <a href="https://ananth-portfolio-xi.vercel.app" target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFAA33] hover:bg-[#FFAA33]/10 text-white transition-all">
                      <span className="text-xl">🌍</span>
                   </a>
                </div>
             </div>
          </div>

          {/* Control Panel Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#080812]/50 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 font-mono text-[8px] italic">SYS.CMD_INPUT_V1.4</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Identifier
                </label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formState !== "idle"}
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 font-mono text-xs rounded-2xl focus:outline-none focus:border-[#00FFD1] focus:bg-[#00FFD1]/5 transition-all"
                  placeholder="Designation..."
                />
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Email Node
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formState !== "idle"}
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 font-mono text-xs rounded-2xl focus:outline-none focus:border-[#00FFD1] focus:bg-[#00FFD1]/5 transition-all"
                  placeholder="name@domain.com"
                />
              </div>

              <div className="relative group md:col-span-2">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Subject Classification
                </label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={formState !== "idle"}
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 font-mono text-xs rounded-2xl focus:outline-none focus:border-[#00FFD1] focus:bg-[#00FFD1]/5 transition-all appearance-none"
                >
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Freelance">Freelance Collaboration</option>
                  <option value="Collaboration">Test Suite Development</option>
                  <option value="Other">Unclassified Signal</option>
                </select>
              </div>

              <div className="relative group md:col-span-2">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Payload Data (Message)
                </label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={formState !== "idle"}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 font-mono text-xs rounded-2xl focus:outline-none focus:border-[#00FFD1] focus:bg-[#00FFD1]/5 transition-all resize-none"
                  placeholder="Input critical mission data..."
                ></textarea>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={formState !== "idle"}
                className="w-full py-5 bg-[#00FFD1] text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_10px_40px_rgba(0,255,209,0.2)] disabled:opacity-50"
              >
                {formState === "idle" ? "Launch Signal" : formState === "sending" ? "Uplinking Payload..." : "Signal Delivered"}
              </button>
            </div>

            <AnimatePresence>
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-8 inset-y-8 bg-[#080812] z-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#00FFD1] flex items-center justify-center mb-6 text-[#00FFD1] animate-bounce">✓</div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Transmission Successful</h4>
                  <p className="text-zinc-400 text-xs font-mono max-w-sm">Payload has been received by the core. A return comm link will be established after coordinate validation.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Master Footer */}
        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center gap-8 text-center">
            <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="p-3 bg-white/5 rounded-full border border-white/10 text-zinc-500 cursor-pointer hover:text-white transition-colors">👤</motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="p-3 bg-white/5 rounded-full border border-white/10 text-zinc-500 cursor-pointer hover:text-white transition-colors">💻</motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="p-3 bg-white/5 rounded-full border border-white/10 text-zinc-500 cursor-pointer hover:text-white transition-colors">🤖</motion.div>
            </div>
            <div className="space-y-2">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em]">
                    Built with precision, tested with passion.
                </p>
                <p className="text-zinc-700 text-[9px] font-mono tracking-widest uppercase">
                    © 2026 Ananth A · QA Engineer · Zero-G Mission Control
                </p>
            </div>
        </footer>

      </div>
    </section>
  );
}

