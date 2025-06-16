import { useMemo } from 'react';
import { usePedidoStore } from '../store/pedidoStore';

export const useRelatorioDados = () => {
  const pedidos = usePedidoStore((state) => state.pedidos);
  const historico = usePedidoStore((state) => state.historico);

  return useMemo(() => {
    const todosPedidos = [...pedidos, ...historico];
    
    return {
      totalPedidos: todosPedidos.length,
      pedidosFinalizados: todosPedidos.filter(p => p.status === 'Finalizado').length,
      pedidosCancelados: todosPedidos.filter(p => p.status === 'Cancelado').length,
      pedidosEmAndamento: todosPedidos.filter(p => 
        ['Recebido', 'Em preparo', 'Pronto para entrega'].includes(p.status)
      ).length,
      receitaTotal: todosPedidos
        .filter(p => p.status === 'Finalizado')
        .reduce((total, p) => total + p.total, 0),
    };
  }, [pedidos, historico]);
};

export const useTodosPedidos = () => {
  const pedidos = usePedidoStore((state) => state.pedidos);
  const historico = usePedidoStore((state) => state.historico);

  return useMemo(() => {
    return [...pedidos, ...historico];
  }, [pedidos, historico]);
};
