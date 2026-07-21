import NavigationListItem from '../NavigationComponents/NavigationListItem/NavigationListItem'
import { navigationMenu } from '../../data'

export default function Navigation() {
	return (
		<nav className='z-20'>
			<ul className='flex items-center gap-4'>
				{navigationMenu.map((item) => (
					<NavigationListItem key={item.id} item={item} />
				))}
			</ul>
		</nav>
	)
}
