import { combineReducers } from 'redux';

import { visibilityFilter } from './visibility-filter';
import { messages } from './messages';
import { currentSession } from './current-session';
import { comments } from './comments';

export default combineReducers({
  messages,
  visibilityFilter,
  currentSession,
  comments
})
