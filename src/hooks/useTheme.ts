import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar localStorage primeiro
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    
    // Se não houver configuração salva, usar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }

    // Salvar no localStorage
    localStorage.setItem('darkMode', darkMode.toString());

    // Forçar re-render dos estilos
    setTimeout(() => {
      document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    }, 0);

  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { darkMode, setDarkMode, toggleTheme };
};
