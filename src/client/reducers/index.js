import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import mcReducer from './mc'
import cdnReducer from './cdn'
import modsReducer from './mods'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    mc: mcReducer,
    cdn: cdnReducer,
    mods: modsReducer
})

export default reducers