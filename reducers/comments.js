export const comments = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_MESSAGE':
      return state.filter(m => m.id !== action.id);
    case 'ADD_COMMENT':
      return [
        ...state,
        {
          id: action.id,
          messageId: action.messageId,
          body: action.body,
          author: action.author,
          authorPic: action.authorPic,
          currentUser: action.currentUser
        }
      ]
    case 'DELETE_ALL_COMMENTS':
      return [];
    default:
      return state;
  }
}
