import { useState } from 'react'
import LogoIcon from '../../assets/images/svg/LogoIcon'
import ArrowLogo from '../../assets/images/svg/ArrowLogo'
import Navigation from '../Navigation/Navigation'
import { useLogoHover } from '../../hooks/useLogoHover'
import { LOGO_TEXT, HINT_TEXT } from '../../data'

export const Header = () => {
	const [showHint, setShowHint] = useState<boolean>(true)
	const { setIsLogoHovered } = useLogoHover()

	const handleMouseEnter = () => {
		setIsLogoHovered(true)
		setShowHint(false)
	}

	const handleMouseLeave = () => {
		setIsLogoHovered(false)
		setShowHint(true)
	}

	return (
		<header className='sticky top-0 left-0 w-full z-20 border-b border-white/10 bg-black/40 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4'>
				<section className='relative py-2 flex items-center'>
					<a
						href='/'
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className='inline-flex items-center gap-3 group cursor-pointer z-30'
					>
						<div className='relative'>
							<div className='absolute inset-0 bg-amber-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
							<LogoIcon />
						</div>

						<span className='text-xl font-extrabold tracking-wider text-white'>
							{LOGO_TEXT.main}{' '}
							<span className='text-amber-400 font-light transition-colors duration-300 group-hover:text-white'>
								{LOGO_TEXT.sub}
							</span>
						</span>
					</a>

					{showHint && (
						<div className='absolute left-1.5 top-8.5 flex items-center gap-1.5 pointer-events-none transition-all duration-500 ease-out opacity-75 origin-top-left animate-drift-under'>
							<ArrowLogo />
							<span className='font-handwritten text-[13px] tracking-wide text-amber-400/90 select-none transform translate-y-0.5 italic'>
								{HINT_TEXT}
							</span>
						</div>
					)}
				</section>

				<Navigation />
			</div>
		</header>
	)
}
