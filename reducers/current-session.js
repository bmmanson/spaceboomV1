export const currentSession = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_NEW_MESSAGE_BODY':
			return Object.assign({}, state, {
				body: action.body
			})
		case 'ADD_CURRENT_SESSION_ON_LOGIN':
			return Object.assign({}, state, {
				userId: action.userId,
				email: action.email,
				name: action.name,
				authorPic: action.authorPic,
				username: action.username
			})
		default: 
			return state;
	}
}