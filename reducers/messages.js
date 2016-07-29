const messages = function(state = {}, action) {
  console.log("I GET TO THE REDUCER");
  switch (action.type) {  
    case 'MARK_AS_UNREAD':
      console.log("I GET TO THE SWITCH STATEMENT");
      return Object.assign({}, state, {
        messages: state.messages.map( (message) => {
          if (message.id === action.id) {
            return Object.assign({}, message, {
              unread: false
            })
            console.log("I GET TO CHANGING THE MESSAGE TO UNREAD", message);
          }
        })
      })
    default:
      return state
  }
}

export { messages };