// create basic html
// <div className="doto">
//     <div className="doto__title">Doto</div>
//     <div className="doto__controls">
//         <input id="doto-input" type="text" placeholder="Type Doto here"/>
//         <button className="doto__controls-btn" id="doto-btn-add">Add</button>
//     </div>
//     <div id="doto__list-root"></div>
// </div>


// get html elements
const dotoInputNode = document.getElementById('doto-input');
const dotoAddBtnNode = document.getElementById('doto-btn-add');
const rootNode = document.getElementById('doto__list-root');

// constants
const ADD_DOTO = 'ADD_DOTO';

// actionCreator
function addDoto(title) {
    return {
        type: ADD_DOTO,
        payload: {
            id: Date.now() / Math.random(),
            title,
        },
    };
}


// handler events
function handlerAddDoto() {
    const inputTitle = dotoInputNode.value;
    const addDotoAction = addDoto(inputTitle);

    dotoInputNode.value = '';

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    store.dispatch(addDotoAction);
}


// listeners
dotoAddBtnNode.addEventListener('click', handlerAddDoto);
document.addEventListener('keydown', event => {
    if (event.key === 'Shift') handlerAddDoto();
});
// object-curly-spacing

// stock state (initial state)
const initialState = {
    items: [
        { id: Date.now() / Math.random(), title: 'first item' },
        { id: Date.now() / Math.random(), title: 'second item' },
        { id: Date.now() / Math.random(), title: 'third item' },
    ],
};


// reducer
function dotoReducer(state = initialState, action) {
    const { items } = state;
    // everything did not work because: const items = initialState.items;
    // todo: why at this case adds only one item

    switch (action.type) {
        case ADD_DOTO:
            return {
                ...state, // todo: this string do nothing
                items: [
                    ...items,
                    action.payload,
                ],
            };

        default:
            return state;
    }
}


// create store
const combinedReducers = window.Redux.combineReducers({ dotoReducer });
const store = window.Redux.createStore(
    combinedReducers,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;


// render
function renderDotoList() {
    const { items } = store.getState().dotoReducer;

    const dotoListNode = document.createElement('ul');

    dotoListNode.className = 'doto__list';
    rootNode.innerText = ''; // todo: what do this string?

    items.forEach(item => {
        const dodoItemBlockNode = document.createElement('li');

        dodoItemBlockNode.className = 'doto__item-block';

        const dotoItemTextNode = document.createElement('div');

        dotoItemTextNode.className = 'doto__item-text';
        dotoItemTextNode.innerText = item.title;

        const dotoItemBtnNode = document.createElement('button');

        dotoItemBtnNode.className = 'doto__item-del-btn';
        dotoItemBtnNode.innerText = 'X';

        dotoListNode.appendChild(dodoItemBlockNode);
        dodoItemBlockNode.appendChild(dotoItemTextNode);
        dodoItemBlockNode.appendChild(dotoItemBtnNode);
    });

    rootNode.append(dotoListNode);
}

renderDotoList();

store.subscribe(renderDotoList);// todo: how it works

// subscribe
store.subscribe(() => {
    // store.subscribe(renderDotoList);//todo: why I have bug when use it here?
    const state = store.getState().dotoReducer.items;

    // eslint-disable-next-line no-console
    console.log('subscribe = ', state);
});
