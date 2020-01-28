import {store} from "../../store";

const todoRootNode = document.getElementById('todo-list-root');
const todoInputNode = document.getElementById('todo-input');
const todoBtnAddNode = document.getElementById('todo-btn-add');

function renderTodoList() {
    const {todoReducer} = store.getState();
    const {items} = todoReducer;
    const listNode = document.createElement('ul');

    todoRootNode.innerHTML = '';

    items.forEach(item => {
        const itemNode = document.createElement('li');
        itemNode.innerText = item;
        listNode.appendChild(itemNode);
    });

    todoRootNode.append(listNode)
}

store.subscribe(renderTodoList);

renderTodoList();
