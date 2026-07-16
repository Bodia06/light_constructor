export interface NavItem {
  id: string
  label: string
  href: string
  variant: 'link' | 'button' | 'outline'
  icon?: React.ReactNode
}

export interface NavigationListItemProps {
  item: NavItem
}
