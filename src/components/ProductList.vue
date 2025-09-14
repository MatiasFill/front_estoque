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
        <button
          @click="showTotalsCard = !showTotalsCard"
          class="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          {{ showTotalsCard ? 'Ocultar Totais' : 'Ver Totais' }}
        </button>
      </div>
    </div>
    
    <!-- Card de Totais -->
    <div v-if="showTotalsCard" class="bg-indigo-50 p-6 rounded-2xl shadow-xl mb-6 border border-indigo-200 transition-all duration-300 transform scale-100">
      <h3 class="text-xl font-bold text-indigo-800 mb-4">Resumo do Estoque</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <span class="text-lg font-semibold text-indigo-700">Total de Produtos</span>
          <span class="text-3xl font-bold text-indigo-600 mt-1">{{ totalProducts }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-semibold text-indigo-700">Valor Total do Estoque</span>
          <span class="text-3xl font-bold text-indigo-600 mt-1">{{ formattedTotalValue }}</span>
        </div>
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

    <!-- Tabela de Produtos VISÍVEL -->
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
            <tr v-if="store.isLoading">
              <td colspan="5" class="text-center py-8 text-gray-500">
                Carregando produtos...
              </td>
            </tr>
            <tr v-else-if="store.error">
              <td colspan="5" class="text-center py-8 text-red-500">
                Erro ao carregar produtos: {{ store.error }}
                <p>Por favor, verifique se o seu backend está rodando em `http://localhost:3000`.</p>
              </td>
            </tr>
            <tr v-else-if="filteredProducts.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-500">
                Nenhum produto encontrado.
              </td>
            </tr>
            <tr v-else v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
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
                  @click="confirmDelete(product.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Tabela de Produtos OCULTA para Geração de Relatório -->
    <div id="report-table-container" class="hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Quantidade
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Preço
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ product.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.quantity }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(product.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(product.price * product.quantity) }}
            </td>
          </tr>
          <tr>
              <td colspan="3" class="px-6 py-4 text-left text-base font-bold text-blue-800">Valor Total do Estoque:</td>
              <td class="px-6 py-4 text-right text-base font-bold text-blue-800">
                {{ formatPrice(totalValue) }}
              </td>
            </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Adicionar/Editar Produto -->
    <ProductForm v-if="isModalOpen" :product="currentProduct" @close-modal="closeModal" />

    <!-- Modal de Confirmação para Exclusão -->
    <ConfirmModal
      v-if="isConfirmModalOpen"
      message="Tem certeza que deseja excluir este produto?"
      @confirm="deleteConfirmed"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStockStore } from '../stores/stock.cjs';
import ProductForm from './ProductForm.vue';
import ConfirmModal from './ConfirmModal.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const store = useStockStore();
const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const currentProduct = ref(null);
const productToDeleteId = ref(null);
const searchQuery = ref('');
const showTotalsCard = ref(false);

onMounted(() => {
  store.fetchProducts();
});

const filteredProducts = computed(() => {
  if (store.isLoading || store.error || !searchQuery.value) {
    return store.products;
  }
  const query = searchQuery.value.toLowerCase();
  return store.products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    (product.sku && product.sku.toLowerCase().includes(query))
  );
});

const totalProducts = computed(() => filteredProducts.value.length);

const totalValue = computed(() => {
  return filteredProducts.value.reduce((acc, product) => acc + (product.quantity * product.price), 0);
});

const formattedTotalValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue.value);
});

const openModal = (product = null) => {
  currentProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = null;
};

const confirmDelete = (id) => {
  productToDeleteId.value = id;
  isConfirmModalOpen.value = true;
};

const deleteConfirmed = async () => {
  await store.deleteProduct(productToDeleteId.value);
  isConfirmModalOpen.value = false;
  productToDeleteId.value = null;
};

const cancelDelete = () => {
  isConfirmModalOpen.value = false;
  productToDeleteId.value = null;
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const generatePDF = async () => {
  const reportContainer = document.getElementById('report-table-container');
  reportContainer.classList.remove('hidden');

  const canvas = await html2canvas(reportContainer, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  reportContainer.classList.add('hidden');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 200;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.setFontSize(22);
  pdf.text("Relatório de Estoque", 10, 20);
  pdf.setFontSize(10);
  pdf.text(`Gerado em: ${new Date().toLocaleDateString()}`, 10, 28);
  
  pdf.addImage(imgData, 'PNG', 5, 35, imgWidth, imgHeight);

  pdf.save('relatorio-estoque.pdf');
};
</script>