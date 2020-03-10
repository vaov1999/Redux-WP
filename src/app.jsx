import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';
import { store } from './store';
import { Counter } from './modules/counter';
import { Todo } from './modules/todo/index.jsx';
import { LoginAdmin } from './modules/Login/Login';

window.store = store; // todo: why 'store' defined here but not in the 'store.js'

const Home = () => (
  <Provider store={store}>
    <Counter />
    <Todo />
  </Provider>
);

ReactDom.render(
  <BrowserRouter>
    <header className="header">
      <Link className="header__item" to="/">Login Admin</Link>
      <Link className="header__item" to="/sign-in-admin">Todo</Link>
    </header>

    <Switch>
      <Route exact path="/" component={LoginAdmin} />
      <Route path="/sign-in-admin" component={Home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
