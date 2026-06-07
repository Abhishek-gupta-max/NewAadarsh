import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/common/Loader/Loader';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/dashboard.php');
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  const stats = data?.stats || {
    total_apps: 0,
    pending_apps: 0,
    approved_apps: 0,
    rejected_apps: 0
  };

  const latestApps = data?.latest_applications || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Welcome back, {user || 'admin'}!</h1>
          <p className="text-slate-500 text-sm mt-1">Here is a quick overview of recent recruiting activities.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/applications" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all">
            View Applications
          </Link>
          <Link to="/admin/requirements" className="px-5 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-blue-950 font-bold rounded-xl text-sm shadow-sm transition-all">
            Manage Jobs
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold max-w-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Applications */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-15 text-white group-hover:scale-110 transition-transform duration-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6l-4-4H9z" />
            </svg>
          </div>
          <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Total Applications</p>
          <h3 className="text-4xl font-extrabold font-heading mt-3">{stats.total_apps}</h3>
          <p className="text-blue-200 text-[11px] mt-2 font-medium">All submitted resumes</p>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-15 text-white group-hover:scale-110 transition-transform duration-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.8 2.8a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-yellow-100 text-xs font-bold uppercase tracking-wider">Pending Review</p>
          <h3 className="text-4xl font-extrabold font-heading mt-3">{stats.pending_apps}</h3>
          <p className="text-yellow-200 text-[11px] mt-2 font-medium">Resumes awaiting evaluation</p>
        </div>

        {/* Approved */}
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-15 text-white group-hover:scale-110 transition-transform duration-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Approved Placements</p>
          <h3 className="text-4xl font-extrabold font-heading mt-3">{stats.approved_apps}</h3>
          <p className="text-emerald-200 text-[11px] mt-2 font-medium">Candidates approved for job</p>
        </div>

        {/* Rejected */}
        <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-15 text-white group-hover:scale-110 transition-transform duration-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-rose-100 text-xs font-bold uppercase tracking-wider">Rejected Applications</p>
          <h3 className="text-4xl font-extrabold font-heading mt-3">{stats.rejected_apps}</h3>
          <p className="text-rose-200 text-[11px] mt-2 font-medium">Unsuitable applications</p>
        </div>
      </div>

      {/* Latest Submissions Table */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 font-heading">Latest Applications</h2>
          <Link to="/admin/applications" className="text-blue-600 hover:text-blue-700 text-sm font-bold">
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          {latestApps.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="text-4xl block mb-2">📋</span>
              No applications submitted yet.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Position</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date Applied</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latestApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <p className="font-bold text-slate-800 text-sm">{app.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.email} | {app.phone}</p>
                    </td>
                    <td className="px-8 py-4 text-sm font-semibold text-slate-600">{app.job_position}</td>
                    <td className="px-8 py-4 text-sm text-slate-500 font-medium">
                      {new Date(app.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                        app.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                        app.status === 'rejected' ? 'bg-rose-50 text-rose-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <Link to="/admin/applications" className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
