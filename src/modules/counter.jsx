import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function incrementAction() {
  return {
    type: INCREMENT,
  };
}

const decrementAction = () => ({ type: DECREMENT });

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

  return (
    <div className="counter--wrapper">
      <div className="counter">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="counter__decrement" onClick={() => dispatch(decrementAction())}>-</div>
        <div className="counter__value">
          {useSelector(state => state.counterReducer)}
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="counter__increment" onClick={() => dispatch(incrementAction())}>+</div>
      </div>
    </div>
  );
}
