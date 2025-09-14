<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 transform scale-95 transition-transform duration-300">
      <h2 class="text-2xl font-bold mb-6 text-blue-800">{{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
      <form @submit.prevent="saveProduct">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nome do Produto
          </label>
          <input
            v-model="editedProduct.name"
            id="name"
            type="text"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="sku">
            SKU
          </label>
          <input
            v-model="editedProduct.sku"
            id="sku"
            type="text"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
            Quantidade
          </label>
          <input
            v-model.number="editedProduct.quantity"
            id="quantity"
            type="number"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Preço
          </label>
          <input
            v-model.number="editedProduct.price"
            id="price"
            type="number"
            step="0.01"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          >
            Salvar
          </button>
          <button
            type="button"
            @click="$emit('closeModal')"
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStockStore } from '../stores/stock.cjs';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const store = useStockStore();
const editedProduct = ref({});
const emit = defineEmits(['closeModal']);

const isEditing = computed(() => !!props.product);

watch(() => props.product, (newProduct) => {
  if (newProduct) {
    editedProduct.value = { ...newProduct };
  } else {
    editedProduct.value = { id: null, name: '', sku: '', quantity: 0, price: 0 };
  }
}, { immediate: true });

const saveProduct = async () => {
  if (isEditing.value) {
    // Chama a ação de atualização do store
    await store.updateProduct(editedProduct.value);
  } else {
    // Chama a ação de adição do store
    await store.addProduct(editedProduct.value);
  }
  emit('closeModal');
};
</script>