export const currentSession = (state = {}, action) => {
	switch (action.type) {
		case 'DOWNLOADING_ON_LAUNCH':
			return Object.assign({}, state, {
				downloadingOnAppLaunch: true
			})
		case 'DOWNLOAD_ON_LAUNCH_COMPLETE':
			return Object.assign({}, state, {
				downloadingOnAppLaunch: false
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
				username: action.username
			})
		default: 
			return state;
	}
}