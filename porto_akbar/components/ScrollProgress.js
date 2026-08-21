"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!mounted) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 pointer-events-none h-1.5 bg-black/40">
      {/* Animated Glowing Silk Thread */}
      <motion.div
        className="h-full origin-left relative transition-all duration-300"
        style={{
          scaleX,
          background: `linear-gradient(to right, #0b1329, ${themeColor}, #ffffff)`,
          boxShadow: `0 0 12px ${themeColor}`,
        }}
      >
        {/* Trailing Spider Beacon */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#0d0f10] border-2 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: themeColor,
            boxShadow: `0 0 10px ${themeColor}`,
          }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
      </motion.div>
    </div>
  );
}
