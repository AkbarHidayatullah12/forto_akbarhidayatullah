"use client";

import { useState } from "react";
import { Menu, X, Code2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ activeMode, setActiveMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Tentang", href: "#about" },
    { name: "Proyek", href: "#projects" },
    { name: "Pengalaman", href: "#experience" },
    ...(activeMode === "creative" ? [{ name: "Galeri", href: "#gallery" }] : []),
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-black/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight">
              <span className="text-brand-purple glow-purple">&lt;</span>
              <span className="text-white">
                {activeMode === "developer" ? "akbar.dev" : "akbar.lens"}
              </span>
              <span className="text-brand-purple glow-purple">/&gt;</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Dual Mode Toggle (Desktop) */}
          <div className="hidden md:flex items-center">
            <div className="relative flex rounded-full bg-brand-navy p-1 border border-white/10">
              {/* Highlight Slide */}
              <motion.div
                className="absolute inset-y-1 rounded-full bg-brand-purple"
                layoutId="activeModeIndicator"
                initial={false}
                animate={{
                  x: activeMode === "developer" ? 0 : 106,
                  width: activeMode === "developer" ? 116 : 106,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              <button
                onClick={() => setActiveMode("developer")}
                className={`relative z-10 flex items-center gap-2 px-3 py-1 text-xs font-semibold transition-colors duration-200 rounded-full ${
                  activeMode === "developer" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                Developer
              </button>
              
              <button
                onClick={() => setActiveMode("creative")}
                className={`relative z-10 flex items-center gap-2 px-3 py-1 text-xs font-semibold transition-colors duration-200 rounded-full ${
                  activeMode === "creative" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                Creative
              </button>
            </div>
          </div>

          {/* Mobile Menu & Toggle Controls */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mode Switch Button (Mobile Mini) */}
            <button
              onClick={() => setActiveMode(activeMode === "developer" ? "creative" : "developer")}
              className="flex items-center gap-1 rounded-full bg-brand-navy border border-white/10 p-1.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              {activeMode === "developer" ? (
                <>
                  <Code2 className="h-4.5 w-4.5 text-brand-purple" />
                  <span className="sr-only">Switch to Creative</span>
                </>
              ) : (
                <>
                  <Camera className="h-4.5 w-4.5 text-brand-purple" />
                  <span className="sr-only">Switch to Developer</span>
                </>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-brand-navy hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-brand-black/95 backdrop-blur-lg"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-slate-300 hover:bg-brand-navy hover:text-white transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="border-t border-white/10 pt-4 mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">Mode Tampilan:</span>
                <div className="flex rounded-full bg-brand-navy p-1 border border-white/10">
                  <button
                    onClick={() => {
                      setActiveMode("developer");
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      activeMode === "developer" ? "bg-brand-purple text-white" : "text-slate-400"
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    Developer
                  </button>
                  <button
                    onClick={() => {
                      setActiveMode("creative");
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      activeMode === "creative" ? "bg-brand-purple text-white" : "text-slate-400"
                    }`}
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Creative
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
