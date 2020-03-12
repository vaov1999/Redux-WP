import { createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { todoReducer } from './modules/todo/reducer';
import { counterReducer } from './modules/counter';
import { headerReducer } from './modules/Login/reducer';

const middlewares = [thunk, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const combinedReducers = combineReducers({ todoReducer, counterReducer, headerReducer });

export const store = createStore(
  combinedReducers,
  undefined,
  composeWithDevTools(...enhancers),
);

window.store = store;
