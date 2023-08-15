import { 
    MODS_FETCH_ALL,
    MODS_FETCH_ALL_FULFILLED,
    MODS_FETCH_ALL_REJECTED
 } from "../actions/mods"

const initialState = {
	mods: [],
    fetching: false,
    fetched: false,
    error: null
}

const modsReducer = (state = initialState, action) => {
	const {type, payload} = action

	switch(type) {
        case MODS_FETCH_ALL: 
            return {
                ...state,
                fetching: true,
                fetched: false
            }

        case MODS_FETCH_ALL_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                mods: payload
            }

        case MODS_FETCH_ALL_REJECTED:
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

export default modsReducer