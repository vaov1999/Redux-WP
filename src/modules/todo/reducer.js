import {TODO_ADD, TODO_REMOVE} from "./constants";

const initialState = {
    items: [
        {id: Date.now() / Math.random(), title: 'react'},
        {id: Date.now() / Math.random(), title: 'redux'},
        {id: Date.now() / Math.random(), title: 'learnJS'},
    ],
};

export function todoReducer(state = initialState, {type, payload}) {
    const {items} = state;

    switch (type) {
        case TODO_ADD:
            return {
                ...state,
                items: [
                    ...items,
                    payload,
                ],
            };

        case TODO_REMOVE: {
            const newItems = items.filter(i => i.id !== payload.id);
            return {
                ...state,
                items: newItems,
            }
        }

        default:
            return state;
    }
}
