import {TODO_ADD, TODO_REMOVE} from "./constants";

const initialState = {
    items: [
        {id: Date.now() / Math.random(), title: 'react'},
        {id: Date.now() / Math.random(), title: 'redux'},
        {id: Date.now() / Math.random(), title: 'learnJS'},
    ],
};

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case TODO_ADD:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload,
                ],
            };

        case TODO_REMOVE: {
            const newItems = state.items.filter(i => i.id !== action.payload.id);
            return {
                ...state,
                items: newItems,
            }
        }

        default:
            return state;
    }
}
