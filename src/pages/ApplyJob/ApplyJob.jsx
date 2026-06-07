import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import userService from '../../services/userService';
import { validateEmail, validatePhone, validateFileSize, validateFileType } from '../../utils/validators';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export const ApplyJob = () => {
  useScrollAnimation();

  const location = useLocation();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_position: '',
    experience: '',
    message: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Pre-fill job position if passed in state
  useEffect(() => {
    if (location.state?.jobPosition) {
      setFormData((prev) => ({
        ...prev,
        job_position: location.state.jobPosition
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size and type
      if (!validateFileSize(file, 5)) {
        setStatus({ type: 'error', message: 'File size must be less than 5MB!' });
        return;
      }
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      if (!validateFileType(file, allowedExtensions)) {
        setStatus({ type: 'error', message: 'Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!' });
        return;
      }

      setResumeFile(file);
      setStatus({ type: '', message: '' }); // Clear any errors
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
 
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate
      if (!validateFileSize(file, 5)) {
        setStatus({ type: 'error', message: 'File size must be less than 5MB!' });
        return;
      }
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      if (!validateFileType(file, allowedExtensions)) {
        setStatus({ type: 'error', message: 'Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!' });
        return;
      }

      setResumeFile(file);
      setStatus({ type: '', message: '' });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validate inputs
    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address!' });
      return;
    }
    if (!validatePhone(formData.phone)) {
      setStatus({ type: 'error', message: 'Please enter a valid phone number!' });
      return;
    }
    if (!resumeFile) {
      setStatus({ type: 'error', message: 'Please upload your resume/CV!' });
      return;
    }

    setLoading(true);
    
    // Construct FormData object
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('job_position', formData.job_position);
    submitData.append('experience', formData.experience);
    submitData.append('message', formData.message);
    submitData.append('resume', resumeFile);

    try {
      const res = await userService.submitApplication(submitData);
      if (res.success) {
        setStatus({ type: 'success', message: res.message || 'Application submitted successfully! We will contact you soon.' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          job_position: '',
          experience: '',
          message: ''
        });
        setResumeFile(null);
      } else {
        setStatus({ type: 'error', message: res.error || res.message || 'Failed to submit application. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Something went wrong. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-32 pb-24 md:pt-40 md:pb-36 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero_city_buildings.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/90 to-blue-900/80 pointer-events-none" />
        
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-heading">Apply Now</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join our database of professionals and start your international career journey
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <section className="py-16 px-4 bg-[#F8F9FA] scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Benefits */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">Why Apply With Us?</h3>
                
                <div className="bg-white p-5 rounded-2xl border-l-4 border-amber-500 shadow-sm hover:translate-x-1 transition-all duration-300 scroll-scale-in">
                  <h4 className="font-bold text-blue-900 mb-2 font-heading">Government Approved</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">Fully approved and registered by Ministry of External Affairs, Govt of India.</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border-l-4 border-amber-500 shadow-sm hover:translate-x-1 transition-all duration-300 scroll-scale-in">
                  <h4 className="font-bold text-blue-900 mb-2 font-heading">Quick Processing</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">Fast evaluation and visa document processing for all matching candidates.</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border-l-4 border-amber-500 shadow-sm hover:translate-x-1 transition-all duration-300 scroll-scale-in">
                  <h4 className="font-bold text-blue-900 mb-2 font-heading">Expert Team</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">Your application is reviewed by experienced global manpower professionals.</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2 scroll-scale-in">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white p-8">
                  <h2 className="text-3xl font-bold font-heading">Application Form</h2>
                  <p className="text-amber-50 mt-1.5 text-sm">Fill in your details below to apply for placement opportunities</p>
                </div>

                <div className="p-8">
                  {status.message && (
                    <div className={`p-5 rounded-2xl mb-6 border ${
                      status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        {status.type === 'success' ? (
                          <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                          </svg>
                        )}
                        <div>
                          <p className="font-bold">{status.type === 'success' ? 'Success!' : 'Error'}</p>
                          <p className="text-sm mt-0.5">{status.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="Enter your full name" 
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="Enter your email" 
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Phone Number <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="Enter your phone number" 
                      />
                    </div>

                    {/* Job Position */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Job Position <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="job_position" 
                        required 
                        value={formData.job_position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="e.g., HVAC Engineer, Nurse, IT Professional" 
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Experience <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="experience" 
                        required 
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="e.g., 5 years in Healthcare, 2 years in Construction" 
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Message (Optional)</label>
                      <textarea 
                        name="message" 
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                        placeholder="Tell us about yourself and why you are applying..."
                      />
                    </div>

                    {/* Resume Upload Box */}
                    <div>
                      <label className="block text-sm font-bold text-blue-900 mb-2 font-heading">Upload Resume/CV <span className="text-red-500">*</span></label>
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                          dragActive 
                            ? 'border-blue-700 bg-blue-50/50' 
                            : 'border-amber-500 bg-amber-50/10 hover:border-[#be123c] hover:bg-amber-50/20'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          id="resume" 
                          required 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        <svg className="w-12 h-12 mx-auto text-[#e11d48] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        
                        {resumeFile ? (
                          <div>
                            <p className="text-slate-800 font-bold">Selected File:</p>
                            <p className="text-amber-600 font-bold mt-1 break-all">{resumeFile.name}</p>
                            <p className="text-slate-400 text-xs mt-1">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-slate-700 font-bold">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 11-2 0V8H7v1a1 1 0 11-2 0zm12 2a1 1 0 100-2h-1.586l1.293-1.293a1 1 0 10-1.414-1.414L13 7.586V6a1 1 0 10-2 0v3a1 1 0 001 1h3zM5 15v2a1 1 0 001 1h8a1 1 0 001-1v-2a1 1 0 112 0v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2a1 1 0 112 0z" clipRule="evenodd"/>
                        </svg>
                        {loading ? 'Submitting Application...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyJob;
