"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Crosshair, Trophy, Zap, ShieldAlert, Target } from "lucide-react";
import { playWebShooter, playHudBeep, playSuitPowerUp } from "../utils/soundEffects";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function SpiderGameModal({ isOpen, onClose }) {
  const [gameState, setGameState] = useState("ready"); // "ready", "playing", "gameover"
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);
  const [webSplats, setWebSplats] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const targetIdRef = useRef(0);
  const arenaRef = useRef(null);

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("spider_game_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Game Loop Timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        if (prev <= 5) playHudBeep(440);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Target Spawner Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const spawnInterval = setInterval(() => {
      setTargets((prev) => {
        if (prev.length >= 5) return prev;

        const id = targetIdRef.current++;
        const x = Math.floor(Math.random() * 75) + 10; // 10% to 85%
        const y = Math.floor(Math.random() * 65) + 15; // 15% to 80%
        const types = [
          { name: "GLIDER DRONE", points: 150, size: 52, color: "#22c55e", icon: "🛸" },
          { name: "DOC OCK RETICLE", points: 200, size: 48, color: "#f59e0b", icon: "🦾" },
          { name: "ELECTRO CORE", points: 250, size: 44, color: "#06b6d4", icon: "⚡" },
          { name: "SYMBIOTE ORB", points: 300, size: 40, color: themeColor, icon: "🕷️" },
        ];
        const selectedType = types[Math.floor(Math.random() * types.length)];

        return [
          ...prev,
          {
            id,
            x,
            y,
            ...selectedType,
            spawnTime: Date.now(),
            lifetime: 2400, // 2.4s before disappearing
          },
        ];
      });
    }, 600);

    return () => clearInterval(spawnInterval);
  }, [gameState, themeColor]);

  // Target Expiration Cleanup
  useEffect(() => {
    if (gameState !== "playing") return;

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTargets((prev) => {
        const remaining = prev.filter((t) => now - t.spawnTime < t.lifetime);
        if (remaining.length < prev.length) {
          // Missed target resets combo
          setCombo(0);
        }
        return remaining;
      });
    }, 200);

    return () => clearInterval(cleanupInterval);
  }, [gameState]);

  const startGame = () => {
    playSuitPowerUp();
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setTargets([]);
    setWebSplats([]);
    setGameState("playing");
  };

  const endGame = () => {
    playHudBeep(220);
    setGameState("gameover");
    setTargets([]);
    setScore((finalScore) => {
      if (finalScore > highScore) {
        setHighScore(finalScore);
        if (typeof window !== "undefined") {
          localStorage.setItem("spider_game_highscore", finalScore.toString());
        }
      }
      return finalScore;
    });
  };

  const handleHitTarget = (e, target) => {
    e.stopPropagation();
    playWebShooter();

    const rect = arenaRef.current?.getBoundingClientRect();
    if (rect) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const splatId = Math.random();
      setWebSplats((prev) => [...prev, { id: splatId, x: clickX, y: clickY }]);
      setTimeout(() => {
        setWebSplats((prev) => prev.filter((s) => s.id !== splatId));
      }, 700);
    }

    const currentCombo = combo + 1;
    setCombo(currentCombo);
    const multiplier = 1 + Math.min(currentCombo * 0.2, 2.5);
    const earned = Math.round(target.points * multiplier);
    setScore((prev) => prev + earned);

    // Remove hit target
    setTargets((prev) => prev.filter((t) => t.id !== target.id));
  };

  const getRank = () => {
    if (score >= 4500) return { title: "SPIDER-SENSE MASTER (AVENGER LEVEL)", color: "#e6192e" };
    if (score >= 3000) return { title: "SPECTACULAR HERO", color: "#38bdf8" };
    if (score >= 1500) return { title: "WEB-SLINGER APPRENTICE", color: "#fbbf24" };
    return { title: "PETER PARKER NOVICE", color: "#94a3b8" };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-[#080a0c] border-2 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-tech"
        style={{ borderColor: themeColor, boxShadow: `0 0 50px ${themeColor}66` }}
      >
        {/* HUD Top Navigation Bar */}
        <div className="bg-[#0f1318] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black border" style={{ borderColor: themeColor }}>
              <Crosshair className="h-5 w-5 animate-spin-slow" style={{ color: themeColor }} />
            </div>
            <div>
              <div className="text-sm sm:text-base font-anybody font-black italic text-white uppercase tracking-wider">
                STARK COMBAT SIMULATOR // REFLEX PROTOCOL
              </div>
              <div className="text-[10px] text-slate-400">
                TEMBAK TARGET HOLOGRAM DENGAN WEB-SHOOTER UNTUK MENGUJI KECEPATAN REFLEKS
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playHudBeep(500);
              onClose();
            }}
            className="p-2 rounded-lg bg-black/60 text-slate-400 hover:text-white hover:border-red-500 border border-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* HUD Telemetry Status Bar */}
        <div className="bg-[#0b0e12] border-b border-white/10 px-6 py-3 grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">WAKTU TERSISA</div>
            <div
              className={`text-xl sm:text-2xl font-black ${timeLeft <= 5 ? "text-red-500 animate-ping" : "text-white"}`}
            >
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">SKOR REFLEKS</div>
            <div className="text-xl sm:text-2xl font-black" style={{ color: themeColor }}>
              {score}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">COMBO STREAK</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {combo > 0 ? `x${combo}` : "-"}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">REKOR TERTINGGI</div>
            <div className="text-xl sm:text-2xl font-black text-slate-200">
              {highScore}
            </div>
          </div>
        </div>

        {/* Combat Hologram Arena Canvas Area */}
        <div
          ref={arenaRef}
          className="relative w-full h-[420px] bg-[#050608] overflow-hidden select-none cursor-crosshair hud-grid-bg"
        >
          {/* Circular Hologram Reticles in Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[340px] h-[340px] rounded-full border border-dashed animate-radar" style={{ borderColor: themeColor }} />
            <div className="absolute w-[220px] h-[220px] rounded-full border border-white/20" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Web Splat Particle FX on Click */}
          {webSplats.map((splat) => (
            <motion.div
              key={splat.id}
              initial={{ scale: 0.3, opacity: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute pointer-events-none z-30"
              style={{ left: splat.x - 24, top: splat.y - 24 }}
            >
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke={themeColor} strokeWidth="3">
                <circle cx="50" cy="50" r="15" />
                <circle cx="50" cy="50" r="30" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="15" y1="15" x2="85" y2="85" />
                <line x1="85" y1="15" x2="15" y2="85" />
              </svg>
            </motion.div>
          ))}

          {/* Hologram Targets */}
          {gameState === "playing" &&
            targets.map((target) => (
              <motion.button
                key={target.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => handleHitTarget(e, target)}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  borderColor: target.color,
                  boxShadow: `0 0 20px ${target.color}`,
                }}
                className="absolute z-20 rounded-full border-2 p-2 bg-black/80 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group hover:scale-125 transition-transform"
              >
                <span className="text-xl sm:text-2xl select-none">{target.icon}</span>
                <span
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1 rounded bg-black border whitespace-nowrap"
                  style={{ color: target.color, borderColor: `${target.color}66` }}
                >
                  +{target.points}
                </span>
              </motion.button>
            ))}

          {/* Ready Overlay Screen */}
          {gameState === "ready" && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-black/75 space-y-5">
              <div className="p-4 rounded-full bg-black/80 border-2" style={{ borderColor: themeColor }}>
                <Target className="h-12 w-12 animate-pulse" style={{ color: themeColor }} />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-anybody text-3xl font-black italic text-white uppercase">
                  SIMULATOR REFLEKS LABA-LABA
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Target drone hologram akan muncul selama 30 detik. Klik secepat mungkin menggunakan Web-Shooter Anda untuk membangun streak combo dan membuktikan refleks Spider-Sense Anda!
                </p>
              </div>
              <button
                onClick={startGame}
                className="btn-spider-primary px-8 py-3.5 rounded-xl text-sm font-black tracking-widest inline-flex items-center gap-2"
              >
                <Play className="h-4 w-4" /> MULAI SIMULASI SEKARANG
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-black/85 space-y-5">
              <div className="p-4 rounded-full bg-black/80 border-2" style={{ borderColor: getRank().color }}>
                <Trophy className="h-12 w-12" style={{ color: getRank().color }} />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  SIMULASI SELESAI // EVALUASI REFLEKS:
                </div>
                <div
                  className="font-anybody text-2xl sm:text-4xl font-black italic uppercase"
                  style={{ color: getRank().color }}
                >
                  {getRank().title}
                </div>
                <div className="text-sm text-slate-200">
                  Total Skor Refleks Anda: <span className="font-bold text-white text-lg">{score} PTS</span>
                  {score >= highScore && score > 0 && (
                    <span className="text-emerald-400 block text-xs font-bold mt-1">🎉 REKOR SKOR BARU TERDAFTAR!</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={startGame}
                  className="btn-spider-primary px-7 py-3 rounded-xl text-xs font-black tracking-widest inline-flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" /> COBA LAGI
                </button>
                <button
                  onClick={onClose}
                  className="btn-spider-outline px-6 py-3 rounded-xl text-xs font-bold tracking-widest"
                >
                  KEMBALI KE PORTOFOLIO
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Instructions */}
        <div className="bg-[#0b0e12] border-t border-white/10 px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span>TIPS: JANGAN LEWATKAN TARGET AGAR COMBO MULTIPLIER TIDAK RESET!</span>
          <span>SUIT PROTOCOL: {currentSuit.name.toUpperCase()}</span>
        </div>
      </motion.div>
    </div>
  );
}
