import { createStore } from 'redux';
import reducer from './reducers/index';
import { model } from './model';

let store = createStore(reducer, model);
console.log(store.getState());

export { store };