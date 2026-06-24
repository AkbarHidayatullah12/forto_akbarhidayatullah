"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  const socialLinks = [
    { name: "Email", val: "akbarhidayatullah.dev@gmail.com", href: "mailto:akbarhidayatullah.dev@gmail.com", icon: Mail },
    { name: "GitHub", val: "github.com/akbar-hidayatullah", href: "https://github.com", icon: Github },
    { name: "LinkedIn", val: "linkedin.com/in/akbar-hidayatullah", href: "https://linkedin.com", icon: Linkedin },
    { name: "Instagram", val: "@akbar_hidayatullah", href: "https://instagram.com", icon: Instagram },
  ];

  return (
    <section id="contact" className="space-y-16 py-8">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-brand-purple" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-light">
            Hubungkan Solusi Digital Anda
          </span>
          <span className="h-px w-6 bg-brand-purple" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Hubungi Saya</h2>
        <p className="text-slate-400 text-sm">
          Siap berkolaborasi dalam proyek software full-stack, produksi konten kreatif, atau proyek kepemimpinan teknologi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-brand-dark/40 border border-white/5 hover:border-brand-purple/30 hover:bg-brand-navy/35 transition-all duration-300 rounded-2xl p-5 group"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-navy border border-white/10 flex items-center justify-center group-hover:bg-brand-purple/20 group-hover:border-brand-purple/30 transition-all duration-300">
                  <Icon className="h-5 w-5 text-slate-300 group-hover:text-brand-purple-light" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{social.name}</div>
                  <div className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors mt-0.5 break-all">
                    {social.val}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Message form */}
        <div className="lg:col-span-7 bg-brand-dark/50 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-400 glow-purple" />
              <h3 className="text-xl font-bold text-white">Pesan Anda Berhasil Terkirim!</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Terima kasih telah menghubungi. Saya akan membaca pesan Anda dan segera merespons melalui email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pesan
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  placeholder="Tuliskan pesan atau rencana proyek kolaborasi Anda..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-purple hover:bg-brand-purple/90 px-6 py-3.5 text-xs font-bold text-white transition-all duration-300 neon-border-purple shadow-lg"
              >
                <Send className="h-4 w-4" />
                Kirim Pesan
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
