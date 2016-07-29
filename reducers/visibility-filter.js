const visibilityFilter = function(state = {}, action) {
  switch (action.type) {
    case "SET_VISIBILITY":
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}

export { visibilityFilter };