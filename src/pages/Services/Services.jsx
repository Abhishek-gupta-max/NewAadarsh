import React from 'react';
import { Link } from 'react-router-dom';

export const Services = () => {
  const servicesList = [
    {
      type: 'Technical',
      title: 'Skilled Technical Workers',
      description: 'Engineers, welders, electricians, HVAC technicians, and industrial fitters certified and ready for global deployment.',
      image: '/images/modern_indian_skilled_trades.jpeg',
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      type: 'Healthcare',
      title: 'Healthcare Professionals',
      description: 'Registered nurses, doctors, lab technicians, and paramedics with complete licensing support for international placements.',
      image: '/images/hospital.jpeg',
      icon: (
        <svg className="w-8 h-8 text-[#0047ba]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
        </svg>
      )
    },
    {
      type: 'Tech',
      title: 'IT & BPO Professionals',
      description: 'Software developers, data analysts, and customer service executives for global tech companies and outsourcing needs.',
      image: '/images/IT.jpeg',
      icon: (
        <svg className="w-8 h-8 text-[#0047ba]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a9 9 0 11-9.655-8.345 1.40625 1.40625 0 11-.75 1.977A7.002 7.002 0 0117 11a7 7 0 11-8.235-6.89 1.406 1.406 0 11.79-1.465A9.001 9.001 0 006.625 2.655z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      type: 'Hospitality',
      title: 'Hospitality & Retail',
      description: 'Chefs, housekeeping staff, hospitality managers, and retail professionals for hotels and consumer businesses worldwide.',
      image: '/images/hospitality.jpeg',
      icon: (
        <svg className="w-8 h-8 text-[#0047ba]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 3a1 1 0 0 1 .293.708l.756 2.268a1 1 0 0 0 .894.632h2.385a1 1 0 0 1 .674 1.78l-1.921 1.417a1 1 0 0 0-.327 1.12l.756 2.268a1 1 0 0 1-1.55 1.116L9 13.122l-1.96 1.435a1 1 0 0 1-1.55-1.116l.756-2.268a1 1 0 0 0-.327-1.12L3.894 9.408a1 1 0 0 1 .674-1.78h2.385a1 1 0 0 0 .894-.632l.756-2.268A1 1 0 0 1 9 3Z" />
        </svg>
      )
    },
    {
      type: 'Energy',
      title: 'Oil, Gas & Construction',
      description: 'Rig workers, safety officers, engineers, and heavy equipment operators for energy and infrastructure projects.',
      image: '/images/oil.jpeg',
      icon: (
        <svg className="w-8 h-8 text-[#0047ba]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm0 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Zm10-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2Z" />
        </svg>
      )
    },
    {
      type: 'Industrial',
      title: 'Manufacturing & Industrial',
      description: 'Factory workers, supervisors, quality control specialists, and machine operators for manufacturing facilities.',
      image: '/images/corporate_desk_empty.png',
      icon: (
        <svg className="w-8 h-8 text-[#0047ba]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 7H7v6h6V7Z" />
          <path fillRule="evenodd" d="M7 2a1 1 0 0 1 2 0v1h2V2a1 1 0 1 1 2 0v1h2V2a1 1 0 1 1 2 0v1h2V2a1 1 0 1 1 2 0v1a2 2 0 0 1 2 2v2h1a1 1 0 0 1 1 1v2h1a1 1 0 1 1 0 2h-1v2h1a1 1 0 1 1 0 2h-1a2 2 0 0 1-2 2v1a1 1 0 1 1-2 0v-1h-2v1a1 1 0 1 1-2 0v-1h-2v1a1 1 0 1 1-2 0v-1a2 2 0 0 1-2-2H2a1 1 0 1 1 0-2h1v-2H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1V7a2 2 0 0 1 2-2v-1a1 1 0 0 1 1-1zm0 5v6h6V7H7Z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px]" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">Our Services</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive overseas recruitment solutions tailored to your industry needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv, idx) => {
              if (idx === 0) {
                // Return premium stylized layout for first card as requested from services.php
                return (
                  <div 
                    key={idx} 
                    className="animate-card-fade-in relative rounded-2xl overflow-hidden group h-[420px] shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <img src={srv.image} alt={srv.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/70 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 flex items-center justify-center mb-5 shadow-lg">
                        {srv.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 font-heading">{srv.title}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed mb-5">{srv.description}</p>
                      <Link to="/apply" className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition">
                        Apply Now <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              }
              return (
                <div 
                  key={idx} 
                  className="animate-card-fade-in bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                      {srv.icon}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3 font-heading">{srv.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{srv.description}</p>
                  </div>
                  <Link to="/apply" className="text-amber-600 font-bold text-sm hover:text-amber-700 inline-flex items-center gap-1">
                    Apply Now <span>→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center font-heading">Our Recruitment Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-300 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-heading">
                1
              </div>
              <h4 className="font-bold text-blue-900 mb-2 font-heading text-sm">Demand Letter</h4>
              <p className="text-slate-500 text-xs leading-relaxed">We evaluate your organization's hiring needs and target requirements.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-300 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-heading">
                2
              </div>
              <h4 className="font-bold text-blue-900 mb-2 font-heading text-sm">Employer Verification</h4>
              <p className="text-slate-500 text-xs leading-relaxed">We perform deep verification checks of host employers and job offers.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-300 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-heading">
                3
              </div>
              <h4 className="font-bold text-blue-900 mb-2 font-heading text-sm">Candidate Screening</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Candidates undergo rigorous technical evaluations and checks.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-300 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-heading">
                4
              </div>
              <h4 className="font-bold text-blue-900 mb-2 font-heading text-sm">Interview Coordination</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Facilitating smooth direct or virtual candidate interviews.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-300 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-heading">
                5
              </div>
              <h4 className="font-bold text-blue-900 mb-2 font-heading text-sm">Joining Support</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Assisting in visa stamping, travel ticketing, and orientation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-amber-300/30 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-blue-900 mb-4 font-heading">Ready to Get Started?</h3>
            <p className="text-slate-700 mb-8 text-lg">
              Let us help you find the right talent for your organization or secure your global job.
            </p>
            <Link to="/contact" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
