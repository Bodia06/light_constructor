import { HOME_GLOBAL_INFO } from '../../../data'

function GlobalInfo() {
	const { title, description } = HOME_GLOBAL_INFO
	return (
		<article className='text-center max-w-4xl mb-20 space-y-6'>
			<h2 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg'>
				{title.first}
				<span className='block text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm'>
					{title.second}
				</span>
				{title.third}
			</h2>
			<p className='text-neutral-300 text-sm md:text-xl max-w-xl mx-auto font-light leading-relaxed'>
				{description}
			</p>
		</article>
	)
}

export default GlobalInfo
