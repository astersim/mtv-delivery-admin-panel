import type { Pedido } from '../models/Pedido';

// Dataset unificado de pedidos para toda a aplicação
export const dadosUnificados: Pedido[] = [
  // Pedidos em andamento (Kanban)
  {
    id: 'PED12345',
    cliente: 'João da Silva',
    itens: [
      { nome: 'X-Burguer', quantidade: 2 },
      { nome: 'Refrigerante', quantidade: 1 },
    ],
    total: 42.90,
    status: 'Recebido',
    observacao: 'Sem cebola',
    horario: '20:35',
    endereco: 'Rua das Flores, 123, Centro',
    tipo: 'Entrega',
  },
  {
    id: 'PED12346',
    cliente: 'Maria Souza',
    itens: [
      { nome: 'Pizza Margherita', quantidade: 1 },
      { nome: 'Suco de Laranja', quantidade: 2 },
    ],
    total: 59.50,
    status: 'Em preparo',
    horario: '20:40',
    endereco: 'Av. Brasil, 456, Jardim América',
    tipo: 'Retirada',
  },
  {
    id: 'PED12347',
    cliente: 'Carlos Lima',
    itens: [
      { nome: 'Hambúrguer Artesanal', quantidade: 1 },
      { nome: 'Batata Frita', quantidade: 1 },
      { nome: 'Coca-Cola', quantidade: 1 },
    ],
    total: 38.75,
    status: 'Pronto para entrega',
    horario: '20:45',
    endereco: 'Rua dos Jasmins, 789, Vila Nova',
    tipo: 'Entrega',
  },
  
  // Pedidos finalizados (Histórico)
  {
    id: 'PED12300',
    cliente: 'Ana Costa',
    itens: [
      { nome: 'Pizza Calabresa', quantidade: 1 },
      { nome: 'Refrigerante 2L', quantidade: 1 },
    ],
    total: 67.80,
    status: 'Finalizado',
    horario: '19:30',
    endereco: 'Rua das Palmeiras, 321, Centro',
    tipo: 'Entrega',
  },
  {
    id: 'PED12301',
    cliente: 'Roberto Santos',
    itens: [
      { nome: 'Sanduíche Natural', quantidade: 2 },
      { nome: 'Suco Detox', quantidade: 1 },
    ],
    total: 28.90,
    status: 'Finalizado',
    horario: '18:45',
    endereco: 'Av. Paulista, 1000, Bela Vista',
    tipo: 'Retirada',
  },
  {
    id: 'PED12302',
    cliente: 'Fernanda Oliveira',
    itens: [
      { nome: 'Açaí 500ml', quantidade: 1 },
      { nome: 'Granola', quantidade: 1 },
    ],
    total: 18.50,
    status: 'Finalizado',
    horario: '17:20',
    endereco: 'Rua Augusta, 555, Consolação',
    tipo: 'Retirada',
  },
  {
    id: 'PED12303',
    cliente: 'Paulo Mendes',
    itens: [
      { nome: 'Combo Família', quantidade: 1 },
      { nome: 'Refrigerante 2L', quantidade: 2 },
    ],
    total: 89.90,
    status: 'Finalizado',
    horario: '16:55',
    endereco: 'Rua das Acácias, 222, Jardim Europa',
    tipo: 'Entrega',
  },
  
  // Pedidos cancelados
  {
    id: 'PED12290',
    cliente: 'Luciana Ferreira',
    itens: [
      { nome: 'Pizza Portuguesa', quantidade: 1 },
    ],
    total: 45.00,
    status: 'Cancelado',
    horario: '19:15',
    endereco: 'Rua dos Lírios, 111, Vila Madalena',
    tipo: 'Entrega',
  },
  {
    id: 'PED12291',
    cliente: 'Marcos Silva',
    itens: [
      { nome: 'Hambúrguer Duplo', quantidade: 1 },
      { nome: 'Milkshake', quantidade: 1 },
    ],
    total: 52.80,
    status: 'Cancelado',
    horario: '18:30',
    endereco: 'Av. Faria Lima, 888, Itaim Bibi',
    tipo: 'Retirada',
  },
  {
    id: 'PED12292',
    cliente: 'Beatriz Rocha',
    itens: [
      { nome: 'Salada Caesar', quantidade: 1 },
      { nome: 'Água com Gás', quantidade: 1 },
    ],
    total: 32.50,
    status: 'Cancelado',
    horario: '17:45',
    endereco: 'Rua Oscar Freire, 444, Jardins',
    tipo: 'Entrega',
  },
];

// Separa os dados por categoria
export const pedidosAtivos = dadosUnificados.filter(p => 
  ['Recebido', 'Em preparo', 'Pronto para entrega'].includes(p.status)
);

export const historicoCompleto = dadosUnificados.filter(p => 
  ['Finalizado', 'Cancelado'].includes(p.status)
);

// Para manter compatibilidade com os imports existentes
export const pedidosMock = pedidosAtivos;
export const historicoMock = historicoCompleto;
