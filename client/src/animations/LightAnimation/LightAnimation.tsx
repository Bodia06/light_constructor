function LightAnimation({ isLogoHovered }: { isLogoHovered: boolean }) {
	return (
		<>
			<div
				className={`fixed top-0 bottom-0 left-[-20%] w-[40%] rounded-r-full blur-[160px] z-10 pointer-events-none transition-all duration-700 ease-out ${
					isLogoHovered ? 'bg-amber-400/15 translate-x-[12%]' : 'bg-amber-400/0'
				}`}
			/>
			<div
				className={`fixed top-0 bottom-0 right-[-20%] w-[40%] rounded-l-full blur-[160px] z-10 pointer-events-none transition-all duration-700 ease-out ${
					isLogoHovered
						? 'bg-amber-400/15 translate-x-[-12%]'
						: 'bg-amber-400/0'
				}`}
			/>
		</>
	)
}

export default LightAnimation
