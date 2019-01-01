const initialState = {
	questions: []
}

export default function questions(state = initialState, action) {

	const { type } = action
	const newState = Object.assign({}, state)

	switch(type) {
		case 'FETCH_QUESTIONS':

			const { questions } = action.payload

			newState.questions = [ ...newState.questions, ...questions ]
			
			break;

		default:
			return state
	}

	return newState
}