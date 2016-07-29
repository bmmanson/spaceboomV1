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
    default:
      return state
  }
}
