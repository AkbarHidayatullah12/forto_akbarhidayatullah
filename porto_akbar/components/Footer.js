"use client";

import { ArrowUp, Instagram } from "lucide-react";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function Footer() {
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t-2 border-[#2a2e33] bg-[#121414] py-10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 flex items-center justify-center">
                <img
                  src="/logo%20spider.png"
                  alt="Spider Logo"
                  className="w-full h-full object-contain"
                  style={{ filter: `drop-shadow(0 0 8px ${themeColor})` }}
                />
              </div>
              <span className="font-anybody text-xl font-black italic tracking-wider text-white">
                AKBAR HIDAYATULLAH
              </span>
            </div>
            <p className="font-tech text-xs text-slate-400" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Akbar Hidayatullah. All Rights Reserved.
            </p>
          </div>

          {/* Social Links & Back to Top — Theme Reactive */}
          <div className="flex items-center gap-8 font-tech text-xs font-bold">
            <a
              href="https://github.com/AkbarHidayatullah12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors"
              onMouseEnter={(e) => e.target.style.color = themeColor}
              onMouseLeave={(e) => e.target.style.color = "#cbd5e1"}
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/akbar-hidayatullah-570212376/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors"
              onMouseEnter={(e) => e.target.style.color = themeColor}
              onMouseLeave={(e) => e.target.style.color = "#cbd5e1"}
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/akbar_hidytllh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors flex items-center gap-1.5"
              onMouseEnter={(e) => e.currentTarget.style.color = themeColor}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              <Instagram className="h-3.5 w-3.5" />
              INSTAGRAM
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="p-2.5 bg-[#181b1b] border-2 border-[#2a2e33] text-slate-300 hover:text-white active:translate-y-1 transition-all"
              style={{ "--hover-border": themeColor }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = themeColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2e33"; }}
            >
              <ArrowUp className="h-4 w-4" style={{ color: themeColor }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
