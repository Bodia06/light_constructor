function LogoIcon() {
	return (
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
			<rect x='9' y='3' width='6' height='1' rx='0.5' fill='currentColor' />
			<path d='M11 10.5l1-1.5 1 1.5' />
		</svg>
	)
}

export default LogoIcon
