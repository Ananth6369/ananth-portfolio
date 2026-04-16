"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>

      <section id="about" className="py-20">
        <About />
      </section>

      <section id="skills" className="py-20 bg-slate-900/50">
        <Skills />
      </section>

      <section id="experience" className="py-20">
        <Experience />
      </section>

      <section id="projects" className="py-20 bg-slate-900/50">
        <Projects />
      </section>

      <section id="certifications" className="py-20">
        <Certifications />
      </section>

      <section id="education" className="py-20 bg-slate-900/50">
        <Education />
      </section>

      <section id="contact" className="py-20">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
