import Hero from "@/components/hero/Hero";
import JourneySection from "@/components/journey/JourneySection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import MindsetEngine from "@/components/mindset/MindsetEngine";
import KnowledgeVault from "@/components/knowledge/KnowledgeVault";
import AutomationDemo from "@/components/simulation/AutomationDemo";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#030305] min-h-screen text-white">
      <Hero />

      {/* Journey section */}
      <div className="relative z-10 -mt-10 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_80px_rgba(0,0,0,0.9)] border-t border-white/5">
        <JourneySection />
      </div>

      {/* Skills Universe section */}
      <div className="relative z-10 border-t border-white/5">
        <SkillsSection />
      </div>

      {/* Projects Universe section */}
      <div className="relative z-10 border-t border-white/5">
        <ProjectsSection />
      </div>

      {/* Testing Mindset Engine section */}
      <div className="relative z-10 border-t border-white/5">
        <MindsetEngine />
      </div>

      {/* Live Automation Demo section */}
      <div className="relative z-10 border-t border-white/5">
        <AutomationDemo />
      </div>

      {/* Knowledge Vault section */}
      <div className="relative z-10 border-t border-white/5">
        <KnowledgeVault />
      </div>

      {/* Contact section */}
      <div className="relative z-10 border-t border-white/5">
        <ContactSection />
      </div>
    </main>
  );
}
