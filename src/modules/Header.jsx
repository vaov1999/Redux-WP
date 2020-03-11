import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { Counter } from './counter';
import { Todo } from './todo';

const initialState = {
  isAdmin: true,
  links: [
    {
      id: Date.now() - Math.random(),
      title: 'login',
      isAvailable: true,
      route: '/',
      isActive: true,
      component: Login,
    },
    {
      id: Date.now() - Math.random(),
      title: 'todo',
      isAvailable: false,
      route: '/todo',
      isActive: false,
      component: Todo,
    },
    {
      id: Date.now() - Math.random(),
      title: 'counter',
      isAvailable: false,
      route: '/counter',
      isActive: false,
      component: Counter,
    },
  ],
};

export const Links = () => initialState.links.map(({
  id, title, isAvailable, route, isActive,
// eslint-disable-next-line array-callback-return,consistent-return
}) => {
  if (initialState.isAdmin) {
    if (isActive) {
      return (
        <Link className="header__item header__item--active" key={id} to={route}>
          {title}
        </Link>
      );
    }

    return (
      <Link className="header__item" key={id} to={route}>
        {title}
      </Link>
    );
  }

  if (isAvailable) {
    return (
      <Link className="header__item header__item--active" key={id} to={route}>
        {title}
      </Link>
    );
  }
});

export const Routes = () => initialState.links.map(({
  id, route, component,
}) => {
  if (route === '/') {
    return (<Route exact key={id} to={route} component={component} />);
  }

  return (<Route key={id} to={route} component={component} />);
});

export const Header = () => (
  <header className="header">
    {Links()}
  </header>
);
