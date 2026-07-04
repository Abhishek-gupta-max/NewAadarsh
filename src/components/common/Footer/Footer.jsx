import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_SHORT_NAME, LICENSE_NO, CIN, GST, CONTACT_INFO, SOCIAL_LINKS } from '../../../utils/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)' }}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e11d48] to-transparent"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full -bottom-64 -left-64 opacity-[0.03]" style={{ background: 'radial-gradient(circle, #e11d48, transparent)' }}></div>
      <div className="absolute w-[400px] h-[400px] rounded-full -top-48 -right-48 opacity-[0.03]" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}></div>
      <div className="absolute w-[200px] h-[200px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]" style={{ background: 'radial-gradient(circle, #e11d48, transparent)' }}></div>

      {/* Newsletter / CTA Banner */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-6xl py-12">
          <div className="bg-gradient-to-r from-[#0047ba]/60 to-[#1552c6]/40 rounded-2xl p-8 md:p-10 border border-white/[0.08] backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready to Start Your Global Career?</h3>
                <p className="text-blue-200/80 text-sm md:text-base max-w-lg">Join thousands of professionals who have successfully placed globally. Apply now for free consultation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link to="/apply" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 group">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  Apply Now
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

          {/* Col 1: Company Profile */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/images/logo12.png" alt="New Adarsh Logo" className="h-14 w-auto object-contain bg-white p-1.5 rounded-xl shadow-lg border border-white/10" />
              <div>
                <h4 className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>New Adarsh</h4>
                <span className="text-amber-400/80 text-[10px] font-semibold tracking-wider uppercase">Manpower Consultant</span>
              </div>
            </div>
            <p className="text-slate-400 text-[13px] leading-relaxed">
              NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED is a legally registered private company. We do not charge registration fees without job offer letters. We do not send candidates to unverified employers. Complaints are taken seriously.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-2.5 pt-1">
              <a href={SOCIAL_LINKS.facebook} className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-[#e11d48] hover:text-white hover:border-[#e11d48] hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-[#e11d48] hover:text-white hover:border-[#e11d48] hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-6 relative inline-block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-[2.5px] bg-gradient-to-r from-[#e11d48] to-[#be123c] rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Home</Link></li>
              <li><Link to="/about" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>About Us</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Our Services</Link></li>
              <li><Link to="/process" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Process Flow</Link></li>
              <li><Link to="/why-us" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Why Choose Us</Link></li>
              <li><Link to="/contact" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Recruitment Fields */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-6 relative inline-block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Recruitment Fields
              <span className="absolute -bottom-2 left-0 w-8 h-[2.5px] bg-gradient-to-r from-[#e11d48] to-[#be123c] rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Skilled Workers</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Healthcare Staff</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>IT & BPO Professionals</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Hospitality Staff</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Oil & Gas Engineers</Link></li>
              <li><Link to="/services" className="flex items-center gap-2.5 text-slate-400 hover:text-[#e11d48] transition-all duration-300 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#e11d48] transition-colors"></span>Retail & Sales</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-6 relative inline-block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-[2.5px] bg-gradient-to-r from-[#e11d48] to-[#be123c] rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-[13px]">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e11d48]/10 group-hover:border-[#e11d48]/20 transition-all">
                  <svg className="w-4 h-4 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-slate-400 leading-relaxed pt-1.5">
                  {CONTACT_INFO.address}<br />
                  Landmark: {CONTACT_INFO.landmark}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e11d48]/10 group-hover:border-[#e11d48]/20 transition-all">
                  <svg className="w-4 h-4 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-slate-400 hover:text-[#e11d48] transition-colors font-medium">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e11d48]/10 group-hover:border-[#e11d48]/20 transition-all">
                  <svg className="w-4 h-4 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-400 hover:text-[#e11d48] transition-colors font-medium break-all">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e11d48]/10 group-hover:border-[#e11d48]/20 transition-all">
                  <svg className="w-4 h-4 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-slate-400">{CONTACT_INFO.hours.weekdays} <br />{CONTACT_INFO.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Divider */}
        <div className="border-t border-white/[0.06] pt-8 pb-2">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Copyright */}
            <p className="text-[12px] text-slate-500 text-center lg:text-left order-2 lg:order-1">
              © {currentYear} <strong><Link className="text-slate-400 hover:text-[#e11d48] transition-colors" to="/">{COMPANY_NAME}</Link></strong>. All Rights Reserved.
            </p>

            {/* Center: Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 order-1 lg:order-2">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 bg-white/[0.04] border border-white/[0.08] px-3.5 py-2 rounded-xl">
                <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                <span>RA License: <span className="text-white font-mono font-bold">{LICENSE_NO} | CIN {CIN} | GST {GST}</span></span>
              </div>
            </div>

            {/* Back to Top */}
            <div className="order-3">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-[12px] text-slate-400 hover:text-[#e11d48] transition-all duration-300 group">
                <span className="font-semibold">Back to Top</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#e11d48] group-hover:border-[#e11d48] group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
