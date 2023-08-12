import { PureComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'

import { Layout, NotFound } from './utils/components'

import HomeContainer from './containers/Home'

class App extends PureComponent {
	render() {
		return <BrowserRouter>
			<Routes>
				<Route exact path={'/'} element={<Layout>
					<HomeContainer />
				</Layout>} />

				{/* If no match happened, 404 */}
				<Route path={'*'} element={<Layout>
					<NotFound />
				</Layout>}/>
			</Routes>
		</BrowserRouter>
	}
}

export default App
