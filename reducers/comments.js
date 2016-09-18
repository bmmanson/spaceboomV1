const comment = (state, action) => {
  switch (action.type) {
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
};

export const comments = (state = [], action) => {
  switch (action.type) {
    case 'MARK_AS_LIKED':
      return state.map(c =>
        comment(c, action)
      )
    case 'MARK_AS_UNLIKED':
      return state.map(c =>
        comment(c, action)
      )
    case 'DELETE_COMMENT':
      return state.filter(c => c.id !== action.id);
    case 'ADD_COMMENT':
      return [
        ...state,
        {
          id: action.id,
          messageId: action.messageId,
          body: action.body,
          author: action.author,
          authorPic: action.authorPic,
          authorId: action.authorId,
          currentUser: action.currentUser,
          isLikedByCurrentUser: action.isLikedByCurrentUser,
          numberOfLikes: action.numberOfLikes,
          createdAt: action.createdAt
        }
      ]
    case 'DELETE_ALL_COMMENTS':
      return [];
    default:
      return state;
  }
};
