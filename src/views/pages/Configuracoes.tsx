import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Configuracoes: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-4 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">Configurações</h1>
        <div>
          <label className="block text-blue-700 dark:text-blue-400 font-semibold mb-1">Nome do Estabelecimento</label>
          <input 
            className="border border-blue-200 dark:border-gray-600 rounded px-3 py-1 w-full shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
            value="Mtv Delivery" 
           
          />
        </div>
        <div>
          <label className="block text-blue-700 dark:text-blue-400 font-semibold mb-1">Email de contato</label>
          <input 
            className="border border-blue-200 dark:border-gray-600 rounded px-3 py-1 w-full shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
            value="contato@mtvdelivery.com" 
            type="email"
          />
        </div>
        <div>
          <label className="block text-blue-700 dark:text-blue-400 font-semibold mb-1">Tema</label>          <button
            className="w-full px-4 py-2 rounded-lg shadow bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Alternar modo escuro"
          >
            {darkMode ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button></div>
        <button className="mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm w-full" disabled>
          Salvar alterações
        </button>
      </div>
    </div>
  );
};

export default Configuracoes;
