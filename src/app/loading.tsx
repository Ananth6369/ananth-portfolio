import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-accent">
          <Loader2 size={36} className="animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
}
