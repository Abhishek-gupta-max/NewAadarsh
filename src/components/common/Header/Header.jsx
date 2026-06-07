import React from 'react';
import Navbar from '../Navbar/Navbar';
import { COMPANY_NAME, LICENSE_NO, CONTACT_INFO } from '../../../utils/constants';

export const Header = () => {
  return (
    <header className="w-full shadow-sm">
      {/* Marquee Notice Bar */}
      <div className="bg-[#be123c] text-white py-1.5 overflow-hidden text-[11px] font-semibold tracking-wide border-b border-white/10 select-none">
        <div className="container mx-auto max-w-6xl px-4 flex items-center">
          <span className="bg-[#e11d48] text-[9px] uppercase font-extrabold px-2 py-0.5 rounded mr-3 shrink-0 shadow-sm animate-pulse">
            Official Notice
          </span>
          <marquee behavior="scroll" direction="left" scrollamount="4.5" className="w-full text-white/95">
            Approved by Ministry of External Affairs, Government of India • RA License No: {LICENSE_NO} • Registered Office: {COMPANY_NAME} • Email: {CONTACT_INFO.email} • Call: {CONTACT_INFO.phone} • Leading Overseas Manpower Recruitment Agency.
          </marquee>
        </div>
      </div>

      {/* Top Info Bar */}
      {/* <div className="bg-[#be123c] text-white text-[12px] md:text-[13px] px-4 md:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 font-medium border-b border-white/10 shadow-sm">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-center">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-1.5 text-white/90 hover:text-[#e11d48] transition-all hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#e11d48]" aria-hidden="true">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
            <span>{CONTACT_INFO.email}</span>
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-1.5 text-white/90 hover:text-[#e11d48] transition-all hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#e11d48]" aria-hidden="true">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
            </svg>
            <span>{CONTACT_INFO.phone}</span>
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-0">
          <span className="font-extrabold tracking-wider text-white text-[12px] md:text-[14px]">
            {COMPANY_NAME}
          </span>
          <span className="text-emerald-400 text-[10px] md:text-[11px] font-bold tracking-widest mt-0.5">
            MEA Lic No: {LICENSE_NO}
          </span>
        </div>
      </div> */}

      {/* Navigation Menu */}
      <Navbar />
    </header>
  );
};

export default Header;
