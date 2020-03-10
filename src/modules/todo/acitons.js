import {
  TODO_ADD,
  TODO_ADD_SUCCESS,
  TODO_GET_ITEMS,
  TODO_GET_ITEMS_SUCCESS,
  TODO_REMOVE,
  TODO_SET_FILTER,
  TODO_UPDATE,
} from './constants';
import {
  deleteTodo, postTodo, putTodo, requestTodoItems,
} from '../../api';

export function addTodoSuccess(todo) {
  return {
    type: TODO_ADD_SUCCESS,
    payload: todo,
  };
}

export function addTodo(title) {
  const todo = {
    isCompleted: false,
    title,
  };

  return dispatch => {
    dispatch({ type: TODO_ADD });
    postTodo(todo).then(result => dispatch(addTodoSuccess(result)));
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

export function updateTodo(id, isCompleted) {
  putTodo({ id, isCompleted });

  return {
    type: TODO_UPDATE,
    payload: { id, isCompleted },
  };
}

export function removeTodo(id) {
  deleteTodo(id);

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
