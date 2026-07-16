import { Route, Routes } from 'react-router'
import AppLayout from './components/AppLayout/AppLayout'
import HomePage from './pages/HomePage/HomePage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<AppLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
