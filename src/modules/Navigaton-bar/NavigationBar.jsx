import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isToken } from './navigationBarReducer';
import './navigationBar.scss';
import { SIGN_OUT } from '../constants';
import { links, ROUTES_MAP } from '../../routing';

export const NavigationBar = () => {
  const state = useSelector((header) => header.navigationReducer);
  const dispatch = useDispatch();

  return (
    <header className="nav">
      {state.isAdmin && (
        <NavLink
          to={ROUTES_MAP.signIn}
          className="nav__item"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: SIGN_OUT, isAdmin: isToken() });
          }}
        >
          Log out
        </NavLink>
      )}
      {links.map(({ title, route }) => { // eslint-disable-line
        if ((!state.isAdmin && route === ROUTES_MAP.signIn)
          || (state.isAdmin && route !== ROUTES_MAP.signIn)) {
          return (
            <NavLink
              to={route}
              activeClassName="nav__item--active"
              className="nav__item"
              key={title}
            >
              {title}
            </NavLink>
          );
        }
      })}
    </header>
  );
};

export const Routes = () => {
  const state = useSelector((header) => header.navigationReducer);

  return links.map(({ title, route, component }) => { // eslint-disable-line
    if (route === ROUTES_MAP.signIn) {
      return <Route exact key={title} path={route} component={component} />;
    }
    if (route !== ROUTES_MAP.signIn && state.isAdmin) {
      return <Route key={title} path={route} component={component} />;
    }
    if (route !== ROUTES_MAP.signIn && !state.isAdmin) {
      return <Redirect key={title} from={route} to="/" />;
    }
  });
};
