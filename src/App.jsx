import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollMorphBackground from './components/ScrollMorphBackground';

// Pages (to be implemented)
import Home from './pages/Home';
import About from './pages/About';
import Event from './pages/Event';
import Contact from './pages/Contact';

const MainLanding = () => {
  return (
    <>
      <Home />
      <About />
      <Event />
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
    <div className="relative min-h-screen text-text-primary selection:bg-accent-red selection:text-bg-base">
      <ScrollMorphBackground />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLanding />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
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
