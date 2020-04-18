import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ToastContainer } from 'react-toastify';
import {
  addTodo, getTodos, removeTodo, setFilter, updateTodo,
} from './todoAction';
import './todo.scss';

export const Todo = () => {
  const { isLoading, items, filter } = useSelector((state) => state.todoReducer);
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();
  const trimmedValue = titleValue.trim();
  const filteredItems = items.filter((item) => (
    item.title.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1
  ));

  useEffect(() => dispatch(getTodos()), []);

  if (isLoading) {
    return (
      <div className="todo">
        <LinearProgress className="todo__spinner" />
      </div>
    );
  }

  return (
    <div className="todo">
      <ToastContainer />
      <div className="todo__title">TODO LIST</div>
      <div className="todo__controls">
        <input
          className="todo__input"
          placeholder="Type to filter"
          onChange={(event) => dispatch(setFilter(event.target.value))}
        />
        <button className="todo__controls-btn">
          <FilterListIcon className="todo__btn" />
        </button>
      </div>
      <div className="todo__controls">
        <input
          className="todo__input"
          placeholder="Type Todo here"
          value={titleValue}
          onChange={(event) => setTitleValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && trimmedValue !== '') {
              dispatch(addTodo(trimmedValue));
              setTitleValue('');
            }
          }}
        />
        <button
          className="todo__controls-btn"
          disabled={!titleValue}
          onClick={() => {
            if (trimmedValue !== '') {
              dispatch(addTodo(trimmedValue));
              setTitleValue('');
            }
          }}
        >
          <AddCircleOutlineIcon className="todo__btn" />
        </button>
      </div>
      <ul>
        {filteredItems.map(({ id, isCompleted, title }) => (
          <li className="todo__list-item" key={id}>
            <div className="todo__switch-block">
              <Switch
                color="primary"
                checked={isCompleted}
                value={isCompleted}
                onChange={(event) => dispatch(
                  updateTodo(id, { isCompleted: event.target.checked }),
                )}
              />
            </div>
            <div className="todo__text">{title}</div>
            <button
              className="todo__btn-del"
              onClick={() => dispatch(removeTodo(id))}
            >
              <DeleteIcon className="todo__btn" />
            </button>
          </li>
        ))}
        {!!trimmedValue && ( // todo: !!titleValue === titleValue ?
          <li className="todo__list-item" style={{ opacity: 0.5 }}>
            {titleValue}
            <button className="todo__btn-del">
              <DeleteIcon className="todo__btn" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
