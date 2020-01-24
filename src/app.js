import React from 'react';
import './styles/app.scss';

const counterValueNode = document.getElementById('counter-value');
const counterDecrementButtonNode = document.getElementById('counter-decrement-button');
const counterIncrementButtonNode = document.getElementById('counter-increment-button');

function createCounterIncrementAction() {
  return {
    type: 'INCREMENT',
  };
}

function createCounterDecrementAction() {
  return {
    type: 'DECREMENT',
  };
}

function counterReducer(state = 0, action) {

  if (action.type === 'INCREMENT') {
    return state + 1;
  }

  if (action.type === 'DECREMENT') {
    return state - 1;
  }

  return state;
}

const store = window.Redux.createStore(counterReducer);

store.subscribe(() => {
  const state = store.getState();

  console.log(`Something has been changed - ${state}`);

  counterValueNode.innerText = state;
});

counterIncrementButtonNode.addEventListener('click',() =>{
  store.dispatch(createCounterIncrementAction());
});

counterDecrementButtonNode.addEventListener('click',() =>{
  store.dispatch(createCounterDecrementAction());
});

window.store = store;
