import React from 'react'
import { render as RenderDOM } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore, history } from './store'

import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'
import reportWebVitals from './utils/reportWebVitals'


const store = configureStore({}, history)

const render = Container => RenderDOM(<Provider store={store}>
		<React.StrictMode>
			<Container />
		</React.StrictMode>
	</Provider>, document.getElementById('root'))

render(App)

reportWebVitals(console.log);
