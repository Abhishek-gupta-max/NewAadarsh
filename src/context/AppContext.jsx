import { createContext, useState, useCallback, useContext } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, visible: true });
    
    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 5000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;

