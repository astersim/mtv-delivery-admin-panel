import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { useRelatorioDados } from '../../hooks/usePedidoData';

const Board: React.FC = () => {
  const relatorioDados = useRelatorioDados();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">Pedidos em Andamento</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Arraste os pedidos entre as etapas para atualizar o status.</p>
          
          {/* Contador de pedidos em tempo real */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg">
              <span className="font-semibold">Em Andamento: {relatorioDados.pedidosEmAndamento}</span>
            </div>
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg">
              <span className="font-semibold">Finalizados: {relatorioDados.pedidosFinalizados}</span>
            </div>
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg">
              <span className="font-semibold">Cancelados: {relatorioDados.pedidosCancelados}</span>
            </div>
          </div>
        </div>
        
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Board;
