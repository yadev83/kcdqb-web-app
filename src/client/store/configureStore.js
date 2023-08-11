import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import history from './history'

const middlewaresList = [thunk]

const rootReducers = reducers(history)

const configureStore = (reducers, history) => {
	return initialState => {
		middlewaresList.push(routerMiddleware(history))

		return createStore(reducers, initialState, compose(
			applyMiddleware(...middlewaresList)
		))
	}
}

export default configureStore(rootReducers, history)