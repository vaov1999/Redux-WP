import { TODO_ADD } from "./constants";

export function addTodo(title) {
    return {
        type: TODO_ADD,
        payload: {
            title,
        },
    };
}
