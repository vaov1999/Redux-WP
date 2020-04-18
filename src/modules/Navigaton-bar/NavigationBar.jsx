import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './navigationBarReducer';
import './navigationBar.scss';

export const NavigationBar = () => {
  const state = useSelector((header) => header.navigationReducer);
  const dispatch = useDispatch();

  return ( // todo: finish logout logic
    <header className="nav">
      {state.isAdmin && (
        <Link
          to="/"
          className="nav__item"
          onClick={() => dispatch(signIn(false))}
        >
          Log out
        </Link>
      )}
      {state.links.map(({
        id, title, route, isActive,
      }) => {
        if (state.isAdmin === false && route === '/') {
          return (
            <Link className="nav__item " key={id} to={route}>
              {title}
            </Link>
          );
        }

        if (state.isAdmin && route !== '/') {
          if (isActive) {
            return (
              <Link className="nav__item" key={id} to={route}>
                {title}
              </Link>
            );
          }

          return (
            <Link className="nav__item" key={id} to={route}>
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
  const state = useSelector((header) => header.navigationReducer);

  return state.links.map(({ id, route, component }) => {
    if (route === '/') {
      return <Route exact key={id} path={route} component={component} />;
    } if (route !== '/' && state.isAdmin === true) {
      return <Route key={id} path={route} component={component} />;
    } if (route !== '/' && state.isAdmin === false) {
      return <Redirect key={id} from={route} to="/" />;
    }

    return undefined;
  });
};
