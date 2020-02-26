import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, setFilter } from './acitons';

export const Todo = () => {
  const { items, filter } = useSelector(state => state.todoReducer);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const trimmedValue = value.trim();
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
          value={value}
          onChange={event => setValue(event.target.value)} // todo: how it works
          onKeyDown={event => {
            if (event.key === 'Enter' && trimmedValue !== '') {
              dispatch(addTodo(trimmedValue));
              setValue('');
            }
          }}
        />
        <button
          className="todo__controls-btn"
          disabled={!value}
          onClick={() => {
            if (trimmedValue !== '') {
              dispatch(addTodo(trimmedValue));
              setValue('');
            }
          }}
        >
          Add
        </button>
      </div>
      <ul className="todo-list-root">
        {filteredItems.map(item => (
          <li className="todo__list-item" key={item.id}>
            {item.title}
            <button className="todo__btn-del" onClick={() => dispatch(removeTodo(item.id))}>X</button>
          </li>
        ))}
        {!!trimmedValue && ( // todo: !!value === value ?
          <li className="todo__list-item" style={{ opacity: 0.5 }}>
            {value}
            <button className="todo__btn-del">X</button>
          </li>
        )}
      </ul>
    </div>
  );
};
