import { combineReducers } from 'redux';

import { visibilityFilter } from './visibility-filter';
import { messages } from './messages'

export default combineReducers({
  messages,
  visibilityFilter
})
