import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import './Layout.css';

export const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
