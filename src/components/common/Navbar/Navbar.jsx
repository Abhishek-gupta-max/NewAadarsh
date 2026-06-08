import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, LICENSE_NO, CONTACT_INFO } from '../../../utils/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  // Handle mobile drawer body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };
    if (!document.getElementById('gt-script')) {
      const s = document.createElement('script');
      s.id = 'gt-script';
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(s);
    }
  }, []);

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-5 xl:px-10 max-w-[1400px]">
        <div className="flex items-center justify-between h-16">

          {/* ── LEFT: Logo + MEA Badge ── */}
          <div className="flex items-center shrink-0">

            {/* Company Logo */}
            <Link to="/" className="shrink-0 hover:opacity-90 transition-opacity duration-200">
              <img
                src="/images/logo.jpeg"
                alt="New Adarsh Logo"
                className="h-10 w-auto object-contain rounded"
              />
            </Link>

            {/* MEA Badge — md and above */}
            <div className="hidden md:flex items-center gap-2 ml-3 pl-3 border-l border-slate-200">
              <img
                src="/images/mea_logo.png"
                alt="MEA Logo"
                className="h-8 w-auto shrink-0"
              />
              <div className="flex flex-col justify-center" style={{ lineHeight: 1.1 }}>
                <span className="text-[#0047ba] font-extrabold uppercase tracking-wide whitespace-nowrap" style={{ fontSize: '9.5px', letterSpacing: '0.06em' }}>
                  Approved by Ministry of External Affairs
                </span>
                <span className="text-slate-500 font-semibold tracking-wide whitespace-nowrap mt-[3px]" style={{ fontSize: '8.5px' }}>
                  Government of India
                </span>
                <span className="text-slate-500 font-semibold tracking-wide whitespace-nowrap mt-[2px]" style={{ fontSize: '8.5px' }}>
                  RA License: {LICENSE_NO}
                </span>
              </div>
            </div>
          </div>

          {/* ── CENTER: Nav Links ── */}
          <div className="hidden lg:flex items-center gap-0.5 mx-4">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 text-[13px] font-semibold rounded-md whitespace-nowrap transition-all duration-150 ${
                    active
                      ? 'text-[#0047ba] bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-[#0047ba] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: Translate + Apply Now + Hamburger ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Google Translate widget — desktop only */}
            <div id="google_translate_element" className="hidden lg:block" />

            {/* Apply Now — desktop only */}
            <Link
              to="/apply"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-[12.5px] font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Apply Now
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                {isOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Side Drawer Backdrop ── */}
        <div
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* ── Mobile Side Drawer Panel ── */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <Link to="/" className="shrink-0" onClick={() => setIsOpen(false)}>
              <img
                src="/images/logo.jpeg"
                alt="New Adarsh Logo"
                className="h-9 w-auto object-contain rounded"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-6">
            
            {/* MEA License Info Box */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5">
              <div className="flex gap-2.5">
                <img
                  src="/images/mea_logo.png"
                  alt="MEA Logo"
                  className="h-8 w-auto shrink-0 mt-0.5"
                />
                <div className="flex flex-col" style={{ lineHeight: 1.25 }}>
                  <span className="text-[#0047ba] font-extrabold uppercase tracking-wide" style={{ fontSize: '9.5px', letterSpacing: '0.04em' }}>
                    Approved by MEA
                  </span>
                  <span className="text-slate-600 font-semibold tracking-wide" style={{ fontSize: '8.5px' }}>
                    Govt. of India
                  </span>
                  <span className="text-slate-500 font-semibold mt-1" style={{ fontSize: '8.5px' }}>
                    Lic: {LICENSE_NO}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-2 mb-1">
                Menu Links
              </span>
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                let icon = null;
                if (link.label === "Home") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  );
                } else if (link.label === "About") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  );
                } else if (link.label === "Services") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  );
                } else if (link.label === "Process") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  );
                } else if (link.label === "Why Us") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  );
                } else if (link.label === "Requirements") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  );
                } else if (link.label === "Contact") {
                  icon = (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-blue-50 text-[#0047ba] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0047ba]'
                    }`}
                  >
                    <span className={`${active ? 'text-[#0047ba]' : 'text-slate-400'}`}>
                      {icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Action Area */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-2">
                Action
              </span>
              <Link
                to="/apply"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-md active:scale-[0.98] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Apply Now
              </Link>
            </div>

            {/* Contact Details */}
            <div className="mt-auto pt-5 border-t border-slate-100 flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-2">
                Contact Info
              </span>
              <div className="flex flex-col gap-2.5 px-2 text-xs text-slate-500">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-[#0047ba]">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {CONTACT_INFO.phone}
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-[#0047ba] break-all">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {CONTACT_INFO.email}
                </a>
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{CONTACT_INFO.hours.weekdays}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
