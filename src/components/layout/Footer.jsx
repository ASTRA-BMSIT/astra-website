import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="relative bg-bg-surface pt-16 pb-8 border-t border-accent-orange/30">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Col 1: Branding */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/astra-logo.png" alt="Astra Logo" className="h-12 w-auto object-contain" />
            <div>
              <span className="font-display font-bold text-2xl tracking-tactical text-text-primary block">ASTRA</span>
              <span className="label-badge text-accent-orange text-[10px]">Innovation for National Security</span>
            </div>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs font-body">
            BMS Institute of Technology and Management's premier club for tactical readiness and awareness. Empowering students through defence innovation.
          </p>
          <div className="flex space-x-4 pt-2">
            <a 
              href="https://www.instagram.com/astra.club.bmsit/" 
              className="w-10 h-10 border border-accent-orange/20 flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all rounded-full bg-bg-base/50"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a 
              href="https://www.linkedin.com/company/110203875/" 
              className="w-10 h-10 border border-accent-orange/20 flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all rounded-full bg-bg-base/50"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-text-primary font-display uppercase tracking-badge text-sm mb-6 border-l-2 border-accent-orange pl-3">Quick Access</h4>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-3">
              <li><Link to="/" className="text-text-muted hover:text-accent-orange text-xs transition-colors font-body font-medium uppercase tracking-wider">Home</Link></li>
              <li><Link to="/about" className="text-text-muted hover:text-accent-orange text-xs transition-colors font-body font-medium uppercase tracking-wider">About</Link></li>
              <li><Link to="/domains" className="text-text-muted hover:text-accent-orange text-xs transition-colors font-body font-medium uppercase tracking-wider">Domains</Link></li>
              <li><Link to="/register" className="text-text-muted hover:text-accent-orange text-xs transition-colors font-body font-medium uppercase tracking-wider">Register</Link></li>
            </ul>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-text-muted hover:text-accent-orange text-xs transition-colors font-body font-medium uppercase tracking-wider">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="text-text-primary uppercase tracking-badge text-sm mb-6 border-l-2 border-accent-orange pl-3">CONTACT</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 group">
              <HiMail className="text-accent-orange text-xl mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block text-xs uppercase tracking-badge text-text-muted mb-1">Email</span>
                <a href="mailto:astra@bmsit.in" className="text-text-primary hover:text-accent-orange transition-colors text-sm font-inter">astra@bmsit.in</a>
              </div>
            </div>
            <div className="flex items-start space-x-3 group">
              <HiLocationMarker className="text-accent-orange text-xl mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block text-xs uppercase tracking-badge text-text-muted mb-1">CLUB LOCATION</span>
                <p className="text-text-primary text-sm font-inter">
                  BMSIT&M, Yelahanka, Bengaluru – 560064, Karnataka, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-custom-border/50 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
        <p className="text-text-muted text-[10px] tracking-badge uppercase">
          &copy; 2026 ASTRA Club, BMSIT&M. Compiled for National Security Awareness.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="label-badge text-[10px] text-text-muted hover:text-accent-orange transition-colors">Privacy Protocol</a>
          <a href="#" className="label-badge text-[10px] text-text-muted hover:text-accent-orange transition-colors">Terms of Op</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
