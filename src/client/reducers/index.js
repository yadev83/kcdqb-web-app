import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import languageReducer from './language'
import testReducer from './test'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    test: testReducer
})

export default reducers