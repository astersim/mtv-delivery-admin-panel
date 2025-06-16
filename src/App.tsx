import Navbar from './views/components/Navbar';
import Sidebar from './views/components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import { useState, useEffect } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('auth') === 'true');

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
    
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Verificar mudanças no localStorage para auth
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('auth') === 'true';
      setIsAuth(authStatus);
    };

    // Verificar inicialmente
    checkAuth();

    // Escutar mudanças no localStorage
    window.addEventListener('storage', checkAuth);
    
    // Verificar periodicamente (para mudanças na mesma aba)
    const interval = setInterval(checkAuth, 100);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {isAuth ? (
          <>
            <Navbar />
            <div className="flex">
              {!sidebarHidden && <Sidebar />}
              {sidebarHidden && (
                <button
                  className="sidebar-show-btn bg-blue-600 text-white p-2 rounded-r-lg shadow-lg hover:bg-blue-700"
                  onClick={() => setSidebarHidden(false)}
                  aria-label="Mostrar sidebar"
                  style={{ position: 'fixed', top: 80, left: 0, zIndex: 200 }}
                >
                  <span style={{ fontSize: '1.2rem' }}>☰</span>
                </button>
              )}
              <main className="flex-1 kanban-scrollbar main-with-sidebar">
                <AppRoutes />
              </main>
            </div>
          </>
        ) : (
          <AppRoutes />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
