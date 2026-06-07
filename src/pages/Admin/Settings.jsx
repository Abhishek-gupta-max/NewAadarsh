import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import useApi from '../../hooks/useApi';
import Loader from '../../components/common/Loader/Loader';
import { useAuth } from '../../hooks/useAuth';

export const Settings = () => {
  const { user } = useAuth();
  const { data, loading, error, request: fetchSettings } = useApi(userService.adminGetSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  const systemInfo = data?.system_info || {
    php_version: 'N/A',
    mysql_server: 'N/A',
    server_time: 'N/A'
  };

  const statistics = data?.statistics || {
    total_applications: 0,
    job_positions: 0,
    pending: 0,
    approved: 0
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">System diagnostics, database status, and quick administrative links.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold max-w-lg font-sans">
          Error: {error}
        </div>
      )}

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-heading">System Diagnostics</h3>
          </div>
          <div className="space-y-3 font-semibold text-slate-600 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400">PHP Version</span>
              <span>{systemInfo.php_version}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400">MySQL Server</span>
              <span>{systemInfo.mysql_server}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Server Time</span>
              <span className="font-mono text-xs">{systemInfo.server_time}</span>
            </div>
          </div>
        </div>

        {/* Administrator Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-[#e11d48]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-heading">Admin Session</h3>
          </div>
          <div className="space-y-3 font-semibold text-slate-600 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400">Username</span>
              <span className="text-[#0047ba]">{user?.username || 'admin'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400">Logged In</span>
              <span className="text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Yes
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Session Status</span>
              <span className="text-emerald-600 font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Statistics */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 font-heading mb-6">Database Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <p className="text-3xl font-extrabold text-blue-600 font-heading">{statistics.total_applications}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2 font-heading">Total Apps</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <p className="text-3xl font-extrabold text-emerald-600 font-heading">{statistics.job_positions}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2 font-heading">Job Positions</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <p className="text-3xl font-extrabold text-amber-500 font-heading">{statistics.pending}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2 font-heading">Pending Review</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <p className="text-3xl font-extrabold text-green-600 font-heading">{statistics.approved}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2 font-heading">Approved Placements</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 font-heading mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/applications"
            className="flex flex-col items-center justify-center p-6 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-2xl hover:shadow-sm transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-200 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-bold text-slate-800 text-sm font-sans">View Applications</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold font-sans">Manage job applications & status updates</p>
          </Link>
          <Link
            to="/admin/requirements"
            className="flex flex-col items-center justify-center p-6 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 rounded-2xl hover:shadow-sm transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform duration-200 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-bold text-slate-800 text-sm font-sans">Manage Positions</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold font-sans">Add, update, or remove job requirement listings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
