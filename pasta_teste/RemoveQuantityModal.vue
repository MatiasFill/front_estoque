<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 transform scale-95 transition-transform duration-300">
      <h2 class="text-2xl font-bold mb-4 text-red-700">Remover Quantidade</h2>
      
      <p class="text-gray-700 mb-6">Quantos itens de "<span class="font-semibold">{{ product.name }}</span>" você deseja remover?</p>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="quantityToRemove">
          Quantidade a Remover
        </label>
        <input
          v-model.number="quantityToRemove"
          id="quantityToRemove"
          type="number"
          min="1"
          :max="product.quantity"
          class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <p v-if="quantityError" class="text-red-500 text-sm mt-1">{{ quantityError }}</p>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click="emit('closeModal')"
          class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
        >
          Cancelar
        </button>
        <button
          @click="confirmRemove"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          :disabled="quantityError || !quantityToRemove"
        >
          Confirmar Remoção
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['closeModal', 'removeQuantity']);

const quantityToRemove = ref(1);

const quantityError = computed(() => {
  if (quantityToRemove.value < 1) {
    return 'A quantidade deve ser maior que zero.';
  }
  if (quantityToRemove.value > props.product.quantity) {
    return `A quantidade não pode ser maior que o estoque atual (${props.product.quantity}).`;
  }
  return '';
});

const confirmRemove = () => {
  if (!quantityError.value) {
    emit('removeQuantity', {
      id: props.product.id,
      quantity: quantityToRemove.value,
    });
  }
};
</script>
