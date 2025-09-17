// src/api/products.js
import api from './axios.js';
import { getToken } from './auth.js';

/**
 * Busca todos os produtos.
 * @returns {Array} Lista de produtos.
 */
export async function fetchProducts() {
  try {
    const res = await api.get('/api/products');
    return res.data;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    throw new Error(err.response?.data?.message || err.message);
  }
}

/**
 * Adiciona um novo produto.
 * @param {Object} product - Produto a ser adicionado.
 * @returns {Object} Produto criado.
 */
export async function addProduct(product) {
  try {
    const token = getToken();
    const res = await api.post('/api/products', product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    throw new Error(err.response?.data?.message || err.message);
  }
}

/**
 * Atualiza um produto existente.
 * @param {Object} product - Produto atualizado (deve conter id).
 * @returns {Object} Produto atualizado.
 */
export async function updateProduct(product) {
  try {
    const token = getToken();
    const res = await api.put(`/api/products/${product.id}`, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    throw new Error(err.response?.data?.message || err.message);
  }
}

/**
 * Deleta um produto pelo ID.
 * @param {number|string} id - ID do produto a ser deletado.
 * @returns {Object} Mensagem de sucesso.
 */
export async function deleteProduct(id) {
  try {
    const token = getToken();
    await api.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { message: 'Produto excluído com sucesso' };
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    throw new Error(err.response?.data?.message || err.message);
  }
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