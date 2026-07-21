import type { NavigationListItemProps } from '../../../types/headerTypes'

function NavigationListItem({ item }: NavigationListItemProps) {
	const baseClass =
		'text-sm font-medium transition-all duration-300 active:scale-95 text-center'

	const variants = {
		link: 'group px-4 py-2 text-white/80 hover:text-amber-400 flex items-center gap-2',
		button:
			'group/navbtn px-5 py-2 font-semibold bg-amber-400 text-neutral-950 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] inline-flex items-center gap-2.5',
		outline:
			'bg-white/80 px-5 py-2 border border-white/20 rounded-full hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 inline-block',
	}
	return (
		<li key={item.id}>
			<a href={item.href} className={`${baseClass} ${variants[item.variant]}`}>
				{item.icon && item.icon}
				{item.label}
			</a>
		</li>
	)
}

export default NavigationListItem
