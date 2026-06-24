"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { text: "AkbarOS v1.0.0 (Type 'help' to see available commands)", type: "system" },
    { text: "Log masuk berhasil...", type: "system" },
    { text: "Masukkan perintah di bawah:", type: "info" }
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const isUserCommand = useRef(false);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    setHistory([
      { text: "AkbarOS v1.0.0 (Type 'help' to see available commands)", type: "system" },
      { text: "Log masuk berhasil pada " + new Date().toLocaleString("id-ID"), type: "system" },
      { text: "Masukkan perintah di bawah:", type: "info" }
    ]);
  }, []);

  useEffect(() => {
    if (isUserCommand.current && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
      isUserCommand.current = false;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      isUserCommand.current = true;
      const trimmedInput = input.trim().toLowerCase();
      let response = [];

      switch (trimmedInput) {
        case "help":
          response = [
            { text: "Perintah yang tersedia:", type: "info" },
            { text: "  about    - Ringkasan profil Akbar Hidayatullah", type: "text" },
            { text: "  skills   - Daftar keahlian teknis & framework", type: "text" },
            { text: "  projects - Informasi proyek PBL & E-LOA", type: "text" },
            { text: "  stats    - Prestasi akademik & metrik optimasi", type: "text" },
            { text: "  contact  - Info kontak & media sosial", type: "text" },
            { text: "  clear    - Bersihkan layar terminal", type: "text" }
          ];
          break;
        case "about":
          response = [
            { text: "NAMA: Akbar Hidayatullah", type: "info" },
            { text: "POSISI: Full-Stack Developer & Creative Visual Director", type: "text" },
            { text: "PENDIDIKAN: Semester 6 D4 Teknologi Rekayasa Perangkat Lunak, Politeknik Negeri Padang", type: "text" },
            { text: "FOKUS: Pengembangan sistem backend efisien, interaksi full-stack modern, serta penggabungan logika programming dengan komunikasi visual kreatif.", type: "text" }
          ];
          break;
        case "skills":
          response = [
            { text: "KEAHLIAN TEKNIS:", type: "info" },
            { text: "  Bahasa: PHP, Java, JavaScript, Dart", type: "text" },
            { text: "  Framework: Laravel, Next.js, Express.js, Flutter", type: "text" },
            { text: "  Database: MySQL, PostgreSQL", type: "text" },
            { text: "  Metodologi: REST API, Agile/Scrum, Git Workflows", type: "text" }
          ];
          break;
        case "projects":
          response = [
            { text: "REKAM JEJAK PROYEK:", type: "info" },
            { text: "  1. Textile Hub (PBL Toko Usaha Muda Padang) [Backend Architect & Developer]", type: "text" },
            { text: "     - Sistem informasi & e-catalog web, respons transaksi & stok dioptimalkan +35%.", type: "muted" },
            { text: "  2. E-LOA (Surat Tugas Elektronik) [Full-Stack Developer]", type: "text" },
            { text: "     - Sistem full-stack otomatisasi dokumen, memangkas durasi proses hingga 50%.", type: "muted" },
            { text: "  3. Firetech Hackathon Neo Telemetri UNAND 2025 [Juara 3]", type: "text" },
            { text: "     - Membangun purwarupa aplikasi andal dalam batas kompetisi 24 jam.", type: "muted" }
          ];
          break;
        case "stats":
          response = [
            { text: "PRESTASI & METRIK UTAMA:", type: "info" },
            { text: "  • Indeks Prestasi Kumulatif (IPK): 3.50", type: "text" },
            { text: "  • PBL API Response Optimization: +35% kecepatan respons", type: "text" },
            { text: "  • E-LOA Document Processing Cut: -50% pemangkasan durasi", type: "text" },
            { text: "  • Hackathon Firetech 2025: Juara 3 Regional", type: "text" }
          ];
          break;
        case "contact":
          response = [
            { text: "INFO KONTAK AKBAR:", type: "info" },
            { text: "  • Email: akbarhidayatullah.dev@gmail.com (simulasi)", type: "text" },
            { text: "  • GitHub: github.com/akbar-hidayatullah (simulasi)", type: "text" },
            { text: "  • LinkedIn: linkedin.com/in/akbar-hidayatullah (simulasi)", type: "text" },
            { text: "  • Instagram: @akbar_hidayatullah (simulasi)", type: "text" }
          ];
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "":
          response = [];
          break;
        default:
          response = [
            { text: `Perintah '${trimmedInput}' tidak dikenal. Ketik 'help' untuk daftar perintah.`, type: "error" }
          ];
      }

      setHistory((prev) => [
        ...prev,
        { text: `akbar@terminal:~$ ${input}`, type: "command" },
        ...response
      ]);
      setInput("");
    }
  };

  return (
    <section id="terminal" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5 text-brand-purple" />
          <h3 className="text-xl font-bold text-white font-mono">Interactive Shell</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple glow-purple animate-pulse" />
          Live Simulator
        </div>
      </div>

      <div
        onClick={focusInput}
        className="terminal-screen h-80 w-full rounded-2xl border border-white/10 p-6 font-mono text-xs overflow-y-auto cursor-text shadow-2xl relative"
      >
        <div className="space-y-2">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === "command"
                  ? "text-brand-purple-light font-bold"
                  : line.type === "system"
                  ? "text-slate-500"
                  : line.type === "info"
                  ? "text-brand-cyan font-bold"
                  : line.type === "error"
                  ? "text-red-400 font-medium"
                  : line.type === "muted"
                  ? "text-slate-400 pl-4"
                  : "text-slate-300"
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 relative z-10">
          <span className="text-brand-purple font-bold">akbar@terminal:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0"
            placeholder="Ketik perintah..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </section>
  );
}
