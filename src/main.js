import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.cjs';
import { useStockStore } from './stores/stock.cjs';
import { useAuthStore } from './stores/auth.cjs';
import './assets/style.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

const stockStore = useStockStore();
stockStore.fetchProducts();

const authStore = useAuthStore();
authStore.initialize();



/*
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.cjs';
import { useStockStore } from './stores/stock.cjs';
import { useAuthStore } from './stores/auth.cjs'; // Importa a loja de autenticação

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