import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
