import './modules/todo';
import './modules/counter/index';
// import './modules/doto';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Counter } from './modules/counter/index.jsx';

ReactDom.render(
  <Provider store={store}>
    <Counter age="21" name="vlad" />
  </Provider>,
  document.getElementById('root'),
);

window.store = store; // todo: why 'store' defined here but not in the 'store.js'
