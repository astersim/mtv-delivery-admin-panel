import React from 'react';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-geraldo bg-white dark:bg-gray-800 border-b border-blue-100 dark:border-gray-700">
      <div className="navbar-geraldo-content">        <div className="navbar-geraldo-logo">          <img 
            src={logo} 
            alt="MTV Delivery Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="navbar-geraldo-title text-blue-700 dark:text-blue-400">
              Painel de Administração
            </div>
            <div className="navbar-geraldo-sub text-gray-500 dark:text-gray-400">
              MTV Delivery
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
