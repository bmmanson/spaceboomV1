const message = (state, action) => {
  switch (action.type) {
    case 'MARK_AS_UNREAD':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        unread: false
      })
    default:
      return state;
  }
}

export const messages = (state = [], action) => {
  switch (action.type) {
    case 'MARK_AS_UNREAD':
      return state.map(m =>
        message(m, action)
      )
    case 'DELETE_MESSAGE':
      return state.filter(m => m.id !== action.id);
    case 'ADD_SENT_MESSAGE':
      return [
        ...state,
        {
          id: action.id,
          body: action.body,
          author: action.author,
          authorPic: action.authorPic,
          latitude: action.latitude,
          longitude: action.longitude,
          locationName: action.locationName,
          city: action.city,
          currentUser: true,
          unread: false,
          timesDiscovered: action.timesDiscovered
        }
      ]
    case 'ADD_DISCOVERED_MESSAGE':
      return [
        ...state,
        {
          id: action.id,
          body: action.body,
          author: action.author,
          authorPic: action.authorPic,
          latitude: action.latitude,
          longitude: action.longitude,
          locationName: action.locationName,
          city: action.city,
          currentUser: false,
          unread: action.unread,
          reported: false,
          timesDiscovered: action.timesDiscovered
        }
      ]
    case 'DELETE_ALL_MESSAGES':
      return [];
    default:
      return state;
  }
}
