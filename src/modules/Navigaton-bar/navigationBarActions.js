import { toast } from 'react-toastify';
import {
  LOCATION, SIGN_IN, SIGN_IN_ERROR,
  SIGN_IN_SUCCESS, SIGN_UP, SIGN_UP_ERROR, SIGN_UP_SUCCESS,
} from '../constants';
import { postSignIn, postSignUp } from '../../api';
import { LOCAL_URL, ROUTES_MAP } from '../../routing'; // eslint-disable-line
import { isToken } from './navigationBarReducer';

export let errorResponse = ''; //eslint-disable-line

export const signUp = (payload) => (dispatch) => {
  dispatch({ type: SIGN_UP });
  postSignUp(payload)
    .then((res) => res.json()
      .then((response) => {
        if (res.status !== 200) {
          toast.error(`${res.status} ${response.message}`);
          errorResponse = response.message;

          return dispatch({ type: SIGN_UP_ERROR });
        }

        if (res.status === 200) {
          localStorage.setItem('token', response.token);
          dispatch({ type: SIGN_UP_SUCCESS, isAdmin: isToken() });

          return LOCATION.href = `${LOCAL_URL}${ROUTES_MAP.reviews}`; // eslint-disable-line
        }

        return response;
      }));
};

export const signIn = (payload) => (dispatch) => {
  dispatch({ type: SIGN_IN });
  postSignIn(payload)
    .then((res) => res.json()
      .then((response) => {
        if (res.status !== 200) {
          toast.error(`${res.status} ${response.message}`);
          errorResponse = response.message;

          return dispatch({ type: SIGN_IN_ERROR });
        }

        if (res.status === 200) {
          localStorage.setItem('token', response.token);
          dispatch({ type: SIGN_IN_SUCCESS, isAdmin: isToken() });

          return LOCATION.href = `${LOCAL_URL}${ROUTES_MAP.reviews}`; // eslint-disable-line
        }

        return response;
      }));
};
