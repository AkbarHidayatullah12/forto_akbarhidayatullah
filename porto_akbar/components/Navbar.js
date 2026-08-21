"use client";

import { useState } from "react";
import { Menu, X, FileText, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSuitTheme, suitThemes } from "./ThemeContext";
import { setMuted, getMuted, playHudBeep, playWebShooter } from "../utils/soundEffects";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [muted, setMutedState] = useState(getMuted());
  const [showThemePicker, setShowThemePicker] = useState(false);
  const { suitTheme, setSuitTheme } = useSuitTheme();

  const navLinks = [
    { name: "TENTANG", href: "#about" },
    { name: "PROYEK", href: "#projects" },
    { name: "PENGALAMAN", href: "#experience" },
    { name: "KEAHLIAN", href: "#powers" },
    { name: "GALERI", href: "#gallery" },
    { name: "KONTAK", href: "#contact" },
  ];

  const toggleSound = () => {
    const nextState = !muted;
    setMutedState(nextState);
    setMuted(nextState);
    if (!nextState) {
      playHudBeep(980);
    }
  };

  const handleSelectTheme = (themeId) => {
    setSuitTheme(themeId);
    setShowThemePicker(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#0d0f10]/85 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Top red laser accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#e6192e] to-transparent opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={() => playWebShooter()}
              className="flex items-center gap-3 group"
            >
              {/* Spider emblem transparent logo */}
              <div className="h-10 w-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img
                  src="/logo%20spider.png"
                  alt="Spider Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_#e6192e]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-anybody text-xl font-black italic tracking-wider text-white group-hover:text-[#ff3347] transition-colors leading-none">
                  AKBAR.DEV
                </span>
                <span className="font-tech text-[10px] text-[#e6192e] font-bold tracking-widest uppercase">
                  SPIDER-PORTFOLIO
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playHudBeep(750)}
                className="font-tech text-xs font-bold tracking-widest text-slate-300 hover:text-[#ff3347] hover:glow-red transition-all duration-200 py-1 relative group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#e6192e] mr-1 transition-opacity">[</span>
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 text-[#e6192e] ml-1 transition-opacity">]</span>
              </a>
            ))}
          </div>

          {/* Right Controls: Theme Switcher, Audio Toggle & CV Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Suit Multi-Verse Theme Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  playHudBeep(600);
                  setShowThemePicker(!showThemePicker);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121414] border border-white/15 text-xs font-tech text-slate-300 hover:text-white hover:border-[#e6192e] transition-colors"
                title="Ganti Tema Spider-Suit"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#e6192e]" />
                <span className="capitalize text-[11px] font-bold">
                  {suitThemes.find((t) => t.id === suitTheme)?.name || "Suit"}
                </span>
              </button>

              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0d0f10] border-2 border-[#e6192e] p-2 shadow-2xl z-50 font-tech text-xs space-y-1"
                  >
                    <div className="text-[10px] text-slate-400 font-bold px-2 py-1 uppercase tracking-wider border-b border-white/10">
                      SPIDER-SUIT PROTOCOL:
                    </div>
                    {suitThemes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleSelectTheme(theme.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                          suitTheme === theme.id
                            ? "bg-[#e6192e] text-white font-bold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{theme.name}</span>
                        <div
                          className="h-2.5 w-2.5 rounded-full border border-white/40"
                          style={{ backgroundColor: theme.color }}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-md bg-[#121414] border border-white/15 text-slate-300 hover:text-[#e6192e] hover:border-[#e6192e] transition-colors"
              title={muted ? "Nyalakan Efek Suara SFX" : "Matikan Suara SFX"}
            >
              {muted ? <VolumeX className="h-4 w-4 text-slate-500" /> : <Volume2 className="h-4 w-4 text-[#e6192e] animate-pulse" />}
            </button>

            {/* Action Button: RESUME / CV */}
            <a
              href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playWebShooter()}
              className="btn-spider-primary inline-flex items-center gap-2 px-5 py-2 rounded-md text-xs tracking-widest relative group"
            >
              <div className="web-corner-tl" />
              <div className="web-corner-br" />
              <FileText className="h-4 w-4" />
              UNDUH CV
            </a>
          </div>

          {/* Mobile Trigger & Audio */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 text-slate-300"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#e6192e]" />}
            </button>
            <a
              href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spider-primary px-3 py-1.5 rounded text-xs tracking-widest"
            >
              CV
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-[#e6192e] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#0d0f10]/95 backdrop-blur-2xl"
          >
            <div className="space-y-2 px-4 pb-6 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playHudBeep(700);
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 font-tech text-sm font-bold text-slate-300 hover:bg-[#0b1329] hover:text-[#e6192e] border-l-2 border-transparent hover:border-[#e6192e] transition-all"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-white/10">
                <div className="font-tech text-xs text-slate-400 mb-2 font-bold">PILIH TEMA SPIDER-SUIT:</div>
                <div className="grid grid-cols-2 gap-2">
                  {suitThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        handleSelectTheme(theme.id);
                        setIsOpen(false);
                      }}
                      className={`p-2 rounded font-tech text-xs text-left border ${
                        suitTheme === theme.id
                          ? "bg-[#e6192e] text-white border-[#e6192e]"
                          : "bg-[#181b1b] text-slate-300 border-white/10"
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
