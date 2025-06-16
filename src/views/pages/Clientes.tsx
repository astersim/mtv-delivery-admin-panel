import React, { useState } from 'react';

const clientesMock = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-1111', endereco: 'Rua das Flores, 123 - São Paulo' },
  { id: 2, nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '(21) 98888-2222', endereco: 'Av. Brasil, 456 - Rio de Janeiro' },
  { id: 3, nome: 'Carlos Souza', email: 'carlos@email.com', telefone: '(31) 97777-3333', endereco: 'Rua Minas, 789 - Belo Horizonte' },
  { id: 4, nome: 'Ana Paula', email: 'ana@email.com', telefone: '(41) 96666-4444', endereco: 'Rua Paraná, 321 - Curitiba' },
];

const Clientes: React.FC = () => {
  const [busca, setBusca] = useState('');
  const clientesFiltrados = clientesMock.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 flex items-center gap-3 justify-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          Clientes
        </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 cliente-stats-grid">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 cliente-stats-card">
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total de Clientes</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 cliente-stat-number">{clientesMock.length}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 cliente-stats-card">
            <div className="text-green-600 dark:text-green-400 text-sm font-medium">Clientes Ativos</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300 cliente-stat-number">{clientesMock.length}</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 cliente-stats-card">
            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Cidades</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 cliente-stat-number">
              {new Set(clientesMock.map(c => c.endereco.split(' - ')[1])).size}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800 cliente-stats-card">
            <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">Contatos</div>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300 cliente-stat-number">{clientesMock.length}</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600 dark:text-gray-400">
            Exibindo: <span className="font-bold text-blue-700 dark:text-blue-400">{clientesFiltrados.length}</span> de <span className="font-bold text-blue-700 dark:text-blue-400">{clientesMock.length}</span> clientes
          </div>          <div className="cliente-search-wrapper relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              className="cliente-search-input border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 w-full"
              placeholder="Buscar cliente..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase text-xs tracking-wider">
                <th className="py-4 px-6 text-left font-bold">Cliente</th>
                <th className="py-4 px-6 text-left font-bold">Email</th>
                <th className="py-4 px-6 text-left font-bold">Telefone</th>
                <th className="py-4 px-6 text-left font-bold">Endereço</th>
                <th className="py-4 px-6 text-center font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map(cliente => (
                <tr key={cliente.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition group">                  <td className="py-4 px-6 font-medium">
                    <div className="flex items-center gap-3">
                      <span className="flex w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 items-center justify-center font-bold text-lg cliente-avatar">
                        {cliente.nome[0].toUpperCase()}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100">{cliente.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{cliente.email}</td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{cliente.telefone}</td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{cliente.endereco}</td>                  <td className="py-4 px-6 text-center">                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 cliente-action-buttons">
                      <button className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-green-300 dark:hover:bg-green-700 transition cliente-action-button">
                        Contatar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {clientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400 text-lg">
                      Nenhum cliente encontrado.
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

export default Clientes;
