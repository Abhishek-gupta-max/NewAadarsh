import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../../../utils/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-slate-200/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & MEA Logo Group */}
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Logo Section */}
            <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <img src="/images/logo.jpeg" alt="New Adarsh Logo" className="h-10 md:h-12 w-auto object-contain rounded shadow-sm border border-slate-100" />
            </Link>
            
            {/* MEA Logo + Government Text */}
            <div className="flex items-center gap-2 min-w-0 border-l border-slate-200/80 pl-2.5 md:pl-3.5">
              <img src="/images/mea_logo.png" alt="MEA Logo" className="h-8 md:h-10 w-auto shrink-0" />
              <div className="flex flex-col leading-tight whitespace-normal">
                <span className="text-[#0047ba] font-extrabold text-[7.5px] md:text-[9.5px] uppercase tracking-wider">
                  Approved By Ministry of External Affairs
                </span>
                <span className="text-slate-500 text-[6.5px] md:text-[8.5px] font-bold tracking-wide mt-0.5">
                  Government of India
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-2 xl:gap-4 px-6 font-semibold">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-[#0047ba] bg-blue-50/60 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0047ba]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-50 border border-slate-200/50 transition-colors flex items-center justify-center`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${
            isOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-1.5 font-semibold text-slate-800">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] transition-all ${
                    isActive ? 'bg-blue-50 text-[#0047ba] font-bold' : 'hover:bg-blue-50/50 hover:text-[#0047ba]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="px-4 pt-3 mt-2 border-t border-slate-100">
              <Link
                to="/apply"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white rounded-xl shadow-sm text-sm font-bold active:scale-[0.98] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
