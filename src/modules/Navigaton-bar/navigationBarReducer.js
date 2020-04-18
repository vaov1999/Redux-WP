// eslint-disable-next-line import/no-cycle
import { toast } from 'react-toastify';
import { Auth } from '../Auth/Auth'; //eslint-disable-line
import { Todo } from '../Todo/Todo';
import { Counter } from '../Counter/Counter';
import { Reviews } from '../Reviews/Reviews';
import {
  SIGN_IN, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_UP, SIGN_UP_ERROR, SIGN_UP_SUCCESS,
} from '../constants';
import { postSignIn, postSignUp } from '../../api';

export const initialState = {
  isAdmin: false,
  isLoading: false,
  login: '1',
  password: '1',
  links: [
    {
      id: Date.now() - Math.random(),
      title: 'login',
      route: '/',
      isActive: true,
      component: Auth,
    },
    {
      id: Date.now() - Math.random(),
      title: 'Reviews',
      route: '/reviews',
      isActive: false,
      component: Reviews,
    },
    {
      id: Date.now() - Math.random(),
      title: 'todo',
      route: '/todo',
      isActive: false,
      component: Todo,
    },
    {
      id: Date.now() - Math.random(),
      title: 'counter',
      route: '/counter',
      isActive: false,
      component: Counter,
    },
  ],
};

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

          return dispatch({ type: SIGN_UP_SUCCESS, isAdmin: true });
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

          return dispatch({ type: SIGN_IN_SUCCESS, isAdmin: true });
        }

        return response;
      }));
};

export function navigationReducer(state = initialState, action) {
  const { type, isAdmin } = action;

  switch (type) {
    case (SIGN_IN):
    case (SIGN_UP):
      return ({ ...state, isLoading: true });
    case (SIGN_IN_ERROR):
    case (SIGN_UP_ERROR):
      return ({ ...state, isLoading: false });
    case (SIGN_IN_SUCCESS):
    case (SIGN_UP_SUCCESS):
      return ({ ...state, isAdmin, isLoading: false });
    default:
      return state;
  }
}
