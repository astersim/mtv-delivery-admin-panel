import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Pedido, PedidoStatus } from '../models/Pedido';
import { pedidosAtivos, historicoCompleto } from '../models/dadosUnificados';

interface PedidoStore {
  pedidos: Pedido[];
  historico: Pedido[];
  moverPedido: (id: string, novoStatus: PedidoStatus) => void;
  getPedidoById: (id: string) => Pedido | undefined;
  getAllPedidos: () => Pedido[];
  getPedidosByStatus: (status: PedidoStatus) => Pedido[];
  resetDados: () => void;
  adicionarPedido: (pedido: Pedido) => void;
  forceUpdate: () => void;
}

export const usePedidoStore = create<PedidoStore>()(
  persist(    (set, get) => ({
      pedidos: pedidosAtivos,
      historico: historicoCompleto,
      
      moverPedido: (id: string, novoStatus: PedidoStatus) =>
        set((state) => {
          const pedidoIndex = state.pedidos.findIndex(p => p.id === id);
          if (pedidoIndex === -1) return state;

          const pedidoAtualizado = { ...state.pedidos[pedidoIndex], status: novoStatus };
          const novosPedidos = [...state.pedidos];
          novosPedidos[pedidoIndex] = pedidoAtualizado;

          // Se o pedido foi finalizado ou cancelado, move para o histórico
          let novoHistorico = [...state.historico];
          if (novoStatus === 'Finalizado' || novoStatus === 'Cancelado') {
            // Remove do histórico se já existir
            novoHistorico = novoHistorico.filter(p => p.id !== id);
            // Adiciona a versão atualizada
            novoHistorico.unshift(pedidoAtualizado);
          } else {
            // Atualiza no histórico se existir
            const historicoIndex = novoHistorico.findIndex(p => p.id === id);
            if (historicoIndex !== -1) {
              novoHistorico[historicoIndex] = pedidoAtualizado;
            }
          }

          return {
            pedidos: novosPedidos,
            historico: novoHistorico,
          };
        }),

      getPedidoById: (id: string) => {
        const state = get();
        return state.pedidos.find((p) => p.id === id) || state.historico.find((p) => p.id === id);
      },

      getAllPedidos: () => {
        const state = get();
        return [...state.pedidos, ...state.historico];
      },      getPedidosByStatus: (status: PedidoStatus) => {
        const state = get();
        const todosPedidos = [...state.pedidos, ...state.historico];
        return todosPedidos.filter(p => p.status === status);
      },      resetDados: () =>
        set(() => ({
          pedidos: pedidosAtivos,
          historico: historicoCompleto,
        })),

      adicionarPedido: (novoPedido: Pedido) =>
        set((state) => ({
          pedidos: [...state.pedidos, novoPedido],
        })),

      forceUpdate: () =>
        set((state) => ({ ...state })),
    }),
    {
      name: 'pedido-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
