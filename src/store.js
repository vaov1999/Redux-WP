import { todoReducer } from './modules/todo/reducer';
import { counterReducer } from './modules/counter/reducer';

const combinedReducers = window.Redux.combineReducers({ todoReducer, counterReducer });

export const store = window.Redux.createStore(
  combinedReducers,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;
