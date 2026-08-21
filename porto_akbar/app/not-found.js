import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0f10] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Web SVG */}
      <svg
        className="absolute w-[500px] h-[500px] opacity-10"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#e6192e"
        strokeWidth="0.3"
      >
        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="48" />
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="14.6" y1="14.6" x2="85.4" y2="85.4" />
        <line x1="85.4" y1="14.6" x2="14.6" y2="85.4" />
      </svg>

      {/* Glow Orb */}
      <div className="absolute w-72 h-72 bg-[#e6192e]/15 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-lg">
        {/* Spider Logo */}
        <div className="flex justify-center">
          <img
            src="/logo%20spider.png"
            alt="Spider Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-[0_0_30px_rgba(230,25,46,0.7)] animate-bounce"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="font-anybody text-8xl sm:text-9xl font-black italic text-[#e6192e] tracking-tighter drop-shadow-[0_0_40px_rgba(230,25,46,0.5)]">
            404
          </h1>
          <div className="font-tech text-xs font-bold tracking-widest text-[#e6192e] uppercase">
            [ SPIDER-SENSE GAGAL // HALAMAN TIDAK DITEMUKAN ]
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="font-anybody text-xl sm:text-2xl font-black italic text-white uppercase">
            JARING TIDAK MENEMUKAN HALAMAN INI!
          </h2>
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada dalam dimensi web ini.
            <span className="text-slate-500 italic"> (pun intended)</span>
          </p>
        </div>

        {/* HUD Style Diagnostic */}
        <div className="bg-[#181b1b]/80 border border-[#2a2e33] rounded-lg p-4 font-tech text-xs text-left space-y-1.5">
          <div className="text-slate-500 font-bold tracking-wider mb-2">DIAGNOSTIC LOG:</div>
          <div><span className="text-[#e6192e]">ERR:</span> <span className="text-slate-300">Requested route not found in web-shooter registry</span></div>
          <div><span className="text-yellow-400">WARN:</span> <span className="text-slate-300">Spider-Sense returned null for current location</span></div>
          <div><span className="text-emerald-400">FIX:</span> <span className="text-slate-300">Navigate back to HQ (home page)</span></div>
        </div>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#e6192e] text-white font-tech text-xs font-bold tracking-widest uppercase hover:bg-[#ff3347] transition-colors shadow-[0_0_20px_rgba(230,25,46,0.4)] hover:shadow-[0_0_30px_rgba(230,25,46,0.6)]"
        >
          🕸️ KEMBALI KE BERANDA
        </Link>

        {/* Footer Note */}
        <p className="font-tech text-[10px] text-slate-500 pt-4">
          &copy; {new Date().getFullYear()} AKBAR.DEV // SPIDER-PORTFOLIO SYSTEM
        </p>
      </div>
    </div>
  );
}
