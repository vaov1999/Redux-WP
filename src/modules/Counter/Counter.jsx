import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './counter.scss';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const incrementAction = () => ({ type: INCREMENT });
const decrementAction = () => ({ type: DECREMENT });

const initialState = 0;

export function counterReducer(state = initialState, { type }) {
  switch (type) {
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
        <button
          className="counter__decrement"
          onClick={() => dispatch(decrementAction())}
        >
          -
        </button>
        <div className="counter__value">
          {useSelector((state) => state.counterReducer)}
        </div>
        <button
          className="counter__increment"
          onClick={() => dispatch(incrementAction())}
        >
          +
        </button>
      </div>
    </div>
  );
}
