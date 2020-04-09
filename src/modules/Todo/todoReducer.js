import {
  TODO_ADD,
  TODO_ADD_SUCCESS,
  TODO_UPDATE,
  TODO_GET_ITEMS,
  TODO_GET_ITEMS_SUCCESS,
  TODO_REMOVE,
  TODO_SET_FILTER,
} from '../constants';

const initialState = {
  filter: '',
  isLoading: false,
  items: [],
  currentRoute: '/',
};

export function todoReducer(state = initialState, { type, payload }) {
  const { items } = state;

  switch (type) {
    case TODO_ADD:
      return { ...state, isLoading: true };

    case TODO_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...items, payload],
      };

    case TODO_UPDATE: {
      const newItems = items.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload.isCompleted };
        }

        return item;
      });

      return { ...state, items: newItems };
    }

    case TODO_GET_ITEMS: {
      return { ...state, isLoading: true };
    }

    case TODO_GET_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: payload,
      };
    }

    case TODO_REMOVE: {
      const newItems = items.filter((item) => item.id !== payload.id);

      return { ...state, items: newItems };
    }

    case TODO_SET_FILTER: {
      return { ...state, filter: payload.value };
    }

    default:
      return state;
  }
}
