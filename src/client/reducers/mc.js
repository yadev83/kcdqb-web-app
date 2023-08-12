import { 
    MC_GETSTATS,
    MC_GETSTATS_FULFILLED,
    MC_GETSTATS_REJECTED
 } from "../actions/mc"

const initialState = {
	stats: null,
    fetching: false,
    fetched: false,
    error: null
}

const mcReducer = (state = initialState, action) => {
	const {type, payload} = action

	switch(type) {
        case MC_GETSTATS: 
            return {
                ...state,
                fetching: true,
                fetched: false
            }

        case MC_GETSTATS_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                stats: payload
            }

        case MC_GETSTATS_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: payload
            }

		default:
			return state
	}
}

export default mcReducer