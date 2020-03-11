import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { Todo } from './modules/todo/index';
import { Header } from './modules/Header';

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />

      <Switch>
        <Route path="/todo" component={Todo} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
