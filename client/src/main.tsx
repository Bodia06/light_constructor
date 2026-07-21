import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { LogoHoverProvider } from './contexts/LogoHover/LogoHoverProvider.tsx'
import './index.css'
import App from './App.tsx'
import { store } from './store/index'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<LogoHoverProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</LogoHoverProvider>
		</BrowserRouter>
	</StrictMode>,
)
