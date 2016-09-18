const message = (state, action) => {
  switch (action.type) {
    case 'MARK_AS_UNREAD':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        unread: false
      })
    case 'MARK_AS_LIKED':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        isLikedByCurrentUser: true,
        numberOfLikes: action.numberOfLikes + 1
      })
    case 'MARK_AS_UNLIKED':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        isLikedByCurrentUser: false,
        numberOfLikes: action.numberOfLikes - 1
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
    case 'MARK_AS_LIKED':
      return state.map(m =>
        message(m, action)
      )
    case 'MARK_AS_UNLIKED':
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
          authorId: action.authorId,
          latitude: action.latitude,
          longitude: action.longitude,
          locationName: action.locationName,
          city: action.city,
          currentUser: true,
          unread: false,
          timesDiscovered: action.timesDiscovered,
          numberOfLikes: action.numberOfLikes,
          createdAt: action.createdAt
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
          authorId: action.authorId,
          latitude: action.latitude,
          longitude: action.longitude,
          locationName: action.locationName,
          city: action.city,
          currentUser: false,
          unread: action.unread,
          reported: false,
          timesDiscovered: action.timesDiscovered,
          numberOfLikes: action.numberOfLikes,
          createdAt: action.createdAt
        }
      ]
    case 'DELETE_ALL_MESSAGES':
      return [];
    default:
      return state;
  }
}
