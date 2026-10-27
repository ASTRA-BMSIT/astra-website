import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiExternalLink } from 'react-icons/hi';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import Reveal from '../components/ui/reveal';
import CampusMap from '../components/ui/campus-map';

const socials = [
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/astra.club.bmsit/' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/110203875/' },
  { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://chat.whatsapp.com/I09rR6L6eRcJnKyyFFgsl6?s=cl&p=i&mlu=4&ilr=4' },
];

const people = [
  { name: 'Reyyi Shreyas', phone: '+91 63668 07796' },
  { name: 'Varnika Kirani Raghavendra', phone: '+91 99020 99899' },
];

const ADDRESS = 'BMS Institute of Technology and Management, Yelahanka New Town, Bengaluru – 560064, Karnataka';

const Contact = () => {
  const [mapType, setMapType] = useState('roadmap');
  const [highlighted, setHighlighted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== '#partner-contact') return;
    setHighlighted(true);
    document.getElementById('partner-contact')?.scrollIntoView({ behavior: 'smooth' });
    const timer = setTimeout(() => setHighlighted(false), 5000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <section className="ds-section" id="contact">
      <div className="ds-wrap">
        <div className="ds-stamp">Contact<i>.</i></div>
        <div className="ds-split">
          <div className="ds-label"><b>04</b>/ 04</div>
          <Reveal as="h2" className="ds-h2">Join the club. Get in touch.</Reveal>
        </div>

        <div id="partner-contact" className="ds-contact">
          <Reveal>
            <div className={`ds-field${highlighted ? ' is-hl' : ''}`}>
              <span className="ds-label">Mail</span>
              <a href="mailto:astra@bmsit.in">astra@bmsit.in</a>
            </div>
            <div className="ds-field">
              <span className="ds-label">Club location</span>
              <a href="https://maps.google.com/?q=BMS+Institute+of+Technology+and+Management" target="_blank" rel="noopener noreferrer">{ADDRESS}</a>
            </div>
            <div className={`ds-field${highlighted ? ' is-hl' : ''}`}>
              <span className="ds-label">Point of contact</span>
              {people.map((p) => (
                <div className="ds-poc" key={p.name}>
                  <span>{p.name}</span>
                  <a href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a>
                </div>
              ))}
            </div>
            <div className="ds-field">
              <span className="ds-label">Follow</span>
              <div className="ds-socials">
                {socials.map((s) => (
                  <a key={s.label} className="ds-pill" href={s.href} target="_blank" rel="noopener noreferrer">{s.icon}{s.label}</a>
                ))}
              </div>
            </div>
            <a className="ds-btn ds-btn--accent" style={{ marginTop: 32, minHeight: 54, padding: '0 30px' }} href="mailto:astra@bmsit.in">Email ASTRA</a>
          </Reveal>

          <Reveal className="ds-map" delay={0.1}>
            <div className="ds-map-bar">
              <b><i />13.1341° N &nbsp;/&nbsp; 77.5694° E</b>
              <div className="ds-seg" role="group" aria-label="Map type">
                <button className={mapType === 'roadmap' ? 'on' : ''} onClick={() => setMapType('roadmap')}>Map</button>
                <button className={mapType === 'satellite' ? 'on' : ''} onClick={() => setMapType('satellite')}>Satellite</button>
              </div>
            </div>
            <div className="ds-map-frame"><CampusMap mapType={mapType} /></div>
            <div className="ds-map-foot">
              <p>{ADDRESS}</p>
              <a className="ds-btn" href="https://maps.app.goo.gl/358pK1GGfQsexKAw5" target="_blank" rel="noopener noreferrer">Directions <HiExternalLink /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
