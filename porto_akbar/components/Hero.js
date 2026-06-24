"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Camera, FileText, Send, Award, Cpu, Eye, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero({ activeMode }) {
  const [typedText, setTypedText] = useState("");
  const devRoles = ["Full-Stack Developer", "TRPL Student at Politeknik Negeri Padang", "Backend Architect", "Hackathon Winner"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = devRoles[roleIdx];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 100);
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
    <section className="relative overflow-hidden pt-12 pb-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {activeMode === "developer" ? (
            <motion.div
              key="dev-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 grid-bg-dense opacity-30"
            />
          ) : (
            <motion.div
              key="creative-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(83,52,131,0.15),transparent_60%)]"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Info */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Profile Avatar & CV Link */}
            <div className="flex flex-row items-center gap-6 mb-6">
              {/* Profile Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative h-28 w-28 rounded-2xl overflow-hidden border-2 ${activeMode === "developer" ? "border-brand-purple glow-purple-sm" : "border-brand-cyan glow-cyan-sm"
                  } shadow-2xl transition-all duration-300`}
              >
                <img
                  src="/abar%20biru.jpg"
                  alt="Akbar Hidayatullah"
                  className="h-full w-full object-cover object-top hover:scale-[1.05] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
              </motion.div>

              {/* CV Download / View Button */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-start gap-1.5"
              >
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Curriculum Vitae</span>
                <a
                  href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 border ${activeMode === "developer"
                      ? "bg-brand-purple/10 border-brand-purple/30 hover:bg-brand-purple/35 hover:border-brand-purple glow-purple-sm"
                      : "bg-brand-cyan/10 border-brand-cyan/30 hover:bg-brand-cyan/35 hover:border-brand-cyan glow-cyan-sm"
                    }`}
                >
                  <FileText className="h-4 w-4" />
                  Lihat / Unduh CV
                </a>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy border border-white/10 text-xs font-semibold text-brand-purple-light mb-6 uppercase tracking-wider"
            >
              {activeMode === "developer" ? (
                <>
                  <Cpu className="h-3.5 w-3.5 text-brand-purple" />
                  Engineering & Logic
                </>
              ) : (
                <>
                  <Camera className="h-3.5 w-3.5 text-brand-purple" />
                  Visual & Creativity
                </>
              )}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4"
            >
              Akbar Hidayatullah
            </motion.h1>

            {/* Subtitles & Switchable description */}
            <div className="h-16 mb-4">
              <AnimatePresence mode="wait">
                {activeMode === "developer" ? (
                  <motion.div
                    key="dev-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-lg sm:text-2xl font-bold text-slate-300"
                  >
                    <span>I build digital solutions as a </span>
                    <span className="text-brand-purple glow-purple underline decoration-brand-blue/50 underline-offset-4">
                      {typedText}
                    </span>
                    <span className="animate-pulse">|</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="creative-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg sm:text-2xl font-bold text-slate-300"
                  >
                    Mengekspresikan Cerita Melalui{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan font-extrabold">
                      Fotografi & Videografi
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main bio blurb */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed"
            >
              {activeMode === "developer" ? (
                "Mahasiswa semester 6 Teknologi Rekayasa Perangkat Lunak di Politeknik Negeri Padang dengan IPK 3,50. Berdedikasi merancang arsitektur backend optimal dan sistem full-stack mutakhir yang menyederhanakan data kompleks."
              ) : (
                "Seorang komunikator visual yang mahir memadukan keahlian fotografi, sinematografi, editing video, dan desain grafis. Dipercaya memimpin tim kreatif sebagai Kepala Bidang Kominfo HMTI PNP dan aktif dalam pengembangan ekosistem kreatif regional."
              )}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {activeMode === "developer" ? (
                <>
                  <a
                    href="#terminal"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-purple px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-purple/90 transition-all duration-300 neon-border-purple shadow-lg"
                  >
                    <Terminal className="h-4.5 w-4.5" />
                    Buka Terminal CLI
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-brand-blue/30 transition-all duration-300"
                  >
                    <FileText className="h-4.5 w-4.5" />
                    Lihat Proyek
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#gallery"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3.5 text-sm font-semibold text-white hover:opacity-95 transition-all duration-300 neon-border-purple"
                  >
                    <Eye className="h-4.5 w-4.5" />
                    Eksplorasi Galeri
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-brand-blue/30 transition-all duration-300"
                  >
                    <Send className="h-4.5 w-4.5" />
                    Hubungi Saya
                  </a>
                </>
              )}
            </motion.div>
          </div>

          {/* Graphical/Stats Element */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <AnimatePresence mode="wait">
              {activeMode === "developer" ? (
                <motion.div
                  key="dev-graphics"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md bg-brand-dark/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden neon-border-blue"
                >
                  <div className="absolute top-0 right-0 h-40 w-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Window bar */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                    <div className="flex gap-1.5">
                      <span className="h-3.5 w-3.5 rounded-full bg-red-500/80" />
                      <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/80" />
                      <span className="h-3.5 w-3.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">profile_metrics.json</span>
                  </div>

                  {/* Core Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-navy/55 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-brand-purple" />
                        IPK Akademik
                      </span>
                      <h3 className="text-3xl font-extrabold text-white">3.50</h3>
                      <span className="text-[10px] text-green-400 font-medium">Semester 6 (TRPL)</span>
                    </div>

                    <div className="bg-brand-navy/55 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Cpu className="h-3.5 w-3.5 text-brand-cyan" />
                        E-LOA System
                      </span>
                      <h3 className="text-3xl font-extrabold text-white">-50%</h3>
                      <span className="text-[10px] text-slate-400 font-medium">Pangkas Durasi Proses</span>
                    </div>

                    <div className="bg-brand-navy/55 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-brand-purple-light" />
                        PBL Platform
                      </span>
                      <h3 className="text-3xl font-extrabold text-white">+35%</h3>
                      <span className="text-[10px] text-emerald-400 font-medium">Responsivitas API</span>
                    </div>

                    <div className="bg-brand-navy/55 border border-white/5 rounded-xl p-4 flex flex-col justify-between h-28">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-yellow-500" />
                        Hackathon Unand
                      </span>
                      <h3 className="text-3xl font-extrabold text-white">Juara 3</h3>
                      <span className="text-[10px] text-yellow-400 font-medium">Neo Telemetri 2025</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="creative-graphics"
                  initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md bg-brand-dark/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden neon-border-purple"
                >
                  <div className="absolute top-0 left-0 h-40 w-40 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Decorative Elements */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Creative Roles</span>
                    <span className="text-xs text-brand-purple font-semibold">Visual Portfolio</span>
                  </div>

                  {/* Creative Roles Showcase */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-brand-navy/40 border border-white/5 rounded-xl p-3.5 hover:border-brand-purple/40 transition-colors duration-300">
                      <div className="h-10 w-10 rounded-lg bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                        <Camera className="h-5 w-5 text-brand-purple" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">Fotografi & Videografi</h4>
                        <p className="text-xs text-slate-400">Komunikasi visual, landscape, event & cinematic cuts</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-brand-navy/40 border border-white/5 rounded-xl p-3.5 hover:border-brand-purple/40 transition-colors duration-300">
                      <div className="h-10 w-10 rounded-lg bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                        <Users className="h-5 w-5 text-brand-cyan" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">Kepemimpinan Organisasi</h4>
                        <p className="text-xs text-slate-400">Kepala Bidang Kominfo HMTI PNP & Medkraf HIVE Sumbar</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-brand-navy/40 border border-white/5 rounded-xl p-3.5 hover:border-brand-purple/40 transition-colors duration-300">
                      <div className="h-10 w-10 rounded-lg bg-brand-purple-light/20 flex items-center justify-center border border-brand-purple-light/30">
                        <Award className="h-5 w-5 text-brand-purple-light" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">Komitmen Sosial</h4>
                        <p className="text-xs text-slate-400">Relawan Kebencanaan & Kontributor Media Komunitas</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
