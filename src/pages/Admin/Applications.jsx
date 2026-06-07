import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import Loader from '../../components/common/Loader/Loader';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';

export const Applications = () => {
  const { data: apps, loading, error, request: fetchApps, setData: setApps } = useApi(userService.adminGetApplications);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    fetchApps(search);
  }, [fetchApps, search]);

  const {
    currentPage,
    totalPages,
    currentItems: paginatedApps,
    goToPage,
    nextPage,
    prevPage,
    totalItems
  } = usePagination(apps || [], 10);

  const handleRowClick = async (appId) => {
    try {
      const detail = await userService.adminGetApplicationDetail(appId);
      setSelectedApp(detail);
      setDetailModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load application details.');
    }
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedApp) return;
    setStatusLoading(true);
    try {
      const res = await userService.adminUpdateApplicationStatus(selectedApp.id, status);
      if (res.success) {
        setSelectedApp((prev) => ({ ...prev, status }));
        // Update local list state
        setApps((prev) => 
          prev.map((a) => (a.id === selectedApp.id ? { ...a, status } : a))
        );
      } else {
        alert(res.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDelete = async (appId) => {
    if (!window.confirm('Are you sure you want to permanently delete this application and resume?')) return;
    try {
      const res = await userService.adminDeleteApplication(appId);
      if (res.success) {
        setApps((prev) => prev.filter((a) => a.id !== appId));
        if (selectedApp && selectedApp.id === appId) {
          setDetailModalOpen(false);
          setSelectedApp(null);
        }
      } else {
        alert(res.error || 'Failed to delete application.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const getResumeUrl = (path) => {
    if (!path) return '#';
    // Base address of the PHP server
    return `http://localhost:8000/${path}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage job seeker submissions, check resumes, and update application status.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, email, phone, job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800"
          />
          <span className="absolute left-3.5 top-3 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        <div className="text-sm font-semibold text-slate-500">
          Total Applications: <span className="text-blue-900 font-bold">{totalItems}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold max-w-lg">
          Error: {error}
        </div>
      )}

      {/* List / Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            {paginatedApps.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span className="text-4xl block mb-2">📋</span>
                No applications found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Position</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Exp</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Date</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedApps.map((app) => (
                    <tr 
                      key={app.id} 
                      className="hover:bg-slate-50/40 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(app.id)}
                    >
                      <td className="px-8 py-4">
                        <p className="font-bold text-slate-800 text-sm">{app.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{app.email} | {app.phone}</p>
                      </td>
                      <td className="px-8 py-4 text-sm font-semibold text-slate-600">{app.job_position}</td>
                      <td className="px-8 py-4 text-sm text-slate-500 font-medium">{app.experience}</td>
                      <td className="px-8 py-4 text-sm text-slate-500 font-medium">
                        {new Date(app.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-8 py-4" onClick={(e) => e.stopPropagation()}>
                        <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                          app.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                          app.status === 'rejected' ? 'bg-rose-50 text-rose-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRowClick(app.id)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg text-xs transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                Previous
              </button>
              <span className="text-xs text-slate-500 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg text-xs transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Application Details"
        size="lg"
      >
        {selectedApp && (
          <div className="space-y-6">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Applicant Name</p>
                <p className="text-base font-bold text-slate-800 mt-0.5">{selectedApp.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Job Position</p>
                <p className="text-base font-bold text-slate-800 mt-0.5">{selectedApp.job_position}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Email Address</p>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">
                  <a href={`mailto:${selectedApp.email}`} className="hover:underline">{selectedApp.email}</a>
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Phone Number</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  <a href={`tel:${selectedApp.phone}`} className="hover:underline">{selectedApp.phone}</a>
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Experience</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.experience}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Submission Date</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {new Date(selectedApp.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Cover Message</p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedApp.message || 'No message provided.'}
              </p>
            </div>

            {/* Resume File */}
            <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-700 font-bold uppercase">Resume File</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate max-w-md">{selectedApp.resume_file || 'No file uploaded'}</p>
              </div>
              {selectedApp.resume_file && (
                <a
                  href={getResumeUrl(selectedApp.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-blue-950 font-bold rounded-lg text-xs shadow-sm transition-all"
                >
                  Download CV
                </a>
              )}
            </div>

            {/* Actions: Update Status & Delete */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-bold text-slate-500 font-heading">Set Status:</span>
                <div className="flex gap-1.5">
                  <Button
                    variant={selectedApp.status === 'pending' ? 'primary' : 'outline'}
                    onClick={() => handleUpdateStatus('pending')}
                    disabled={statusLoading}
                    className="!px-3 !py-1.5 !text-xs"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={selectedApp.status === 'approved' ? 'primary' : 'outline'}
                    onClick={() => handleUpdateStatus('approved')}
                    disabled={statusLoading}
                    className="!px-3 !py-1.5 !text-xs !bg-gradient-to-r !from-emerald-500 !to-green-600"
                  >
                    Approve
                  </Button>
                  <Button
                    variant={selectedApp.status === 'rejected' ? 'danger' : 'outline'}
                    onClick={() => handleUpdateStatus('rejected')}
                    disabled={statusLoading}
                    className="!px-3 !py-1.5 !text-xs"
                  >
                    Reject
                  </Button>
                </div>
              </div>
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedApp.id)}
                className="!px-4 !py-2 !text-xs w-full sm:w-auto"
              >
                Delete Application
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Applications;
