import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated from storage on mount
    const checkAuth = () => {
      const activeUser = authService.getCurrentUser();
      const authenticated = authService.isAuthenticated();
      
      if (authenticated && activeUser) {
        setUser(activeUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    const result = await authService.login(username, password);
    if (result.success) {
      setUser(result.username);
      setIsAuthenticated(true);
    }
    setLoading(false);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
