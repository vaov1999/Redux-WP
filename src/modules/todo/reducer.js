import { TODO_ADD, TODO_REMOVE, TODO_SET_FILTER } from './constants';

const initialState = {
    filter: '',
    items: [
        { id: Date.now() / Math.random(), title: 'react' },
        { id: Date.now() / Math.random(), title: 'redux' },
        { id: Date.now() / Math.random(), title: 'learnJS' },
    ],
};

export function todoReducer(state = initialState, action) {
    const { items } = state;

    switch (action.type) {
        case TODO_ADD:
            return {
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

        case TODO_SET_FILTER: {
            return {
                ...state,
                filter: action.payload.value,
            };
        }

        default:
            return state;
    }
}
