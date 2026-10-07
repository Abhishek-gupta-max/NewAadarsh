import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import Loader from '../components/common/Loader/Loader';
import { useAppContext } from '../context/AppContext';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const { globalLoading } = useAppContext();
  const [headerHeight, setHeaderHeight] = useState(132);
  const headerRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Recalculate header height dynamically
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();
    
    // Resize listener for browser size updates
    window.addEventListener('resize', updateHeight);

    // Fallback: Measure after a small delay in case fonts/images load asynchronously
    const timer = setTimeout(updateHeight, 150);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-800">
      {globalLoading && <Loader />}
      
      {/* Fixed Wrapper for Header */}
      <div ref={headerRef} className="fixed top-0 w-full z-50">
        <Header />
      </div>
      
      {/* Main Page Area with Dynamic Padding-Top */}
      <main className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
