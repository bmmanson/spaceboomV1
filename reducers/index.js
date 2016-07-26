const App = function(state = {}, action) {
  switch (action.type) {
    case "add_discovered_message":
      return Object.assign({}, state, {
        discoveredMessages: [
          ...state.discoveredMessages,
          {
            id: action.id,
            body: action.body,
            author: action.author,
            locationName: action.locationName,
            locationCoords: action.locationCoords,
            reported: false
          }
        ]
      })    
    default:
      return state
  }
}

export { App };