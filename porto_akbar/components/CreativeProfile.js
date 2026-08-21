"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Eye, X, Layers, Image as ImageIcon } from "lucide-react";
import { useSuitTheme, suitThemes } from "./ThemeContext";

export default function CreativeProfile() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const { suitTheme } = useSuitTheme();
  const currentSuit = suitThemes.find((t) => t.id === suitTheme) || suitThemes[0];
  const themeColor = currentSuit.color;

  const categories = [
    { id: "all", label: "SEMUA KARYA" },
    { id: "photography", label: "FOTOGRAFI", icon: Camera },
    { id: "docs", label: "DOKUMENTASI KEGIATAN", icon: Layers },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Pesisir Barat Sumatra",
      category: "photography",
      desc: "Eksplorasi garis pantai Sumatera Barat dengan pendekatan warna hangat dan komposisi minimalis.",
      img: "/1.jpeg",
      details: "Kamera: Mirrorless 35mm | Pagi hari di Pantai Carocok, Painan.",
    },
    {
      id: 2,
      title: "Human Interest Tradisional",
      category: "photography",
      desc: "Menangkap ekspresi spontan dan interaksi harian masyarakat lokal dalam melestarikan budaya.",
      img: "/2.jpeg",
      details: "Kamera: Prime 85mm | Potret candid pedagang di Pasar Tradisional Padang.",
    },
    {
      id: 3,
      title: "Lembah Harau Landscape",
      category: "photography",
      desc: "Keindahan tebing granit menjulang tinggi di Kabupaten Lima Puluh Kota dalam balutan kabut pagi.",
      img: "/3.jpeg",
      details: "Kamera: Wide-angle 16mm | Teknik landscape photography menggunakan tripod.",
    },
    {
      id: 4,
      title: "Sudut Kota Tua Padang",
      category: "photography",
      desc: "Fotografi jalanan (street photography) mengabadikan warisan arsitektur kolonial bersejarah.",
      img: "/4.jpeg",
      details: "Kamera: Mirrorless 50mm | Komposisi cahaya dramatis sore hari.",
    },
    {
      id: 5,
      title: "Siluet Senja Taplau",
      category: "photography",
      desc: "Momen magis siluet aktivitas warga berlatar belakang matahari terbenam Pantai Padang.",
      img: "/5.jpeg",
      details: "Lensa: 50mm | Eksposur presisi mengunci bayangan subjek.",
    },
    {
      id: 6,
      title: "Arsitektur Masjid Raya Sumbar",
      category: "photography",
      desc: "Detail struktur atap khas rumah gadang pada arsitektur modern Masjid Raya Sumatera Barat.",
      img: "/6.jpeg",
      details: "Kamera: Ultra-wide 12mm | Sudut pengambilan low-angle dramatis.",
    },
    {
      id: 17,
      title: "Divisi Multimedia - UKM Cybertech PNP",
      category: "docs",
      desc: "Partisipasi aktif dalam kegiatan media dan multimedia di Unit Kegiatan Mahasiswa Cybertech Politeknik Negeri Padang.",
      img: "/anggota_multimedia_ukm_cybertech.jpeg",
      details: "Organisasi: UKM Cybertech PNP | Anggota Divisi Multimedia.",
    },
    {
      id: 19,
      title: "Koordinator Volunteer HIVE Sumbar",
      category: "docs",
      desc: "Pengalaman kepemimpinan mengoordinasikan tim relawan untuk menyukseskan event kreatif HIVE di Sumatera Barat.",
      img: "/koordinator_volunteer_hive.jpeg",
      details: "Komunitas: HIVE Sumatera Barat | Peran: Koordinator Volunteer.",
    },
    {
      id: 21,
      title: "Kepala Bidang Kominfo - HMTI PNP",
      category: "docs",
      desc: "Kepemimpinan divisi Komunikasi dan Informatika HMTI Politeknik Negeri Padang, mengarahkan kreasi konten visual dan publikasi digital.",
      img: "/kepala_bidang_kominfo.jpeg",
      details: "Organisasi: HMTI PNP | Peran: Kepala Bidang Kominfo.",
    },
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="space-y-8 pt-6 font-tech">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#2a2e33] pb-4">
        <div>
          <div
            className="font-tech text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
            style={{ color: themeColor }}
          >
            [ EKSPLORASI ESTETIKA ]
          </div>
          <h3 className="font-anybody text-2xl sm:text-3xl font-black italic text-white uppercase flex items-center gap-2">
            <ImageIcon className="h-6 w-6" style={{ color: themeColor }} />
            GALERI KREATIF & VISUAL
          </h3>
        </div>

        {/* Filter Pills — Theme Reactive */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="px-3.5 py-1.5 text-xs font-bold transition-all border-2"
              style={
                filter === cat.id
                  ? { backgroundColor: themeColor, color: "#fff", borderColor: themeColor }
                  : { backgroundColor: "#181b1b", color: "#cbd5e1", borderColor: "#2a2e33" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            key={item.id}
            className="group relative cursor-pointer bg-[#181b1b] border-2 border-[#2a2e33] transition-all overflow-hidden rounded-xl"
            style={{ "--hover-border": themeColor }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = themeColor}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2a2e33"}
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-video relative overflow-hidden bg-[#0b1329]">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#121414]/30 group-hover:bg-[#121414]/10 transition-colors" />

              <div className="absolute inset-0 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">
                <div
                  className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center transition-colors"
                  style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}` }}
                >
                  <Eye className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <span
                className="text-[9px] font-bold uppercase tracking-widest transition-colors duration-300"
                style={{ color: themeColor }}
              >
                [{item.category === "photography" ? "FOTOGRAFI" : "DOKUMENTASI"}]
              </span>
              <h4 className="font-anybody text-sm font-extrabold italic text-white group-hover:text-slate-200 transition-colors">
                {item.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal — Theme Reactive */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#121414]/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#181b1b] border-2 p-4 shadow-2xl rounded-xl"
              style={{ borderColor: themeColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 p-2 text-white font-bold rounded-lg transition-colors"
                style={{ backgroundColor: themeColor }}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="aspect-video bg-[#0b1329] border border-[#1d2847] overflow-hidden flex items-center justify-center rounded-lg">
                  <img src={selectedItem.img} alt={selectedItem.title} className="max-h-full object-contain" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-anybody text-xl font-black italic text-white">{selectedItem.title}</h3>
                  <p className="font-sans text-xs text-slate-300">{selectedItem.desc}</p>
                  <p className="font-tech text-[11px] pt-2 transition-colors duration-300" style={{ color: themeColor }}>
                    {selectedItem.details}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
