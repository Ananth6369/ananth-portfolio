"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Command, ArrowRight, CornerDownLeft } from "lucide-react";
import { searchGlobalIndex, GlobalSearchResult } from "@/lib/searchIndex";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  // Compute search results
  const results: GlobalSearchResult[] = searchGlobalIndex(debouncedQuery);

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard Navigation: Up/Down arrow, Enter, ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedItem = results[selectedIndex];
        if (selectedItem) {
          handleSelect(selectedItem);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (item: GlobalSearchResult) => {
    onClose();
    if (item.url.startsWith("http") || item.url.endsWith(".pdf")) {
      window.open(item.url, "_blank");
    } else {
      window.location.href = item.url;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="global-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Global Portfolio Search"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3 relative">
          <Search size={22} className="text-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            data-testid="global-search-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, skills, experience, blogs, certs..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-lg focus:outline-none"
            aria-label="Global search input"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setDebouncedQuery("");
              }}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg border border-slate-700 ml-2"
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {debouncedQuery.trim() === "" ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              Type to search across <span className="text-slate-300 font-semibold">Projects</span>,{" "}
              <span className="text-slate-300 font-semibold">Skills</span>,{" "}
              <span className="text-slate-300 font-semibold">Experience</span>, and{" "}
              <span className="text-slate-300 font-semibold">Certifications</span>.
            </div>
          ) : results.length === 0 ? (
            <div
              data-testid="global-search-no-results"
              className="p-8 text-center text-slate-400 text-sm"
            >
              No results found for &quot;<span className="text-slate-200 font-semibold">{debouncedQuery}</span>&quot;. Try searching for &quot;Playwright&quot; or &quot;Selenium&quot;.
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-testid={`global-search-result-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-slate-100 shadow-md"
                      : "bg-transparent hover:bg-slate-800/60 border border-transparent text-slate-300"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider bg-slate-800 text-cyan-400 border border-slate-700">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-100 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-accent opacity-80">
                    {isSelected && <CornerDownLeft size={14} className="animate-pulse" />}
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400 px-5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px]">↵</kbd>
              <span>Select</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Command size={12} />
            <span>+ K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
