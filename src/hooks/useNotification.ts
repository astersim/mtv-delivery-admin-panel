// Hook placeholder - pode ser usado futuramente para notificações
export const useNotification = () => {
  return {
    showNotification: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  };
};
