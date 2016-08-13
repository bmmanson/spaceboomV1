let messageId = 13;

const message = (state, action) => {
  switch (action.type) {
    case 'MARK_AS_UNREAD':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        unread: false
      })
    default:
      return state
  }
}

export const messages = (state = [], action) => {
  switch (action.type) {
    case 'MARK_AS_UNREAD':
      return state.map(m =>
        message(m, action)
      )
    case 'ADD_SENT_MESSAGE':
      return [
        ...state,
        {id: ++messageId,
        body: action.body,
        author: action.author,
        authorPic: action.authorPic,
        locationCoords: action.locationCoords,
        locationName: action.locationName,
        city: action.city,
        currentUser: true,
        unread: false
        }
      ]
    default:
      return state
  }
}
