// src/api.js

// Usa a variável de ambiente VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL;

// Função genérica para requisições GET
export async function getRequest(path) {
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) throw new Error(`Erro ao buscar ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Função genérica para requisições POST com JSON
export async function postRequest(path, body, token = null) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Erro ao postar ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
/* src/api.js

// Usa a variável de ambiente VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL;

// Função genérica para requisições GET
export async function getRequest(path) {
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) throw new Error(`Erro ao buscar ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Função genérica para requisições POST com JSON
export async function postRequest(path, body, token = null) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Erro ao postar ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
*/