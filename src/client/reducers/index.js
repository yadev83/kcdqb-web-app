import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import mcReducer from './mc'
import cdnReducer from './cdn'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    mc: mcReducer,
    cdn: cdnReducer
})

export default reducers