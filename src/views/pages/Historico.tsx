import React, { useState } from 'react';
import { useTodosPedidos, useRelatorioDados } from '../../hooks/usePedidoData';
import type { PedidoStatus } from '../../models/Pedido';

const statusList: PedidoStatus[] = [
  'Recebido',
  'Em preparo',
  'Pronto para entrega',
  'Finalizado',
  'Cancelado',
];

const statusColors: Record<string, string> = {
  'Recebido': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-700',
  'Em preparo': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700',
  'Pronto para entrega': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-700',
  'Finalizado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600',
  'Cancelado': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border border-red-200 dark:border-red-700',
};

const Historico: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  // Usar os hooks seguros em vez do store diretamente
  const todosPedidos = useTodosPedidos();
  const relatorioDados = useRelatorioDados();

  const pedidosFiltrados = todosPedidos.filter((p) => {
    const matchBusca =
      p.id.toLowerCase().includes(busca.toLowerCase()) ||
      p.cliente.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = status ? p.status === status : true;
    const matchData = data ? p.horario.startsWith(data) : true;
    return matchBusca && matchStatus && matchData;
  });return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 flex items-center gap-3 justify-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V7a2 2 0 00-2-2H9z" />
            </svg>
          </span>          Histórico de Pedidos
        </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total de Pedidos</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{relatorioDados.totalPedidos}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-green-600 dark:text-green-400 text-sm font-medium">Finalizados</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {relatorioDados.pedidosFinalizados}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-red-600 dark:text-red-400 text-sm font-medium">Cancelados</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
              {relatorioDados.pedidosCancelados}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Receita Total</div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              R$ {relatorioDados.receitaTotal.toFixed(2)}
            </div>
          </div>
        </div><div className="flex flex-wrap gap-4 mb-8">
          <div className="search-input-wrapper">
            <input
              className="search-input-with-icon border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Buscar por cliente ou ID"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">Todos status</option>
            {statusList.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div><div className="overflow-x-auto rounded-2xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase text-xs tracking-wider">
                <th className="py-4 px-6 text-left font-bold">ID</th>
                <th className="py-4 px-6 text-left font-bold">Cliente</th>
                <th className="py-4 px-6 text-left font-bold">Status</th>
                <th className="py-4 px-6 text-left font-bold">Horário</th>
                <th className="py-4 px-6 text-left font-bold">Total</th>
              </tr>
            </thead>
            <tbody>              {pedidosFiltrados.map(pedido => (
                <tr key={pedido.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition group historico-table-row">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{pedido.id}</td>
                  <td className="py-4 px-6 text-gray-900 dark:text-gray-100">{pedido.cliente}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold historico-status-badge ${statusColors[pedido.status]}`}>
                      {pedido.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{pedido.horario}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">R$ {pedido.total.toFixed(2)}</td>
                </tr>
              ))}
              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400 text-lg">
                      Nenhum pedido encontrado.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Historico;
