// eslint-disable-next-line import/no-cycle
import { Login } from '../Login/Login';
import { Todo } from '../Todo/Todo';
import { Counter } from '../Counter/Counter';
import { Reviews } from '../Reviews/Reviews';
import { ENTER_REQUEST } from '../constants';

export const initialState = {
  isAdmin: false,
  login: '1',
  password: '1',
  links: [
    {
      id: Date.now() - Math.random(),
      title: 'login',
      route: '/',
      isActive: true,
      component: Login,
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

export const enterRequest = (isAdmin) => ({ type: ENTER_REQUEST, isAdmin });

export function navigationReducer(state = initialState, { type, isAdmin }) {
  if (type === ENTER_REQUEST) {
    return { ...state, isAdmin };
  }

  return state;
}
