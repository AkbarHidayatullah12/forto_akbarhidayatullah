"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-brand-black/90 py-8 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-slate-500 font-mono">
              &copy; {new Date().getFullYear()} Akbar Hidayatullah. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="p-2 rounded-lg bg-brand-navy border border-white/10 text-slate-400 hover:text-white hover:border-brand-purple transition-all duration-200"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
