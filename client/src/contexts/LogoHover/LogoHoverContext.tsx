import { createContext } from 'react'

export interface LogoHoverContextType {
	isLogoHovered: boolean
	setIsLogoHovered: (value: boolean) => void
}

export const LogoHoverContext = createContext<LogoHoverContextType | undefined>(
	undefined,
)
