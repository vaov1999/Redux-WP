// eslint-disable-next-line import/no-cycle
import { Login } from './Login';
import { Todo } from '../todo';
import { Counter } from '../counter';
import { Admin } from '../Admin';
import { ENTER_REQUEST } from '../todo/constants';

export const initialState = {
  isAdmin: false,
  login: '1',
  password: '22',
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
      title: 'admin',
      route: '/admin',
      isActive: false,
      component: Admin,
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
// window.open('http://127.0.0.1:3000/admin', '_self');
export const enterRequest = isAdmin => ({ type: ENTER_REQUEST, isAdmin });

export function headerReducer(state = initialState, { type, isAdmin }) {
  if (type === ENTER_REQUEST) {
    return { ...state, isAdmin };
  }

  return state;
}
