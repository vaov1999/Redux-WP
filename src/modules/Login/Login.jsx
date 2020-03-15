import React, { useState } from 'react';
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import { enterRequest } from './reducer';

export const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(header => header.headerReducer);

  const [login, setLogin] = useState('Test');
  const [password, setPassword] = useState('');

  const InputsDefault = () => (
    <div>
      <div className="login__login--wrapper">
        <TextField
          className="login__login"
          required
          label="login"
          variant="outlined"
          onChange={event => setLogin(event.target.value)}
        />
      </div>
      <div className="login__password--wrapper">
        <TextField
          className="login__password"
          required
          label="password"
          variant="outlined"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
    </div>
  );

  const InputsFailed = () => (
    <div className="login__inputs">
      <TextField
        className="login__login"
        error
        label="login"
        helperText="Incorrect password of login."
        variant="outlined"
        onChange={event => setLogin(event.target.value)}
      />
      <TextField
        className="login__password"
        error
        label="password"
        helperText="Incorrect password of login."
        variant="outlined"
        onChange={event => setPassword(event.target.value)}
      />
    </div>
  );

  const getEnter = () => {
    if (login === state.login && password === state.password) {
      return dispatch(enterRequest(true));
    }

    return 1;
  };

  window.addEventListener('keydown', event => {
    if (event.key === 'Enter') dispatch(enterRequest(true));
  });

  const getInputs = () => {
    if (login !== '')InputsFailed();

    return InputsDefault();
  };

  return (
    <div className="login">
      <div className="login__logo">LOGO</div>
      <div className="login__aside">
        {getInputs()}
        <div className="login__sign-in--wrapper">
          <Button
            onClick={() => getEnter()}
            className="login__sign-in"
            variant="contained"
            color="primary"
          >
            Sign-in
          </Button>
        </div>
        <div className="login__forgot-password--wrapper">
          <Button variant="contained" className="login__forgot-password">
            Forgot password?
          </Button>
        </div>
      </div>
    </div>
  );
};
