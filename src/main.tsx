import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.tsx'

// Inicializar tema corretamente
const initializeTheme = () => {
  // Limpar primeiro qualquer classe existente
  const root = document.documentElement;
  const body = document.body;
  
  root.classList.remove('dark');
  body.classList.remove('dark');
  
  // Verificar localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    root.classList.add('dark');
    body.classList.add('dark');
  }
};

// Aplicar tema antes de renderizar
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
