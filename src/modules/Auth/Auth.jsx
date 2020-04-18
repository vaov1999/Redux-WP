import React, { useState } from 'react';
import './auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import { Field, Form } from 'react-final-form';
// eslint-disable-next-line import/no-cycle
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer } from 'react-toastify';
import { signIn, signUp, errorResponse } from '../Navigaton-bar/navigationBarReducer'; // eslint-disable-line
import 'react-toastify/dist/ReactToastify.css';


const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&`]).{8,}$/;// eslint-disable-line

const validateEmail = (value) => (EMAIL_REGEXP.test(value)
  ? undefined : 'mail should looks like "somebody@mail.com"');
const validatePassword = (value) => (PASSWORD_REGEXP.test(value || '')
  ? undefined : 'Password should pass next requirements: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');

export const Auth = () => (
  <Form
    onSubmit={}
    render={({ values, valid }) => {
      const { name, email, password } = values;
      const dispatch = useDispatch();
      const state = useSelector((header) => header.navigationReducer);
      const [attemptsToSignInCount, setAttemptsToSignInCount] = useState(0);
      const [toRegister, setToRegister] = useState(false);

      const attemptsToSignUp = () => { // eslint-disable-line
        setAttemptsToSignInCount(attemptsToSignInCount + 1);

        if (valid) { return dispatch(signUp({ name, email, password })); }
      };

      const attemptsToSignIn = () => { // eslint-disable-line
        setAttemptsToSignInCount(attemptsToSignInCount + 1);

        if (valid) { return dispatch(signIn({ email, password })); }
      };

      window.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          toRegister ? attemptsToSignUp() : attemptsToSignIn(); // eslint-disable-line
        } // todo: wary strange bugs
      });

      return (
        <div className="login">
          <div className="auth__front">
            <div className="auth__slider">
              <h1> Here will be slider</h1>
            </div>
          </div>
          <div className="auth__form">
            <ToastContainer />
            <form className="auth__form-wrapper">
              <div className="auth__logo">vladOS</div>
              <div className="auth__aside">
                {toRegister && (
                  <Field name="name">
                    {({ input }) => (
                      <div className="auth__input--wrapper">
                        <TextField
                          className="auth__mi-component"
                          error={attemptsToSignInCount > 0 && state.isAdmin !== true}
                          required={!email && attemptsToSignInCount > 0}
                          label="Name"
                          variant="outlined"
                          {...input}
                        />
                      </div>
                    )}
                  </Field>
                )}
                <Field name="email" validate={validateEmail}>
                  {({ input, meta }) => (
                    <div className="auth__input--wrapper">
                      <TextField
                        className="auth__mi-component"
                        error={attemptsToSignInCount > 0 && state.isAdmin !== true}
                        required={!email && attemptsToSignInCount > 0}
                        label="Email"
                        variant="outlined"
                        helperText={attemptsToSignInCount > 0 && meta.error}
                        {...input}
                      />
                    </div>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ input, meta }) => (
                    <div className="auth__input--wrapper">
                      <TextField
                        className="auth__mi-component"
                        error={attemptsToSignInCount > 0 && state.isAdmin !== true}
                        required={!password && attemptsToSignInCount > 0}
                        label="password"
                        variant="outlined"
                        helperText={attemptsToSignInCount > 0 && meta.error}
                        {...input}
                      />
                    </div>
                  )}
                </Field>
                {attemptsToSignInCount > 0 && !state.isAdmin && (
                  <div className="auth__error">
                    {valid ? errorResponse : 'Follow the requirements above ❤'}
                  </div>
                )}
                <div className="auth__sign-in--wrapper">
                  {toRegister ? (
                    <Button
                      className="auth__mi-component auth__sign-in"
                      variant="contained"
                      color="primary"
                      onClick={() => attemptsToSignUp()}
                    >
                      Sign-up
                    </Button>
                  ) : (
                    <Button
                      className="auth__mi-component auth__sign-in"
                      variant="contained"
                      color="primary"
                      onClick={() => attemptsToSignIn()}
                    >
                      Sign-in
                    </Button>
                  )}
                </div>
                <div className="auth__second-button--wrapper">
                  <Button variant="contained" className="auth__mi-component">
                    Forgot a password?
                  </Button>
                  {toRegister ? (
                    <div className="auth__second-button--wrapper">
                      <Button
                        variant="contained"
                        color="primary"
                        className="auth__mi-component"
                        onClick={() => {
                          setToRegister(false);
                          setAttemptsToSignInCount(0);
                        }}
                      >
                        Sign-in
                      </Button>
                    </div>
                  ) : (
                    <div className="auth__second-button--wrapper">
                      <Button
                        variant="contained"
                        color="primary"
                        className="auth__mi-component"
                        onClick={() => {
                          setToRegister(true);
                          setAttemptsToSignInCount(0);
                        }}
                      >
                        Sign-up
                      </Button>
                    </div>
                  )}
                </div>
                {state.isLoading && (<LinearProgress className="auth__progress" />)}
              </div>
            </form>
          </div>
        </div>
      );
    }}
  />
);
