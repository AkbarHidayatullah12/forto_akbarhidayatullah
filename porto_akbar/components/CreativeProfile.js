"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Palette, Eye, Play, X, Layers, Image as ImageIcon } from "lucide-react";

export default function CreativeProfile() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: "all", label: "Semua Karya" },
    { id: "photography", label: "Fotografi", icon: Camera },
    { id: "docs", label: "Dokumentasi Kegiatan", icon: Layers },
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
      details: "Kamera: Mirrorless 50mm | Komposisi cahaya dramatis (Chiaroscuro) sore hari.",
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
      id: 7,
      title: "Aktivitas Nelayan Purus",
      category: "photography",
      desc: "Kerja keras nelayan tradisional menarik jala di pesisir pantai Purus Padang.",
      img: "/7.jpeg",
      details: "Kamera: Zoom 70-200mm | Kecepatan rana tinggi (shutter speed 1/1000s).",
    },
    {
      id: 8,
      title: "Kabut Pagi Danau Kembar",
      category: "photography",
      desc: "Suasana tenang permukaan danau berlatar bukit berselimut kabut tebal di Alahan Panjang.",
      img: "/8.jpeg",
      details: "Kamera: Prime 35mm | Komposisi simetris alami.",
    },
    {
      id: 9,
      title: "Potret Seni Pertunjukan",
      category: "photography",
      desc: "Gerakan dinamis penari tradisional Minangkabau dalam festival kebudayaan lokal.",
      img: "/9.jpeg",
      details: "Kamera: 85mm f/1.4 | Pencahayaan panggung dramatis dengan ISO tinggi.",
    },
    {
      id: 10,
      title: "Sisi Kehidupan Rel Kereta",
      category: "photography",
      desc: "Perspektif visual linier jalur kereta api bersejarah yang melintasi pemukiman warga Padang.",
      img: "/10.jpeg",
      details: "Kamera: 50mm | Leading lines composition.",
    },
    {
      id: 11,
      title: "Hijau Bukit Nobita",
      category: "photography",
      desc: "Pemandangan lanskap perbukitan hijau kota Padang dari ketinggian di sore hari.",
      img: "/11.jpeg",
      details: "Lensa: 24mm | Gradasi warna langit keemasan (golden hour).",
    },
    {
      id: 12,
      title: "Pasar Raya dalam Bingkai",
      category: "photography",
      desc: "Keramaian dan hiruk pikuk aktivitas ekonomi kreatif lokal di pusat kota Padang.",
      img: "/12.jpeg",
      details: "Kamera: 35mm | Street candid photography dengan pengeditan hitam-putih kontras.",
    },
    {
      id: 13,
      title: "Pesona Air Terjun Nyarai",
      category: "photography",
      desc: "Aliran air jernih di antara batuan purba kawasan lubuk alung dengan teknik slow shutter.",
      img: "/13.jpeg",
      details: "Lensa: 18mm | Ekskusi long exposure dengan filter polariser.",
    },
    {
      id: 14,
      title: "Rona Wajah Tetua Adat",
      category: "photography",
      desc: "Potret ekspresif wajah penuh karakter tetua adat Minangkabau dalam pakaian adat lengkap.",
      img: "/14.jpeg",
      details: "Kamera: 85mm Portrait | Memaksimalkan depth of field tipis f/1.8.",
    },
    {
      id: 15,
      title: "Refleksi Jembatan Siti Nurbaya",
      category: "photography",
      desc: "Pantulan cahaya lampu kapal dan jembatan ikonik di atas permukaan sungai Batang Arau malam hari.",
      img: "/15.jpeg",
      details: "Lensa: 24mm | Night photography dengan shutter speed lambat.",
    },
    {
      id: 16,
      title: "Ketenangan Danau Singkarak",
      category: "photography",
      desc: "Komposisi hening perahu nelayan yang sedang bersandar di tepi danau Singkarak saat fajar.",
      img: "/16.jpeg",
      details: "Kamera: 50mm | Warna pastel alami langit sebelum matahari terbit.",
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
      id: 18,
      title: "Dokumentasi Sistem E-LOA",
      category: "docs",
      desc: "Implementasi dan presentasi sistem Surat Tugas Elektronik (E-LOA) yang berhasil memotong waktu pemrosesan dokumen.",
      img: "/dokumentasi_eloa.jpeg",
      details: "Proyek: E-LOA | Teknologi: Laravel & PostgreSQL.",
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
      id: 20,
      title: "Relawan Kemanusiaan HIVE Peduli",
      category: "docs",
      desc: "Keterlibatan langsung dalam program kepedulian sosial dan bantuan kebencanaan bersama rekan-rekan relawan HIVE.",
      img: "/relawan_hive.jpeg",
      details: "Aksi Sosial: HIVE Peduli | Peran: Relawan Kebencanaan.",
    },
    {
      id: 21,
      title: "Kepala Bidang Kominfo - HMTI PNP",
      category: "docs",
      desc: "Kepemimpinan divisi Komunikasi dan Informatika HMTI Politeknik Negeri Padang, mengarahkan kreasi konten visual dan publikasi digital.",
      img: "/kepala_bidang_kominfo.jpeg",
      details: "Organisasi: HMTI PNP | Peran: Kepala Bidang Kominfo.",
    },
    {
      id: 22,
      title: "Dokumentasi PBL - Textile Hub",
      category: "docs",
      desc: "Perancangan dan pengerjaan sistem informasi web terintegrasi serta e-catalog untuk Toko Usaha Muda Padang.",
      img: "/dokumentasi_PBL.jpeg",
      details: "Proyek: Textile Hub | Mitra: Toko Usaha Muda Padang.",
    },
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div id="gallery" className="space-y-16">
      {/* Intro section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-brand-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-purple-light">
              Kreativitas Visual
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Keseimbangan Sempurna Antara Logika & Estetika
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Lebih dari sekadar menulis baris kode pemrograman, kekuatan kompetitif saya terletak pada pemahaman mendalam tentang komunikasi visual. Saya merancang media publikasi, mengambil foto, dan memproduksi video promosi profesional untuk menciptakan pengalaman digital yang utuh, bernilai estetika tinggi, dan membekas di ingatan audiens.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="creative-glass p-4 rounded-xl text-center border border-white/5">
              <Camera className="h-5 w-5 text-brand-purple mx-auto mb-2" />
              <div className="text-[10px] font-bold text-slate-300">Fotografi</div>
            </div>
            <div className="creative-glass p-4 rounded-xl text-center border border-white/5">
              <Layers className="h-5 w-5 text-brand-cyan mx-auto mb-2" />
              <div className="text-[10px] font-bold text-slate-300">Dokumentasi</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 border border-white/10 bg-brand-dark/45 p-6 rounded-2xl relative overflow-hidden creative-glass">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="h-4.5 w-4.5 text-brand-purple" />
            Peran Kreatif & Komunikasi Visual
          </h3>
          <div className="space-y-4 text-xs text-slate-300">
            <div className="border-l-2 border-brand-purple pl-4 space-y-1">
              <h4 className="font-extrabold text-white">Kepala Bidang Kominfo - HMTI PNP (2025-2026)</h4>
              <p className="text-slate-400">Memimpin divisi komunikasi visual, mengelola seluruh data publikasi digital, dan menyusun arahan kreatif konten media sosial organisasi.</p>
            </div>
            <div className="border-l-2 border-brand-cyan pl-4 space-y-1">
              <h4 className="font-extrabold text-white">Ketua Bidang Medkraf - HIVE Sumatera Barat</h4>
              <p className="text-slate-400">Merumuskan konsep kreatif, mendesain identitas brand visual event, dan mengkoordinasi tim desainer/videografer untuk kampanye regional.</p>
            </div>
            <div className="border-l-2 border-brand-purple-light pl-4 space-y-1">
              <h4 className="font-extrabold text-white">Divisi Media & Kreatif - UKM Cybertech PNP</h4>
              <p className="text-slate-400">Berkontribusi aktif memproduksi aset digital, mendokumentasikan kegiatan teknis, dan mengedit materi promosi teknologi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-brand-purple" />
            Portofolio Portofolio Visual
          </h3>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    filter === cat.id
                      ? "bg-brand-purple text-white border-brand-purple"
                      : "bg-brand-navy/30 text-slate-400 border-white/5 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Items Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-brand-dark/50 hover:border-brand-purple/40 transition-all duration-300"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Wrap */}
                <div className="aspect-video relative overflow-hidden bg-brand-black">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.category !== "photography" ? (
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-80" />
                  ) : (
                    <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-brand-black/40 transition-colors duration-300" />
                  )}
                  
                  {/* Overlay Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-brand-purple/90 border border-brand-purple-light/35 flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-300">
                    {item.isVideo ? <Play className="h-5 w-5 text-white fill-white/20" /> : <Eye className="h-5 w-5 text-white" />}
                  </div>
                </div>

                {/* Content info */}
                {item.category !== "photography" && (
                  <div className="p-5 space-y-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-purple-light bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">
                      {item.category === "video" ? "Videografi" : item.category === "design" ? "Desain Grafis" : "Dokumentasi Kegiatan"}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-purple-light transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox / Modal for details */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/95 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-brand-dark/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-black/60 text-slate-400 hover:text-white border border-white/5"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Media frame */}
                <div className={`bg-brand-black flex items-center justify-center aspect-video md:aspect-auto md:h-[450px] relative ${
                  selectedItem.category === "photography" ? "md:col-span-12 animate-fadeIn" : "md:col-span-8"
                }`}>
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.title}
                    className="max-h-full max-w-full object-contain"
                  />
                  {selectedItem.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-black/40">
                      <div className="h-16 w-16 rounded-full bg-brand-purple/95 flex items-center justify-center border border-white/10 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                        <Play className="h-6 w-6 text-white fill-white/20 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Media details text */}
                {selectedItem.category !== "photography" && (
                  <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-purple-light bg-brand-purple/20 px-2.5 py-1 rounded-full border border-brand-purple/35 inline-block">
                        {selectedItem.category === "video" ? "Videografi & Editing" : selectedItem.category === "design" ? "Desain Grafis" : "Dokumentasi Kegiatan"}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {selectedItem.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {selectedItem.desc}
                      </p>
                    </div>
                    
                    <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                      <span className="text-slate-400 font-bold">Metadata Produksi:</span>
                      <p className="font-mono text-slate-300 bg-brand-navy/45 border border-white/5 p-3 rounded-lg">
                        {selectedItem.details}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
