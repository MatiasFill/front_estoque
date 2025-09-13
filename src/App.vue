<template>
  <div class="bg-gray-100 min-h-screen font-sans antialiased text-gray-900">
    <div class="container mx-auto p-4 sm:p-8">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4 sm:mb-0">Controle de Estoque</h1>
        
      </div>

      <ProductList @edit-product="openModal" />

      <!-- Modal para Adicionar/Editar Produto -->
      <ProductForm v-if="isModalOpen" :product="currentProduct" @close-modal="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';

const isModalOpen = ref(false);
const currentProduct = ref(null);

const openModal = (product = null) => {
  currentProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = null;
};
</script>

<style>
/* Estilos globais */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>
