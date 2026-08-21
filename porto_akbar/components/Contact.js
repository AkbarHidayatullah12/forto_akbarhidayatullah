"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Radio, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { playWebShooter } from "../utils/soundEffects";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      playWebShooter();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  const commChannels = [
    { name: "ALAMAT EMAIL", val: "akbarhidayatullah.dev@gmail.com", href: "mailto:akbarhidayatullah.dev@gmail.com", icon: Mail },
    { name: "GITHUB REPOSITORI", val: "github.com/akbar-hidayatullah", href: "https://github.com/akbar-hidayatullah", icon: Github },
    { name: "LINKEDIN PROFIL", val: "linkedin.com/in/akbar-hidayatullah", href: "https://linkedin.com", icon: Linkedin },
    { name: "INSTAGRAM MEDIA", val: "@akbar_hidytllh", href: "https://www.instagram.com/akbar_hidytllh/", icon: Instagram },
  ];

  return (
    <section id="contact" className="space-y-12 pt-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="border-b-2 border-[#2a2e33] pb-6">

        <div
          className="font-tech text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
          style={{ color: themeColor }}
        >
          [ SALURAN KOMUNIKASI // HUBUNGI SAYA ]
        </div>
        <h2 className="font-anybody text-4xl sm:text-5xl font-black italic tracking-wide text-white uppercase flex items-center gap-3">
          <Radio className="h-8 w-8" style={{ color: themeColor }} />
          HUBUNGI SAYA
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
          Siap berkolaborasi dalam proyek software full-stack, produksi konten kreatif, riset sistem, atau proyek kepemimpinan teknologi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Communication Channels — Theme Reactive */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 space-y-4">
          <div className="font-tech text-xs text-slate-400 font-bold tracking-wider mb-2">
            PILIH METODE KOMUNIKASI LANGSUNG:
          </div>

          {commChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 spider-glass-card rounded-xl p-4 transition-all"
              >
                <div
                  className="p-3 bg-[#0b1329] border border-[#1d2847] rounded-lg group-hover:text-white transition-colors"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#0b1329"; }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div
                    className="font-tech text-[10px] font-bold tracking-widest uppercase transition-colors duration-300"
                    style={{ color: themeColor }}
                  >
                    {channel.name}
                  </div>
                  <div className="font-tech text-xs sm:text-sm text-slate-200 font-bold group-hover:text-white break-all">
                    {channel.val}
                  </div>
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* Right Column: Contact Form — Theme Reactive */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 spider-glass-card rounded-xl p-6 sm:p-8 relative">
          <div
            className="font-tech text-xs font-bold tracking-widest uppercase border-b border-white/10 pb-3 mb-6 flex items-center justify-between transition-colors duration-300"
            style={{ color: themeColor }}
          >
            <span>// FORMULIR PESAN & KOLABORASI PROYEK</span>
            <span className="text-[10px] text-slate-400">STATUS: SIAP MENERIMA</span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <CheckCircle2 className="h-16 w-16 glow-red" style={{ color: themeColor }} />
              <h3 className="font-anybody text-2xl font-black italic text-white uppercase">
                PESAN ANDA BERHASIL TERKIRIM!
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-md">
                Terima kasih telah menghubungi. Saya akan membaca pesan Anda dan segera merespons melalui alamat email yang Anda cantumkan.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 font-tech">
                  <label htmlFor="name" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0d0f10]/80 border border-[#2a2e33] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    style={{ "--tw-ring-color": themeColor }}
                    onFocus={(e) => { e.target.style.borderColor = themeColor; }}
                    onBlur={(e) => { e.target.style.borderColor = "#2a2e33"; }}
                    placeholder="Masukkan nama lengkap atau instansi"
                  />
                </div>

                <div className="space-y-2 font-tech">
                  <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    ALAMAT EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0d0f10]/80 border border-[#2a2e33] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = themeColor; }}
                    onBlur={(e) => { e.target.style.borderColor = "#2a2e33"; }}
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2 font-tech">
                <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  PESAN / RENCANA KOLABORASI PROYEK
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#0d0f10]/80 border border-[#2a2e33] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  onFocus={(e) => { e.target.style.borderColor = themeColor; }}
                  onBlur={(e) => { e.target.style.borderColor = "#2a2e33"; }}
                  placeholder="Tuliskan pesan, penawaran proyek, kebutuhan pengembangan web/mobile, atau diskusi kerja sama..."
                />
              </div>

              <button
                type="submit"
                className="btn-spider-primary w-full py-4 rounded-lg text-xs tracking-widest font-extrabold flex items-center justify-center gap-2 relative group"
              >
                <div className="web-corner-tl" />
                <div className="web-corner-br" />
                <Send className="h-4 w-4" />
                KIRIM PESAN SEKARANG
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
