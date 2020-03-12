import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enterRequest } from './Login/reducer';

export const Header = () => {
  const state = useSelector(header => header.headerReducer);
  const dispatch = useDispatch();
  const LogOut = () => {
    if (state.isAdmin) {
      return (
        <Link
          to="/"
          className="header__item"
          onClick={() => dispatch(enterRequest(false))}
        >
        Log out
        </Link>
      );
    }

    return undefined;
  };

  return (
    <header className="header">
      {LogOut()}
      {state.links.map(({
        id, title, route, isActive,
      }) => {
        if (state.isAdmin === false && route === '/') {
          return (
            <Link className="header__item header__item--active" key={id} to={route}>
              {title}
            </Link>
          );
        }

        if (state.isAdmin && route !== '/') {
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

        return undefined;
      })}
    </header>
  );
};

export const Routes = () => {
  const state = useSelector(header => header.headerReducer);

  return state.links.map(({ id, route, component }) => {
    if (route === '/') {
      return <Route exact key={id} path={route} component={component} />;
    } if (route !== '/' && state.isAdmin === true) {
      return <Route key={id} path={route} component={component} />;
    } if (route !== '/' && state.isAdmin === false) {
      return <Redirect from={route} to="/" />;
    }

    return undefined;
  });
};
