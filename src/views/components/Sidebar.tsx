import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const menu = [
  { label: 'Pedidos', icon: '📋', to: '/board' },
  { label: 'Histórico', icon: '🕓', to: '/historico' },
  { label: 'Clientes', icon: '👤', to: '/clientes' },
  { label: 'Produtos', icon: '🍔', to: '/produtos' },
  { label: 'Relatórios', icon: '📊', to: '/relatorios' },
  { label: 'Configurações', icon: '⚙️', to: '/configuracoes' },
];

const Sidebar: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();return (
    <aside className="sidebar-kanban">
      <div className="sidebar-title">MTV Delivery</div>
      <nav className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            end={item.to === '/board'}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>        ))}
      </nav>
      <div className="mt-auto mb-2 px-3">
        <div className="flex flex-col gap-1.5">
          <button
            className="w-full px-3 py-1.5 rounded-md shadow bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-100 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition text-xs"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Alternar modo escuro"
          >
            {darkMode ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>          <button
            className="w-full px-3 py-1.5 rounded-md shadow bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium border border-red-100 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-900/50 transition text-xs"            onClick={() => {
              const confirmarSaida = window.confirm('Tem certeza que deseja sair do sistema?');
              if (confirmarSaida) {
                localStorage.removeItem('auth');
                navigate('/', { replace: true });
              }
            }}
            aria-label="Sair do sistema"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
