// create basic html
// <div className="todo">
//     <div className="todo__title">Todo</div>
//     <div className="todo__controls">
//         <input id="todo-input" type="text" placeholder="Type Todo here"/>
//         <button className="todo__controls-btn" id="todo-btn-add">Add</button>
//     </div>
//     <div id="todo-list-root"></div>
// </div>
document.querySelector('.todo__title').innerHTML = 'Todo single';


// get html elements
const todoRootNode = document.getElementById('todo-list-root');
const todoInputNode = document.getElementById('todo-input');
const todoBtnAddNode = document.getElementById('todo-btn-add');


// constants
const TODO_ADD = 'TODO_ADD';
const TODO_REMOVE = 'TODO_REMOVE';


// actionsCreators
function addTodo(title) {
    return {
        type: TODO_ADD,
        payload: {
            id: Date.now() / Math.random(),
            title,
        },
    };
}

function removeTodo(id) {
    return {
        type: TODO_REMOVE,
        payload: {
            id,
        },
    };
}


// handlers events
function handleAddTodo() {
    const title = todoInputNode.value;
    const addTodoAction = addTodo(title);

    todoInputNode.value = '';

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    store.dispatch(addTodoAction);
}


// listeners
todoBtnAddNode.addEventListener('click', handleAddTodo);
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') handleAddTodo();
});


// stock state (initial state)
const initialState = {
    items: [
        { id: Date.now() / Math.random(), title: 'react' },
        { id: Date.now() / Math.random(), title: 'redux' },
        { id: Date.now() / Math.random(), title: 'learnJS' },
    ],
};


// reducer
function todoReducer(state = initialState, action) {
    const { items } = state;

    switch (action.type) {
        case TODO_ADD:
            return {
                ...state, // todo: this string do nothing
                items: [
                    ...items,
                    action.payload,
                ],
            };

        case TODO_REMOVE: {
            const newItems = items.filter(i => i.id !== action.payload.id);

            return {
                ...state,
                items: newItems,
            };
        }

        default:
            return state;
    }
}


// store
const combinedReducers = window.Redux.combineReducers({ todoReducer });
const store = window.Redux.createStore(
    combinedReducers,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;


// render
function renderTodoList() {
    const { items } = store.getState().todoReducer;

    const listNode = document.createElement('ul');

    todoRootNode.innerHTML = ''; // todo: what do this string?

    items.forEach(item => {
        const itemNode = document.createElement('li');

        itemNode.className = 'todo__list-item';

        const itemButtonNode = document.createElement('button');

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

renderTodoList();


// subscribe
store.subscribe(renderTodoList);// todo: how it works
