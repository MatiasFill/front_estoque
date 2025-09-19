// products.js
import api from './axios.js';

// --- Requisições para a API de Produtos ---

/**
 * Busca a lista de todos os produtos.
 * @returns {Promise<Array>} Lista de produtos.
 */
export async function fetchProducts() {
  return (await api.get('/api/products')).data;
}

/**
 * Adiciona um novo produto.
 * @param {object} product - O objeto do produto a ser adicionado.
 * @returns {Promise<object>} O produto adicionado.
 */
export async function addProduct(product) {
  return (await api.post('/api/products', product)).data;
}

/**
 * Atualiza um produto existente.
 * @param {object} product - O objeto do produto com os dados atualizados.
 * @returns {Promise<object>} O produto atualizado.
 */
export async function updateProduct(product) {
  return (await api.put(`/api/products/${product.id}`, product)).data;
}

/**
 * Deleta um produto pelo seu ID.
 * @param {string} id - O ID do produto a ser deletado.
 */
export async function deleteProduct(id) {
  await api.delete(`/api/products/${id}`);
}


/*
// products.js
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