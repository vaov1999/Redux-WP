import './modules/todo';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Counter } from './modules/counter';

window.store = store; // todo: why 'store' defined here but not in the 'store.js'

ReactDom.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root'),
);
