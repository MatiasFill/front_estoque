import { defineStore } from 'pinia';
import * as productsApi from '@/api/products.js';

export const useStockStore = defineStore('stock', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        this.products = await productsApi.fetchProducts();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(product) {
      try {
        const newProduct = await productsApi.addProduct(product);
        this.products.push(newProduct);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateProduct(product) {
      try {
        const updated = await productsApi.updateProduct(product);
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) this.products[index] = updated;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteProduct(id) {
      try {
        await productsApi.deleteProduct(id);
        this.products = this.products.filter(p => p.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});





/*

import { defineStore } from "pinia";
import api from "@/api/axios.cjs";

export const useStockStore = defineStore("stock", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await api.get("/products");
        this.products = res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Erro ao buscar produtos:", err);
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(product) {
      try {
        const res = await api.post("/products", product);
        this.products.push(res.data);
      } catch (err) {
        this.error = err.message;
        console.error("Erro ao adicionar produto:", err);
      }
    },
    async updateProduct(product) {
      try {
        const res = await api.put(`/products/${product.id}`, product);
        const index = this.products.findIndex((p) => p.id === product.id);
        if (index !== -1) this.products[index] = res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Erro ao atualizar produto:", err);
      }
    },
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}`);
        this.products = this.products.filter((p) => p.id !== id);
      } catch (err) {
        this.error = err.message;
        console.error("Erro ao deletar produto:", err);
      }
    },
  },
});
*/

/*
import { defineStore } from "pinia";
import api from "@/api/axios.cjs"

export const useStockStore = defineStore("stock", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await api.get("/products");
        this.products = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(product) {
      try {
        const res = await api.post("/products", product);
        this.products.push(res.data);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateProduct(product) {
      try {
        const res = await api.put(`/products/${product.id}`, product);
        const index = this.products.findIndex((p) => p.id === product.id);
        if (index !== -1) this.products[index] = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}`);
        this.products = this.products.filter((p) => p.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
*/