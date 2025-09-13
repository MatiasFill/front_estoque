<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 sm:mb-0">Lista de Produtos</h2>
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button
          @click="openModal(null)"
          class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          + Adicionar Produto
        </button>
        <button
          @click="generatePDF"
          class="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Gerar Relatório (PDF)
        </button>
      </div>
    </div>
    
    <!-- Barra de Pesquisa -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        placeholder="Pesquisar produtos..."
        class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>

    <!-- Tabela de Produtos -->
    <div id="product-table-container" class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-100">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider hidden sm:table-cell"
              >
                SKU
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Quantidade
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider hidden md:table-cell"
              >
                Preço
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ product.sku }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  :class="{'text-red-500 font-bold': product.quantity < 10, 'text-green-600 font-bold': product.quantity >= 10}"
                >
                  {{ product.quantity }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {{ formatPrice(product.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(product)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  Editar
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                >
                  Excluir
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-500">
                Nenhum produto encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para Adicionar/Editar Produto -->
    <ProductForm v-if="isModalOpen" :product="currentProduct" @close-modal="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/ProductStore.js';
import ProductForm from './ProductForm.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const store = useProductStore();
const isModalOpen = ref(false);
const currentProduct = ref(null);
const searchQuery = ref('');

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return store.products;
  }
  const query = searchQuery.value.toLowerCase();
  return store.products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.sku.toLowerCase().includes(query)
  );
});

const openModal = (product = null) => {
  currentProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = null;
};

const deleteProduct = (id) => {
  store.deleteProduct(id);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const generatePDF = async () => {
  // Pega o elemento HTML da tabela
  const tableContainer = document.getElementById('product-table-container');

  // Usa html2canvas para converter o HTML em uma imagem
  const canvas = await html2canvas(tableContainer, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Configurações do PDF
  const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' = retrato, 'mm' = milímetros, 'a4' = tamanho
  const imgWidth = 200; // Largura da imagem no PDF
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula a altura proporcional

  // Adiciona o título e a data
  pdf.setFontSize(22);
  pdf.text("Relatório de Estoque", 10, 20);
  pdf.setFontSize(10);
  pdf.text(`Gerado em: ${new Date().toLocaleDateString()}`, 10, 28);
  
  // Adiciona a imagem da tabela
  pdf.addImage(imgData, 'PNG', 5, 35, imgWidth, imgHeight);

  // Salva o PDF
  pdf.save('relatorio-estoque.pdf');
};
</script>


