import React, { useState } from 'react'
import { Header } from './components/Header'
import bgImage from './assets/images/bg-body.avif'

function App() {
	// State that controls whether the cursor is hovering over the logo
	const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false)

	return (
		<div className='relative min-h-screen bg-neutral-900 text-white overflow-x-hidden flex flex-col'>
			{/* ========================================================================= */}
			{/* FIXED AMBIENT LIGHTING BLOCKS */}
			{/* ========================================================================= */}
			{/* Transparency and offset classes change dynamically based on the isLogoHovered state */}
			<div
				className={`fixed top-0 bottom-0 -left-[20%] w-[40%] rounded-r-full blur-[160px] z-10 pointer-events-none transition-all duration-700 ease-out ${
					isLogoHovered ? 'bg-amber-400/15 translate-x-[12%]' : 'bg-amber-400/0'
				}`}
			/>
			<div
				className={`fixed top-0 bottom-0 -right-[20%] w-[40%] rounded-l-full blur-[160px] z-10 pointer-events-none transition-all duration-700 ease-out ${
					isLogoHovered
						? 'bg-amber-400/15 -translate-x-[12%]'
						: 'bg-amber-400/0'
				}`}
			/>

			{/* 1. DARK BACKGROUND IMAGE WITH OVERLAY */}
			<div className='fixed inset-0 z-0'>
				<img
					src={bgImage}
					alt='Modern dark interior'
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/95'></div>
			</div>

			{/* 2. STICKY HEADER */}
			{/* Passing the state change function as props */}
			<Header onLogoHover={setIsLogoHovered} />

			{/* 3. MAIN CONTENT AREA */}
			<main className='relative z-10 flex-grow flex flex-col items-center justify-center pt-24 pb-16 px-6'>
				<div className='text-center max-w-4xl mb-20 space-y-6'>
					<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg'>
						Design your <br />
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm'>
							dream lighting
						</span>
						<br />
						Or find it.
					</h1>
					<p className='text-neutral-300 text-sm md:text-xl max-w-xl mx-auto font-light leading-relaxed'>
						Your path to perfect lighting starts here: create a bespoke track
						system using our advanced Creator tool, or explore our curated
						collection of ready-to-use fixtures in the Shop.
					</p>
				</div>

				{/* CARDS */}
				<div className='grid md:grid-cols-2 gap-8 max-w-6xl w-full'>
					{/* LEFT BLOCK (CREATOR) */}
					<div
						id='creator'
						className='group bg-neutral-950/60 backdrop-blur-lg border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col shadow-2xl transition-all duration-500 hover:border-amber-400/30 hover:bg-neutral-950/80 hover:-translate-y-2'
					>
						<div className='flex items-center gap-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform duration-300'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 5h18'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 5v3h6V5'
								/>
								<circle cx='12' cy='10' r='1.5' className='fill-amber-400' />
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.5 11.5l2.5 5.5 3-1.5-2.5-5.5z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 20l3.5-3.5M14.5 16.5L18 20'
									strokeDasharray='2 2'
								/>
							</svg>
							<h2 className='text-3xl font-extrabold text-white'>
								Lighting Creator
							</h2>
						</div>
						<p className='text-neutral-300 font-light text-base leading-relaxed flex-grow'>
							Take total control. Design your bespoke track system tailored to
							your unique architectural space. Choose track lengths, connector
							layouts, and specific fixtures step-by-step for a perfect fit. Get
							instant visual feedback and a complete bill of materials.
						</p>
						<div className='pt-4'>
							<a
								href='#creator-app'
								className='group/btn relative px-8 py-4 bg-white text-neutral-950 font-semibold rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] inline-flex items-center'
							>
								<span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000'></span>
								<span className='relative z-10 flex items-center gap-3 text-base'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='2'
										stroke='currentColor'
										className='w-5 h-5 transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:translate-x-0.5'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
										/>
									</svg>
									Start Project
								</span>
							</a>
						</div>
					</div>

					{/* RIGHT BLOCK (SHOP) */}
					<div
						id='shop'
						className='group bg-neutral-950/60 backdrop-blur-lg border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col shadow-2xl transition-all duration-500 hover:border-amber-400/30 hover:bg-neutral-950/80 hover:-translate-y-2'
					>
						<div className='flex items-center gap-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform duration-300'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z'
								/>
							</svg>
							<h2 className='text-3xl font-extrabold text-white'>
								Loonari Shop
							</h2>
						</div>
						<p className='text-neutral-300 font-light text-base leading-relaxed flex-grow'>
							Explore our complete collection of premium lighting fixtures,
							innovative accessories, and pre-configured kits. Find the perfect
							piece to complement your existing setup or get inspired by our
							latest complete lighting designs. Curated quality for modern
							interiors.
						</p>
						<div className='pt-4'>
							<a
								href='#shop-products'
								className='group/shopbtn px-8 py-4 bg-amber-400 text-neutral-950 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-300 hover:shadow-[0_10px_30px_rgba(251,191,36,0.3)] active:scale-95 inline-flex items-center gap-2'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									className='w-5 h-5 transition-transform duration-300 group-hover/shopbtn:-translate-y-0.5'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z'
									/>
								</svg>
								Explore Shop
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
