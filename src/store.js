import { todoReducer } from './modules/todo/reducer';
// eslint-disable-next-line import/no-cycle
import { counterReducer } from './modules/counter';

const combinedReducers = window.Redux.combineReducers({ todoReducer, counterReducer });

export const store = window.Redux.createStore(
  combinedReducers,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;
