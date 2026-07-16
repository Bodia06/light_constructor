import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LogoHoverProvider } from './contexts/LogoHover/LogoHoverProvider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<LogoHoverProvider>
				<App />
			</LogoHoverProvider>
		</BrowserRouter>
	</StrictMode>,
)
