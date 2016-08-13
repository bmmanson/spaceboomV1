export const markAsUnread = function(id) {
	return {
		type: 'MARK_AS_UNREAD', 
		id
	}
}

export const updateNewMessageBody = function(body){
	return {
		type: 'UPDATE_NEW_MESSAGE_BODY',
		body
	}
}

export const addSentMessage = function(body, author, authorPic, locationCoords, locationName, city) {
	return {
		type: 'ADD_SENT_MESSAGE', 
		body, 
		author, 
		authorPic, 
		locationCoords, 
		locationName, 
		city
	};
}

export const addDiscoveredMessage = function(body, author, authorPic, locationCoords, locationName, city) {
	return {
		type: 'ADD_DISCOVERED_MESSAGE', 
		body, 
		author, 
		authorPic, 
		locationCoords, 
		locationName, 
		city
	};
}

export const setVisibility = function (filter) {
	return {type: 'SET_VISIBILITY', filter}
}

export const VisibilityFilters = {
	DISCOVERED: "DISCOVERED",
	SENT: "SENT"
}