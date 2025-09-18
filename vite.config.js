import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Aumenta o limite do aviso de chunks grandes
    chunkSizeWarningLimit: 1000, // kB

    rollupOptions: {
      output: {
        // Cria chunks separados para bibliotecas externas
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separar Vue, Pinia e outras libs
            if (id.includes('vue')) return 'vue-vendor';
            if (id.includes('pinia')) return 'pinia-vendor';
            return 'vendor';
          }
        },
      },
    },
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