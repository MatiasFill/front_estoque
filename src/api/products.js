import api from './axios';

// Buscar todos os produtos
export const getProducts = () => api.get('/products');

// Criar um novo produto
export const createProduct = (data) => api.post('/products', data);

// Atualizar um produto
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

// Deletar um produto
export const deleteProduct = (id) => api.delete(`/products/${id}`);

/*
import api from './axios.cjs';
import { getToken } from './auth.cjs';

export async function fetchProducts() {
  return (await api.get('/products')).data;
}

export async function addProduct(product) {
  const token = getToken();
  return (await api.post('/products', product, { headers: { Authorization: `Bearer ${token}` }})).data;
}

export async function updateProduct(product) {
  const token = getToken();
  return (await api.put(`/products/${product.id}`, product, { headers: { Authorization: `Bearer ${token}` }})).data;
}

export async function deleteProduct(id) {
  const token = getToken();
  await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` }});
}
*/