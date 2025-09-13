/*
  Este é um mock de backend para simular a comunicação com uma API real.
  Ele armazena os dados em memória e simula as operações CRUD.
  
  Para usar um backend real, você deve substituir as funções deste arquivo
  pelas chamadas 'fetch' ou 'axios' para a sua API.
*/
let products = [
  { id: 1, name: 'Caneta Azul', sku: 'AZ001', quantity: 150, price: 2.50, createdAt: new Date('2024-01-10T10:00:00Z'), lastRemovedAt: null },
  { id: 2, name: 'Caderno Grande', sku: 'CAD002', quantity: 50, price: 15.00, createdAt: new Date('2024-02-15T12:30:00Z'), lastRemovedAt: null },
  { id: 3, name: 'Lápis de Cor (12 cores)', sku: 'LAPIS-CORES', quantity: 70, price: 12.00, createdAt: new Date('2024-03-20T14:00:00Z'), lastRemovedAt: null },
  { id: 4, name: 'Régua de 30cm', sku: 'REGUA-30CM', quantity: 25, price: 3.50, createdAt: new Date('2024-04-05T09:15:00Z'), lastRemovedAt: new Date('2024-05-10T11:00:00Z') },
  { id: 5, name: 'Corretivo Líquido', sku: 'CORR-LIQ', quantity: 9, price: 5.80, createdAt: new Date('2024-06-01T16:45:00Z'), lastRemovedAt: null },
];
let nextId = 6;

export const mockFetchProducts = async () => {
  console.log("Mock: Buscando todos os produtos...");
  await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência da rede
  return products;
};

export const mockAddProduct = async (product) => {
  console.log("Mock: Adicionando novo produto...");
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct = {
    ...product,
    id: nextId++,
    createdAt: new Date().toISOString(),
    lastRemovedAt: null,
  };
  products.push(newProduct);
  return newProduct;
};

export const mockUpdateProduct = async (updatedProduct) => {
  console.log(`Mock: Atualizando produto com ID ${updatedProduct.id}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...updatedProduct, lastUpdated: new Date().toISOString() };
    return products[index];
  }
  return null;
};

export const mockRemoveQuantity = async (id, quantityToRemove) => {
  console.log(`Mock: Removendo ${quantityToRemove} unidades do produto com ID ${id}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = products.find(p => p.id === id);
  if (product) {
    product.quantity -= quantityToRemove;
    product.lastRemovedAt = new Date().toISOString();
    return product;
  }
  return null;
};

export const mockDeleteProduct = async (id) => {
  console.log(`Mock: Excluindo produto com ID ${id}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  products = products.filter(p => p.id !== id);
  return true;
};
