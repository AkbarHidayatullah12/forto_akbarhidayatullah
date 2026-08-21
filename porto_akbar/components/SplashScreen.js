"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinished }) {
  const [phase, setPhase] = useState("loading"); // "loading" | "revealing" | "done"

  useEffect(() => {
    // Phase 1: Logo spin + web shoot (1.5s)
    const t1 = setTimeout(() => setPhase("revealing"), 1500);
    // Phase 2: Slide away (0.6s)
    const t2 = setTimeout(() => {
      setPhase("done");
      onFinished();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Radial glow behind logo */}
          <div className="absolute w-80 h-80 rounded-full bg-[#e6192e]/20 blur-3xl animate-pulse" />

          {/* Spider Web Lines radiating outward */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#e6192e"
            strokeWidth="0.3"
          >
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="50" r="24" />
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="48" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <line x1="14.6" y1="14.6" x2="85.4" y2="85.4" />
            <line x1="85.4" y1="14.6" x2="14.6" y2="85.4" />
          </motion.svg>

          {/* Spider Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10"
          >
            <img
              src="/logo%20spider.png"
              alt="Loading..."
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_40px_rgba(230,25,46,0.9)]"
            />
          </motion.div>

          {/* Brand Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-10 mt-6 text-center"
          >
            <div className="font-anybody text-2xl sm:text-3xl font-black italic tracking-wider text-white uppercase">
              AKBAR.DEV
            </div>
            <div className="font-tech text-[11px] text-[#e6192e] font-bold tracking-[0.3em] uppercase mt-1">
              SPIDER-PORTFOLIO // LOADING
            </div>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#e6192e] to-[#ff3347] rounded-full shadow-[0_0_10px_#e6192e]"
            />
          </motion.div>

          {/* Wipe Reveal Curtain */}
          {phase === "revealing" && (
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-0 bg-black z-20"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
