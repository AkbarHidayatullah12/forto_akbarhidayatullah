"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function SpiderCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { suitTheme } = useSuitTheme();

  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  useEffect(() => {
    // Only enable on non-touch desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none flex items-center justify-center transition-colors duration-300"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: themeColor,
          boxShadow: isHovered ? `0 0 20px ${themeColor}` : `0 0 10px ${themeColor}66`,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 350,
          mass: 0.5,
        }}
      >
        {/* Crosshair marks */}
        <div className="absolute -top-1 w-0.5 h-1.5" style={{ backgroundColor: themeColor }} />
        <div className="absolute -bottom-1 w-0.5 h-1.5" style={{ backgroundColor: themeColor }} />
        <div className="absolute -left-1 h-0.5 w-1.5" style={{ backgroundColor: themeColor }} />
        <div className="absolute -right-1 h-0.5 w-1.5" style={{ backgroundColor: themeColor }} />
      </motion.div>

      {/* Center Laser Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none"
        style={{ boxShadow: `0 0 10px ${themeColor}` }}
        animate={{
          x: mousePosition.x - 0.75,
          y: mousePosition.y - 0.75,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 700,
        }}
      />
    </div>
  );
}
