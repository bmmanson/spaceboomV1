const visibilityFilter = function(state = {}, action) {
	switch (action.type) {
		case "SET_VISIBILITY":
			return action.filter
		default:
			return state
	}
}

export { visibilityFilter };