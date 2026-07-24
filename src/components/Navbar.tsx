"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Command } from "lucide-react";
import GlobalSearchModal from "./search/GlobalSearchModal";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-slate-900/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-accent"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, "#home")}
          >
            ANANTH A
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-slate-300 hover:text-accent font-medium transition-colors"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.href)}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Global Search Trigger Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsSearchOpen(true)}
              data-testid="global-search-trigger"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-accent rounded-xl border border-slate-700/80 transition-all text-xs font-semibold shadow-md"
              aria-label="Open Global Search"
            >
              <Search size={14} className="text-accent" />
              <span>Search</span>
              <span className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-900 rounded text-[10px] text-slate-400 font-mono border border-slate-800 ml-1">
                <Command size={10} />K
              </span>
            </motion.button>
          </div>

          {/* Mobile menu button & search icon */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              data-testid="global-search-trigger-mobile"
              className="p-2 text-slate-300 hover:text-accent transition-colors"
              aria-label="Open Search"
            >
              <Search size={22} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-accent transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.href)}
                    className="text-slate-300 hover:text-accent text-lg font-medium py-2 transition-colors border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
