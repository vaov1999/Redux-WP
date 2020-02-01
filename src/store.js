import {counterReducer} from './modules/counter/reducer';
import {todoReducer} from "./modules/todo/reducer";

const combinedReducers = window.Redux.combineReducers({counterReducer, todoReducer});
export const store = window.Redux.createStore(
    combinedReducers,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

