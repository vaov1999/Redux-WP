import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import {
  addTodo, removeTodo, setFilter, updateTodo,
} from './acitons';

export const Todo = () => {
  const { items, filter } = useSelector(state => state.todoReducer);
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();
  const trimmedValue = titleValue.trim();
  const filteredItems = items.filter(item => (
    item.title.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1
  ));

  // console.log('items', items, ' filter', filter, ' filtered', filteredItems);

  return (
    <div className="todo">
      <div className="todo__title">React Todo</div>
      <input
        className="todo-filter"
        placeholder="Type to filter"
        onChange={event => dispatch(setFilter(event.target.value))}
      />
      <div className="todo__controls">
        <input
          className="todo-input"
          placeholder="Type Todo here"
          value={titleValue}
          onChange={event => setTitleValue(event.target.value)} // todo: how it works
          onKeyDown={event => {
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
          Add
        </button>
      </div>
      <ul className="todo-list-root">
        {filteredItems.map(({ id, isCompleted, title }) => (
          <li className="todo__list-item" key={id}>
            <Switch
              value={isCompleted}
              onChange={value => {
                console.log(value);
                dispatch(updateTodo(id, { isCompleted: value }));
              }}
            />
            {title}
            <button className="todo__btn-del" onClick={() => dispatch(removeTodo(id))}>X</button>
          </li>
        ))}
        {!!trimmedValue && ( // todo: !!titleValue === titleValue ?
          <li className="todo__list-item" style={{ opacity: 0.5 }}>
            {titleValue}
            <button className="todo__btn-del">X</button>
          </li>
        )}
      </ul>
    </div>
  );
};
