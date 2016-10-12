export const currentSession = (state = {}, action) => {
	switch (action.type) {
		case 'BEGIN_LOGGING_IN_ON_LAUNCH':
			return Object.assign({}, state, {
				loggingInOnAppLaunch: true
			})
		case 'ADD_USERNAME':
			return Object.assign({}, state, {
				username: action.username
			})
		case 'UPDATE_NEW_MESSAGE_TEXT':
			return Object.assign({}, state, {
				newMessageText: action.newMessageText
			})
		case 'ADD_CURRENT_SESSION_ON_LOGIN':
			return Object.assign({}, state, {
				userId: action.userId,
				email: action.email,
				name: action.name,
				authorPic: action.authorPic,
				facebookName: action.facebookName,
				username: action.username,
				loggingInOnAppLaunch: false
			})
		default: 
			return state;
	}
}