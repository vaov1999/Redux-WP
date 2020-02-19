// Решил всё таки допилить листочек и сделал две версии, эта версия побольше будет.
// Базируется листок на туду которые мы делали во время урока,
// только тут туду назывется - doto, долго объяснять почему так получилось
// Тут я прошу вас найти ошибки, любые какие сможете, и найти способы сделать дуту лучше.
// Но вообще не для этого я создал этот лист, а для того что бы вы
// опровергли или подтвердили утверждения в скобках "1)... 2)..." и предлагаю сделать это
// таким способом: "1) Y ..." если утверждение правдивое и "1) N ..." если ложное.
// вот пример: "1) Y редакс - заебись, чётко" и "1) N редакс для лохов"
// ну или ещё мне нравится тоже самое толко вместо "Y" - "1" а вместо "N" - "0"
// можете докинуть свои утверждения, и вместе разберём их

// (Flux) DOM --> action --> dispatcher --> store --> DOM

// (Tini redux)  DOM --> ActionCreator --> Dispatcher --> Reducer --> State --> Store --> DOM

// (Short redux) DOM --> ActionCreator --> handler -->
// Dispatcher(ActionCreator) --> eventListener --> InitialState -->
// Reducer --> State --> Store=Reducer --> Store.subscribe --> DOM

// (Short redux) DOM --> eventListener --> ActionCreator --> createdAction -->
// Dispatcher(ActionCreator)


// FULL EXAMPLE redux
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


// actionCreator
// 1) 1 экшен нужен только для того что бы быть задеспатченным в стор
// 2) 1 у экшена ВСЕГДА есть тайп
// 3) 1 если у экшена есть что то кроме тайпа, то это нагрузка экшена,
// которая ВСЕГДА находиться в объекте payload
// 4) 1 экшенКреатор ВСЕГДА возвращет только объект
// 5) 0 в названии функции экшен-криейтора всегда есть слово "Action"
function addDoto(title) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    type: ADD_DOTO,
    payload: {
      id: Date.now() / Math.random(),
      title,
    },
  };
}


// constants
// 1) - constants cab be created only in constants file
const ADD_DOTO = 'ADD_DOTO';


// handler events
// dispatch
// 1) 1 диспатч принимает только экшен-креаторы аргументом
// 2) 1 экшен креаторы обязательно должны быть вызваны т.е. со скобками в конце функции()
// 3) 1 каким-то (смотреть видос) способом результат вызова экшен-креатора
//      становится вторым параметром редьюсера
// 4) 1 диспатч является методом только стора
// 5) 1 диспатчить экшены можно только в редьюсеры
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


// stock state (initial state)
// 1) 1 стор может быть предварительно определён до создания редьюсера (initialState)
// 2) 1 предварительно созданный стор (или точка старта стора) - всегда называется - initialState
// 3) 1 исходный initialState не может меняться, он дублируется в стор и уже его клон меняется
const initialState = {
  items: [
    { id: Date.now() / Math.random(), title: 'first item' },
    { id: Date.now() / Math.random(), title: 'second item' },
    { id: Date.now() / Math.random(), title: 'third item' },
  ],
};


// reducer
// 1) 1 только редьюсер может обновлять состояние стора
// 2) 1 единственная функция редьюсера - обновлять состояние стора
// 4) 1 перый параметр редьюсера - state, второй - action, и эти названия не могут меняться
// 5) 1 у редьюсера не может быть больше чем два параметра
// 6) 1 у редьюсера не может быть только один параметр
// 7) 1 в любом кейсе редьюсера вседа возвращается новое состояние стора
// 8) 1 все действия (выражения) редьюсера находяться в условных конструкциях
// 9) 1 в редьюсере используется только свич конструкция
function dotoReducer(state = initialState, action) {
  const { items } = state;

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
// 1) 1 только стор хранит в себе состояние абсолютно всего приложения\сайта
// 2) 1 стор может быть только один
// 3) 10 стор хранит в себе только редьюсеры, которые изменяют стор
// 4) 0 даже если редьюсер есть только один, он должен быть закомбайнен
// 5) 1 только редьюсер может менять состояние стора
// 6) 1 стор создаётся только через window.Redux.createStore()
const combinedReducers = window.Redux.combineReducers({ dotoReducer });
const store = window.Redux.createStore(
  combinedReducers,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;


// render
// 1) 1 render it is not a part of redux - it just q service function
// 2) 1 render func can change everything except store
function renderDotoList() {
  const { items } = store.getState().dotoReducer;

  const dotoListNode = document.createElement('ul');

  dotoListNode.className = 'doto__list';
  rootNode.innerText = ''; // todo: how it works

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


// subscribe
// 1) 1 субскрайб может вызывать только функцию,
//    1 только если происходят какие то изменения в сторе,
//    1 а именно в const store = window.Redux.createStore(combinedReducers)
// 4) 1 использовать субскрайб можно бесконечное количество раз
store.subscribe(renderDotoList);
