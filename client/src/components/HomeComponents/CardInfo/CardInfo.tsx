import type { HOME_CARD_PROPS } from '../../../types/homeTypes'

export default function CardInfo({ card }: HOME_CARD_PROPS) {
	return (
		<div
			id='creator'
			className='group bg-neutral-950/60 backdrop-blur-lg border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col shadow-2xl transition-all duration-500 hover:border-amber-400/30 hover:bg-neutral-950/80 hover:-translate-y-2'
		>
			<div className='flex items-center gap-4'>
				{card.img}
				<h3>{card.title}</h3>
			</div>
			<p className='text-neutral-300 font-light text-base leading-relaxed grow'>
				{card.description}
			</p>
			<div className='pt-4'>
				<a
					href={card.link}
					className='group/btn relative px-8 py-4 bg-amber-400 text-neutral-950 font-semibold rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] inline-flex items-center'
				>
					<span className='absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000'></span>
					<span className='relative z-10 flex items-center gap-3 text-base'>
						{card.linkImg}
						{card.linkTitle}
					</span>
				</a>
			</div>
		</div>
	)
}
