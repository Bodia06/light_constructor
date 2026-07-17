import type { NavItem } from '../types/headerTypes'
import bgBodyImage from '../assets/images/bg-body.avif'

//HEADER CONST DATA
export const LOGO_TEXT = {
	main: 'LOONARI',
	sub: 'CREATOR & SHOP',
} as const

export const LOGO_IMG = bgBodyImage

export const HINT_TEXT = 'hover me'

export const navigationMenu: NavItem[] = [
	{
		id: 'shop',
		label: 'Visit Shop',
		href: '#shop',
		variant: 'link',
		icon: (
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
		),
	},
	{
		id: 'project',
		label: 'Start Project',
		href: '#creator',
		variant: 'button',
		icon: (
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
		),
	},
	{
		id: 'login',
		label: 'Login',
		href: '#login',
		variant: 'outline',
	},
]

//HOME PAGE CONST DATA
export const HOME_GLOBAL_INFO = {
	title: {
		first: 'Design your',
		second: 'dream lighting',
		third: 'Or find it.',
	},
	description:
		'Your path to perfect lighting starts here: create a bespoke track system using our advanced Creator tool, or explore our curated collection of ready-to-use fixtures in the Shop.',
}

export const HOME_CARDS_INFO = [
	{
		img: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform duration-300'
			>
				<path strokeLinecap='round' strokeLinejoin='round' d='M3 5h18' />
				<path strokeLinecap='round' strokeLinejoin='round' d='M9 5v3h6V5' />
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
		),
		title: 'Lighting Creator',
		description:
			'Take total control. Design your bespoke track system tailored to your unique architectural space. Choose track lengths, connector layouts, and specific fixtures step-by-step for a perfect fit. Get instant visual feedback and a complete bill of materials.',
		link: '#creator-app',
		linkImg: (
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
		),
		linkTitle: 'Start Project',
	},
	{
		img: (
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
		),
		title: 'Loonari Shop',
		description:
			'Explore our complete collection of premium lighting fixtures, innovative accessories, and pre-configured kits. Find the perfect piece to complement your existing setup or get inspired by our latest complete lighting designs. Curated quality for modern interiors.',
		link: '#shop-products',
		linkImg: (
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
		),
		linkTitle: 'Explore Shop',
	},
]
