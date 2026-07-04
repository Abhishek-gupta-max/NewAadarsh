import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/common/Modal/Modal';
import { COMPANY_NAME, CONTACT_INFO } from '../../utils/constants';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ src: '', title: '' });

  useScrollAnimation();

  const openCertModal = (src, title) => {
    setModalContent({ src, title });
    setModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-32 pb-24 md:pt-40 md:pb-36 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero_city_buildings.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/90 to-blue-900/80 pointer-events-none" />
        
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">Your Gateway to Global Opportunities</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect skilled Indian professionals with trusted international employers. We specialize in overseas recruitment across Middle East, Europe, Asia & Gulf regions.
            </p>
            
            <div className="flex flex-row gap-2.5 sm:gap-4 justify-center mb-12">
              <Link to="/apply" className="px-4 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Apply Now
              </Link>
              <Link to="/why-us" className="px-4 sm:px-7 py-3 sm:py-3.5 bg-transparent hover:bg-white/5 border-2 border-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why Us
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <svg className="w-6 h-6 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.218c0 1.695-.603 2.933-1.391 3.467.19.294.335.652.335 1.035 0 1.641-1.487 3-3.322 3H7.631c-1.835 0-3.322-1.359-3.322-3 0-.383.145-.74.335-1.035-.788-.534-1.391-1.772-1.391-3.467V6.518c0-1.691.977-3.149 2.414-3.063z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">MEA Registered</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <svg className="w-6 h-6 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">100% Legal</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <svg className="w-6 h-6 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM16.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM10 16a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 15.657l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM4 10a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zM5.757 4.343l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414z"/>
                </svg>
                <span className="text-sm font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-blue-50 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white text-center p-6 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.03] transition-all duration-300">
              <div className="text-4xl font-bold text-amber-500 font-heading">1000+</div>
              <div className="text-slate-600 font-semibold mt-2 text-sm">Placements Done</div>
            </div>
            <div className="bg-white text-center p-6 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.03] transition-all duration-300">
              <div className="text-4xl font-bold text-amber-500 font-heading">50+</div>
              <div className="text-slate-600 font-semibold mt-2 text-sm">Countries Served</div>
            </div>
            <div className="bg-white text-center p-6 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.03] transition-all duration-300">
              <div className="text-4xl font-bold text-amber-500 font-heading">100%</div>
              <div className="text-slate-600 font-semibold mt-2 text-sm">Success Rate</div>
            </div>
            <div className="bg-white text-center p-6 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.03] transition-all duration-300">
              <div className="text-4xl font-bold text-amber-500 font-heading">15+</div>
              <div className="text-slate-600 font-semibold mt-2 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4 font-heading">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive overseas recruitment solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div 
              className="scroll-scale-in bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-305"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">Skilled Workers</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Connect with highly trained professionals in IT, engineering, construction, and trade skills.</p>
            </div>
            
            {/* Service 2 */}
            <div 
              className="scroll-scale-in bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-305"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">Healthcare Professionals</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Registered nurses, doctors, and healthcare staff for hospitals and care facilities worldwide.</p>
            </div>
            
            {/* Service 3 */}
            <div 
              className="scroll-scale-in bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-305"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a9 9 0 11-9.655-8.345 1.40625 1.40625 0 11-.75 1.977A7.002 7.002 0 0117 11a7 7 0 11-8.235-6.89 1.406 1.406 0 11.79-1.465A9.001 9.001 0 006.625 2.655z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">IT & BPO Professionals</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Top-tier software engineers, developers, and business process specialists for global tech companies.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-50 to-slate-50 scroll-fade-in" id="about">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 font-heading">About New Adarsh</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your trusted global recruitment partner since 2008</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Owner Image Card */}
            <div className="lg:col-span-5 scroll-fade-in-left">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
                <div className="relative overflow-hidden h-72 sm:h-80">
                  <img src="/images/corporate_desk_empty_team.jpeg" alt="Founder - New Adarsh" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-1 font-heading">Ram Pramod Patel</h3>
                  <p className="text-amber-600 font-semibold mb-3">Founder & Director</p>
                  <p className="text-slate-600 text-sm leading-relaxed">With 15+ years of experience in overseas recruitment, leading New Adarsh with a commitment to ethical practices and transparent operations.</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                    </div>
                    <span className="text-sm text-slate-600">{CONTACT_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: About Content + Stats */}
            <div className="lg:col-span-7 scroll-fade-in-right">
              <h3 className="text-3xl font-bold text-blue-900 mb-5 font-heading">Your Trusted Global Recruitment Partner</h3>
              <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                {COMPANY_NAME} is an MEA-approved, Government of India licensed overseas manpower recruitment agency headquartered in Deoria Sadar, Uttar Pradesh. With over 15 years of experience, we specialize in connecting skilled Indian professionals with trusted international employers.
              </p>
              <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                Our mission is to facilitate seamless, legal, and transparent overseas recruitment. We maintain the highest standards of compliance with MEA regulations across Gulf, Middle East, Europe, and Asia.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 font-heading">1000+</div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">Placements</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 font-heading">50+</div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">Countries</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 font-heading">100%</div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">Legal</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 font-heading">15+</div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">Years</p>
                </div>
              </div>

              {/* Key Feature Cards */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border-l-4 border-amber-400 shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="text-base font-bold text-blue-900 mb-1 flex items-center gap-2 font-heading">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.218c0 1.695-.603 2.933-1.391 3.467.19.294.335.652.335 1.035 0 1.641-1.487 3-3.322 3H7.631c-1.835 0-3.322-1.359-3.322-3 0-.383.145-.74.335-1.035-.788-.534-1.391-1.772-1.391-3.467V6.518c0-1.691.977-3.149 2.414-3.063z" clipRule="evenodd"/></svg>
                    MEA Registered & Government Approved
                  </h4>
                  <p className="text-slate-600 text-sm">Fully compliant with Ministry of External Affairs regulations and Government of India licensing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Certificates Section */}
      <section className="py-20 bg-white scroll-fade-in" id="certificates">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">Official Recognition</span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 font-heading">Our Government Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Click any certificate to view full size</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Certificate 1 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 cursor-pointer" 
                onClick={() => openCertModal('/images/certificate.PNG', 'MEA Registration Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/certificate.PNG" alt="MEA Registration Certificate" className="w-full h-44 sm:h-52 md:h-60 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">MEA Registration</h3>
                  <p className="text-xs text-amber-600 font-semibold">Ministry of External Affairs</p>
                </div>
              </div>
            </div>

            {/* Certificate 2 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer" 
                onClick={() => openCertModal('/images/license_certificate.PNG', 'Government License Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/license_certificate.PNG" alt="Government License Certificate" className="w-full h-44 sm:h-52 md:h-60 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Government License</h3>
                  <p className="text-xs text-blue-600 font-semibold">State Govt. Approved</p>
                </div>
              </div>
            </div>

            {/* Certificate 3 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 cursor-pointer" 
                onClick={() => openCertModal('/images/mea_logo.png', 'MEA Official Emblem')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/mea_logo.png" alt="MEA Official Emblem" className="w-full h-44 sm:h-52 md:h-60 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">MEA Recognized</h3>
                  <p className="text-xs text-green-600 font-semibold">Official Govt. Emblem</p>
                </div>
              </div>
            </div>

            {/* Certificate 4 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 cursor-pointer" 
                onClick={() => openCertModal('/images/updated_shop_and_establishment.pdf', 'Shop & Establishment Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-purple-400 to-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg border border-dashed border-purple-200 bg-purple-50">
                    <iframe
                      src="/images/updated_shop_and_establishment.pdf#view=fitH"
                      title="Shop & Establishment Certificate"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Shop & Establishment</h3>
                  <p className="text-xs text-purple-600 font-semibold">Updated PDF Certificate</p>
                </div>
              </div>
            </div>

            {/* Certificate 5 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-200 cursor-pointer" 
                onClick={() => openCertModal('/images/udyam_registration_certificate.pdf', 'Udyam Registration Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 to-sky-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg border border-dashed border-cyan-200 bg-cyan-50">
                    <iframe
                      src="/images/udyam_registration_certificate.pdf#view=fitH"
                      title="Udyam Registration Certificate"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Udyam Registration</h3>
                  <p className="text-xs text-cyan-600 font-semibold">Government MSME Certificate</p>
                </div>
              </div>
            </div>

            {/* Certificate 6 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 cursor-pointer" 
                onClick={() => openCertModal('/images/gst_certificate.pdf', 'GST Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg border border-dashed border-amber-200 bg-amber-50">
                    <iframe
                      src="/images/gst_certificate.pdf#view=fitH"
                      title="GST Certificate"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">GST Certificate</h3>
                  <p className="text-xs text-amber-600 font-semibold">Goods & Services Tax</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/about" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138c.11.73.39 1.4.806 1.946a3.42 3.42 0 010 4.438c-.416.547-.696 1.215-.806 1.946a3.42 3.42 0 01-3.138 3.138c-.73.11-1.4.39-1.946.806a3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438c.416-.547.696-1.215.806-1.946a3.42 3.42 0 013.138-3.138z"/></svg>
              View All Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-r from-brandBlue to-blue-900 text-white scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-heading">Why Choose Us</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Industry-leading recruitment with unmatched expertise and success rate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Government Approved</h4>
                <p className="text-blue-100 text-sm leading-relaxed">Fully registered with MEA and compliant with all government regulations and standards.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Proven Track Record</h4>
                <p className="text-blue-100 text-sm leading-relaxed">Over 1000 successful placements with a 100% client satisfaction rate across 50+ countries.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-305" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Expert Team</h4>
                <p className="text-blue-100 text-sm leading-relaxed">Experienced professionals dedicated to understanding your needs and delivering results.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-305" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Quick Processing</h4>
                <p className="text-blue-100 text-sm leading-relaxed">Fast-track applications with efficient documentation and rapid placement timelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 scroll-scale-in">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-amber-300/30 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-blue-900 mb-4 font-heading">Ready to Start Your Journey?</h3>
            <p className="text-gray-700 mb-8 text-lg">
              Join thousands of professionals who have successfully placed jobs globally through us.
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

      {/* Lightbox Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        size="lg"
      >
        <div className="flex items-center justify-center p-2">
          {modalContent.src.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={modalContent.src}
              title={modalContent.title}
              className="w-full h-[70vh] rounded-lg border border-slate-100"
            />
          ) : (
            <img 
              src={modalContent.src} 
              alt={modalContent.title} 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md border border-slate-100" 
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
