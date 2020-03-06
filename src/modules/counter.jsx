import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function incrementAction() {
  return {
    type: INCREMENT,
  };
}

function decrementAction() {
  return {
    type: DECREMENT,
  };
}

export function counterReducer(state = 0, action) {
  switch (action.type) {
    case (INCREMENT):
      return state + 1;
    case (DECREMENT):
      return state - 1;
    default:
      return state;
  }
}

export function Counter() {
  const dispatch = useDispatch();
  // const handleIncrement = () => dispatch(incrementAction());
  // const handleIncrementAlt = () => useDispatch(incrementAction());
  // const handleIncrementAlt2 = () => store.dispatch(incrementAction());

  return (
    <div>
      <div className="counter">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onClick={() => dispatch(decrementAction())} className="counter__decrement">-</div>
        <div className="counter__value">
          {useSelector(state => state.counterReducer)}
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onClick={() => dispatch(incrementAction())} className="counter__increment">+</div>
      </div>
    </div>
  );
}
