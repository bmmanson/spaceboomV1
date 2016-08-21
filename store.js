import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';
import { model } from './model';

let store = createStore(
	reducer, 
	//model, 
	applyMiddleware(thunk)
);

console.log(store.getState());

export { store };