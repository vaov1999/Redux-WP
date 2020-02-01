import {store} from "../../store";
import {addTodo, removeTodo} from "./acitons";

const todoRootNode = document.getElementById('todo-list-root');
const todoInputNode = document.getElementById('todo-input');
const todoBtnAddNode = document.getElementById('todo-btn-add');

function handleAddTodo() {
    const title = todoInputNode.value;

    const addTodoAction = addTodo(title);

    todoInputNode.value = '';
    store.dispatch(addTodoAction)
}

function renderTodoList() {
    const {todoReducer} = store.getState();
    const {items} = todoReducer;
    const listNode = document.createElement('ul');

    todoRootNode.innerHTML = '';

    items.forEach(item => {
        const itemNode = document.createElement('li');
        const itemButtonNode = document.createElement('button');

        itemNode.className = 'todo__list-item';

        itemButtonNode.innerText = 'X';
        itemButtonNode.className = 'todo__btn-del';

        itemNode.innerText = item.title;
        listNode.appendChild(itemNode);
        itemNode.appendChild(itemButtonNode);

        itemButtonNode.addEventListener('click', () => {
            store.dispatch(removeTodo(item.id))
        });
    });

    todoRootNode.append(listNode)
}

store.subscribe(renderTodoList);

renderTodoList();

document.addEventListener('keydown', event => {
    if (event.key === 'Enter') handleAddTodo();
});

todoBtnAddNode.addEventListener('click', handleAddTodo);
