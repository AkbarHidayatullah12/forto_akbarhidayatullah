"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, X, ExternalLink, ShieldCheck, CheckCircle2, Terminal } from "lucide-react";
import TiltCard from "./TiltCard";
import { playHudBeep, playWebShooter } from "../utils/soundEffects";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function DeveloperProfile() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const projects = [
    {
      id: "01",
      title: "Textile Hub (PBL Toko Usaha Muda)",
      role: "Backend Architect & Developer",
      metric: "+35% RESPONSIVITAS API",
      desc: "Membangun sistem informasi dan e-catalog web terintegrasi untuk Toko Usaha Muda Padang (mitra PBL). Merancang arsitektur database MySQL, diagram use case/activity, serta menyusun REST API yang responsif dan berkinerja tinggi.",
      tags: ["UI/UX", "NEXT.JS", "REST API", "MYSQL"],
      link: "https://github.com/intersectcode-A1/intersectcode_textilehub.git",
      image: "/dokumentasi_PBL.jpeg",
      blueprint: {
        architecture: "Next.js 14 Frontend + Node/Express REST API Core + MySQL Relational Normalization",
        challenge: "Menghubungkan alur transaksi kasir, data stok multi-varian kain, dan katalog publik dalam satu ekosistem web tanpa bottleneck query.",
        solution: "Menerapkan query caching, pagination cerdas, dan indexing pada foreign key transaksi sehingga meningkatkan throughput data sebesar 35%.",
        stats: ["Response Time: <120ms", "DB Schema: 3NF Normalized", "Role: Full Backend Pipeline"],
      },
    },
    {
      id: "02",
      title: "Sistem E-LOA (Surat Tugas Elektronik)",
      role: "Full-Stack Developer",
      metric: "-50% DURASI PROSES",
      desc: "Mendesain dan mengembangkan sistem Surat Tugas Elektronik (E-LOA) dari nol. Sistem ini mengotomatiskan approval workflow, pengiriman PDF dinamis, dan validasi data secara realtime.",
      tags: ["FULL-STACK", "LARAVEL", "POSTGRESQL", "TAILWIND"],
      link: "https://github.com/AkbarHidayatullah12/proyek_rumah_jurnal_akbar.git",
      image: "/dokumentasi_eloa.jpeg",
      blueprint: {
        architecture: "Laravel 11 MVC + PostgreSQL Relational Engine + DomPDF Generator + Tailwind UI",
        challenge: "Mengeliminasi proses manual verifikasi berkas cetak fisik antar pimpinan yang seringkali memakan waktu berhari-hari.",
        solution: "Membangun multi-tier role approval system (Admin, Reviewer, Pimpinan) dengan digital signature tracking dan notifikasi otomatis.",
        stats: ["Proses Pangkas: 50% Waktu", "Keamanan: CSRF & Role Guard", "Output: PDF Dinamis Otomatis"],
      },
    },
    {
      id: "03",
      title: "Neo Telemetri Firetech Hackathon 2025",
      role: "Juara 3 Winner Project (Frontend Dev)",
      metric: "JUARA 3 REGIONAL UNAND",
      desc: "Membangun purwarupa aplikasi inovatif dalam batas waktu 24 jam. Bertanggung jawab atas integrasi backend RESTful API yang cepat, andal, dan siap diuji oleh dewan juri kompetisi Universitas Andalas.",
      tags: ["HACKATHON", "FRONTEND", "REACT", "AGILE"],
      link: "https://github.com/Dafa-Aziul/SapaSumbar.git",
      image: "/juara3hackathon.jpeg",
      blueprint: {
        architecture: "React Real-Time Dispatch + Leaflet Telemetry Map + RESTful Microservices",
        challenge: "Membangun purwarupa tanggap darurat bencana komprehensif dalam batas waktu ketat 24 jam non-stop.",
        solution: "Memanfaatkan metodologi Agile/Scrum cepat, standardisasi state management, dan mock API integration untuk live demo dewan juri.",
        stats: ["Waktu Pengerjaan: 24 Jam", "Hasil: Juara 3 Regional UNAND", "Fitur: Incident Mapping Realtime"],
      },
    },
    {
      id: "04",
      title: "Manajemen Media HMTI & HIVE Sumbar",
      role: "Kepala Bidang Kominfo & Medkraf",
      metric: "KREATIF & KOMUNIKASI",
      desc: "Memimpin divisi komunikasi visual dan publikasi digital HMTI PNP & HIVE Sumbar, mengarahkan produksi konten multimedia, desain identitas visual, dan manajemen media sosial organisasi.",
      tags: ["LEADERSHIP", "CREATIVE DIRECTION", "VIDEOGRAFI", "FOTOGRAFI"],
      link: "https://www.instagram.com/akbar_hidytllh/",
      image: "/kepala_bidang_kominfo.jpeg",
      blueprint: {
        architecture: "Adobe Creative Cloud Suite + DaVinci Resolve + Multi-Platform Publishing Pipeline",
        challenge: "Menyatukan konsistensi visual branding dan meningkatkan engagement audiens mahasiswa IT di seluruh kanal media publikasi.",
        solution: "Menyusun sistem panduan identitas brand visual (Brand Guideline) dan timeline produksi video berkala yang terukur.",
        stats: ["Jangkauan Media: Ribuan Audiens", "Produksi: Event & Video Teaser", "Peran: Kepala Bidang Kominfo"],
      },
    },
  ];

  const handleOpenModal = (project) => {
    playWebShooter();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    playHudBeep();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="space-y-12 pt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#2a2e33] pb-6 gap-4">
        <div>
          <div
            className="font-tech text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
            style={{ color: themeColor }}
          >
            [ REKAM JEJAK // KARYA & PROYEK ]
          </div>
          <h2 className="font-anybody text-4xl sm:text-5xl font-black italic tracking-wide text-white uppercase">
            PROYEK UNGGULAN
          </h2>
        </div>
        <p className="font-tech text-xs text-slate-400 max-w-md">
          BERKAS TERDEKLASIFIKASI: KLIK KARTU UNTUK MEMBUKA CETAK BIRU (BLUEPRINT) ARSITEKTUR & ANALISIS SISTEM.
        </p>
      </div>

      {/* 2x2 Grid of 3D Tilt Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <TiltCard key={project.id} className="rounded-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group spider-glass-card rounded-xl flex flex-col justify-between overflow-hidden relative h-full cursor-pointer transition-all duration-300"
              style={{ "--theme-color": themeColor }}
              onClick={() => handleOpenModal(project)}
            >
              {/* Blueprint Header */}
              <div className="bg-[#0b1329]/90 border-b border-[#1d2847] px-6 py-3.5 flex items-center justify-between font-tech text-xs font-bold">
                <span
                  className="tracking-widest flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: themeColor }}
                >
                  <span
                    className="h-2 w-2 rounded-full inline-block animate-ping"
                    style={{ backgroundColor: themeColor }}
                  />
                  PROYEK #{project.id} // DECLASSIFIED
                </span>
                <span className="text-slate-300 bg-[#121414] px-2 py-0.5 border border-[#1d2847] rounded">
                  {project.metric}
                </span>
              </div>

              <div className="p-6 space-y-6 flex-1">
                {/* Blueprint Image Preview with HUD Brackets */}
                <div className="aspect-video w-full bg-[#0b1329] border border-[#1d2847] rounded-lg relative overflow-hidden group-hover:border-opacity-80 transition-colors shadow-inner"
                  style={{ "--hover-border": themeColor }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f10]/80 via-transparent to-transparent opacity-60" />
                  
                  {/* HUD corner overlay */}
                  <div
                    className="absolute top-2 left-2 font-tech text-[9px] bg-[#0d0f10]/90 px-2 py-0.5 border font-bold rounded flex items-center gap-1 transition-colors duration-300"
                    style={{ color: themeColor, borderColor: `${themeColor}88` }}
                  >
                    <ShieldCheck className="h-3 w-3" /> VERIFIED BLUEPRINT
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3
                    className="font-anybody text-2xl font-black italic text-white group-hover:opacity-90 transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {project.desc}
                  </p>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 pt-2 font-tech">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-slate-200 bg-[#0b1329] border border-[#1d2847] px-2.5 py-1 rounded"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link: View Intel / Blueprint */}
              <div className="border-t border-[#1d2847] px-6 py-4 bg-[#0d0f10]/80 flex items-center justify-between font-anybody font-extrabold text-xs">
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  PERAN: {project.role}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 tracking-wider group-hover:translate-x-1 transition-all"
                  style={{ color: themeColor }}
                >
                  BUKA INTEL & BLUEPRINT
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Declassified Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0f10]/90 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full spider-glass-card rounded-2xl border-2 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300"
              style={{
                borderColor: themeColor,
                boxShadow: `0 0 50px ${themeColor}66`,
              }}
            >
              {/* Modal HUD Header */}
              <div className="bg-[#0b1329] border-b border-[#1d2847] p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rotate-45 shadow-sm transition-colors duration-300"
                    style={{ backgroundColor: themeColor, boxShadow: `0 0 8px ${themeColor}` }}
                  />
                  <span
                    className="font-tech text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                    style={{ color: themeColor }}
                  >
                    STARK DOSSIER // DECLASSIFIED BLUEPRINT #{selectedProject.id}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg bg-[#121414] text-slate-400 hover:text-white border border-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans text-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Image Showcase */}
                  <div className="md:col-span-6 rounded-xl border border-[#1d2847] bg-[#0b1329] overflow-hidden relative aspect-video flex items-center justify-center">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 font-tech text-[10px] bg-[#0d0f10]/90 text-emerald-400 border border-emerald-400/40 px-2 py-0.5 rounded font-bold">
                      STATUS: PRODUCTION VERIFIED
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div className="md:col-span-6 space-y-3 flex flex-col justify-between">
                    <div>
                      <span
                        className="font-tech text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                        style={{ color: themeColor }}
                      >
                        {selectedProject.role}
                      </span>
                      <h3 className="font-anybody text-2xl sm:text-3xl font-black italic text-white leading-tight">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {selectedProject.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="font-tech text-[11px] text-slate-400 uppercase font-bold">Teknologi Terintegrasi:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-tech font-bold text-white border px-2 py-0.5 rounded transition-colors duration-300"
                            style={{
                              backgroundColor: `${themeColor}20`,
                              borderColor: `${themeColor}66`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blueprint Dossier Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="p-4 rounded-xl bg-[#0b1329]/80 border border-[#1d2847] space-y-1.5">
                    <div
                      className="font-tech text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300"
                      style={{ color: themeColor }}
                    >
                      <Cpu className="h-3.5 w-3.5" /> Arsitektur Sistem
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.blueprint.architecture}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b1329]/80 border border-[#1d2847] space-y-1.5">
                    <div className="font-tech text-[10px] font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" /> Tantangan & Masalah
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.blueprint.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b1329]/80 border border-[#1d2847] space-y-1.5">
                    <div className="font-tech text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Solusi & Optimasi
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.blueprint.solution}
                    </p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs font-tech text-slate-400">
                    {selectedProject.blueprint.stats.map((s, i) => (
                      <span key={i} className="hidden sm:inline-block font-bold text-slate-300">
                        • {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spider-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs tracking-wider"
                  >
                    BUKA REPOSITORI / LIVE
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
