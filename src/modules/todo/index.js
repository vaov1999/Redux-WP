import { store } from '../../store';
import { addTodo, removeTodo, setFilter } from './acitons';

const todoRootNode = document.getElementById('todo-list-root');
const todoInputNode = document.getElementById('todo-input');
const todoBtnAddNode = document.getElementById('todo-btn-add');
const todoFilterInputNode = document.getElementById('todo-filter');

function handleAddTodo() {
  const title = todoInputNode.value;

  if (todoInputNode.value === '') {
    const addTodoAction = addTodo('empty todo');

    todoInputNode.value = '';
    store.dispatch(addTodoAction);
  } else {
    const addTodoAction = addTodo(title);

    todoInputNode.value = '';
    store.dispatch(addTodoAction);
  }
}

function renderTodoList() {
  const { items, filter } = store.getState().todoReducer;
  const listNode = document.createElement('ul');
  const filteredItems = items.filter(
    i => i.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
  );

  todoRootNode.innerHTML = '';
  filteredItems.forEach(item => {
    const itemNode = document.createElement('li');
    const itemButtonNode = document.createElement('button');

    itemNode.className = 'todo__list-item';

    itemButtonNode.innerText = 'X';
    itemButtonNode.className = 'todo__btn-del';

    itemNode.innerText = item.title;
    listNode.appendChild(itemNode);
    itemNode.appendChild(itemButtonNode);

    itemButtonNode.addEventListener('click', () => {
      store.dispatch(removeTodo(item.id));
    });
  });

  todoRootNode.append(listNode);
}

store.subscribe(renderTodoList);

renderTodoList();

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') handleAddTodo();
});

todoFilterInputNode.addEventListener('input', () => {
  store.dispatch(setFilter(todoFilterInputNode.value));
});

todoBtnAddNode.addEventListener('click', handleAddTodo);
