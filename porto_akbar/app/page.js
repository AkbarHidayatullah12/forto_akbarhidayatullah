"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DeveloperProfile from "../components/DeveloperProfile";
import Timeline from "../components/Timeline";
import CreativeProfile from "../components/CreativeProfile";
import InteractiveTerminal from "../components/InteractiveTerminal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SpiderWebCanvas from "../components/SpiderWebCanvas";
import ScrollProgress from "../components/ScrollProgress";
import SpiderCursor from "../components/SpiderCursor";
import SpiderGameModal from "../components/SpiderGameModal";
import SplashScreen from "../components/SplashScreen";
import { ThemeProvider } from "../components/ThemeContext";

export default function Home() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleOpenGame = () => setIsGameOpen(true);
    window.addEventListener("open_spider_game", handleOpenGame);
    return () => window.removeEventListener("open_spider_game", handleOpenGame);
  }, []);

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ThemeProvider>
      {/* Cinematic Splash Loading Screen */}
      {showSplash && <SplashScreen onFinished={handleSplashFinished} />}

      <div className="flex flex-col min-h-screen bg-[#0d0f10] text-slate-100 selection:bg-[#e6192e] selection:text-white relative">
        {/* Custom Spider-Reticle Cursor for Desktop */}
        <SpiderCursor />

        {/* Scroll Progress Spider-Silk Bar */}
        <ScrollProgress />

        {/* Interactive Spider Web Canvas Background */}
        <SpiderWebCanvas />

        {/* Spider Combat Training Simulator Easter Egg Modal */}
        <SpiderGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

        {/* Fixed Navigation Bar with Theme & Audio Controls */}
        <Navbar />

        {/* Hero Section & Spider-Sense Tingling Highlights */}
        <Hero />

        {/* Main Container */}
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
          {/* Rekam Jejak Proyek (2x2 Grid + 3D Tilt + Declassified Blueprint Modal) */}
          <DeveloperProfile />

          {/* Perjalanan Karir & Keahlian (Timeline & Super Powers Power Bars) */}
          <Timeline />

          {/* Galeri Kreatif & Visual */}
          <CreativeProfile />

          {/* Terminal Interaktif HUD with Easter Egg Game Launch */}
          <InteractiveTerminal />

          {/* Formulir Kontak & Saluran Komunikasi */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
