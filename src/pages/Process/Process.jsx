import React from 'react';
import { Link } from 'react-router-dom';

export const Process = () => {
  const steps = [
    { num: 1, title: 'Initial Consultation', text: 'Meet with our expert consultants to discuss your career goals, skills, and job preferences for overseas placement.' },
    { num: 2, title: 'Document Submission', text: 'Provide all necessary documents including passport, certificates, and experience letters for verification.' },
    { num: 3, title: 'Skill Assessment', text: "We conduct interviews, language tests, and skill assessments to ensure you're a perfect match." },
    { num: 4, title: 'Job Matching', text: 'We match you with verified employers offering the best opportunities that suit your profile.' },
    { num: 5, title: 'Job Offer', text: 'Receive official job offer from international employer with competitive salary and benefits package.' },
    { num: 6, title: 'Visa Processing', text: 'Complete visa application with our full support and guidance through every step of the process.' },
    { num: 7, title: 'Pre-Departure Training', text: 'Receive orientation and training on workplace culture, safety, and lifestyle in destination country.' },
    { num: 8, title: 'Post-Placement Support', text: 'Ongoing support after placement to ensure successful integration and quick issue resolution.' }
  ];

  const timelinePhases = [
    { title: 'Week 1: Initial Assessment', time: '3-5 days', desc: 'You meet with our team, discuss your aspirations, and submit initial documents. We review your qualifications against available opportunities.' },
    { title: 'Week 2-3: Skill Verification', time: '7-10 days', desc: 'Interviews, language tests, and technical assessments. Document verification and background checks completed.' },
    { title: 'Week 4-6: Job Placement', time: '14-21 days', desc: 'Matched with employer, interviews conducted, and job offer received with contract details and salary package.' },
    { title: 'Week 7-12: Visa & Preparation', time: '30-45 days', desc: 'Visa application submitted, medical tests, pre-departure training, and travel arrangements completed.' },
    { title: 'Final Stage: Departure & Placement', time: 'Variable', desc: 'Visa approved, final briefing, departure, and successful placement at employer location with ongoing support.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px]" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">Our Process</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              8 transparent steps from application to successful placement abroad
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white rounded-full text-2xl font-bold mb-4 font-heading shadow-md">
                  {st.num}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 font-heading">{st.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process Timeline */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">Detailed Timeline</h2>
          
          <div className="space-y-6">
            {timelinePhases.map((phase, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-1 font-heading">{phase.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-2">{phase.desc}</p>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[#0047ba] text-xs font-bold rounded-full">
                      Timeline: {phase.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Process Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">Why Our Process Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Transparent</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complete transparency at every step. You know exactly where you stand and what to expect next.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Efficient</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Streamlined process with minimal delays. Average placement time: 2-3 months from application.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Legal & Safe</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% legal compliance with MEA regulations. Your safety and rights are our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-brandBlue to-blue-900 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-4 font-heading">Ready to Begin Your Journey?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Start your application now and take the first step towards an exciting overseas career!
            </p>
            <Link to="/apply" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
