import api from './axios.cjs';
import { getToken } from './auth.js';

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
