import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import languageReducer from './language'
import mcReducer from './mc'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    mc: mcReducer
})

export default reducers