import { TEST_GREETING_FULFILLED } from "../actions/test"

const initialState = {
	message: null
}

const testReducer = (state = initialState, action) => {
	const {type, payload} = action

	switch(type) {
        case TEST_GREETING_FULFILLED: 
            return {
                message: payload?.message
            }

		default:
			return state
	}
}

export default testReducer