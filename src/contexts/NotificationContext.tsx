import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import Notification from '../views/components/Notification';

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    
    setNotifications(prev => [...prev, newNotification]);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
