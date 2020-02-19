import { store } from '../../store';
import { decrementAction, incrementAction } from './actions';


const counterValueNode = document.querySelector('.counter__value');
const counterIncrementNode = document.querySelector('.counter__increment');
const counterDecrementNode = document.querySelector('.counter__decrement');


store.subscribe(() => {
  const { counterReducer } = store.getState();

  counterValueNode.innerText = counterReducer;
});

counterIncrementNode.addEventListener('click', () => {
  store.dispatch(incrementAction());
});

counterDecrementNode.addEventListener('click', () => {
  store.dispatch(decrementAction());
});
