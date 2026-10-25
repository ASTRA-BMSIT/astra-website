import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import useActiveSection from '../../hooks/useActiveSection';

const navLinks = [
  { name: 'HOME', path: '/#home', id: 'home' },
  { name: 'ABOUT', path: '/#about', id: 'about' },
  { name: 'TEAM', path: '/#team', id: 'team' },
  { name: 'DOMAINS', path: '/#domains', id: 'domains' },
  { name: 'CONTACT', path: '/#contact', id: 'contact' },
];
const ids = navLinks.map((l) => l.id);

/** Frosted hairline navigation bar with an active-section marker and a full-screen mobile menu. */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const go = (path) => {
    setMenuOpen(false);
    navigate(path);
    if (path.startsWith('/#') && location.pathname === '/') {
      const el = document.getElementById(path.replace('/#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const onLink = (path) => (e) => { e.preventDefault(); go(path); };

  return (
    <div className="ds-nav-shell">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`ds-nav${isScrolled ? ' scrolled' : ''}`}
        aria-label="Primary"
      >
        <Link to="/" className="ds-brand" onClick={onLink('/#home')}>
          <img src="/astra-logo.png" alt="" />
          <span><b>ASTRA</b><small>BMSIT&amp;M · BENGALURU</small></span>
        </Link>

        <div className="ds-links">
          {navLinks.map((l) => (
            <a key={l.id} href={l.path} onClick={onLink(l.path)} className={activeSection === l.id ? 'on' : ''} aria-current={activeSection === l.id ? 'true' : undefined}>
              {l.name}
            </a>
          ))}
        </div>

        <div className="ds-nav-cta">
          <a className="ds-btn" href="mailto:astra@bmsit.in">Email us</a>
          <a className="ds-btn ds-btn--accent" href="/#contact" onClick={onLink('/#contact')}>Join us</a>
        </div>

        <button className="ds-burger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <HiMenuAlt3 />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ds-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            style={{ pointerEvents: 'auto' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="ds-menu-close" autoFocus aria-label="Close menu" onClick={() => setMenuOpen(false)}><HiX /></button>
            {navLinks.map((l, i) => (
              <a key={l.id} href={l.path} onClick={onLink(l.path)} className={activeSection === l.id ? 'on' : ''}>
                <small>{String(i + 1).padStart(2, '0')}</small>{l.name.charAt(0) + l.name.slice(1).toLowerCase()}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
