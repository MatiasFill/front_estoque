import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // O array de plugins é onde você adiciona as funcionalidades do Vite.
  // Aqui, estamos ativando o plugin oficial para Vue 3.
  plugins: [vue()],
  
  // O resolvedor de caminhos pode ser útil para criar aliases
  // para diretórios de código, tornando os imports mais limpos.
  // Por exemplo, @/components
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
