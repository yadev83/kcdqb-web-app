import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import mcReducer from './mc'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    mc: mcReducer
})

export default reducers