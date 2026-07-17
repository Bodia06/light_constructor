import { HOME_GLOBAL_INFO } from '../../../data'

function GlobalInfo() {
	const { title, description } = HOME_GLOBAL_INFO

	return (
		<article className='relative text-center max-w-4xl mx-auto mb-24 md:mb-32 px-4 flex flex-col items-center select-none'>
			<div className='absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none' />

			<div className='inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md text-amber-400 text-xs font-semibold tracking-wider uppercase'>
				<span className='w-1.5 h-1.5 rounded-full bg-amber-400' />
				Global Network
			</div>

			<h2 className='text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] md:leading-[1.1] mb-6'>
				{title.first}{' '}
				<span className='relative block text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-yellow-500'>
					{title.second}
					<span className='absolute bottom-1 left-0 w-full h-0.75 bg-linear-to-r from-amber-400/0 via-amber-400/40 to-yellow-500/0 rounded-full' />
				</span>
				{title.third}
			</h2>

			<p className='text-neutral-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-normal leading-relaxed text-balance'>
				{description}
			</p>
		</article>
	)
}

export default GlobalInfo
