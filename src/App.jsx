import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import OrbitalBackdrop from './components/OrbitalBackdrop';
import LiquidMetalBackdrop, { MouseLiquidField } from './components/LiquidMetalBackdrop';

// Pages (to be implemented)
import Home from './pages/Home';
import About from './pages/About';
import Event from './pages/Event';
import Register from './pages/Register';
import Contact from './pages/Contact';

const MainLanding = () => {
  return (
    <>
      <Home />
      <About />
      <Event />
      <Register />
      <Contact />
    </>
  );
};

function App() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Short delay to ensure content is rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="relative min-h-screen text-text-primary selection:bg-accent-orange selection:text-bg-base">
      <div className="hex-grid-overlay opacity-30" />
      <LiquidMetalBackdrop className="liquid-metal--page" />
      <MouseLiquidField />
      <OrbitalBackdrop />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLanding />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect legacy routes to anchor points */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/domains" element={<Navigate to="/#domains" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
