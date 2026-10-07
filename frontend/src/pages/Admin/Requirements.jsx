import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import Loader from '../../components/common/Loader/Loader';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';

export const Requirements = () => {
  const { data: jobs, loading, error, request: fetchJobs, setData: setJobs } = useApi(jobService.adminGetJobs);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    position_title: '',
    description: '',
    requirements: '',
    experience_needed: '',
    salary_range: '',
    location: '',
    status: 'active'
  });

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs based on search query
  const filteredJobs = (jobs || []).filter(job => 
    (job.position_title || '').toLowerCase().includes(search.toLowerCase()) ||
    (job.location || '').toLowerCase().includes(search.toLowerCase()) ||
    (job.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    currentItems: paginatedJobs,
    goToPage,
    nextPage,
    prevPage,
    totalItems
  } = usePagination(filteredJobs, 8);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setFormData({
      position_title: '',
      description: '',
      requirements: '',
      experience_needed: '',
      salary_range: '',
      location: '',
      status: 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setIsEditMode(true);
    setSelectedJob(job);
    setFormData({
      id: job.id,
      position_title: job.position_title || '',
      description: job.description || '',
      requirements: job.requirements || '',
      experience_needed: job.experience_needed || '',
      salary_range: job.salary_range || '',
      location: job.location || '',
      status: job.status || 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.position_title.trim()) {
      setFormError('Position Title is required.');
      return;
    }

    setSubmitLoading(true);
    setFormError('');

    try {
      if (isEditMode) {
        const response = await jobService.adminUpdateJob(formData);
        if (response.success) {
          setJobs(prev => prev.map(job => job.id === formData.id ? { ...job, ...formData } : job));
          setModalOpen(false);
        } else {
          setFormError(response.error || 'Failed to update position.');
        }
      } else {
        const response = await jobService.adminAddJob(formData);
        if (response.success) {
          // Re-fetch is safer to ensure correct DB records & order
          fetchJobs();
          setModalOpen(false);
        } else {
          setFormError(response.error || 'Failed to add position.');
        }
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.error || err.message || 'Something went wrong.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job requirement listing?')) return;
    try {
      const response = await jobService.adminDeleteJob(jobId);
      if (response.success) {
        setJobs(prev => prev.filter(job => job.id !== jobId));
      } else {
        alert(response.error || 'Failed to delete position.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Job Requirements</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage job openings, positions, and qualification requirements.</p>
        </div>
        <Button
          variant="primary"
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5 text-[#0047ba]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-[#0047ba]">Add New Position</span>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search positions, locations..."
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
          Total Positions: <span className="text-blue-900 font-bold">{totalItems}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold max-w-lg">
          Error: {error}
        </div>
      )}

      {/* Job Grid / List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm text-center py-16 text-slate-400">
              <span className="text-4xl block mb-2">💼</span>
              No job requirements found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-slate-100 p-6 flex flex-col justify-between transition duration-200 group"
                >
                  <div>
                    {/* Header: Title and Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#0047ba] transition-colors line-clamp-1">{job.position_title}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">Job ID: #{job.id}</span>
                          <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                            job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {job.status || 'active'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 mb-4 border border-slate-100/50">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📍</span>
                        <span className="truncate">{job.location || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">👔</span>
                        <span className="truncate">{job.experience_needed || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">💰</span>
                        <span className="truncate">{job.salary_range || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📅</span>
                        <span>
                          {job.created_at ? new Date(job.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Description excerpt */}
                    <div className="space-y-3 mb-6">
                      {job.description && (
                        <div>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Description</p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{job.description}</p>
                        </div>
                      )}
                      {job.requirements && (
                        <div>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Key Requirements</p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{job.requirements}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 border-t border-slate-100 pt-4 mt-auto">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenEditModal(job)}
                      className="flex-1 !py-2 !text-xs flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(job.id)}
                      className="flex-1 !py-2 !text-xs flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-8 py-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
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

      {/* Add/Edit Position Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditMode ? 'Edit Position' : 'Add New Position'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Position Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position_title"
              required
              value={formData.position_title}
              onChange={handleInputChange}
              placeholder="e.g. Software Engineer"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience Needed</label>
              <input
                type="text"
                name="experience_needed"
                value={formData.experience_needed}
                onChange={handleInputChange}
                placeholder="e.g. 5+ Years"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Salary Range</label>
              <input
                type="text"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleInputChange}
                placeholder="e.g. $50,000 - $70,000"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Dubai, UAE"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800 bg-white font-medium"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Job description..."
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800 leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Key Requirements / Skills</label>
            <textarea
              name="requirements"
              rows="3"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Skills, qualifications, requirements..."
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm text-slate-800 leading-relaxed"
            ></textarea>
          </div>

          <div className="flex gap-3 border-t border-slate-100 pt-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={submitLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={submitLoading}
              disabled={submitLoading}
              className="flex-1"
            >
              {isEditMode ? 'Update Position' : 'Create Position'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Requirements;
