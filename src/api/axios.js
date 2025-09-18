import axios from 'axios';

// Base URL do backend
// - Local: http://localhost:3000
// - Produção: /api (Vercel proxy)
const API_URL = import.meta.env.VITE_API_URL || '/api';
console.log('Axios vai se conectar em:', API_URL);

// Cria a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Função de teste de conexão
export const testConnection = async () => {
  const res = await api.get('api/produtos'); // sua rota de teste
  return res.data;
};

export default api;


/*
import axios from 'axios';

// Base URL do backend (local ou produção via VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('Axios vai se conectar em:', API_URL); // Verifica se a URL está correta

// Cria a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s de timeout para requisições
});

// Interceptor para adicionar automaticamente o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // pega token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros de resposta
api.interceptors.response.use(
  (response) => response, // deixa passar respostas normais
  (error) => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ----- Teste rápido de conexão ao backend -----
export const testConnection = async () => {
  try {
    const res = await api.get('/produtos'); // substitua pela rota que seu backend tem
    console.log('Conexão com backend OK! Dados recebidos:', res.data);
  } catch (err) {
    console.error('Falha ao conectar com backend:', err.message);
  }
};

export default api;

*/

/*
// src/api/axios.js
import axios from 'axios';

// Base URL do backend (local ou produção via VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Cria a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s de timeout para requisições
});

// Interceptor para adicionar automaticamente o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // pega token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros de resposta
api.interceptors.response.use(
  (response) => response, // deixa passar respostas normais
  (error) => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

*/


/*
// src/api/axios.js
import axios from 'axios';

// Base URL do backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


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




