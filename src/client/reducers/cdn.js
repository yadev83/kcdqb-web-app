import { 
    CDN_GET_LIST,
    CDN_GET_LIST_FULFILLED,
    CDN_GET_LIST_REJECTED
 } from "../actions/cdn"

const initialState = {
	list: null,
    fetching: false,
    fetched: false,
    error: null
}

const cdnReducer = (state = initialState, action) => {
	const {type, payload} = action

	switch(type) {
        case CDN_GET_LIST: 
            return {
                ...state,
                fetching: true,
                fetched: false
            }

        case CDN_GET_LIST_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                list: payload
            }

        case CDN_GET_LIST_REJECTED:
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

export default cdnReducer