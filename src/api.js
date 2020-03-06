const API_URL = 'http://142.93.99.89:5000/api/todo';

export const requestTodoItems = () => fetch(`${API_URL}`)
  .then(response => response.json());
