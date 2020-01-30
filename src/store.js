import {counterReducer} from './modules/counter/reducer';
import {todoReducer} from "./modules/todo/reducer";

const combinedReducers = window.Redux.combineReducers({counterReducer, todoReducer});
export const store = window.Redux.createStore(combinedReducers);

