import { createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { todoReducer } from './modules/Todo/todoReducer';
import { counterReducer } from './modules/Counter/Counter';
import { navigationReducer } from './modules/Navigaton-bar/navigationBarReducer';
import { reviewsReducer } from './modules/Reviews/reviewsReducer';

const middlewares = [thunk, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const combinedReducers = combineReducers({
  todoReducer, counterReducer, navigationReducer, reviewsReducer,
});

export const store = createStore(
  combinedReducers,
  undefined,
  composeWithDevTools(...enhancers),
);

window.store = store;
