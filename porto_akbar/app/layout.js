import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Akbar Hidayatullah | Full-Stack Developer & Creative Visual Director",
  description: "Portofolio Profesional Akbar Hidayatullah - Mahasiswa D4 Teknologi Rekayasa Perangkat Lunak Politeknik Negeri Padang. Pengembang Aplikasi Web & Mobile & Kreator Komunikasi Visual.",
  keywords: ["Akbar Hidayatullah", "Full-Stack Developer", "Politeknik Negeri Padang", "Portofolio IT", "Laravel", "Next.js", "Express.js", "Flutter", "Fotografi", "Videografi", "Padang"],
  authors: [{ name: "Akbar Hidayatullah" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${firaCode.variable} scroll-smooth`}>
      <body className="bg-brand-black text-slate-200 antialiased min-h-screen flex flex-col selection:bg-brand-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
