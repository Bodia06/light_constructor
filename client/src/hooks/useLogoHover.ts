import { useContext } from 'react'
import { LogoHoverContext } from '../contexts/LogoHover/LogoHoverContext'

export const useLogoHover = () => {
  const context = useContext(LogoHoverContext)
  if (!context) {
    throw new Error('useLogoHover must be used within a LogoHoverProvider')
  }
  return context
}
