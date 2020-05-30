import {
  SIGN_IN, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_UP,
  SIGN_UP_ERROR, SIGN_UP_SUCCESS, SIGN_OUT,
} from '../constants';

export const isToken = () => !!localStorage.getItem('token');

export const initialState = {
  isAdmin: isToken(),
  isLoading: false,
};

export function navigationReducer(state = initialState, { type, isAdmin }) {
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
    case (SIGN_OUT):
      return ({ ...state, isAdmin });
    default:
      return state;
  }
}
