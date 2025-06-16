import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-600 dark:text-green-300',
    error: 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-600 dark:text-red-300',
    info: 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-300',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className={`fixed top-4 right-4 z-50 border-l-4 p-4 rounded-lg shadow-lg max-w-sm ${typeStyles[type]} transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
