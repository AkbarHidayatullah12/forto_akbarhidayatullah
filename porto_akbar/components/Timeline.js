"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Code2, Camera, Award, GraduationCap, Briefcase, Users, Heart } from "lucide-react";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function Timeline() {
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const journeyTimeline = [
    {
      year: "2025 - 2026",
      title: "Kepala Bidang Kominfo",
      org: "HMTI Politeknik Negeri Padang",
      desc: "Memimpin divisi Komunikasi dan Informatika dalam mengelola media publikasi digital, menyebarkan informasi akademis ke seluruh mahasiswa IT, serta memproduksi konten multimedia yang informatif dan menarik.",
      tag: "ORGANISASI",
      icon: Users,
    },
    {
      year: "2025",
      title: "Juara 3 Neo Telemetri Firetech Hackathon",
      org: "Universitas Andalas Firetech 2025",
      desc: "Menjuarai kompetisi hackathon tingkat regional dengan merancang, membangun, dan menyajikan purwarupa aplikasi inovatif di bawah tekanan waktu yang ketat.",
      tag: "PRESTASI",
      icon: Award,
    },
    {
      year: "2023 - SEKARANG",
      title: "D4 Teknologi Rekayasa Perangkat Lunak",
      org: "Politeknik Negeri Padang (IPK 3.47)",
      desc: "Mahasiswa Semester 7 dengan IPK 3,51. Mempelajari rekayasa kebutuhan perangkat lunak, arsitektur database, desain API, pemrograman framework web dan mobile.",
      tag: "PENDIDIKAN",
      icon: GraduationCap,
    },
    {
      year: "2025",
      title: "Ketua Bidang Medkraf",
      org: "HIVE Sumatera Barat",
      desc: "Mengoordinasi perumusan konsep kreatif, pembuatan desain branding, serta produksi video promosi untuk memperluas jangkauan komunitas kreatif digital di Sumatera Barat.",
      tag: "KOMUNITAS",
      icon: Camera,
    },
    {
      year: "2021",
      title: "Magang Data Operasional",
      org: "PT Garuda Cyber Indonesia",
      desc: "Mengelola, memproses, dan memvalidasi data operasional internal perusahaan. Belajar mengimplementasikan struktur data praktis dan memahami alur kerja di industri teknologi secara langsung.",
      tag: "MAGANG / KARIR",
      icon: Briefcase,
    },
    {
      year: "AKTIF",
      title: "Relawan Kebencanaan",
      org: "Aksi Dedikasi Sosial & Kemanusiaan",
      desc: "Menyalurkan kepedulian sosial yang tinggi melalui partisipasi langsung sebagai relawan kebencanaan. Membantu koordinasi bantuan logistik dan penyebaran informasi tanggap darurat.",
      tag: "AKSI SOSIAL",
      icon: Heart,
    },
    {
      year: "SEBELUM 2023",
      title: "Pendidikan Linear Bidang IT",
      org: "SMKN 2 Padang",
      desc: "Mulai menempuh dasar keilmuan linear di bidang IT, mendalami logika dasar komputer, pemrograman web dasar, serta pemecahan masalah logika sederhana.",
      tag: "PENDIDIKAN DASAR",
      icon: GraduationCap,
    },
  ];

  const superPowers = [
    {
      name: "PENGEMBANGAN WEB & FRONTEND",
      level: 95,
      desc: "Merancang antarmuka web modern yang responsif, interaktif, dan berkinerja tinggi dengan arsitektur komponen terstruktur.",
      tags: ["Next.js", "React", "JavaScript", "Tailwind CSS", "UI/UX"],
      icon: Code2,
    },
    {
      name: "ARSITEKTUR BACKEND & REST API",
      level: 92,
      desc: "Membangun sistem backend yang andal, aman, terukur, dan teruji performanya melalui integrasi RESTful API.",
      tags: ["Laravel", "RESTful API", "Express.js", "PHP", "Security"],
      icon: Cpu,
    },
    {
      name: "DESAIN & MANAJEMEN DATABASE",
      level: 88,
      desc: "Merancang skema relasional ternormalisasi, optimasi query berkecepatan tinggi, dan integritas data multi-tabel.",
      tags: ["MySQL", "PostgreSQL", "Normalisasi", "Query Tuning"],
      icon: Shield,
    },
    {
      name: "KOMUNIKASI VISUAL & KREATIF",
      level: 94,
      desc: "Mengeksekusi arahan visual profesional, mulai dari fotografi portrait/landscape, sinematografi, hingga produksi media.",
      tags: ["Fotografi", "Sinematografi", "Video Editing", "Creative Direction"],
      icon: Camera,
    },
    {
      name: "AGILE & RAPID PROTOTYPING",
      level: 90,
      desc: "Kemampuan pemecahan masalah cepat dan kerja tim tangkas di bawah tekanan waktu kompetisi hackathon.",
      tags: ["Agile/Scrum", "Git Workflows", "Problem Solving", "Rapid Prototyping"],
      icon: Zap,
    },
  ];

  return (
    <section id="experience" className="space-y-20 pt-8">
      {/* Section Header */}
      <div className="border-b-2 border-[#2a2e33] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div
            className="font-tech text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
            style={{ color: themeColor }}
          >
            [ DEDIKASI & KOMPETENSI TEKNOLOGI ]
          </div>
          <h2 className="font-anybody text-4xl sm:text-5xl font-black italic tracking-wide text-white uppercase">
            PENGALAMAN & KEAHLIAN
          </h2>
        </div>
        <p className="font-tech text-xs text-slate-400 max-w-md">
          REKAM JEJAK AKADEMIS, KEPEMIMPINAN MEDIA, SERTA ANALISIS LEVEL KEKUATAN TEKNIS.
        </p>
      </div>

      {/* Grid: Left - The Journey Timeline, Right - Super Powers Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: The Journey Vertical Timeline */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 rotate-45 shadow-sm transition-colors duration-300"
              style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
            />
            <h3 className="font-anybody text-2xl font-black italic text-white uppercase">
              PERJALANAN KARIR & AKADEMIS
            </h3>
          </div>

          {/* Timeline Container with Blue Line and Glowing Red Nodes */}
          <div className="relative border-l-2 border-[#1d2847] pl-7 ml-3 space-y-8">
            {journeyTimeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing Node on Blue Line */}
                  <div
                    className="absolute -left-[37px] top-2 h-4.5 w-4.5 bg-[#0d0f10] border-2 rotate-45 flex items-center justify-center group-hover:scale-125 transition-all duration-300"
                    style={{ borderColor: themeColor, boxShadow: `0 0 12px ${themeColor}` }}
                  >
                    <div className="h-1.5 w-1.5" style={{ backgroundColor: themeColor }} />
                  </div>

                  {/* Journey Glass Card */}
                  <div className="spider-glass-card rounded-xl p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between font-tech text-xs">
                      <span
                        className="font-bold tracking-wider px-2.5 py-0.5 border rounded transition-colors duration-300"
                        style={{ color: themeColor, backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40` }}
                      >
                        [{item.tag}]
                      </span>
                      <span className="text-slate-300 font-bold bg-[#0b1329] px-2.5 py-0.5 border border-[#1d2847] rounded">
                        {item.year}
                      </span>
                    </div>

                    <h4
                      className="font-anybody text-lg sm:text-xl font-bold italic text-white transition-colors"
                    >
                      {item.title}
                    </h4>

                    <div className="text-xs font-bold text-slate-300 font-tech">
                      {item.org}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Super Powers Cards with Enhanced Readability & Depth */}
        <div id="powers" className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 rotate-45 shadow-sm transition-colors duration-300"
              style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
            />
            <h3 className="font-anybody text-2xl font-black italic text-white uppercase">
              SUPER POWERS // KEAHLIAN TEKNIS
            </h3>
          </div>

          <div className="space-y-5">
            {superPowers.map((power, idx) => {
              const Icon = power.icon;
              return (
                <motion.div
                  key={power.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="metallic-blue-card p-6 space-y-4 rounded-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-lg bg-[#0b1329] border shadow-sm transition-colors duration-300"
                        style={{ borderColor: `${themeColor}66`, color: themeColor }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-anybody text-base sm:text-lg font-extrabold italic text-white tracking-wide">
                        {power.name}
                      </h4>
                    </div>
                    <span
                      className="font-tech text-xs sm:text-sm font-bold border px-2.5 py-1 rounded transition-colors duration-300"
                      style={{ color: themeColor, backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40` }}
                    >
                      TINGKAT: {power.level}%
                    </span>
                  </div>

                  {/* Description with improved contrast, font size, and line-height */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {power.desc}
                  </p>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {power.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-tech font-bold text-slate-300 bg-[#0d0f10] border border-[#1d2847] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Animated High-Tech Power Level Meter with dynamic theme gradient */}
                  <div className="w-full bg-[#0d0f10] h-2.5 rounded-full border border-[#1d2847] overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${power.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      className="h-full rounded-full shadow-md transition-all duration-500"
                      style={{
                        background: `linear-gradient(to right, #0b1329, ${themeColor}, #ffffff)`,
                        boxShadow: `0 0 12px ${themeColor}`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
