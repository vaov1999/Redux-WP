import { counterReducer } from './counterState';

export const store = window.Redux.createStore(counterReducer);

