const API_URL = 'http://142.93.99.89:5000/api/todo';

export const fetchTodos = () => fetch(`${API_URL}`)
  .then(response => response.json());

export const requestTodoItems = () => new Promise(resolve => {
  setTimeout(() => resolve(fetchTodos()), 0);
});

export const postTodo = todo => (
  fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then(response => response.json())
);

export const putTodo = ({ id, isCompleted }) => (
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isCompleted),
  }).then(response => response.json())
);

export const deleteTodo = id => (
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(response => response.text())
);
