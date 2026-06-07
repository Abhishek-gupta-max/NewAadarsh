import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar/Sidebar';
import Loader from '../components/common/Loader/Loader';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <Loader />
      </div>
    );
  }

  // Redirect to admin login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar Navigation */}
      <Sidebar />

      {/* Main Admin Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Header Status Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase font-mono">System Live</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">Admin Control Panel</p>
              <p className="text-[11px] text-slate-400 font-medium">Logged in as {user || 'admin'}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm border border-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Admin Subview Content */}
        <main className="flex-grow p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
