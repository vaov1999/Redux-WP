import {
  TODO_ADD, TODO_GET_ITEMS, TODO_GET_ITEMS_SUCCESS, TODO_REMOVE, TODO_SET_FILTER, TODO_UPDATE,
} from './constants';
import { requestTodoItems } from '../../api';

export function addTodo(title) {
  return {
    type: TODO_ADD,
    payload: {
      id: Date.now() / Math.random(),
      isCompleted: false,
      title,
    },
  };
}

export function getTodosSuccess(items) {
  return {
    type: TODO_GET_ITEMS_SUCCESS,
    payload: items,
  };
}

export function getTodos() {
  return dispatch => {
    dispatch({ type: TODO_GET_ITEMS });
    requestTodoItems().then(result => dispatch(getTodosSuccess(result)));
  };
}

export function updateTodo(id, data) {
  return {
    type: TODO_UPDATE,
    payload: { id, data },
  };
}

export function removeTodo(id) {
  return {
    type: TODO_REMOVE,
    payload: { id },
  };
}

export function setFilter(value) {
  return {
    type: TODO_SET_FILTER,
    payload: { value },
  };
}
