import React from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-lg text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <span className="text-6xl block mb-6">🔒</span>
          <h2 className="text-3xl font-bold text-blue-900 mb-4 font-heading">Register Account</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Administrator registration is closed. Contact the system administrator to request credentials or create a new user profile.
          </p>
          <div className="space-y-4">
            <Link 
              to="/admin-login" 
              className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md transition-all block text-sm"
            >
              Go to Admin Login
            </Link>
            <Link 
              to="/" 
              className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all block text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
