import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import ProductList from '@/components/ProductList.vue';
import ProductForm from '@/components/ProductForm.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/products/add', name: 'AddProduct', component: ProductForm },
  { path: '/products/edit/:id', name: 'EditProduct', component: ProductForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



/*
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import ProductList from '@/components/ProductList.vue';
import ProductForm from '@/components/ProductForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/api/products', name: 'ProductList', component: ProductList },
    { path: '/api/products/add', name: 'AddProduct', component: ProductForm },
    { path: '/api/products/edit/:id', name: 'EditProduct', component: ProductForm },
  ]
});

export default router;
*/