import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { store } from './store';
import { Routes, NavigationBar } from './modules/Navigaton-bar/NavigationBar';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <NavigationBar />
      <Switch>
        <Routes />
      </Switch>
    </Provider>
  </BrowserRouter>
);

ReactDom.render(
  <App />,
  document.getElementById('root'),
);

// //////////////////////////////////////////////////////////////////// //
