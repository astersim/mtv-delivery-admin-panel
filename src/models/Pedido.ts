export type PedidoStatus =
  | 'Recebido'
  | 'Em preparo'
  | 'Pronto para entrega'
  | 'Finalizado'
  | 'Cancelado';

export type PedidoTipo = 'Entrega' | 'Retirada';

export interface PedidoItem {
  nome: string;
  quantidade: number;
}

export interface Pedido {
  id: string;
  cliente: string;
  itens: PedidoItem[];
  total: number;
  status: PedidoStatus;
  observacao?: string;
  horario: string;
  endereco: string;
  tipo: PedidoTipo;
}
