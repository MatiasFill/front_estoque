// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Permite usar @ para src
    },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 500, // Limite para warnings (em kB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar dependências pesadas em chunks separados
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue-vendor';
            if (id.includes('pinia')) return 'pinia-vendor';
            if (id.includes('vue-router')) return 'router-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});



/*
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
*/