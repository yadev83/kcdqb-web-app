import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore, history } from './store'

import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'
import reportWebVitals from './utils/reportWebVitals'


const root = ReactDOM.createRoot(document.getElementById('root'))

const store = configureStore({
	language: {
		locale: 'fr'
	}
}, history)

root.render(<Provider store={store}>
	<React.StrictMode>
		<App />
	</React.StrictMode>
</Provider>)

reportWebVitals(console.log);
