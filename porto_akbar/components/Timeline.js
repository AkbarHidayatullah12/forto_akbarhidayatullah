"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Users, Heart, Award, Layers } from "lucide-react";

export default function Timeline() {
  const experiences = [
    {
      id: 1,
      type: "organization",
      title: "Kepala Bidang Kominfo",
      company: "HMTI Politeknik Negeri Padang",
      period: "2025 - 2026",
      desc: "Memimpin divisi Komunikasi dan Informatika dalam mengelola media publikasi digital, menyebarkan informasi akademis ke seluruh mahasiswa IT, serta memproduksi konten multimedia yang informatif dan menarik.",
      icon: Users,
      skills: ["Leadership", "Public Relations", "Creative Direction", "Media Management"],
      docImage: "/kepala_bidang_kominfo.jpeg",
    },
    {
      id: 2,
      type: "organization",
      title: "Ketua Bidang Medkraf",
      company: "HIVE Sumatera Barat",
      period: "2025",
      desc: "Mengoordinasi perumusan konsep kreatif, pembuatan desain branding, serta produksi video promosi untuk memperluas jangkauan komunitas kreatif digital di Sumatera Barat.",
      icon: Users,
      skills: ["Creative Strategy", "Brand Identity", "Videography", "Collaborative Work"],
      docImage: "/koordinator_volunteer_hive.jpeg",
    },
    {
      id: 3,
      type: "work",
      title: "Magang Data Operasional",
      company: "PT Garuda Cyber Indonesia",
      period: "2021",
      desc: "Mengelola, memproses, dan memvalidasi data operasional internal perusahaan. Belajar mengimplementasikan struktur data praktis dan memahami alur kerja di industri teknologi secara langsung.",
      icon: Briefcase,
      skills: ["Data Management", "Operational Systems", "Workflow Optimization", "Enterprise Tools"],
    },
    {
      id: 4,
      type: "achievement",
      title: "Juara 3 Neo Telemetri Firetech Hackathon",
      company: "Universitas Andalas",
      period: "2025",
      desc: "Menjuarai kompetisi hackathon tingkat regional dengan merancang, membangun, dan menyajikan purwarupa aplikasi inovatif di bawah tekanan waktu yang ketat.",
      icon: Award,
      skills: ["Agile Development", "Problem Solving", "Rapid Prototyping", "Full-Stack Development"],
      docImage: "/juara3hackathon.jpeg",
    },
    {
      id: 5,
      type: "education",
      title: "D4 Teknologi Rekayasa Perangkat Lunak",
      company: "Politeknik Negeri Padang",
      period: "2023 - Sekarang",
      desc: "Mahasiswa Semester 6 dengan IPK 3,50. Mempelajari rekayasa kebutuhan perangkat lunak, arsitektur database, desain API, pemrograman framework web dan mobile.",
      icon: GraduationCap,
      skills: ["TRPL", "Database Design", "Software Engineering", "RESTful API"],
    },
    {
      id: 6,
      type: "social",
      title: "Relawan Kebencanaan",
      company: "Aksi Dedikasi Sosial & Kemanusiaan",
      period: "Aktif",
      desc: "Menyalurkan kepedulian sosial yang tinggi melalui partisipasi langsung sebagai relawan kebencanaan. Membantu koordinasi bantuan logistik dan penyebaran informasi tanggap darurat.",
      icon: Heart,
      skills: ["Social Action", "Crisis Coordination", "Disaster Response", "Teamwork"],
      docImage: "/relawan_hive.jpeg",
    },
    {
      id: 7,
      type: "education",
      title: "Pendidikan Linear Bidang IT",
      company: "SMKN 2 Padang",
      period: "Sebelum 2023",
      desc: "Mulai menempuh dasar keilmuan linear di bidang IT, mendalami logika dasar komputer, pemrograman web dasar, serta pemecahan masalah logika sederhana.",
      icon: GraduationCap,
      skills: ["Dasar IT", "Logika Dasar", "Web Static", "Computer Basics"],
    },
  ];

  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "Semua", icon: Layers },
    { id: "education", label: "Pendidikan", icon: GraduationCap },
    { id: "organization", label: "Organisasi", icon: Users },
    { id: "work", label: "Karir & Magang", icon: Briefcase },
    { id: "achievement", label: "Prestasi", icon: Award },
    { id: "social", label: "Sosial & Relawan", icon: Heart },
  ];

  const filteredExperiences = filter === "all"
    ? experiences
    : experiences.filter(exp => exp.type === filter);

  return (
    <section id="experience" className="space-y-16">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-brand-purple" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-light">
            Perjalanan Karir & Akademis
          </span>
          <span className="h-px w-6 bg-brand-purple" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Pengalaman & Dedikasi</h2>
        <p className="text-slate-400 text-sm">
          Perpaduan harmonis antara pendidikan formal, kepemimpinan organisasi, rekam jejak industri, serta keterlibatan sosial.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-12 px-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                filter === cat.id
                  ? "bg-brand-purple text-white border-brand-purple glow-purple-sm"
                  : "bg-brand-navy/35 text-slate-400 border-white/5 hover:border-slate-500 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="relative border-l border-white/10 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredExperiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                layout
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative group"
              >
              {/* Timeline marker node */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 h-7 w-7 rounded-full bg-brand-black border-2 border-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Icon className="h-3.5 w-3.5 text-brand-purple-light" />
              </div>

              {/* Event Card */}
              <div className="bg-brand-dark/40 border border-white/5 hover:border-brand-purple/20 transition-all duration-300 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-brand-purple/5 rounded-full blur-xl pointer-events-none group-hover:bg-brand-purple/10 transition-colors" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-purple-light uppercase tracking-wider">
                      {exp.type === "work" ? "Magang / Karir" : exp.type === "education" ? "Pendidikan" : exp.type === "organization" ? "Organisasi" : exp.type === "achievement" ? "Prestasi" : "Sosial"}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-purple-light transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-400 bg-brand-navy px-2.5 py-1 rounded-md border border-white/5 w-fit">
                    {exp.period}
                  </div>
                </div>

                <div className="text-sm text-brand-cyan font-semibold">
                  {exp.company}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {exp.desc}
                </p>

                {exp.docImage && (
                  <div className="aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/10 bg-brand-black relative">
                    <img
                      src={exp.docImage}
                      alt={`Dokumentasi ${exp.title}`}
                      className="h-full w-full object-cover opacity-80 hover:opacity-100 hover:scale-[1.01] transition-all duration-500"
                    />
                  </div>
                )}

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="text-[9px] font-semibold bg-brand-navy/60 text-slate-300 border border-white/5 px-2.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
