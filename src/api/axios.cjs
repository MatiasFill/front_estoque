import axios from 'axios';

// URL do backend (ajustada para dev e produção)
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api'
    : 'https://estoqueback.vercel.app/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;



/*
// src/api/axios.js
import axios from 'axios';

// Base URL do backend
const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

*/
/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // precisa ser igual ao backend
});

export default api;
 
*/




