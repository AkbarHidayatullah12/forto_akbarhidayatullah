"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DeveloperProfile from "../components/DeveloperProfile";
import CreativeProfile from "../components/CreativeProfile";
import InteractiveTerminal from "../components/InteractiveTerminal";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [activeMode, setActiveMode] = useState("developer");

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-slate-100 selection:bg-brand-purple">
      {/* Sticky Navigation */}
      <Navbar activeMode={activeMode} setActiveMode={setActiveMode} />

      {/* Hero Header */}
      <Hero activeMode={activeMode} />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-24">
        {/* Dynamic developer/creative profiles switcher */}
        <AnimatePresence mode="wait">
          {activeMode === "developer" ? (
            <motion.div
              key="developer-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-32"
            >
              {/* Dev Info & Projects */}
              <DeveloperProfile />
              
              {/* CLI Terminal emulator */}
              <InteractiveTerminal />
            </motion.div>
          ) : (
            <motion.div
              key="creative-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-32"
            >
              {/* Creative leadership and Visual gallery */}
              <CreativeProfile />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Common Modules: Experience timeline & Contact Form */}
        <Timeline />
        <Contact />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
}
