export const markAsUnread = function (id) {
	return {
		type: 'MARK_AS_UNREAD', 
		id
	};
}

export const updateNewMessageText = function (newMessageText) {
	return {
		type: 'UPDATE_NEW_MESSAGE_TEXT',
		newMessageText
	}
}

export const addCurrentSessionOnLogin = function (userId, email, name, authorPic, username) {
	return {
		type: 'ADD_CURRENT_SESSION_ON_LOGIN',
		userId,
		email,
		name,
		authorPic,
		username
	};
}

export const deleteAllMessages = function () {
	return {
		type: 'DELETE_ALL_MESSAGES'
	};
}

export const deleteMessage = function (id) {
	return {
		type: 'DELETE_MESSAGE', 
		id
	};
}

export const addSentMessage = function (id, body, author, authorPic, latitude, longitude, locationName, city, comment) {
	return {
		type: 'ADD_SENT_MESSAGE', 
		id,
		body, 
		author, 
		authorPic, 
		latitude,
		longitude, 
		locationName, 
		city
	};
}

export const addDiscoveredMessage = function (id, body, author, authorPic, latitude, longitude, locationName, city, unread, comment) {
	return {
		type: 'ADD_DISCOVERED_MESSAGE', 
		id,
		body, 
		author, 
		authorPic, 
		latitude,
		longitude, 
		locationName, 
		city,
		unread
	};
}

export const addComment = function (id, messageId, body, author, authorPic, currentUser, isLiked) {
	return {
		type: 'ADD_COMMENT',
		id,
		messageId,
		body,
		author,
		authorPic,
		currentUser,
		isLiked
	};
}

export const setVisibility = function (filter) {
	return {
		type: 'SET_VISIBILITY', 
		filter
	};
}

export const VisibilityFilters = {
	DISCOVERED: "DISCOVERED",
	SENT: "SENT"
}