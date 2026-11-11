import * as Nav from '@/components/Nav'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const cera = localFont({
	src: [
		{
			path: './fonts/Cera-Pro-Regular.woff2',
			weight: '400'
		},
		{
			path: './fonts/Cera-Pro-Medium.woff2',
			weight: '500'
		}
	],
	variable: '--font-cera'
})

export const metadata: Metadata = {
	title: 'Akbar Hidayatullah — Full-Stack Developer & Creative Visual Director',
	description:
		'Portfolio of Akbar Hidayatullah: D4 Software Engineering student at Politeknik Negeri Padang, Backend Architect, Full-Stack Developer, and Creative Visual Director.',
	icons: {
		icon: [
			{ url: '/icon.svg', type: 'image/svg+xml' }
		],
		apple: '/icon.svg'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="id" className={`relative scroll-smooth bg-black text-white ${cera.variable}`}>
			<body className="pt-20">
				<Guides />
				<header className="fixed top-0 inset-x-0 z-40 w-full py-3 sm:py-4 bg-black/85 backdrop-blur-md border-b border-white/10">
					<div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10 flex items-center justify-between gap-3 sm:gap-6">
						<a href="#" className="group flex flex-col">
							<span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
								AKBAR HIDAYATULLAH
							</span>
							<span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-blue-400 font-mono font-medium">
								Engineer &bull; Visual Director
							</span>
						</a>

						<Nav.Root className="hidden md:flex">
							<Nav.Item href="#overview" active={true}>
								Overview
							</Nav.Item>
							<Nav.Item href="#engineering">Engineering</Nav.Item>
							<Nav.Item href="#hackathon">Hackathon</Nav.Item>
							<Nav.Item href="#visuals">Visuals</Nav.Item>
							<Nav.Item href="#arsenal">Arsenal</Nav.Item>
							<Nav.Item href="#contact">Contact</Nav.Item>
						</Nav.Root>

						<div className="flex items-center gap-2 sm:gap-3">
							<a
								href="/CV_Akbar_Hidayatullah_Indonesia.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white transition-all hover:border-white hover:bg-white/20"
							>
								<span>CV PDF</span>
								<svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
							</a>
							<a
								href="https://wa.me/6282170745676"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-white px-3.5 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-blue-400 hover:text-black shadow-md whitespace-nowrap"
							>
								WhatsApp
							</a>
						</div>
					</div>
				</header>
				{children}
			</body>
		</html>
	)
}

function Guides() {
	return (
		<div className="pointer-events-none fixed inset-0 z-10 size-full opacity-40">
			<div className="container mx-auto max-w-7xl h-full grid grid-cols-2 md:grid-cols-4 px-6 md:px-10">
				<div className="border-r border-white/10"></div>
				<div className="border-r border-white/10"></div>
				<div className="border-r border-white/10"></div>
				<div className="border-r border-white/10"></div>
			</div>
		</div>
	)
}
