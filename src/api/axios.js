import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // precisa ser igual ao backend
});

export default api;
