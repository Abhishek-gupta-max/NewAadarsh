import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';
import useApi from '../../hooks/useApi';
import Loader from '../../components/common/Loader/Loader';
import { CONTACT_INFO } from '../../utils/constants';

export const JobDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: job, loading, error, request: fetchJobDetail } = useApi(jobService.getJobDetail);

  useEffect(() => {
    fetchJobDetail(slug);
  }, [slug, fetchJobDetail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 max-w-lg py-20 text-center">
        <div className="bg-red-50 text-red-800 p-6 rounded-2xl border border-red-200 shadow-sm">
          <span className="text-4xl block mb-2">⚠️</span>
          <h3 className="text-xl font-bold font-heading">Job Position Not Found</h3>
          <p className="text-slate-600 text-sm mt-2">{error || 'The job position you are looking for does not exist or has expired.'}</p>
          <Link to="/jobs" className="mt-6 inline-block text-sm font-bold text-amber-600 hover:text-amber-700">
            ← Back to All Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyClick = () => {
    // Navigate to Apply page passing position title in state
    navigate('/apply', { state: { jobPosition: job.title } });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px]" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">{job.title}</h1>
            <p className="text-lg text-blue-100 font-medium">{job.company_name}</p>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-20 px-4 bg-[#F8F9FA]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-10">
              
              {/* Header Title Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="inline-block text-xs bg-slate-100 text-slate-600 px-3 py-1 font-bold rounded-full uppercase tracking-wider mb-3">
                    {job.category}
                  </span>
                  <h1 className="text-3xl font-bold text-blue-900 font-heading leading-tight">{job.title}</h1>
                  <p className="text-slate-500 text-sm mt-1 font-semibold">{job.company_name}</p>
                </div>
                <button
                  onClick={handleApplyClick}
                  className="px-7 py-3 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  Apply Now
                </button>
              </div>

              {/* Stats/Metrics Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location</p>
                  <h3 className="font-bold text-slate-800 text-base mt-1">{job.job_location}</h3>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Salary Range</p>
                  <h3 className="font-bold text-slate-800 text-base mt-1">{job.salary}</h3>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Experience</p>
                  <h3 className="font-bold text-slate-800 text-base mt-1">{job.experience}</h3>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Vacancies</p>
                  <h3 className="font-bold text-slate-800 text-base mt-1">{job.vacancies}</h3>
                </div>
              </div>

              {/* Description Block */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 font-heading border-b border-slate-100 pb-2">
                  Job Description
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                  {job.description || 'No description provided.'}
                </p>
              </div>

              {/* Requirements Block */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 font-heading border-b border-slate-100 pb-2">
                  Requirements
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                  {job.requirements || 'No specific requirements listed.'}
                </p>
              </div>

              {/* Apply/Actions Call Box */}
              <div className="mt-12 bg-gradient-to-br from-brandBlue to-blue-900 rounded-3xl p-8 text-center text-white border border-blue-800 shadow-lg">
                <h2 className="text-2xl font-bold font-heading mb-1">
                  Apply For This Job
                </h2>
                <p className="text-blue-200 text-sm mb-6">
                  Get in touch directly or upload your resume below
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href={`tel:${CONTACT_INFO.phone}`} 
                    className="px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] text-blue-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Call Now
                  </a>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsApp}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-sm transition-all"
                  >
                    WhatsApp Apply
                  </a>
                  <button 
                    onClick={handleApplyClick} 
                    className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl text-sm transition-all"
                  >
                    Upload Resume Here
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
