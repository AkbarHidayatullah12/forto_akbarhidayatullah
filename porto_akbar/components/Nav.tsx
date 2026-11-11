import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export function Root({ children, className, ...props }: ComponentPropsWithoutRef<'nav'>) {
	return (
		<nav className={clsx(className, 'text-xs md:text-sm font-semibold uppercase tracking-wider')} {...props}>
			<ul className="flex items-center gap-6 lg:gap-8">{children}</ul>
		</nav>
	)
}

export function Item({
	active = false,
	href,
	className,
	children,
	...props
}: ComponentPropsWithoutRef<'a'> & { active?: boolean; href?: string; children: ReactNode }) {
	const Comp = href ? 'a' : 'span'

	return (
		<li className="group relative">
			<Comp
				href={href}
				className={clsx(
					className,
					'inline-block py-1 transition-colors duration-200',
					href ? 'cursor-pointer hover:text-white' : 'cursor-default',
					active ? 'text-white' : 'text-white/70'
				)}
				{...props}
			>
				{children}
			</Comp>
			<div
				className={clsx(
					'absolute left-0 top-full h-0.5 w-full transition-all duration-300',
					active
						? 'bg-blue-400 opacity-100'
						: 'bg-white opacity-0 group-hover:opacity-80'
				)}
			/>
		</li>
	)
}
