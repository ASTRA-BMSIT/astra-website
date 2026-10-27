import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { HiHeart } from 'react-icons/hi';

const links = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Team', href: '/#team' },
  { name: 'Domains', href: '/#domains' },
  { name: 'Contact', href: '/#contact' },
];

const Footer = () => (
  <footer className="ds-foot">
    <div className="ds-wrap">
      <div className="ds-foot-top">
        <h2>Engineering for <em>national security.</em></h2>
        <a className="ds-btn" href="mailto:astra@bmsit.in">astra@bmsit.in</a>
      </div>

      <div className="ds-foot-cols">
        <div>
          <div className="ds-foot-brand">
            <img src="/astra-logo.png" alt="" />
            <b>ASTRA</b>
          </div>
          <p style={{ maxWidth: '26em' }}>
            BMS Institute of Technology and Management's premier club for tactical readiness and awareness. Empowering students through defence innovation.
          </p>
          <div className="ds-socials" style={{ marginTop: 22 }}>
            <a className="ds-pill" href="https://www.instagram.com/astra.club.bmsit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a className="ds-pill" href="https://www.linkedin.com/company/110203875/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div>
          <h4>Navigate</h4>
          <ul>{links.map((l) => <li key={l.name}><a href={l.href}>{l.name}</a></li>)}</ul>
        </div>

        <div>
          <h4>Club location</h4>
          <p>BMSIT&amp;M, Yelahanka, Bengaluru – 560064, Karnataka, India</p>
          <p style={{ marginTop: 18 }}><a className="plain" href="mailto:astra@bmsit.in">astra@bmsit.in</a></p>
        </div>
      </div>

      <div className="ds-foot-bar">
        <span className="ds-foot-plus"><b>+</b><span>Armed Squad for Tactical Readiness &amp; Awareness</span></span>
        <span className="coord">13.1341° N / 77.5694° E <HiHeart aria-label="made with love" /> &copy; 2026 ASTRA Club, BMSIT&amp;M</span>
      </div>
    </div>
  </footer>
);

export default Footer;
