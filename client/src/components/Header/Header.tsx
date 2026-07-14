import React, { useState } from 'react'

interface HeaderProps {
	onLogoHover: (isHovered: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ onLogoHover }) => {
	// Стан для показу рукописної підказки "hover me"
	const [showHint, setShowHint] = useState<boolean>(true)

	const handleMouseEnter = () => {
		onLogoHover(true)
		setShowHint(false)
	}

	const handleMouseLeave = () => {
		onLogoHover(false)
	}

	return (
		<header className='sticky top-0 left-0 w-full z-20 border-b border-white/10 bg-black/40 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4'>
				{/* LOGO AREA WITH CONTAINER FOR HINT ALIGNMENT */}
				<div className='relative py-2 flex items-center'>
					{/* MAIN LOGO TRIGGER */}
					<a
						href='/'
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className='flex items-center gap-3 group cursor-pointer z-30'
					>
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
						<span className='text-xl font-extrabold tracking-wider text-white'>
							LOONARI{' '}
							<span className='text-amber-400 font-light transition-colors duration-300 group-hover:text-white'>
								CREATOR & SHOP
							</span>
						</span>
					</a>

					{/* HANDWRITTEN HOVER ME HINT (Рендериться лише якщо showHint === true) */}
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
								hover me
							</span>
						</div>
					)}
				</div>

				{/* HEADER NAVIGATION BUTTONS / LINKS */}
				<div className='flex items-center gap-4 z-20'>
					<a
						href='#shop'
						className='group px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 transition-all duration-300 flex items-center gap-2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z'
							/>
						</svg>
						Visit Shop
					</a>

					<a
						href='#creator'
						className='group/navbtn px-5 py-2 text-sm font-semibold bg-amber-400 text-neutral-950 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-300 active:scale-95 inline-flex items-center gap-2.5'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2.5'
							class='w-4 h-4 transition-all duration-300 group-hover/navbtn:rotate-45'
						>
							<line x1='4' y1='12' x2='20' y2='12' stroke-linecap='round' />
							<line x1='12' y1='4' x2='12' y2='20' stroke-linecap='round' />
							<circle cx='12' cy='12' r='2' fill='currentColor' />
						</svg>
						Start Project
					</a>

					<a
						href='#login'
						className='px-5 py-2 text-sm font-medium border border-white/20 rounded-full hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all duration-300 active:scale-95 inline-block text-center'
					>
						Login
					</a>
				</div>
			</div>
		</header>
	)
}
