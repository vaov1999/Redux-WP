import React, { useState } from 'react';
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import { Field, Form } from 'react-final-form';
// eslint-disable-next-line import/no-cycle
import { enterRequest } from '../Navigaton-bar/navigationBarReducer';

export const Login = () => (
  <Form
    onSubmit={}
    render={({ values }) => {
      const { login, password } = values;
      const dispatch = useDispatch();
      const state = useSelector((header) => header.navigationReducer);
      const [attemptsToSignInCount, setAttemptsToSignInCount] = useState(0);

      const attemptToEnter = () => {
        setAttemptsToSignInCount(attemptsToSignInCount + 1);

        if (login === state.login && password === state.password) {
          return dispatch(enterRequest(true));
        }

        return undefined;
      };

      window.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') attemptToEnter();

        return undefined;
      });

      const errorText = () => {
        let text = '';

        if (attemptsToSignInCount && !login && !password) {
          text = 'Login and password is required';

          return text;
        }
        if (attemptsToSignInCount && login && password && state.isAdmin !== true) {
          text = 'Incorrect password or login';

          return text;
        }
        if (attemptsToSignInCount && !login && password) {
          text = 'Login is required';

          return text;
        }
        if (attemptsToSignInCount && login && !password) {
          text = 'Password is required';

          return text;
        }

        return text;
      };

      return (
        <div className="login">
          <div className="login__front">
            <div className="login__slider">
              <h1> Here will be slider</h1>
            </div>
          </div>
          <div className="login__form">
            <form className="login__form-wrapper">
              <div className="login__logo">vladOS</div>
              <div className="login__aside">
                <Field name="login" className="login__password">
                  {({ input }) => (
                    <div className="login__login--wrapper">
                      <TextField
                        className="login__login"
                        error={attemptsToSignInCount > 0 && state.isAdmin !== true}
                        required={!login && attemptsToSignInCount > 0}
                        label="login"
                        variant="outlined"
                        {...input}
                      />
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({ input }) => {
                    const test = { ...input };

                    console.log(test);

                    return (
                      <div className="login__password--wrapper">
                        <TextField
                          className="login__password"
                          helperText={errorText()}
                          error={attemptsToSignInCount > 0 && state.isAdmin !== true}
                          required={!password && attemptsToSignInCount > 0}
                          label="password"
                          variant="outlined"
                          {...input}
                        />
                      </div>
                    );
                  }}
                </Field>
                <div className="login__sign-in--wrapper">
                  <Button
                    onClick={() => attemptToEnter()}
                    className="login__sign-in"
                    variant="contained"
                    color="primary"
                  >
                    Sign-in
                  </Button>
                </div>
                <div className="login__forgot-password--wrapper">
                  <Button variant="contained" className="login__forgot-password">
                    Forgot a password?
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }}
  />
);
