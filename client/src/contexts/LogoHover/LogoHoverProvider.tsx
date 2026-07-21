import React, { useState } from 'react'
import { LogoHoverContext } from './LogoHoverContext'

export const LogoHoverProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false)

	return (
		<LogoHoverContext.Provider value={{ isLogoHovered, setIsLogoHovered }}>
			{children}
		</LogoHoverContext.Provider>
	)
}
