import { SIGN_IN, SIGN_IN_SUCCESS } from '../constants';

const initialState = {
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case (SIGN_IN):
      return ({ ...state, isLoading: true });
    case (SIGN_IN_SUCCESS):
      return ({ ...state, isLoading: false });
    default: return state;
  }
};
