import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { HiMail, HiLocationMarker, HiExternalLink } from 'react-icons/hi';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const [mapType, setMapType] = useState('roadmap');
  const location = useLocation();
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (location.hash === '#partner-contact') {
      setHighlighted(true);
      const element = document.getElementById('partner-contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Remove highlight after a few seconds
      const timer = setTimeout(() => {
        setHighlighted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const contactInfo = [
    {
      icon: <HiMail className="text-3xl text-accent-orange" />,
      label: "MAIL ID",
      value: "astra@bmsit.in",
      link: "mailto:astra@bmsit.in"
    },
    {
      icon: <HiLocationMarker className="text-3xl text-accent-orange" />,
      label: "Club Location",
      value: "BMS Institute of Technology and Management, Yelahanka New Town, Bengaluru – 560064, Karnataka",
      link: "https://maps.google.com/?q=BMS+Institute+of+Technology+and+Management"
    }
  ];

  const socials = [
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/astra.club.bmsit/" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/company/110203875/" },
    { icon: <FaWhatsapp />, label: "Whatsapp", href: "https://chat.whatsapp.com/Gql6zNG43NZ1By19sARbC5" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20 holographic-section"
      id="contact"
    >
      <div className="text-center mb-16">
        <span className="label-badge text-accent-orange mb-4 block">Communication Channels</span>
        <h1 className="text-4xl md:text-5xl font-orbitron mb-8 tracking-widest">CONTACT </h1>
        <div className="h-1 w-24 bg-accent-orange mx-auto" />
      </div>

      <div id="partner-contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
        {/* Left Column - Contact Details */}
        <div className="space-y-12">
          {contactInfo.map((info, idx) => (
            <motion.div 
              key={idx} 
              animate={highlighted && info.label === "MAIL ID" ? { 
                scale: [1, 1.05, 1],
                borderColor: ['#2A2A2A', '#FF6B00', '#2A2A2A'],
                boxShadow: ['0 0 0px rgba(255,107,0,0)', '0 0 20px rgba(255,107,0,0.3)', '0 0 0px rgba(255,107,0,0)']
              } : {}}
              transition={{ duration: 2, repeat: 2 }}
              className={`flex items-start space-x-6 group p-2 rounded-lg transition-all ${highlighted && info.label === "MAIL ID" ? 'bg-accent-orange/5' : ''}`}
            >
              <div className={`w-16 h-16 border ${highlighted && info.label === "MAIL ID" ? 'border-accent-orange' : 'border-custom-border'} bg-bg-surface flex items-center justify-center group-hover:border-accent-orange transition-colors`}>
                {info.icon}
              </div>
              <div className="flex-1">
                <span className="block font-rajdhani text-sm text-accent-orange uppercase tracking-badge mb-2">{info.label}</span>
                {info.link ? (
                  <a href={info.link} className="text-xl md:text-2xl font-inter text-text-primary hover:text-accent-orange transition-colors leading-tight block">
                    {info.value}
                  </a>
                ) : (
                  <span className="text-xl md:text-2xl font-inter text-text-primary leading-tight block">
                    {info.value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          <div className="pt-8 border-t border-custom-border">
             <span className="block font-rajdhani text-sm text-text-muted uppercase tracking-badge mb-6">Social Intelligence</span>
             <div className="flex space-x-6">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    className="w-12 h-12 border border-custom-border flex items-center justify-center text-xl text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
             </div>
          </div>

          {/* Contact Numbers */}
          <motion.div 
            animate={highlighted ? { 
              scale: [1, 1.02, 1],
              boxShadow: ['0 0 0px rgba(255,107,0,0)', '0 0 30px rgba(255,107,0,0.2)', '0 0 0px rgba(255,107,0,0)']
            } : {}}
            transition={{ duration: 2, repeat: 2 }}
            className={`border ${highlighted ? 'border-accent-orange' : 'border-accent-orange/30'} bg-bg-surface relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent-orange" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent-orange" />
            <div className="px-6 py-4 border-b border-custom-border">
              <span className="label-badge text-accent-orange text-xs uppercase tracking-badge">Point of Contact</span>
            </div>
            <div className="divide-y divide-custom-border">
              {[
                { name: "Reyyi Shreyas", phones: ["+91 63668 07796"] },
                { name: "Varnika Kirani Raghavendra", phones: ["+91 99020 99899"] },
              ].map((contact, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 group hover:bg-accent-orange/5 transition-colors">
                  <span className="font-rajdhani text-text-primary uppercase tracking-badge text-sm">{contact.name}</span>
                  <div className="flex flex-col items-end space-y-1">
                    {contact.phones.map((phone, j) => (
                      <a key={j} href={`tel:${phone.replace(/\s/g, '')}`} className="font-orbitron text-sm text-accent-orange hover:text-text-primary transition-colors">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Navigation Hub */}
        <div className="relative group lg:sticky lg:top-32">

          {/* Radial glow background */}
          <div className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.08)_0%,transparent_70%)] animate-pulse" />
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(rgba(255,106,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-orange z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-orange z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-orange z-10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-orange z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-bg-surface border border-accent-orange/30 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-custom-border flex items-center justify-between">
              <div>
                <span className="label-badge text-accent-orange text-xs block mb-1">Navigation Hub</span>
                <h3 className="font-orbitron text-lg text-text-primary tracking-widest">TARGET COORDINATES</h3>
              </div>
              {/* Map / Satellite toggle */}
              <div className="flex border border-custom-border overflow-hidden text-xs font-rajdhani uppercase tracking-badge">
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`px-3 py-1.5 transition-colors ${mapType === 'roadmap' ? 'bg-accent-orange text-bg-base' : 'text-text-muted hover:text-text-primary'}`}
                >Map</button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-3 py-1.5 transition-colors ${mapType === 'satellite' ? 'bg-accent-orange text-bg-base' : 'text-text-muted hover:text-text-primary'}`}
                >Satellite</button>
              </div>
            </div>

            {/* Pulsing pin + coordinates */}
            <div className="flex items-center justify-between px-6 py-4 bg-bg-elevated border-b border-custom-border">
              <div className="flex items-center space-x-3">
                {/* Radar pulse */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-accent-orange opacity-20 animate-ping" />
                  <HiLocationMarker className="text-accent-orange text-xl relative z-10" />
                </div>
                <span className="font-orbitron text-sm text-accent-orange tracking-widest">
                  13.1341° N &nbsp;|&nbsp; 77.5694° E
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/358pK1GGfQsexKAw5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-accent-orange text-accent-orange font-rajdhani text-xs uppercase tracking-badge hover:bg-accent-orange hover:text-bg-base transition-all hover:shadow-[0_0_12px_rgba(255,106,0,0.5)]"
              >
                <span>Get Directions</span>
                <HiExternalLink />
              </a>
            </div>

            {/* Live Map iframe */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-96 overflow-hidden"
            >
              <iframe
                title="BMSIT Location"
                src={`https://www.google.com/maps?q=13.13418757546676,77.56943486545431&z=16&output=embed&t=${mapType === 'satellite' ? 'k' : 'm'}`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(10,10,10,0.6)_100%)]" />
            </motion.div>

            {/* Address footer */}
            <div className="px-6 py-4 border-t border-custom-border bg-bg-elevated">
              <p className="text-text-muted text-xs font-inter leading-relaxed">
                BMS Institute of Technology and Management, Yelahanka New Town, Bengaluru – 560064, Karnataka
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
