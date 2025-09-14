import { defineStore } from 'pinia';
import * as authApi from '@/api/auth.js';
import api from '@/api/axios.cjs';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: authApi.getToken(),
    isAuthenticated: !!authApi.getToken(),
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const token = await authApi.login(username, password);
        this.token = token;
        this.isAuthenticated = true;
        this.error = null;
      } catch {
        this.error = "Credenciais inválidas. Por favor, tente novamente.";
      }
    },
    logout() {
      authApi.logout();
      this.token = null;
      this.isAuthenticated = false;
    },
    initialize() {
      const token = authApi.getToken();
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  }
});



/*
import { defineStore } from "pinia";
import api from "@/api/axios.cjs";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
  }),
  actions: {
    async login(username, password) {
      this.error = null;
      try {
        const res = await api.post("/login", { username, password });
        this.token = res.data.token;
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        // Configura o cabeçalho de autorização padrão para todas as futuras requisições do Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        return true;
      } catch (err) {
        this.error = "Credenciais inválidas. Por favor, tente novamente.";
        return false;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      // Remove o cabeçalho de autorização padrão
      delete api.defaults.headers.common['Authorization'];
    },
    // Método para inicializar o token ao carregar a página
    initialize() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    }
  },
});
*/