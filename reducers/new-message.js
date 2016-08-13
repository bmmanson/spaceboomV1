export const newMessage = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_NEW_MESSAGE_BODY':
			return Object.assign({}, state, {
				body: action.body
			})
		default: 
			return state;
	}
}