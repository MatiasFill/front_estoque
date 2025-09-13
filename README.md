# Controle_Estoque

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```




/*

    ├── public/
│   └── index.html             # O arquivo HTML principal
├── src/
│   ├── assets/
│   │   └── style.css          # Arquivo de estilos para Tailwind CSS
│   ├── components/
│   │   ├── ProductList.vue    # Componente para exibir a lista de produtos
│   │   └── ProductForm.vue    # Componente para o formulário de adicionar/editar
│   ├── stores/
│   │   └── ProductStore.js    # Store do Pinia para gerenciar o estado dos produtos
│   ├── App.vue                # Componente principal que carrega os outros componentes
│   └── main.js                # Ponto de entrada da aplicação Vue
└── package.json               # Configurações do projeto e dependências

----------------------------------------------------------------------------------------------------

A estrutura de pasta:

/seu-projeto
├── /frontend      (aqui fica todo o código Vue.js)
│   ├── /src
│   │   ├── ...
│   │   └── main.js
│   └── package.json
└── /backend       (aqui fica o código do seu servidor Express)
    ├── index.js
    ├── db.js
    ├── package.json
    └── .gitignore

 */