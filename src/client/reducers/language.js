const initialState = {
	locale: null,
}

const languageReducer = (state = initialState, action) => {
	const {type, payload} = action

	switch(type) {
		default:
			return state
	}
}

export default languageReducer