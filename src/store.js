import { createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { todoReducer } from './modules/todo/reducer';
import { counterReducer } from './modules/counter';

const logger = () => next => action => {
  // console.log(JSON.stringify(action, null, 4));
  next(action);
};

// const delayAction = store => next => action => {
//   console.log('delayAction start');
//   setTimeout(() => {
//     next(action);
//     console.log('delayAction end');
//   }, 3000);
// };

export const asyncActionMiddleware = () => next => action => {
  if (typeof action === 'function') action(next);
  else next(action);
};

const middlewares = [asyncActionMiddleware, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const combinedReducers = combineReducers({ todoReducer, counterReducer });

export const store = createStore(
  combinedReducers,
  undefined,
  composeWithDevTools(...enhancers),
);

window.store = store;
