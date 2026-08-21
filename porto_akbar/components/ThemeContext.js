"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { playSuitPowerUp } from "../utils/soundEffects";

const ThemeContext = createContext({
  suitTheme: "spectacular",
  setSuitTheme: () => {},
});

export const suitThemes = [
  {
    id: "spectacular",
    name: "Classic",
    color: "#e6192e",
    hoverColor: "#ff2a40",
    bg: "#0d0f10",
    accent: "Spectacular Red",
  },
  {
    id: "symbiote",
    name: "Symbiote",
    color: "#ffffff",
    hoverColor: "#e2e8f0",
    bg: "#000000",
    accent: "Pure White & Onyx",
  },
  {
    id: "iron-spider",
    name: "Iron Spider",
    color: "#fbbf24",
    hoverColor: "#fcd34d",
    bg: "#0a0604",
    accent: "Stark Cyber Gold",
  },
  {
    id: "miles-2099",
    name: "2099 Neon",
    color: "#00f0ff",
    hoverColor: "#38f9ff",
    bg: "#050414",
    accent: "Cyber Cyan",
  },
];

const applyThemeToDOM = (themeId) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-suit-theme", themeId);
  const theme = suitThemes.find((t) => t.id === themeId) || suitThemes[0];
  document.documentElement.style.setProperty("--spider-primary", theme.color);
  document.documentElement.style.setProperty("--spider-primary-hover", theme.hoverColor);
  document.documentElement.style.setProperty("--spider-bg", theme.bg);
};

export function ThemeProvider({ children }) {
  const [suitTheme, setSuitThemeState] = useState("spectacular");

  const setSuitTheme = (themeId) => {
    setSuitThemeState(themeId);
    if (typeof window !== "undefined") {
      localStorage.setItem("spider_suit_theme", themeId);
      applyThemeToDOM(themeId);
    }
    playSuitPowerUp();
  };

  useEffect(() => {
    const saved = localStorage.getItem("spider_suit_theme") || "spectacular";
    setSuitThemeState(saved);
    applyThemeToDOM(saved);
  }, []);

  return (
    <ThemeContext.Provider value={{ suitTheme, setSuitTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useSuitTheme = () => useContext(ThemeContext);
