"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Rocket, Gauge, Layers, Award, Terminal, Send, Activity, Wifi } from "lucide-react";
import { useSuitTheme, suitThemes } from "./ThemeContext";

// Animated count-up hook
function useCountUp(target, duration = 1.5, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  // Metric counter refs
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });
  const count35 = useCountUp(35, 1.2, metricsInView);
  const count50 = useCountUp(50, 1.2, metricsInView);
  const count3 = useCountUp(3, 0.8, metricsInView);

  const devRoles = [
    "Full-Stack Developer",
    "Mahasiswa TRPL Politeknik Negeri Padang",
    "Backend Architect",
    "Juara 3 Firetech Hackathon 2025",
    "Creative Visual Director",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = devRoles[roleIdx];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIdx === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % devRoles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  return (
    <section id="about" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background grid — subtle, not noisy */}
      <div className="absolute inset-0 z-0 web-pattern-bg opacity-20 pointer-events-none" />

      {/* Single ambient glow — restrained */}
      <div
        className="absolute top-1/3 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15 transition-colors duration-500"
        style={{ backgroundColor: themeColor }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Clean & Focused */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Compact Identity Bar */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ borderColor: themeColor }}
                className="relative h-16 w-16 border-2 rounded-lg overflow-hidden shrink-0"
              >
                <img
                  src="/abar%20biru.jpg"
                  alt="Akbar Hidayatullah"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="flex items-center gap-1 text-emerald-400 font-tech text-[11px] font-bold">
                    <Wifi className="h-3 w-3" /> ONLINE
                  </span>
                  <span className="text-slate-500 text-[10px]">•</span>
                  <span className="font-tech text-[11px] text-slate-400">IPK 3.47 // TRPL PNP</span>
                </div>
                <h2 className="font-tech text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase">
                  HALO, SAYA AKBAR HIDAYATULLAH
                </h2>
              </div>
            </div>

            {/* Bold Headline — Breathing Room */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-anybody text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tight text-white leading-[0.92] uppercase drop-shadow-md">
                WITH GREAT CODE
              </h1>
              <h1
                className="font-anybody text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tight glow-red leading-[0.92] uppercase transition-colors duration-300"
                style={{ color: themeColor, textShadow: `0 0 20px ${themeColor}aa` }}
              >
                COMES GREAT CREATIVITY
              </h1>
            </motion.div>

            {/* Typewriter Role Bar */}
            <div
              className="spider-glass px-4 py-2.5 border-l-4 border-white/10 flex items-center gap-2 max-w-xl transition-all duration-300"
              style={{ borderLeftColor: themeColor }}
            >
              <Activity className="h-4 w-4 shrink-0" style={{ color: themeColor }} />
              <div className="font-tech text-xs sm:text-sm font-bold text-slate-200 truncate">
                <span style={{ color: themeColor }}>{typedText}</span>
                <span className="animate-pulse" style={{ color: themeColor }}>_</span>
              </div>
            </div>

            {/* Bio — Concise */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-sans"
            >
              Mahasiswa semester 7 Teknologi Rekayasa Perangkat Lunak di Politeknik Negeri Padang dengan IPK 3,47. Berdedikasi merancang arsitektur backend optimal, sistem web & mobile full-stack mutakhir, serta memadukan logika rekayasa perangkat lunak dengan keahlian fotografi & komunikasi visual.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                className="btn-spider-primary inline-flex items-center gap-2.5 px-7 py-3.5 text-xs tracking-wider font-extrabold relative group"
              >
                <div className="web-corner-tl" />
                <div className="web-corner-br" />
                LIHAT PROYEK
                <Rocket className="h-4 w-4" />
              </a>
              <a
                href="#terminal"
                className="btn-spider-outline inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-wider relative group"
              >
                <div className="web-corner-tl" />
                <div className="web-corner-br" />
                <Terminal className="h-4 w-4" style={{ color: themeColor }} />
                TERMINAL CLI
              </a>
              <a
                href="#contact"
                className="btn-spider-outline inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-wider relative group"
              >
                <div className="web-corner-tl" />
                <div className="web-corner-br" />
                <Send className="h-4 w-4" style={{ color: themeColor }} />
                HUBUNGI SAYA
              </a>
            </motion.div>
          </div>

          {/* Right Column — Clean Circular HUD */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
            >
              {/* Outer Ring */}
              <div
                className="absolute inset-0 rounded-full border-3 animate-spider-pulse transition-colors duration-500"
                style={{ borderColor: themeColor, boxShadow: `0 0 30px ${themeColor}66` }}
              />
              <div
                className="absolute inset-4 rounded-full border border-dashed animate-radar transition-colors duration-500"
                style={{ borderColor: `${themeColor}55` }}
              />

              {/* Minimal Tick Marks — only top & bottom */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 font-tech text-[10px] font-bold bg-[#0d0f10] px-2 border transition-colors duration-300"
                style={{ color: themeColor, borderColor: `${themeColor}44` }}
              >
                IPK: 3.47 // TRPL
              </div>
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-tech text-[10px] font-bold bg-[#0d0f10] px-2 border transition-colors duration-300"
                style={{ color: themeColor, borderColor: `${themeColor}44` }}
              >
                POLITEKNIK NEGERI PADANG
              </div>

              {/* Center Emblem — Clean */}
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center p-6 relative group">
                <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                  <img
                    src="/logo%20spider.png"
                    alt="Spider Emblem"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 0 25px ${themeColor})` }}
                  />
                </div>
                <span
                  className="font-tech text-xs sm:text-sm font-bold tracking-widest uppercase mt-2 transition-colors duration-300"
                  style={{ color: themeColor }}
                >
                  AKBAR HIDAYATULLAH
                </span>
                <span className="font-tech text-[10px] text-slate-400 tracking-wider">
                  FULL-STACK & CREATIVE
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-full h-[1px]"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${themeColor}66, transparent)` }}
          />
          <div
            className="absolute h-3 w-3 bg-[#0d0f10] border-2 rotate-45"
            style={{ borderColor: themeColor }}
          />
        </div>

        {/* Spider-Sense Metrics — Cleaner */}
        <div className="space-y-10 text-center">
          <div className="space-y-2">
            <div
              className="font-tech text-xs font-bold tracking-widest uppercase transition-colors duration-300"
              style={{ color: themeColor }}
            >
              [ SPIDER-SENSE // METRIK UTAMA ]
            </div>
            <h2 className="font-anybody text-3xl sm:text-4xl font-black italic tracking-wide text-white uppercase">
              METRIK DAMPAK & PERFORMA
            </h2>
          </div>

          <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              whileHover={{ y: -4 }}
              className="metallic-blue-card p-6 space-y-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-10 w-10 rounded-lg bg-[#0b1329] border border-[#1d2847] flex items-center justify-center"
                  style={{ color: themeColor }}
                >
                  <Gauge className="h-5 w-5" />
                </div>
                <span
                  className="font-tech text-xs font-bold px-2.5 py-1 border rounded transition-colors duration-300"
                  style={{ color: themeColor, backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40` }}
                >
                  +{count35}% SPEEDUP
                </span>
              </div>
              <h3 className="font-anybody text-lg font-bold italic text-white">
                Optimalisasi API (PBL)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Mengoptimalkan waktu respons transaksi e-catalog Toko Usaha Muda Padang menggunakan Next.js & REST API MySQL.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="metallic-blue-card p-6 space-y-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-10 w-10 rounded-lg bg-[#0b1329] border border-[#1d2847] flex items-center justify-center"
                  style={{ color: themeColor }}
                >
                  <Layers className="h-5 w-5" />
                </div>
                <span
                  className="font-tech text-xs font-bold px-2.5 py-1 border rounded transition-colors duration-300"
                  style={{ color: themeColor, backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40` }}
                >
                  -{count50}% DURASI
                </span>
              </div>
              <h3 className="font-anybody text-lg font-bold italic text-white">
                Efisiensi Sistem E-LOA
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Memangkas durasi alur kerja dokumen melalui otomatisasi workflow Laravel dan validasi PostgreSQL.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="metallic-blue-card p-6 space-y-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-[#0b1329] border border-[#1d2847] flex items-center justify-center text-yellow-400">
                  <Award className="h-5 w-5" />
                </div>
                <span className="font-tech text-xs font-bold text-yellow-400 bg-yellow-400/15 px-2.5 py-1 border border-yellow-400/40 rounded">
                  JUARA {count3}
                </span>
              </div>
              <h3 className="font-anybody text-lg font-bold italic text-white">
                Firetech Hackathon 2025
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Merancang purwarupa aplikasi tanggap darurat dalam batas waktu 24 jam di Universitas Andalas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
