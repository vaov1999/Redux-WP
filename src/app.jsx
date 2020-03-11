import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { store } from './store';
import { Header, Routes } from './modules/Header';

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />

      <Switch>
        {Routes()}
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
