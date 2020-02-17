import { store } from '../../store';
import { createCounterIncrementAction, createCounterDecrementAction } from './actions';

const counterValueNode = document.getElementById('counter-value');
const counterIncrementButtonNode = document.getElementById('counter-increment-button');
const counterDecrementButtonNode = document.getElementById('counter-decrement-button');

store.subscribe(() => {
    const { counterReducer } = store.getState();

    counterValueNode.innerText = counterReducer;
});

counterIncrementButtonNode.addEventListener('click', () => {
    store.dispatch(createCounterIncrementAction());
});

counterDecrementButtonNode.addEventListener('click', () => {
    store.dispatch(createCounterDecrementAction());
});
