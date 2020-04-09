const API_URL = 'http://142.93.99.89:4500/api';

export const fetchReviews = () => fetch(`${API_URL}/reviews`)
  .then((response) => response.json());

export const fetchTodos = () => fetch(`${API_URL}/todo`)
  .then((response) => response.json());

export const requestTodoItems = () => new Promise((resolve) => {
  setTimeout(() => resolve(fetchTodos()));
});

export const postTodo = (todo) => (
  fetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then((response) => response.json())
);

export const putTodo = ({ id, isCompleted }) => (
  fetch(`${API_URL}/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isCompleted),
  }).then((response) => response.json())
);

export const deleteTodo = (id) => (
  fetch(`${API_URL}/todo/${id}`, { method: 'DELETE' })
    .then((response) => response.text())
);
