<template>
  <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6">Visão Geral do Estoque</h2>

    <div v-if="store.isLoading" class="text-center py-8 text-gray-500">
      Carregando dados...
    </div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      Erro ao carregar dados: {{ store.error }}
      <p>Verifique se o backend está rodando em `http://localhost:3000`.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card: Total de Produtos -->
      <div class="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
        <h3 class="text-lg font-semibold text-indigo-800">Total de Produtos</h3>
        <p class="text-4xl font-bold text-indigo-600 mt-2">{{ totalProducts }}</p>
      </div>

      <!-- Card: Itens de Baixo Estoque -->
      <div class="bg-orange-50 p-6 rounded-xl shadow-md border border-orange-200">
        <h3 class="text-lg font-semibold text-orange-800">Itens de Baixo Estoque</h3>
        <p class="text-4xl font-bold text-orange-600 mt-2">{{ lowStockItems }}</p>
      </div>

      <!-- Card: Total em Valor -->
      <div class="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
        <h3 class="text-lg font-semibold text-green-800">Valor Total do Estoque</h3>
        <p class="text-4xl font-bold text-green-600 mt-2">{{ formattedTotalValue }}</p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <router-link
        to="/products"
        class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
      >
        Gerenciar Produtos
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStockStore } from '../stores/stock.js';

const store = useStockStore();

const totalProducts = computed(() => store.products.length);

const lowStockItems = computed(() => {
  return store.products.filter(p => p.quantity < 10).length;
});

const totalValue = computed(() => {
  return store.products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
});

const formattedTotalValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue.value);
});
</script>