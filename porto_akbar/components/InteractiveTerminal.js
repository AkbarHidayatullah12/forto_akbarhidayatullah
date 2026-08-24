"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, ShieldAlert } from "lucide-react";
import { playHudBeep } from "../utils/soundEffects";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { text: "AkbarOS v2.0 // SPIDER-TERMINAL [ONLINE]", type: "system" },
    { text: "Ketik 'help' untuk melihat daftar perintah yang tersedia.", type: "info" }
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const isUserCommand = useRef(false);

  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    if (isUserCommand.current && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
      isUserCommand.current = false;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      isUserCommand.current = true;
      playHudBeep(1100);
      const trimmedInput = input.trim().toLowerCase();
      let response = [];

      switch (trimmedInput) {
        case "help":
          response = [
            { text: "DAFTAR PERINTAH TERMINAL:", type: "info" },
            { text: "  about    - Ringkasan profil & biodata Akbar Hidayatullah", type: "text" },
            { text: "  skills   - Daftar keahlian pemrograman & framework", type: "text" },
            { text: "  projects - Informasi proyek unggulan PBL & E-LOA", type: "text" },
            { text: "  stats    - Prestasi akademik & metrik optimasi sistem", type: "text" },
            { text: "  contact  - Info kontak email & media sosial", type: "text" },
            { text: "  game     - [EASTER EGG] Buka Stark Combat Training Simulator", type: "highlight" },
            { text: "  clear    - Bersihkan layar terminal", type: "text" }
          ];
          break;
        case "about":
          response = [
            { text: "BIODATA OPERATIF:", type: "info" },
            { text: "  Nama: Akbar Hidayatullah", type: "text" },
            { text: "  Posisi: Full-Stack Developer & Creative Visual Director", type: "text" },
            { text: "  Pendidikan: Mahasiswa Semester 7 D4 TRPL Politeknik Negeri Padang (IPK 3,51)", type: "text" },
            { text: "  Dedikasi: Merancang sistem backend efisien, aplikasi full-stack modern, serta memadukan logika software dengan komunikasi visual.", type: "text" }
          ];
          break;
        case "skills":
          response = [
            { text: "KEAHLIAN TEKNOLOGI:", type: "info" },
            { text: "  • Bahasa: JavaScript, PHP, Dart, Java, HTML/CSS", type: "text" },
            { text: "  • Framework Web: Next.js, React, Laravel, Express.js", type: "text" },
            { text: "  • Mobile & Multiplatform: Flutter", type: "text" },
            { text: "  • Database: MySQL, PostgreSQL", type: "text" },
            { text: "  • Creative Tools: Adobe Premiere Pro, Lightroom, Photoshop, DaVinci Resolve", type: "text" }
          ];
          break;
        case "projects":
          response = [
            { text: "BERKAS PROYEK UNGGULAN:", type: "info" },
            { text: "  1. Textile Hub (PBL Toko Usaha Muda) -> Next.js, Express, MySQL (+35% speedup)", type: "text" },
            { text: "  2. E-LOA (Surat Tugas Elektronik) -> Laravel, PostgreSQL (-50% durasi proses)", type: "text" },
            { text: "  3. Neo Telemetri Hackathon 2025 -> Juara 3 Winner Project", type: "text" },
            { text: "  4. Kominfo HMTI & Medkraf HIVE Sumbar -> Manajemen Media & Konten Visual", type: "text" },
            { text: "  Tip: Scroll ke bagian atas atau ketik nama proyek untuk intel lebih dalam.", type: "system" }
          ];
          break;
        case "stats":
          response = [
            { text: "METRIK PERFORMA & PRESTASI:", type: "info" },
            { text: "  • IPK Akademik: 3.47 / 4.00 (Politeknik Negeri Padang)", type: "text" },
            { text: "  • Prestasi: Juara 3 Firetech Hackathon 2025 (Regional UNAND)", type: "text" },
            { text: "  • Efisiensi PBL: +35% Responsivitas API E-Catalog", type: "text" },
            { text: "  • Otomasi E-LOA: -50% Waktu Verifikasi Berkas Cetak", type: "text" },
            { text: "  • Kepemimpinan: Kepala Bidang Kominfo HMTI PNP & Medkraf HIVE", type: "text" }
          ];
          break;
        case "contact":
          response = [
            { text: "SALURAN KOMUNIKASI:", type: "info" },
            { text: "  • Email: akbarhidayatullah.dev@gmail.com", type: "text" },
            { text: "  • GitHub: https://github.com/akbar-hidayatullah", type: "text" },
            { text: "  • LinkedIn: linkedin.com/in/akbar-hidayatullah", type: "text" },
            { text: "  • Instagram: @akbar_hidytllh", type: "text" }
          ];
          break;
        case "game":
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open_spider_game"));
          }
          response = [
            { text: "MEMULAI PROTOKOL: STARK COMBAT TRAINING SIMULATOR...", type: "highlight" },
            { text: "Simulator latihan tembak jaring hologram telah diluncurkan!", type: "info" }
          ];
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "":
          return;
        default:
          response = [
            { text: `Perintah tidak dikenal: '${input}'. Ketik 'help' untuk daftar perintah.`, type: "error" }
          ];
      }

      setHistory((prev) => [
        ...prev,
        { text: `akbar@spider-terminal:~$ ${input}`, type: "command" },
        ...response
      ]);
      setInput("");
    }
  };

  return (
    <section id="terminal" className="space-y-4 pt-6 font-tech">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5 transition-colors duration-300" style={{ color: themeColor }} />
          <h3 className="font-anybody text-xl font-black italic text-white uppercase">
            TERMINAL INTERAKTIF // AKBAR OS
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open_spider_game"));
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-transparent border border-[#2a2e33] text-slate-400 hover:text-white rounded text-[10px] font-bold transition-colors"
            style={{ "--hover-border": themeColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = themeColor;
              e.currentTarget.style.color = themeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2e33";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            🎮 EASTER EGG
          </button>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <ShieldAlert className="h-3.5 w-3.5" />
            ONLINE
          </div>
        </div>
      </div>

      <div
        onClick={focusInput}
        className="bg-[#121414] border-2 border-[#2a2e33] h-72 w-full p-5 text-xs overflow-y-auto cursor-text relative shadow-2xl rounded-xl"
      >
        <div className="space-y-2">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === "command"
                  ? "font-bold"
                  : line.type === "system"
                  ? "text-slate-500"
                  : line.type === "highlight"
                  ? "text-amber-400 font-bold bg-amber-400/10 px-1 py-0.5 rounded"
                  : line.type === "info"
                  ? "text-white font-bold"
                  : line.type === "error"
                  ? "text-red-400 font-bold"
                  : "text-slate-300"
              }`}
              style={line.type === "command" ? { color: themeColor } : {}}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#2a2e33]">
          <span className="font-bold transition-colors duration-300" style={{ color: themeColor }}>
            akbar@spider-terminal:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white font-tech text-xs p-0 focus:ring-0"
            placeholder="Ketik perintah (contoh: help, about, skills, projects)..."
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
