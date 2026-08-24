import { Anybody, Space_Mono } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://akbar-hidayatullah.dev"),
  title: "Spectacular Spider-Portfolio | Akbar Hidayatullah",
  description: "Portofolio interaktif berkinerja tinggi bertema Spectacular Spider-Man & Stark HUD. Mahasiswa TRPL Politeknik Negeri Padang, Full-Stack Developer & Creative Visual Director.",
  keywords: [
    "Akbar Hidayatullah",
    "Spider-Portfolio",
    "Full-Stack Developer",
    "Politeknik Negeri Padang",
    "TRPL PNP",
    "Next.js Developer",
    "Laravel Developer",
    "React",
    "Web Developer Padang",
    "Fotografer Padang",
  ],
  authors: [{ name: "Akbar Hidayatullah", url: "https://github.com/AkbarHidayatullah12" }],
  creator: "Akbar Hidayatullah",
  openGraph: {
    title: "Akbar Hidayatullah | Spectacular Spider-Portfolio",
    description: "Full-Stack Developer & Creative Visual Director. Jelajahi proyek rekayasa perangkat lunak, keahlian teknologi, dan galeri visual.",
    url: "https://akbar-hidayatullah.dev",
    siteName: "Akbar Hidayatullah Spider-Portfolio",
    images: [
      {
        url: "/logo%20spider.png",
        width: 800,
        height: 800,
        alt: "Spider-Man Emblem Akbar Hidayatullah",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akbar Hidayatullah | Spectacular Spider-Portfolio",
    description: "Full-Stack Developer & Mahasiswa TRPL Politeknik Negeri Padang. Interaktif, responsif, dan bertenaga.",
    images: ["/logo%20spider.png"],
  },
  icons: {
    icon: "/logo%20spider.png",
    apple: "/logo%20spider.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${anybody.variable} ${spaceMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[#121414] text-slate-200 antialiased min-h-screen flex flex-col selection:bg-[#e6192e] selection:text-white font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
