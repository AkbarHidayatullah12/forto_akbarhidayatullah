'use client'
/* eslint-disable @next/next/no-img-element */

import './page.css'
import {
	useScroll,
	motion,
	useSpring,
	scrollInfo,
	AnimatePresence
} from 'framer-motion'
import {
	type Ref,
	type JSX,
	createRef,
	useRef,
	Suspense,
	useLayoutEffect,
	useImperativeHandle,
	useState
} from 'react'
import * as TOC from '@/components/TOC'
import clsx from 'clsx'
import Scene from './Scene'
import type { Vector3Tuple } from 'three'
import { sharedInView, transformVector3, useMotionVector3, useVector3Spring } from '@/utils/motion'
import { screens } from '@/theme'

const SPRING = {
	stiffness: 100,
	damping: 40,
	mass: 1
}

const cameraPositions: Array<Vector3Tuple> = [
	[0, 0, 20],
	[20, 0, 0],
	[0, 5, 15],
	[21.775, -4.44, 18.33],
	[8.36, 4.93, 10],
	[-16, 1.8, 17]
]
const cameraLookAts: Array<Vector3Tuple> = [
	[-0.15, 0, 0],
	[0, 0, 1.25],
	[-0.5, -0.7, -2],
	[-2.35, -0.5, 0],
	[-0.25, -0.1, 0],
	[0.9, -0.05, 0]
]
const narrowCameraLookAts: Array<Vector3Tuple> = [
	[-0.15, 0, 0],
	[0, -0.1, 0.125],
	[-0.2, -0.7, -2],
	[0, -0.75, 0],
	[-0.25, -0.1, 0],
	[0.4, -0.05, 0]
]
const floatIntensities: Array<Vector3Tuple> = [
	[1, 0, 0],
	[0, 0, 1],
	[0.5, 0, 0],
	[1, 0, 0],
	[0.75, 0, 0],
	[1, 0, 0]
]

const ZERO: Vector3Tuple = [0, 0, 0]

const narrowQuery = `not (min-width: ${screens['guides-4']})`
const narrow: Pick<MediaQueryList, 'matches'> =
	typeof window === 'undefined' ? { matches: false } : window.matchMedia(narrowQuery)

export default function Home() {
	const sectionRefs = useRef(
		Array(6)
			.fill(null)
			.map(() => createRef<HTMLElement>())
	)

	const spring = SPRING

	const cameraPosition = useMotionVector3(cameraPositions[0])
	const smoothedCameraPosition = useVector3Spring(cameraPosition, spring)
	const cameraLookAt = useMotionVector3(cameraLookAts[0])
	const smoothedCameraLookAt = useVector3Spring(cameraLookAt, spring)
	const floatIntensity = useMotionVector3(floatIntensities[0])
	const smoothedFloatIntensity = useVector3Spring(floatIntensity, spring)

	const [activeImageModal, setActiveImageModal] = useState<string | null>(null)

	const makeOnScrollProgress = (curr: number) => {
		const prev = Math.max(curr - 1, 0)

		const [posX, posY, posZ] = transformVector3(
			[0, 1],
			[cameraPositions[prev], cameraPositions[curr]]
		)
		const [lookX, lookY, lookZ] = transformVector3(
			[0, 1],
			[cameraLookAts[prev], cameraLookAts[curr]]
		)
		const [narrowLookX, narrowLookY, narrowLookZ] = transformVector3(
			[0, 1],
			[narrowCameraLookAts[prev], narrowCameraLookAts[curr]]
		)
		const [floatX, floatY, floatZ] = transformVector3(
			[0, 0.1, 0.9, 1],
			[floatIntensities[prev], ZERO, ZERO, floatIntensities[curr]]
		)
		return (progress: number) => {
			const isNarrow = narrow.matches

			cameraPosition.set(posX(progress), posY(progress), posZ(progress))
			cameraLookAt.set(
				(isNarrow ? narrowLookX : lookX)(progress),
				(isNarrow ? narrowLookY : lookY)(progress),
				(isNarrow ? narrowLookZ : lookZ)(progress)
			)
			floatIntensity.set(floatX(progress), floatY(progress), floatZ(progress))
		}
	}

	return (
		<>
			{/* 3D Scene in Fixed Background */}
			<Suspense fallback={null}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.75 }}
				>
					<Scene
						cameraLookAt={smoothedCameraLookAt}
						cameraPosition={smoothedCameraPosition}
						floatIntensity={smoothedFloatIntensity}
						className="!fixed !inset-0 pointer-events-none"
					/>
				</motion.div>
			</Suspense>

			{/* Floating Table of Contents */}
			<TOC.Root className="hidden xl:flex">
				<TOC.Item title="00 / Overview" href="#overview" sectionRef={sectionRefs.current[0]} />
				<TOC.Item
					title="01 / Engineering Works"
					href="#engineering"
					sectionRef={sectionRefs.current[1]}
				/>
				<TOC.Item
					href="#hackathon"
					title="02 / Hackathon 24h"
					sectionRef={sectionRefs.current[2]}
				/>
				<TOC.Item
					href="#visuals"
					title="03 / Visual Direction"
					sectionRef={sectionRefs.current[3]}
				/>
				<TOC.Item
					href="#arsenal"
					title="04 / Arsenal & Journey"
					sectionRef={sectionRefs.current[4]}
				/>
				<TOC.Item
					href="#contact"
					title="05 / Curated Inquiries"
					sectionRef={sectionRefs.current[5]}
				/>
			</TOC.Root>

			{/* =========================================================================
			    HALAMAN 1 (SECTION 0: OVERVIEW)
			    Floating Editorial: Profil di Kiri, Patung 3D di Tengah, Highlights di Kanan
			   ========================================================================= */}
			<Section
				id="overview"
				ref={sectionRefs.current[0]}
				onScrollProgress={makeOnScrollProgress(0)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-5 sm:px-10 lg:px-14 xl:px-20"
			>
				<div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
					{/* SISI KIRI: Profil & Bio (Floating Typography) */}
					<div className="md:col-span-5 lg:col-span-5 max-w-xl mr-auto space-y-3.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
						<div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
							<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
							EXHIBIT // 00 &bull; AVAILABLE FOR OPPORTUNITIES
						</div>

						<div className="space-y-2">
							<h1
								style={{ fontSize: 'clamp(2.15rem, 4.2vw, 3.85rem)', lineHeight: 1.06 }}
								className="font-serif text-white font-normal tracking-tight"
							>
								Akbar <br />
								<span className="italic font-light text-white/85">Hidayatullah</span>
							</h1>
							<p className="text-xs sm:text-[13px] font-mono tracking-wider uppercase text-blue-400 font-medium">
								Full-Stack Developer &bull; Backend Architect &bull; Visual Director
							</p>
						</div>

						<div className="w-12 h-px bg-white/20"></div>

						<p className="text-xs sm:text-[13px] leading-relaxed text-white/70 font-light max-w-lg">
							Mahasiswa semester 7 D4 Teknologi Rekayasa Perangkat Lunak Politeknik Negeri Padang. Berfokus pada perancangan arsitektur backend andal, optimasi database, serta menyatukan logika rekayasa perangkat lunak dengan kepekaan estetika visual fotografi &amp; sinematografi.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono text-white/60 pt-2 border-t border-white/10 max-w-lg">
							<div>
								<span className="text-white/30 uppercase tracking-widest block text-[9px] mb-0.5">LOCATION</span>
								<span className="text-white/90">Padang, Sumatera Barat</span>
							</div>
							<div>
								<span className="text-white/30 uppercase tracking-widest block text-[9px] mb-0.5">CORE STACK</span>
								<span className="text-white/90">Next.js &bull; Laravel &bull; Express</span>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-3 pt-1">
							<a
								href="#engineering"
								className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-blue-400 hover:text-black shadow-lg"
							>
								<span>Explore Masterpieces</span>
								<span aria-hidden="true" className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
							</a>
							<a
								href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-white hover:border-white hover:bg-white/15 transition-all backdrop-blur-sm"
							>
								<span>Curriculum Vitae</span>
								<span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
							</a>
						</div>
					</div>

					{/* AREA TENGAH KOSONG LUAS: Patung 3D Venus bernapas bebas */}
					<div className="hidden md:block md:col-span-3 lg:col-span-3"></div>

					{/* SISI KANAN: Highlight Akademik & Prestasi (Bebas embel-embel speed/workflow) */}
					<div className="md:col-span-4 lg:col-span-4 max-w-xs sm:max-w-sm ml-auto mr-auto md:mr-0 w-full space-y-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mt-6 md:mt-0 pt-6 md:pt-0 border-t border-white/10 md:border-t-0">
						<div className="border-b border-white/15 pb-2">
							<div className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
								KEY HIGHLIGHTS // ACADEMIC &amp; HONORS
							</div>
						</div>

						<div className="space-y-4">
							{/* IPK 3.51 */}
							<div className="space-y-1">
								<div className="font-serif text-3xl sm:text-4xl text-white font-normal">
									3.51 <span className="text-sm font-mono text-white/40 font-light">/ 4.00</span>
								</div>
								<div className="text-[11px] font-mono tracking-widest uppercase text-white/50">
									IPK &bull; POLITEKNIK NEGERI PADANG
								</div>
								<p className="text-xs text-white/60 font-light leading-relaxed">
									Pencapaian akademik konsisten pada program studi D4 Teknologi Rekayasa Perangkat Lunak.
								</p>
							</div>

							<div className="h-px bg-white/10"></div>

							{/* Juara 3 Hackathon */}
							<div className="space-y-1">
								<div className="font-serif text-3xl sm:text-4xl text-yellow-300 font-normal">
									Juara 3
								</div>
								<div className="text-[11px] font-mono tracking-widest uppercase text-yellow-300/80">
									FIRETECH HACKATHON 24H &bull; UNAND 2025
								</div>
								<p className="text-xs text-white/60 font-light leading-relaxed">
									Inovasi platform “SapaSumbar” (Sistem Aspirasi &amp; Pengaduan Sumbar) berbasis Laravel &amp; Neon Database dengan sistem voting transparan.
								</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* =========================================================================
			    HALAMAN 2 (SECTION 1: ENGINEERING WORKS)
			    Floating Editorial: Sisi KIRI saja, Patung 3D bernapas lega di KANAN
			   ========================================================================= */}
			<Section
				id="engineering"
				ref={sectionRefs.current[1]}
				onScrollProgress={makeOnScrollProgress(1)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-6 sm:px-10 lg:px-14 xl:px-20"
			>
				<div className="w-full max-w-xl lg:max-w-2xl mr-auto space-y-3.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
					<div className="space-y-1">
						<div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
							EXHIBIT // 01 &bull; ENGINEERING WORKS
						</div>
						<h2
							style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}
							className="font-serif text-white font-normal tracking-tight"
						>
							Architected Systems <br />
							<span className="italic font-light text-white/80">&amp; Software Projects</span>
						</h2>
					</div>

					<div className="space-y-3 sm:space-y-4">
						{/* Project 1: E-Catalog (PBL) */}
						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-[11px] font-mono">
								<span className="text-blue-400 font-bold uppercase tracking-wider">
									BACKEND DEVELOPER
								</span>
								<span className="text-white/30">&bull;</span>
								<span className="text-white/50">Project-Based Learning 2024</span>
							</div>

							<h3 className="font-serif text-base sm:text-lg font-normal text-white">
								E-Catalog &amp; Sistem Gudang — Toko Usaha Muda
							</h3>

							<p className="text-xs sm:text-[13px] leading-relaxed text-white/70 font-light">
								Membangun sistem backend platform E-Catalog dan sistem Gudang inventaris untuk mitra UMKM Toko Usaha Muda. Merancang arsitektur database relasional MySQL 3NF, Eloquent ORM, query indexing, serta autentikasi kontrol akses berbasis peran (RBAC).
							</p>

							<div className="text-[11px] font-mono text-white/60 tracking-wider">
								<span className="text-white/30 uppercase mr-1.5">TECH:</span>
								PHP &bull; Laravel &bull; Next.js &bull; MySQL (3NF) &bull; REST API &bull; Tailwind CSS
							</div>

							<div className="flex items-center gap-4 pt-0.5">
								<a
									href="https://github.com/intersectcode-A1/intersectcode_textilehub.git"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
								>
									<span>GitHub Repository</span>
									<span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
								</a>
								<button
									type="button"
									onClick={() => setActiveImageModal('/dokumentasi_PBL.jpeg')}
									className="text-[11px] font-mono uppercase tracking-widest font-semibold text-white/60 hover:text-white transition-colors"
								>
									Lihat Foto Dokumentasi ↗
								</button>
							</div>
						</div>

						<div className="h-px bg-white/10"></div>

						{/* Project 2: E-LOA */}
						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-[11px] font-mono">
								<span className="text-blue-400 font-bold uppercase tracking-wider">
									FULL-STACK DEVELOPER
								</span>
								<span className="text-white/30">&bull;</span>
								<span className="text-white/50">Full-Stack Development 2024</span>
							</div>

							<h3 className="font-serif text-base sm:text-lg font-normal text-white">
								Sistem E-LOA Elektronik
							</h3>

							<p className="text-xs sm:text-[13px] leading-relaxed text-white/70 font-light">
								Membangun sistem Surat Tugas Elektronik (E-LOA) dari nol untuk memotong inefisiensi berkas fisik kertas. Dilengkapi approval bertingkat (Admin, Reviewer, Pimpinan), tanda tangan digital terverifikasi, dan generator PDF otomatis.
							</p>

							<div className="text-[11px] font-mono text-white/60 tracking-wider">
								<span className="text-white/30 uppercase mr-1.5">TECH:</span>
								Laravel 11 &bull; Java &bull; Next.js &bull; PostgreSQL &bull; DomPDF &bull; Tailwind CSS
							</div>

							<div className="flex items-center gap-4 pt-0.5">
								<a
									href="https://github.com/AkbarHidayatullah12/proyek_rumah_jurnal_akbar.git"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
								>
									<span>GitHub Repository</span>
									<span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
								</a>
								<button
									type="button"
									onClick={() => setActiveImageModal('/dokumentasi_eloa.jpeg')}
									className="text-[11px] font-mono uppercase tracking-widest font-semibold text-white/60 hover:text-white transition-colors"
								>
									Lihat Foto Dokumentasi ↗
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* =========================================================================
			    HALAMAN 3 (SECTION 2: HACKATHON 24H)
			    Floating Editorial: Sisi KIRI saja, Patung 3D bernapas di KANAN
			   ========================================================================= */}
			<Section
				id="hackathon"
				ref={sectionRefs.current[2]}
				onScrollProgress={makeOnScrollProgress(2)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-6 sm:px-10 lg:px-14 xl:px-20"
			>
				<div className="w-full max-w-xl lg:max-w-2xl mr-auto space-y-3.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
					<div className="space-y-1">
						<div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-yellow-300 uppercase">
							EXHIBIT // 02 &bull; JUARA 3 REGIONAL
						</div>
						<div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
							FIRETECH HACKATHON 2025 &bull; UNIVERSITAS ANDALAS
						</div>
						<h2
							style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}
							className="font-serif text-white font-normal tracking-tight"
						>
							SapaSumbar <br />
							<span className="italic font-light text-yellow-300">Aspirasi &amp; Pengaduan Publik</span>
						</h2>
					</div>

					<p className="text-xs sm:text-[13px] leading-relaxed text-white/75 font-light">
						Dalam kompetisi hackathon 24 jam non-stop Firetech Universitas Andalas, tim mahasiswa Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL) PNP menghadirkan inovasi bertajuk <strong className="text-white font-medium">“SapaSumbar”</strong> (Sistem Aspirasi dan Pengaduan Sumbar) dan sukses meraih predikat <strong className="text-yellow-300 font-medium">Juara 3 Regional</strong>.
					</p>

					<div className="space-y-1 border-l-2 border-yellow-400/80 pl-3.5 py-0.5">
						<div className="text-[11px] font-mono uppercase tracking-widest text-yellow-300 font-bold">
							WADAH ASPIRASI DENGAN SISTEM VOTING TRANSPARAN
						</div>
						<p className="text-xs leading-relaxed text-white/75 font-light">
							Platform berfungsi sebagai wadah interaktif bagi masyarakat untuk menyampaikan aspirasi, pengaduan, serta berdiskusi mengenai berbagai isu publik. Melalui sistem voting terbuka, pengguna dapat menilai dan mendukung laporan lain secara transparan.
						</p>
					</div>

					<div className="text-[11px] font-mono text-white/60 tracking-wider">
						<span className="text-white/30 uppercase mr-1.5">TECH:</span>
						Laravel &bull; Neon Database (PostgreSQL) &bull; React.js &bull; REST API &bull; Tailwind CSS
					</div>

					<div className="flex flex-wrap items-center gap-3 pt-1 border-t border-white/10">
						<a
							href="https://github.com/Dafa-Aziul/SapaSumbar.git"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-yellow-300 hover:text-black shadow-lg"
						>
							<span>GitHub Repository</span>
							<span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
						</a>
						<button
							type="button"
							onClick={() => setActiveImageModal('/juara3hackathon.jpeg')}
							className="group inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-white hover:border-white hover:bg-white/15 transition-all backdrop-blur-sm"
						>
							<span>Lihat Sertifikat Juara</span>
							<span aria-hidden="true">↗</span>
						</button>
					</div>
				</div>
			</Section>

			{/* =========================================================================
			    HALAMAN 4 (SECTION 3: CREATIVE DIRECTION & PHOTOGRAPHY)
			    Floating Editorial: Sisi KIRI saja, Patung 3D & Halo bebas di KANAN
			   ========================================================================= */}
			<Section
				id="visuals"
				ref={sectionRefs.current[3]}
				onScrollProgress={makeOnScrollProgress(3)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-6 sm:px-10 lg:px-14 xl:px-20"
			>
				<div className="w-full max-w-xl lg:max-w-2xl mr-auto space-y-3.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
					<div className="space-y-1">
						<div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
							EXHIBIT // 03 &bull; CREATIVE DIRECTION
						</div>
						<h2
							style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}
							className="font-serif text-white font-normal tracking-tight"
						>
							Visual Storytelling <br />
							<span className="italic font-light text-white/80">&amp; Leadership</span>
						</h2>
					</div>

					<div className="space-y-1.5">
						<h3 className="font-serif text-base sm:text-lg font-normal text-white">
							Kepemimpinan Media &amp; Brand Identity
						</h3>
						<p className="text-xs sm:text-[13px] leading-relaxed text-white/70 font-light">
							Sebagai <strong className="text-white font-medium">Kepala Bidang Kominfo HMTI PNP</strong> (2025–2026) dan <strong className="text-white font-medium">Ketua Bidang Medkraf HIVE Sumbar</strong> (2024–2026), mengarahkan strategi publikasi visual digital yang menjangkau 300+ mahasiswa TI dan ribuan audiens pemuda kreatif se-Sumatera Barat.
						</p>
						<div className="flex flex-wrap gap-2 pt-0.5">
							<button
								type="button"
								onClick={() => setActiveImageModal('/kepala_bidang_kominfo.jpeg')}
								className="rounded-full border border-white/20 bg-black/40 px-3 py-0.5 text-[11px] font-mono text-white/90 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
							>
								Foto Kabid Kominfo ↗
							</button>
							<button
								type="button"
								onClick={() => setActiveImageModal('/koordinator_volunteer_hive.jpeg')}
								className="rounded-full border border-white/20 bg-black/40 px-3 py-0.5 text-[11px] font-mono text-white/90 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
							>
								Foto Koordinator HIVE ↗
							</button>
							<button
								type="button"
								onClick={() => setActiveImageModal('/relawan_hive.jpeg')}
								className="rounded-full border border-white/20 bg-black/40 px-3 py-0.5 text-[11px] font-mono text-white/90 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
							>
								Foto Aksi Kemanusiaan ↗
							</button>
						</div>
					</div>

					<div className="h-px bg-white/10"></div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="font-serif text-base sm:text-lg font-normal text-white">
								Curated Photography Archive
							</h3>
							<a
								href="https://www.instagram.com/akbar_hidytllh/"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-1 text-[11px] font-mono tracking-wider text-blue-400 hover:text-white transition-colors"
							>
								<span>@akbar_hidytllh</span>
								<span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
							</a>
						</div>
						<p className="text-xs text-white/60 font-light">
							Eksplorasi lensa 35mm, 50mm, dan 85mm. Menangkap candid human interest, lanskap alam Sumatera Barat, serta arsitektur bersejarah kota Padang.
						</p>

						{/* Photo Thumbnail Grid 3x2 Lebih Kompak */}
						<div className="grid grid-cols-3 gap-2 pt-0.5">
							{[
								{ file: '/1.jpeg', label: 'Pesisir Barat' },
								{ file: '/2.jpeg', label: 'Human Interest' },
								{ file: '/3.jpeg', label: 'Lembah Harau' },
								{ file: '/4.jpeg', label: 'Kota Tua Padang' },
								{ file: '/5.jpeg', label: 'Senja Taplau' },
								{ file: '/6.jpeg', label: 'Masjid Raya' }
							].map((photo) => (
								<button
									key={photo.file}
									type="button"
									onClick={() => setActiveImageModal(photo.file)}
									className="group relative h-14 sm:h-16 overflow-hidden rounded-md border border-white/15 text-left transition-all hover:border-white/60 shadow-md"
								>
									<img
										src={photo.file}
										alt={photo.label}
										className="size-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-1.5">
										<span className="text-[9px] font-mono tracking-wider text-white truncate">
											{photo.label} ↗
										</span>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</Section>

			{/* =========================================================================
			    HALAMAN 5 (SECTION 4: ARSENAL & JOURNEY)
			    Floating Editorial: KIRI (Skills) & KANAN (Timeline), Patung Bebas di Tengah
			   ========================================================================= */}
			<Section
				id="arsenal"
				ref={sectionRefs.current[4]}
				onScrollProgress={makeOnScrollProgress(4)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-5 sm:px-10 lg:px-14 xl:px-20"
			>
				<div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
					{/* SISI KIRI: Technical Arsenal (Floating Editorial Kompak) */}
					<div className="md:col-span-5 lg:col-span-4 max-w-xs sm:max-w-sm mr-auto space-y-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
						<div className="space-y-1.5 border-b border-white/15 pb-2.5">
							<div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
								EXHIBIT // 04 &bull; CAPABILITIES
							</div>
							<h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
								Technical <br />
								<span className="italic font-light text-white/80">Arsenal</span>
							</h3>
						</div>

						<div className="space-y-3">
							<div className="space-y-0.5">
								<div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold">
									01 // LANGUAGES &amp; CORE
								</div>
								<p className="text-[11px] sm:text-xs text-white/75 font-light leading-relaxed">
									JavaScript (ES6+), PHP, Dart, Java, SQL, HTML5 &amp; CSS3
								</p>
							</div>

							<div className="h-px bg-white/10"></div>

							<div className="space-y-0.5">
								<div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold">
									02 // FRAMEWORKS &amp; ARCHITECTURE
								</div>
								<p className="text-[11px] sm:text-xs text-white/75 font-light leading-relaxed">
									Next.js (App &amp; Pages), React.js, Laravel 11, Express.js, Flutter, Tailwind CSS, RESTful API Design
								</p>
							</div>

							<div className="h-px bg-white/10"></div>

							<div className="space-y-0.5">
								<div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold">
									03 // DATABASES &amp; WORKFLOW
								</div>
								<p className="text-[11px] sm:text-xs text-white/75 font-light leading-relaxed">
									MySQL (3NF Normalization), PostgreSQL, Git, GitHub, Postman, Figma, Agile / Scrum
								</p>
							</div>

							<div className="h-px bg-white/10"></div>

							<div className="space-y-0.5">
								<div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold">
									04 // CREATIVE SUITE
								</div>
								<p className="text-[11px] sm:text-xs text-white/75 font-light leading-relaxed">
									Adobe Premiere Pro, DaVinci Resolve, Adobe Lightroom, Adobe Photoshop
								</p>
							</div>
						</div>
					</div>

					{/* AREA TENGAH KOSONG: Patung 3D Venus berada di tengah tanpa tertutup */}
					<div className="hidden md:block md:col-span-2 lg:col-span-4"></div>

					{/* SISI KANAN: Experience Timeline (Floating Editorial Kompak) */}
					<div className="md:col-span-5 lg:col-span-4 max-w-xs sm:max-w-sm ml-auto mr-auto md:mr-0 w-full space-y-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mt-8 md:mt-0 pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
						<div className="space-y-1.5 border-b border-white/15 pb-2.5">
							<div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
								EXHIBIT // 04 &bull; CHRONOLOGY
							</div>
							<h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
								Experience <br />
								<span className="italic font-light text-white/80">&amp; Education</span>
							</h3>
						</div>

						<div className="space-y-2.5 text-[11px] font-light">
							<div className="border-l-2 border-blue-400 pl-3 space-y-0.5">
								<div className="text-[10px] font-mono text-blue-400 font-bold tracking-wider">
									2023 - SEKARANG (SMT 7)
								</div>
								<div className="font-serif text-sm text-white">Politeknik Negeri Padang (PNP)</div>
								<div className="text-white/70">
									D4 Teknologi Rekayasa Perangkat Lunak &bull; IPK 3.51 / 4.00
								</div>
							</div>

							<div className="border-l-2 border-emerald-400 pl-3 space-y-0.5">
								<div className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
									2025 - 2026
								</div>
								<div className="font-serif text-sm text-white">Kepala Bidang Kominfo HMTI PNP</div>
								<div className="text-white/70">
									Memimpin divisi komunikasi &amp; publikasi untuk 300+ mahasiswa TI
								</div>
							</div>

							<div className="border-l-2 border-purple-400 pl-3 space-y-0.5">
								<div className="text-[10px] font-mono text-purple-400 font-bold tracking-wider">
									2024 - 2026
								</div>
								<div className="font-serif text-sm text-white">Ketua Medkraf &amp; Koordinator Volunteer</div>
								<div className="text-white/70">
									HIVE Sumatera Barat &bull; Konten visual &amp; program kreatif
								</div>
							</div>

							<div className="border-l-2 border-rose-400 pl-3.5 space-y-0.5">
								<div className="text-[11px] font-mono text-rose-400 font-bold tracking-wider">
									2026
								</div>
								<div className="font-serif text-sm text-white">Relawan Kebencanaan</div>
								<div className="text-white/70">
									HIVE Sumatera Barat &bull; Tanggap &amp; respons kebencanaan
								</div>
							</div>

							<div className="border-l-2 border-cyan-400 pl-3.5 space-y-0.5">
								<div className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider">
									2024 - 2025
								</div>
								<div className="font-serif text-sm text-white">Anggota Bidang Multimedia</div>
								<div className="text-white/70">UKM Cybertech PNP</div>
							</div>

							<div className="border-l-2 border-white/30 pl-3.5 space-y-0.5">
								<div className="text-[10px] font-mono text-white/50 font-bold tracking-wider">
									2021
								</div>
								<div className="font-serif text-sm text-white">Praktik Kerja Lapangan (PKL)</div>
								<div className="text-white/70">PT Garuda Cyber Indonesia &bull; Mekari Jurnal</div>
							</div>

							<div className="border-l-2 border-white/30 pl-3.5 space-y-0.5">
								<div className="text-[10px] font-mono text-white/50 font-bold tracking-wider">
									2019 - 2022
								</div>
								<div className="font-serif text-sm text-white">SMKN 2 Padang</div>
								<div className="text-white/70">Rekayasa Perangkat Lunak (RPL)</div>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* =========================================================================
			    HALAMAN 6 (SECTION 5: CURATED INQUIRIES & CONTACT)
			    Floating Editorial: Sisi KANAN saja, Patung & Halo terang di KIRI
			   ========================================================================= */}
			<Section
				id="contact"
				ref={sectionRefs.current[5]}
				onScrollProgress={makeOnScrollProgress(5)}
				className="flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 !max-w-full px-6 sm:px-10 lg:px-16 xl:px-24"
			>
				<div className="w-full max-w-sm lg:max-w-md ml-auto mr-0 xl:mr-8 space-y-4 sm:space-y-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
					<div className="space-y-1.5 border-b border-white/15 pb-2.5">
						<div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
							EXHIBIT // 05 &bull; CURATED INQUIRIES
						</div>
						<h2
							style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}
							className="font-serif text-white font-normal tracking-tight"
						>
							Let&apos;s Build Resilient <br />
							<span className="italic font-light text-white/80">Systems Together</span>
						</h2>
						<p className="text-xs sm:text-[13px] leading-relaxed text-white/70 font-light">
							Terbuka untuk posisi Full-Stack Developer, Backend Architect, serta kolaborasi proyek perangkat lunak dan creative visual direction.
						</p>
					</div>

					<div className="space-y-2">
						<a
							href="mailto:akbar281804@gmail.com"
							className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:border-white/40 transition-colors"
						>
							<div>
								<div className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-bold">
									DIRECT EMAIL
								</div>
								<div className="text-xs sm:text-sm font-light text-white group-hover:text-blue-300 transition-colors">
									akbar281804@gmail.com
								</div>
							</div>
							<span className="text-[11px] font-mono text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
								&rarr;
							</span>
						</a>

						<a
							href="https://wa.me/6282170745676"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:border-white/40 transition-colors"
						>
							<div>
								<div className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
									WHATSAPP / CALL
								</div>
								<div className="text-xs sm:text-sm font-light text-white group-hover:text-emerald-300 transition-colors">
									0821-7074-5676
								</div>
							</div>
							<span className="text-[11px] font-mono text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
								&rarr;
							</span>
						</a>

						<a
							href="https://www.linkedin.com/in/akbar-hidayatullah-570212376/"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:border-white/40 transition-colors"
						>
							<div>
								<div className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-bold">
									LINKEDIN NETWORK
								</div>
								<div className="text-xs sm:text-sm font-light text-white group-hover:text-blue-300 transition-colors">
									in/akbar-hidayatullah
								</div>
							</div>
							<span className="text-[11px] font-mono text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
								&rarr;
							</span>
						</a>

						<a
							href="https://github.com/AkbarHidayatullah12"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:border-white/40 transition-colors"
						>
							<div>
								<div className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold">
									GITHUB ARCHIVE
								</div>
								<div className="text-xs sm:text-sm font-light text-white group-hover:text-purple-300 transition-colors">
									github.com/AkbarHidayatullah12
								</div>
							</div>
							<span className="text-[11px] font-mono text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
								&rarr;
							</span>
						</a>
					</div>

					<div className="flex flex-wrap items-center gap-3 pt-1">
						<a
							href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-blue-400 hover:text-black shadow-lg"
						>
							<span>Download CV (PDF)</span>
							<span aria-hidden="true" className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
						</a>
						<a
							href="https://www.instagram.com/akbar_hidytllh/"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white hover:border-white hover:bg-white/15 transition-all backdrop-blur-sm"
						>
							<span>Instagram @akbar_hidytllh</span>
							<span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
						</a>
					</div>

					<div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-white/40 pt-3 border-t border-white/10">
						<span>Padang, Sumatera Barat, Indonesia</span>
						<span>&copy; {new Date().getFullYear()} Akbar Hidayatullah</span>
					</div>
				</div>
			</Section>

			{/* Lightbox Modal for Photo / Certificate Preview */}
			<AnimatePresence>
				{activeImageModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setActiveImageModal(null)}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
					>
						<motion.div
							initial={{ scale: 0.95 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.95 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black/90 p-2 shadow-2xl"
						>
							<button
								type="button"
								onClick={() => setActiveImageModal(null)}
								className="absolute right-4 top-4 z-10 rounded-full bg-black/70 border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white hover:text-black transition-all"
							>
								Close &times;
							</button>
							<img
								src={activeImageModal}
								alt="Preview"
								className="max-h-[85vh] w-auto rounded-xl object-contain"
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

/* ==========================================================================
   GENERIC SECTION WRAPPER WITH SCROLL PROGRESS
   ========================================================================== */

type SectionProps = JSX.IntrinsicElements['section'] & {
	ref?: Ref<HTMLElement>
	onScrollProgress?: (progress: number) => void
}

function Section({ children, ref, onScrollProgress, className, ...props }: SectionProps) {
	const innerRef = useRef<HTMLElement>(null)
	useImperativeHandle(ref, () => innerRef.current!, [])

	useLayoutEffect(() => {
		if (!onScrollProgress) return
		return sharedInView(
			innerRef.current!,
			() => {
				return scrollInfo(({ y: { progress } }) => onScrollProgress(progress), {
					target: innerRef.current!,
					offset: ['start end', 'start start']
				})
			},
			{ rootMargin: '-100% 0px 0px 0px' }
		)
	}, [onScrollProgress])

	return (
		<section
			{...props}
			ref={innerRef}
			className={clsx(
				'w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-screen relative snap-start',
				className
			)}
		>
			{children}
		</section>
	)
}
