import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import useApi from '../../hooks/useApi';
import Loader from '../../components/common/Loader/Loader';

export const Jobs = () => {
  const { data: jobs, loading, error, request: fetchJobs } = useApi(jobService.getJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  // Extract unique categories and locations for filters
  const categories = jobs ? [...new Set(jobs.map((j) => j.category).filter(Boolean))] : [];
  const locations = jobs ? [...new Set(jobs.map((j) => j.job_location).filter(Boolean))] : [];

  // Filter jobs based on search term and filters
  const filteredJobs = jobs
    ? jobs.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = categoryFilter ? job.category === categoryFilter : true;
        const matchesLocation = locationFilter ? job.job_location === locationFilter : true;
        return matchesSearch && matchesCategory && matchesLocation;
      })
    : [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-brandRed/10 rounded-full -top-[100px] -right-[100px] blur-2xl" />
        <div className="absolute w-[200px] h-[200px] bg-brandBlue/10 rounded-full -bottom-[50px] -left-[50px] blur-2xl" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-heading">
              <span className="text-white bg-clip-text">Active Job Positions</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Explore our current global career opportunities and apply today
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Job List Section */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="container mx-auto max-w-6xl">
          {/* Filters card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100/80 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="Search job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/10 focus:outline-none text-sm transition-all duration-200"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>

            <div className="w-full md:w-1/4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/10 focus:outline-none text-sm bg-white transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/10 focus:outline-none text-sm bg-white transition-all duration-200"
              >
                <option value="">All Locations</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-200 text-center mb-10 max-w-lg mx-auto">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Job cards grid */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-lg mx-auto">
              <span className="text-6xl block mb-4">💼</span>
              <h3 className="text-2xl font-bold text-slate-800 font-heading">No Jobs Found</h3>
              <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
                We couldn't find any job positions matching your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className="animate-card-fade-in group bg-white rounded-3xl border border-slate-100 hover:border-brandRed/20 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="p-6 relative">
                    {/* Top colored line indicator */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brandBlue to-brandRed opacity-90" />
                    
                    <div className="flex justify-between items-start gap-2 mt-2">
                      <span className="inline-block text-[10px] bg-blue-50 text-brandBlue px-2.5 py-1 font-bold rounded-full uppercase tracking-wider">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                        <i className="fa-solid fa-users text-xs"></i>
                        {job.vacancies || 'Openings'}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-800 mt-4 group-hover:text-brandBlue transition-colors font-heading leading-snug line-clamp-2">
                      {job.title}
                    </h2>
                    
                    <p className="text-slate-500 text-sm mt-1.5 font-medium flex items-center gap-1.5">
                      <i className="fa-solid fa-building text-slate-400 text-xs"></i>
                      {job.company_name}
                    </p>
                    
                    <div className="space-y-3 mt-6 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-7.5 h-7.5 rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue flex-shrink-0">
                          <i className="fa-solid fa-location-dot text-xs"></i>
                        </div>
                        <span className="truncate">{job.job_location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-7.5 h-7.5 rounded-lg bg-red-50 flex items-center justify-center text-brandRed flex-shrink-0">
                          <i className="fa-solid fa-money-bill-wave text-xs"></i>
                        </div>
                        <span className="truncate">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-7.5 h-7.5 rounded-lg bg-green-50 flex items-center justify-center text-brandGreen flex-shrink-0">
                          <i className="fa-solid fa-briefcase text-xs"></i>
                        </div>
                        <span className="truncate">{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={`/jobs/${job.slug}`}
                      className="w-full text-center py-3.5 bg-brandBlue text-white hover:bg-brandRed font-bold rounded-xl active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg shadow-blue-500/10 hover:shadow-red-500/15"
                    >
                      View Details
                      <i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
