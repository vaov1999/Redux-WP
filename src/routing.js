import { Auth } from './modules/Auth/Auth'; // eslint-disable-line
import { Reviews } from './modules/Reviews/Reviews';
import { Todo } from './modules/Todo/Todo';
import { Counter } from './modules/Counter/Counter';

export const LOCAL_URL = 'http://127.0.0.1:3000';

export const ROUTES_MAP = {
  signIn: '/',
  counter: '/counter',
  todo: '/todo',
  reviews: '/reviews',
};

export const links = [
  {
    title: 'Authorization',
    route: ROUTES_MAP.signIn,
    component: Auth,
  },
  {
    title: 'Reviews',
    route: ROUTES_MAP.reviews,
    component: Reviews,
  },
  {
    title: 'Todo',
    route: ROUTES_MAP.todo,
    component: Todo,
  },
  {
    title: 'Counter',
    route: ROUTES_MAP.counter,
    component: Counter,
  },
];
