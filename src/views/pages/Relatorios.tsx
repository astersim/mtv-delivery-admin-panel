import React from 'react';
import { useRelatorioDados } from '../../hooks/usePedidoData';

const Relatorios: React.FC = () => {
  const relatorioDados = useRelatorioDados();

  const relatoriosData = [
    { 
      titulo: 'Total de Pedidos', 
      valor: relatorioDados.totalPedidos, 
      cor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      titulo: 'Pedidos Finalizados', 
      valor: relatorioDados.pedidosFinalizados, 
      cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    { 
      titulo: 'Pedidos Cancelados', 
      valor: relatorioDados.pedidosCancelados, 
      cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    { 
      titulo: 'Pedidos em Andamento', 
      valor: relatorioDados.pedidosEmAndamento, 
      cor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },    { 
      titulo: 'Total em Vendas', 
      valor: relatorioDados.receitaTotal.toFixed(2), 
      cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 flex items-center gap-3 justify-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Relatórios
        </h1>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {relatoriosData.map((rel, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center ${rel.cor} border border-gray-200/50 dark:border-gray-600/50`} 
              style={{minHeight: 160}}
            >
              <div className="mb-4 opacity-80">
                {rel.icon}
              </div>
              <div className="text-lg font-semibold mb-3 text-center">{rel.titulo}</div>
              <div className="text-3xl font-bold text-center">{rel.valor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
