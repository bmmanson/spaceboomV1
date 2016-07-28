import { combineReducers } from 'redux';

const messages = function(state = {}, action) {
  switch (action.type) {
  // case "add_discovered_message":
  //     return Object.assign({}, state, {
  //         ...state.messages,
  //         {
  //           id: action.id,
  //           body: action.body,
  //           author: action.author,
  //           locationName: action.locationName,
  //           locationCoords: action.locationCoords,
  //           reported: false,
  //           unread: true
  //         }
  //     })    
    default:
      return state
  }
}

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

const App = combineReducers({
  messages,
  visibilityFilter
})

export { App };