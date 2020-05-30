export const API_URL = 'http://142.93.99.89:4500/api';

export const fetchReviews = () => fetch(`${API_URL}/reviews`)
  .then((res) => res.json());

export const fetchTodos = () => fetch(`${API_URL}/todo`)
  .then((res) => res.json());

export const requestTodoItems = () => new Promise((resolve) => {
  setTimeout(() => resolve(fetchTodos()));
});

export const postTodo = (todo) => (
  fetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
);

export const postSignUp = (data) => (
  fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
);

export const postSignIn = (data) => (
  fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
);

export const putTodo = ({ id, isCompleted }) => (
  fetch(`${API_URL}/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isCompleted),
  })
    .then((res) => res.json())
);

export const deleteTodo = (id) => (
  fetch(`${API_URL}/todo/${id}`, { method: 'DELETE' })
    .then((res) => res.text())
);
