import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import useActiveSection from '../../hooks/useActiveSection';

/**
 * Navbar Component
 * Transformed into a premium floating pill with active section highlighting.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOME', path: '/#home', id: 'home' },
    { name: 'ABOUT', path: '/#about', id: 'about' },
    { name: 'DOMAINS', path: '/#domains', id: 'domains' },
    { name: 'REGISTER', path: '/#register', id: 'register' },
    { name: 'CONTACT', path: '/#contact', id: 'contact' },
  ];

  const activeSection = useActiveSection(navLinks.map(l => l.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    
    // Always navigate to update the URL hash
    navigate(path);
    
    // If we're already on the home page and clicking a section link, 
    // we might need to manually trigger the scroll if the hash doesn't change
    if (path.startsWith('/#') && location.pathname === '/') {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the URL update/menu closure doesn't interfere
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 md:px-6 pointer-events-none">
      {/* Desktop Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`hidden lg:flex relative items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border pointer-events-auto ${
          isScrolled 
            ? 'bg-bg-base/80 backdrop-blur-xl border-accent-orange/30 shadow-[0_4px_30px_rgba(255,107,0,0.15)] w-full max-w-7xl' 
            : 'bg-bg-surface/40 backdrop-blur-md border-white/10 w-full max-w-7xl'
        }`}
      >
        
        {/* Left: Branding */}
        <Link to="/" className="flex items-center space-x-3 group shrink-0" onClick={() => handleLinkClick('/#home')}>
          <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
            <img src="/astra-logo.png" alt="ASTRA Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-orbitron font-black text-xl tracking-tighter text-text-primary leading-none text-glow">ASTRA</span>
            <span className="font-rajdhani text-[9px] text-accent-orange tracking-[0.2em] font-black uppercase mt-1">BMSIT&M BENGALURU</span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <div className="flex items-center space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.path);
              }}
              className={`font-rajdhani text-[11px] xl:text-[12px] tracking-[0.1em] transition-all font-black relative px-3 py-1.5 rounded-full ${
                activeSection === link.id 
                  ? 'text-accent-orange bg-accent-orange/10 shadow-[0_0_10px_rgba(255,107,0,0.1)]' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 border border-accent-orange/30 rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          <a
            href="https://forms.gle/EALvMDj2SKFrY9jXA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-accent-orange text-bg-base font-orbitron text-[10px] font-black tracking-widest hover:scale-105 transition-all rounded-full shadow-[0_0_15px_rgba(255,107,0,0.3)]"
          >
            WE'RE HIRING
          </a>
        </div>
      </motion.nav>

      {/* Mobile Hamburger Button — floating, no bar */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="lg:hidden fixed top-5 right-5 text-accent-orange text-3xl p-2 h-12 w-12 flex items-center justify-center pointer-events-auto"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 lg:hidden bg-bg-base/95 flex flex-col items-center justify-start p-6 pt-24 pb-12 overflow-y-auto cursor-pointer pointer-events-auto"
          >
            {/* Dedicated Close Button */}
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="absolute top-8 right-8 text-accent-orange text-4xl p-2 h-12 w-12 flex items-center justify-center border border-accent-orange/30 rounded-full bg-accent-orange/5 z-50 hover:bg-accent-orange/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
            >
              <HiX />
            </motion.button>

            <motion.div 
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center space-y-4 text-center w-full max-w-sm cursor-default"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
              >
                <img src="/astra-logo.png" alt="ASTRA" className="w-20 h-20 object-contain mx-auto mb-2" />
                <h2 className="font-orbitron font-black text-2xl tracking-tighter text-text-primary">ASTRA</h2>
                <div className="h-0.5 w-12 bg-accent-orange mx-auto mt-1" />
              </motion.div>

              <div className="grid grid-cols-1 gap-3 w-full">
                {navLinks.map((link, index) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={link.name}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLinkClick(link.path);
                    }}
                    className={`font-orbitron text-lg font-bold tracking-[0.2em] transition-all w-full py-4 rounded-full border relative flex items-center justify-center ${
                      activeSection === link.id 
                        ? 'text-accent-orange' 
                        : 'text-text-primary hover:text-accent-orange border-white/5 bg-white/5'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeNavMobile"
                        className="absolute inset-0 border border-accent-orange/40 bg-accent-orange/5 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.1)]"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col space-y-4 pt-8 w-full"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLinkClick('/#register');
                  }}
                  className="w-full py-4 bg-accent-orange text-bg-base font-orbitron text-sm font-black rounded-full shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-[1.02] transition-all uppercase tracking-widest"
                >
                  REGISTER
                </button>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-[-1]">
              <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-accent-orange/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-accent-orange/10 rounded-full blur-[120px]" />
              <div className="hex-grid-overlay opacity-30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
