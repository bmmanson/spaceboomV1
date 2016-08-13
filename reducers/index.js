import { combineReducers } from 'redux';

import { visibilityFilter } from './visibility-filter';
import { messages } from './messages';
import { newMessage } from './new-message';

export default combineReducers({
  messages,
  visibilityFilter,
  newMessage
})
