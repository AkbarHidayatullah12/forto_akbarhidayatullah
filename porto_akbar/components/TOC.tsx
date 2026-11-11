import clsx from 'clsx'
import { useScroll, useTransform, motion } from 'framer-motion'
import type { ComponentPropsWithoutRef, RefObject } from 'react'
import { colors } from '@/theme'

export function Root({ children, className, ...props }: ComponentPropsWithoutRef<'nav'>) {
	return (
		<nav
			aria-label="Table of contents"
			{...props}
			className={clsx(
				className,
				'pointer-events-none fixed inset-0 z-20 flex size-full items-center justify-end pr-8 lg:pr-12'
			)}
		>
			<ul className="flex flex-col items-end space-y-3">{children}</ul>
		</nav>
	)
}

export function Item({
	title,
	sectionRef,
	className,
	...props
}: ComponentPropsWithoutRef<'a'> & { sectionRef: RefObject<HTMLElement | null>; title?: string }) {
	const { scrollYProgress } = useScroll({
		target: sectionRef as RefObject<HTMLElement>,
		layoutEffect: false,
		offset: ['start end', 'start start', 'end end', 'end start']
	})
	const width = useTransform(
		scrollYProgress,
		[0, 1 / 3, 2 / 3, 1],
		['0.75rem', '2.5rem', '2.5rem', '0.75rem']
	)
	const backgroundColor = useTransform(
		scrollYProgress,
		[0, 1 / 3, 2 / 3, 1],
		['rgba(255,255,255,0.3)', colors.blue['800'], colors.blue['800'], 'rgba(255,255,255,0.3)']
	)

	return (
		<li className="pointer-events-auto group relative flex items-center justify-end">
			{title && (
				<span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[10px] tracking-wider uppercase text-white/80 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
					{title}
				</span>
			)}
			<a {...props} className={clsx('block py-1.5 focus:outline-none', className)}>
				<motion.span
					style={{ width, backgroundColor }}
					className="block h-0.5 rounded-full transition-colors"
				/>
			</a>
		</li>
	)
}
