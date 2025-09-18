import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import { useStockStore } from './stores/stock.js';
import { useAuthStore } from './stores/auth.js'; // Importa a loja de autenticação
import { testConnection } from './api/axios'; // <-- Importa a função de teste

// Importa os estilos principais do projeto, incluindo as diretivas do Tailwind CSS.
import './assets/style.css';

// Cria a instância da aplicação Vue.
const app = createApp(App);

// Adiciona o Pinia para gerenciamento de estado global.
const pinia = createPinia();
app.use(pinia);

// Adiciona o Vue Router para gerenciar a navegação entre as páginas.
app.use(router);

// Monta a aplicação no elemento <div id="app"> do index.html.
app.mount('#app');

// ----- Inicializações adicionais -----

// Inicializa a busca de produtos ao carregar a aplicação
const stockStore = useStockStore();
stockStore.fetchProducts();

// Inicializa a loja de autenticação para verificar o token no localStorage
const authStore = useAuthStore();
authStore.initialize();

// ----- Teste rápido de conexão ao backend -----
testConnection();



/*
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import { useStockStore } from './stores/stock.js';
import { useAuthStore } from './stores/auth.js'; // Importa a loja de autenticação

// Importa os estilos principais do projeto, incluindo as diretivas do Tailwind CSS.
import './assets/style.css';

// Cria a instância da aplicação Vue.
const app = createApp(App);

// Adiciona o Pinia para gerenciamento de estado global.
const pinia = createPinia();
app.use(pinia);

// Adiciona o Vue Router para gerenciar a navegação entre as páginas.
app.use(router);

// Monta a aplicação no elemento <div id="app"> do index.html.
app.mount('#app');

// Inicializa a busca de produtos ao carregar a aplicação
const stockStore = useStockStore();
stockStore.fetchProducts();

// Inicializa a loja de autenticação para verificar o token no localStorage
const authStore = useAuthStore();
authStore.initialize();

*/
