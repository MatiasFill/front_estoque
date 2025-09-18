// src/api/products.js
import api from './axios.js';

// GET todos produtos
export async function fetchProducts() {
  const res = await api.get('/api/products');
  return res.data;
}

// POST novo produto
export async function addProduct(product) {
  const token = localStorage.getItem('token');
  const res = await api.post('/api/products', product, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
  return res.data;
}

// PUT atualizar produto
export async function updateProduct(product) {
  const token = localStorage.getItem('token');
  const res = await api.put(`/api/products/${product.id}`, product, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
  return res.data;
}

// DELETE produto
export async function deleteProduct(id) {
  const token = localStorage.getItem('token');
  await api.delete(`/api/products/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
  return { message: 'Produto excluído com sucesso' };
}


/*
import api from './axios.js';
import { getToken } from './auth.js';

export async function fetchProducts() {
  return (await api.get('/api/products')).data;
}

export async function addProduct(product) {
  const token = getToken();
  return (await api.post('/api/products', product, { headers: { Authorization: `Bearer ${token}` }})).data;
}

export async function updateProduct(product) {
  const token = getToken();
  return (await api.put(`/api/products/${product.id}`, product, { headers: { Authorization: `Bearer ${token}` }})).data;
}

export async function deleteProduct(id) {
  const token = getToken();
  await api.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` }});
}
*/