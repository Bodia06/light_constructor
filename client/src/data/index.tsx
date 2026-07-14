import React from 'react'

// 1. Describe the interface for menu items
export interface NavItem {
	id: string
	label: string
	href: string
	variant: 'link' | 'button' | 'outline'
	icon?: React.ReactNode
}

// 2. Text constants for the brand and hints
export const LOGO_TEXT = {
	main: 'LOONARI',
	sub: 'CREATOR & SHOP',
} as const

export const HINT_TEXT = 'hover me'

// 3. Array of navigation items
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
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2.5'
				className='w-4 h-4 transition-all duration-300 group-hover/navbtn:rotate-45'
			>
				<line x1='4' y1='12' x2='20' y2='12' strokeLinecap='round' />
				<line x1='12' y1='4' x2='12' y2='20' strokeLinecap='round' />
				<circle cx='12' cy='12' r='2' fill='currentColor' />
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
