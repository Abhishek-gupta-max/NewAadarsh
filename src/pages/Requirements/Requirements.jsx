import React from 'react';
import { Link } from 'react-router-dom';
import { LICENSE_NO } from '../../utils/constants';

export const Requirements = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px]" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">Job Requirements</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Check eligibility criteria and requirements for overseas placements
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 border-l-4 border-l-brandBlue hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">General Eligibility</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Indian citizen with valid passport</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Minimum age 18, maximum as per job role</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Good health and medical fitness</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Clean police record and background clearance</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Willingness to work in international environment</span>
                </li>
              </ul>
            </div>

            {/* Professional Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 border-l-4 border-l-brandBlue hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">Professional Qualifications</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Required educational credentials for position</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Minimum work experience as specified</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Relevant certifications and licenses</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Language proficiency as needed</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-slate-700 font-medium">Technical skill assessment clearance</span>
                </li>
              </ul>
            </div>

            {/* Documentation Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 border-l-4 border-l-brandBlue hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">Documentation Needed</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Valid passport (6+ months validity)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Educational certificates and transcripts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Work experience letters</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Professional certifications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Medical fitness report</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Police clearance certificate (PCC)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="text-slate-700 font-medium">Passport size photographs</span>
                </li>
              </ul>
            </div>

            {/* Visa & Process */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 border-l-4 border-l-brandBlue hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">Visa & Process Timeline</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-blue-900 mb-1 font-heading text-sm">Processing Time</h4>
                  <p className="text-slate-600 text-xs">30-45 days from application to deployment</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1 font-heading text-sm">Visa Support</h4>
                  <p className="text-slate-600 text-xs">Complete visa processing and documentation assistance</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1 font-heading text-sm">Pre-Departure</h4>
                  <p className="text-slate-600 text-xs">Orientation and guidance before international travel</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1 font-heading text-sm">Post-Arrival</h4>
                  <p className="text-slate-600 text-xs">On-ground support and onboarding assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brandBlue to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4 font-heading">Check Your Eligibility</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Not sure if you qualify? Contact us for a free consultation with our recruitment experts.
          </p>
          <Link to="/contact" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
            Get Your Assessment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Requirements;
