export const markAsUnread = function(id) {
	return {type: 'MARK_AS_UNREAD', id}
}

export const setVisibility = function (filter) {
	return {type: 'SET_VISIBILITY', filter}
}

export const VisibilityFilters = {
	DISCOVERED: "DISCOVERED",
	SENT: "SENT"
}