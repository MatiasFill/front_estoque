<template>
  <!-- Este div principal cria um overlay de fundo semi-transparente que cobre toda a tela. -->
  <!-- 'fixed inset-0' o posiciona fixamente, 'bg-gray-600 bg-opacity-50' define a cor e a transparência. -->
  <!-- 'flex items-center justify-center' centraliza o modal vertical e horizontalmente. -->
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <!-- Este div é o contêiner do próprio modal. Ele tem um fundo branco, cantos arredondados, sombra e é responsivo. -->
    <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 transform scale-95 transition-transform duration-300">
      <!-- Título do modal. É estilizado para ser um cabeçalho de confirmação. -->
      <h2 class="text-2xl font-bold mb-4 text-red-700">Confirmação</h2>
      
      <!-- Parágrafo que exibe a mensagem de confirmação. A mensagem é recebida via `props`. -->
      <p class="text-gray-700 mb-6">{{ message }}</p>
      
      <!-- Contêiner para os botões. `flex justify-end` alinha os botões à direita. -->
      <div class="flex justify-end space-x-4">
        <!-- Botão "Cancelar". Ao ser clicado, emite o evento 'cancel' para o componente pai. -->
        <button
          @click="emit('cancel')"
          class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
        >
          Cancelar
        </button>
        
        <!-- Botão "Confirmar". Ao ser clicado, emite o evento 'confirm' para o componente pai. -->
        <button
          @click="emit('confirm')"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// `defineProps` é uma macro de tempo de compilação usada para declarar as propriedades do componente.
const props = defineProps({
  // A propriedade 'message' é uma string que contém a mensagem a ser exibida no modal.
  message: {
    type: String,
    // Define um valor padrão caso a propriedade não seja passada.
    default: "Você tem certeza?",
  },
});

// `defineEmits` é uma macro para declarar os eventos que o componente pode emitir.
const emit = defineEmits(['confirm', 'cancel']);
</script>
