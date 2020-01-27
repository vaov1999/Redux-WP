import {counterReducer} from '../modules/counter/reducer';

export const store = window.Redux.createStore(counterReducer);

window.store = store;
