import React, { useState } from 'react'
import { navigationMenu, LOGO_TEXT, HINT_TEXT } from '../../data'

interface HeaderProps {
	onLogoHover: (isHovered: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ onLogoHover }) => {
	const [showHint, setShowHint] = useState<boolean>(true)

	const handleMouseEnter = () => {
		onLogoHover(true)
		setShowHint(false)
	}

	const handleMouseLeave = () => {
		onLogoHover(false)
		setShowHint(true)
	}

	return (
		<header className='sticky top-0 left-0 w-full z-20 border-b border-white/10 bg-black/40 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4'>
				{/* LOGO AREA WITH CONTAINER FOR HINT ALIGNMENT */}
				<div className='relative py-2 flex items-center'>
					<a
						href='/'
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className='inline-flex items-center gap-3 group cursor-pointer z-30'
					>
						{/* LOGO ICON */}
						<div className='relative'>
							<div className='absolute inset-0 bg-amber-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								className='relative z-10 w-8 h-8 text-amber-400 transition-transform duration-300 group-hover:scale-110'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M15 14.5c1.1-1 1.5-2.5 1.5-4C16.5 7 14.5 5 12 5S7.5 7 7.5 10.5c0 1.5.4 3 1.5 4' />
								<path d='M9 15h6' />
								<path d='M10 18h4' />
								<path d='M11 2h2' />
								<path d='M12 2v3' />
								<rect
									x='9'
									y='3'
									width='6'
									height='1'
									rx='0.5'
									fill='currentColor'
								/>
								<path d='M11 10.5l1-1.5 1 1.5' />
							</svg>
						</div>
						{/* DYNAMIC LOGO TEXT */}
						<span className='text-xl font-extrabold tracking-wider text-white'>
							{LOGO_TEXT.main}{' '}
							<span className='text-amber-400 font-light transition-colors duration-300 group-hover:text-white'>
								{LOGO_TEXT.sub}
							</span>
						</span>
					</a>

					{/* HANDWRITTEN HOVER ME HINT */}
					{showHint && (
						<div className='absolute left-[6px] top-[34px] flex items-center gap-1.5 pointer-events-none transition-all duration-500 ease-out opacity-75 origin-top-left animate-drift-under'>
							<svg
								className='w-5 h-5 text-amber-400/90 stroke-current fill-none -rotate-[10deg]'
								viewBox='0 0 24 24'
								strokeWidth='1.8'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M 18 16 C 14 14, 10 9, 8 4' />
								<path d='M 13 5 L 8 4 L 7 9' />
							</svg>
							<span className='font-handwritten text-[13px] tracking-wide text-amber-400/90 select-none transform translate-y-0.5 italic'>
								{HINT_TEXT}
							</span>
						</div>
					)}
				</div>

				{/* SEMANTIC NAVIGATION SYSTEM FOR SEO */}
				<nav className='z-20'>
					<ul className='flex items-center gap-4'>
						{navigationMenu.map((item) => {
							// Base styles for all links
							const baseClass =
								'text-sm font-medium transition-all duration-300 active:scale-95 text-center'

							// Dynamic selection of styles depending on button type (variant)
							const variants = {
								link: 'group px-4 py-2 text-white/80 hover:text-amber-400 flex items-center gap-2',
								button:
									'group/navbtn px-5 py-2 font-semibold bg-amber-400 text-neutral-950 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] inline-flex items-center gap-2.5',
								outline:
									'px-5 py-2 border border-white/20 rounded-full hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 inline-block',
							}

							return (
								<li key={item.id}>
									<a
										href={item.href}
										className={`${baseClass} ${variants[item.variant]}`}
									>
										{item.icon && item.icon}
										{item.label}
									</a>
								</li>
							)
						})}
					</ul>
				</nav>
			</div>
		</header>
	)
}
