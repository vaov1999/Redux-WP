import React from 'react';
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { enterRequest } from './reducer';

export const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(header => header.headerReducer);
  let password = '';
  let login = '';

  const getEnter = () => {
    if (login === state.login && password === state.password) {
      return dispatch(enterRequest(true));
    }

    return console.log('Incorrect password or login. Please try again.');
  };

  window.addEventListener('keydown', event => {
    if (event.key === 'Enter') dispatch(enterRequest(true));
  });

  return (
    <div className="login">
      <input
        onChange={event => {
          const loginFix = event.target.value;

          login = loginFix;

          return login;
        }}
        className="login__login"
        type="text"
        placeholder="login"
      />
      <input
        // onChange={event => password = event.target.value}
        onChange={event => {
          const passwordFix = event.target.value;

          password = passwordFix;

          return password;
        }}
        className="login__password"
        type="text"
        placeholder="password"
      />
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => getEnter()}
        className="login__sign-in"
        onKeyDown={event => {
          if (event.key === 'Enter') getEnter();
        }}
      >
        Sign-in
      </div>
    </div>
  );
};
