<template>
  <!-- Este div principal cria o overlay escuro que cobre a tela inteira quando o modal está aberto. -->
  <!-- A classe 'fixed inset-0' o posiciona fixamente, 'bg-gray-600 bg-opacity-50' dá a cor e a transparência. -->
  <!-- O 'z-50' garante que ele fique acima de outros elementos na página. -->
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <!-- Este div é o container do modal em si. -->
    <!-- Ele tem um fundo branco, cantos arredondados, sombra e padding responsivo. -->
    <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 transform scale-95 transition-transform duration-300">
      <!-- O título do modal é dinâmico, mudando entre 'Editar Produto' e 'Adicionar Produto' -->
      <!-- dependendo do valor da propriedade computada 'isEditing'. -->
      <h2 class="text-2xl font-bold mb-6 text-blue-800">{{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
      
      <!-- O formulário. O '@submit.prevent' evita que a página recarregue ao ser enviado e chama a função 'saveProduct'. -->
      <form @submit.prevent="saveProduct">
        <!-- Campo para o Nome do Produto -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nome do Produto
          </label>
          <!-- 'v-model' cria uma ligação bidirecional entre o input e a propriedade 'editedProduct.name' no script. -->
          <input
            v-model="editedProduct.name"
            id="name"
            type="text"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <!-- Campo para o SKU do Produto -->
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
        
        <!-- Campo para a Quantidade do Produto -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
            Quantidade
          </label>
          <!-- 'v-model.number' garante que o valor seja tratado como um número, mesmo sendo um input do tipo 'text'. -->
          <input
            v-model.number="editedProduct.quantity"
            id="quantity"
            type="number"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <!-- Campo para o Preço do Produto -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Preço
          </label>
          <!-- 'step="0.01"' permite a entrada de valores decimais. -->
          <input
            v-model.number="editedProduct.price"
            id="price"
            type="number"
            step="0.01"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <!-- Botões de ação -->
        <div class="flex items-center justify-between">
          <!-- Botão para salvar o produto. O 'type="submit"' dispara o evento do formulário. -->
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          >
            Salvar
          </button>
          <!-- Botão para cancelar. O '@click' emite o evento 'closeModal' para o componente pai. -->
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
import { useStockStore } from '../stores/stock.js';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const store = useStockStore();
const editedProduct = ref({});

const isEditing = computed(() => !!props.product);

// Watch para preencher o formulário quando um produto é selecionado para edição
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    editedProduct.value = { ...newProduct };
  } else {
    editedProduct.value = { id: null, name: '', sku: '', quantity: 0, price: 0 };
  }
}, { immediate: true });

const saveProduct = () => {
  if (isEditing.value) {
    store.updateProduct(editedProduct.value);
  } else {
    store.addProduct(editedProduct.value);
  }
  emit('closeModal');
};

const emit = defineEmits(['closeModal']);
</script>
