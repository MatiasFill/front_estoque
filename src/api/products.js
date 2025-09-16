import api from './axios.cjs';
import { getToken } from './auth.cjs';

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
