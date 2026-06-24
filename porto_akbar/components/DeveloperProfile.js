"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Layout, Sparkles, Terminal, Award, ArrowUpRight, Zap, ShieldCheck } from "lucide-react";

export default function DeveloperProfile() {
  const skills = {
    languages: [
      { name: "JavaScript", iconClass: "bi bi-javascript text-yellow-400" },
      { name: "PHP", iconClass: "bi bi-filetype-php text-blue-400" },
      { name: "Dart", iconClass: "devicon-dart-plain text-sky-500" },
      { name: "Java", iconClass: "bi bi-filetype-js text-orange-500" },
    ],
    frameworks: [
      { name: "Next.js", iconClass: "devicon-nextjs-plain text-white" },
      { name: "Laravel", iconClass: "devicon-laravel-original text-red-500" },
      { name: "Express.js", iconClass: "bi bi-javascript text-yellow-400" },
      { name: "Flutter", iconClass: "devicon-flutter-plain text-sky-400" },
    ],
    competencies: [
      "Database Design (SQL/NoSQL)",
      "REST API Design & Architecture",
      "Agile & Scrum Methodologies",
      "Git & Team Workflows",
      "Backend Performance Tuning",
      "Full-Stack System Integration",
    ],
  };

  const projects = [
    {
      title: "Textile Hub (PBL Toko Usaha Muda Padang)",
      role: "Backend Architect & Developer",
      metric: "35% API Speedup",
      metricDesc: "Waktu respons transaksi & stok dioptimalkan",
      desc: "Membangun sistem informasi dan e-catalog web terintegrasi untuk Toko Usaha Muda Padang (mitra PBL). Merancang arsitektur database MySQL, diagram diagram use case/activity, serta menyusun REST API yang responsif.",
      tech: ["Express.js", "Next.js", "MySQL", "REST API"],
      icon: Database,
      color: "border-brand-blue",
      link: "https://github.com/intersectcode-A1/intersectcode_textilehub.git",
      docImage: "/dokumentasi_PBL.jpeg",
    },
    {
      title: "Sistem E-LOA (Electronic Letter of Assignment)",
      role: "Full-Stack Developer",
      metric: "50% Time Saved",
      metricDesc: "Durasi pemrosesan dokumen dipangkas",
      desc: "Mendesain dan mengembangkan sistem Surat Tugas Elektronik (E-LOA) dari nol. Sistem ini mengotomatiskan approval workflow, pengiriman pdf dinamis, dan validasi data secara realtime.",
      tech: ["Laravel", "JavaScript", "Tailwind CSS", "PostgreSQL"],
      icon: Cpu,
      color: "border-brand-purple",
      link: "https://github.com/AkbarHidayatullah12/proyek_rumah_jurnal_akbar.git",
      docImage: "/dokumentasi_eloa.jpeg",
    },
    {
      title: "Neo Telemetri Firetech Hackathon 2025",
      role: "Juara 3 Winner Project",
      metric: "Podium Finish",
      metricDesc: "Hackathon Universitas Andalas",
      desc: "Membangun purwarupa aplikasi inovatif dalam batas waktu 24 jam. Bertanggung jawab atas integrasi backend RESTful API yang cepat, andal, dan siap diuji oleh dewan juri.",
      tech: ["Flutter", "Express.js", "JavaScript", "Dart", "Agile"],
      icon: Award,
      color: "border-yellow-500/50",
      link: "https://github.com/Dafa-Aziul/SapaSumbar.git",
      docImage: "/juara3hackathon.jpeg",
    },
  ];

  return (
    <div id="about" className="space-y-24">
      {/* Intro & Skills */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-brand-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-purple-light">
              Profil Teknis
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Menyatukan Logika & Efisiensi Sistem
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Berbekal kecintaan mendalam pada rekayasa perangkat lunak sejak di SMKN 2 Padang, saya terus mengeksplorasi pembuatan aplikasi yang tidak hanya berfungsi, melainkan berkinerja tinggi. Sebagai mahasiswa D4 TRPL, saya berfokus pada efisiensi clean code dan optimalisasi database.
          </p>
          <div className="p-5 rounded-2xl bg-brand-navy/35 border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-purple" />
              Nilai Tambah Engineering
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-brand-purple font-mono">▸</span>
                Mengutamakan keamanan REST API dan struktur database ternormalisasi.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-purple font-mono">▸</span>
                Logika pemecahan masalah yang kuat, teruji di kompetisi hackathon.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-purple font-mono">▸</span>
                Kemampuan kolaborasi tangkas menggunakan Agile/Scrum.
              </li>
            </ul>
          </div>
        </div>

        {/* Skills Right */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-brand-dark border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
            {/* Languages */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="h-4.5 w-4.5 text-brand-purple" />
                Bahasa Pemrograman
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skills.languages.map((lang) => (
                  <div key={lang.name} className="flex flex-col items-center gap-2 bg-brand-navy/30 border border-white/5 hover:border-brand-purple/40 hover:bg-brand-navy/50 transition-all duration-300 rounded-xl p-4 text-center">
                    <i className={`${lang.iconClass} text-2xl`} />
                    <span className="text-xs font-bold text-slate-200">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-brand-cyan" />
                Frameworks Modern
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skills.frameworks.map((fw) => {
                  return (
                    <div key={fw.name} className="flex flex-col items-center gap-2 bg-brand-navy/30 border border-white/5 hover:border-brand-purple/40 hover:bg-brand-navy/50 transition-all duration-300 rounded-xl p-4 text-center">
                      <i className={`${fw.iconClass} text-2xl`} />
                      <span className="text-xs font-bold text-slate-200">{fw.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other competencies */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Kompetensi Tambahan</h3>
              <div className="flex flex-wrap gap-2">
                {skills.competencies.map((comp) => (
                  <span key={comp} className="text-[11px] font-semibold font-mono bg-brand-navy border border-white/10 px-2.5 py-1 rounded-md text-slate-300">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-purple" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-light">
              Karya & Proyek
            </span>
            <span className="h-px w-6 bg-brand-purple" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Rekam Jejak Proyek Profesional</h2>
          <p className="text-slate-400 text-sm">
            Berikut adalah proyek-proyek unggulan yang membuktikan efisiensi logika pemrograman dan pemecahan masalah saya di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`neon-card bg-brand-dark/50 border border-white/5 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Metric glow badge */}
                <div className="absolute -top-12 -right-12 h-32 w-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-5">
                  {proj.docImage && (
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-brand-black relative group/img">
                      <img
                        src={proj.docImage}
                        alt={`Dokumentasi ${proj.title}`}
                        className="h-full w-full object-cover opacity-85 hover:opacity-100 hover:scale-[1.03] transition-all duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-brand-navy border border-white/10 rounded-xl">
                      <Icon className="h-5 w-5 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-purple/20 text-brand-purple-light border border-brand-purple/30 px-2.5 py-1 rounded-full">
                      {proj.role}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-brand-purple-light transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                      {proj.desc}
                    </p>
                  </div>
                </div>

                {/* Metric Display */}
                <div className="border-t border-white/5 pt-5 mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{proj.metricDesc}</div>
                    <div className="text-lg font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                      <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500/30" />
                      {proj.metric}
                    </div>
                  </div>
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center border border-white/10 hover:border-brand-purple hover:bg-brand-purple/20 transition-all cursor-pointer group/link"
                      title="Buka Repositori"
                    >
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover/link:text-white" />
                    </a>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center border border-white/5 text-slate-600 cursor-not-allowed" title="Repositori Privat">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono font-semibold bg-brand-navy/60 text-slate-300 border border-white/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
