import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown, HiArrowRight, HiPlay } from 'react-icons/hi';
import { GiBrain, GiDeliveryDrone, GiSatelliteCommunication, GiRobotLeg } from 'react-icons/gi';
import LiquidMetalBackdrop from '../components/LiquidMetalBackdrop';
import HyperText from '../components/ui/HyperText';
import ShimmerButton from '../components/ui/ShimmerButton';
import TiltCard from '../components/ui/TiltCard';
import MagicCard from '../components/ui/MagicCard';

/* ── Domain data ──────────────────────────────────────────── */
const domains = [
  { no:'01', code:'AERO',  title:'AEROSPACE',  icon: GiDeliveryDrone,         desc:'UAVs, flight systems, propulsion and autonomous platforms.', metric:'FLIGHT SYSTEMS', value:'84%' },
  { no:'02', code:'ROBO',  title:'ROBOTICS',   icon: GiRobotLeg,              desc:'Embedded control, sensing, actuation and intelligent machines.', metric:'AUTONOMY', value:'76%' },
  { no:'03', code:'AIML',  title:'AI / ML',    icon: GiBrain,                 desc:'Vision, edge intelligence and autonomous decision systems.', metric:'EDGE AI', value:'91%' },
  { no:'04', code:'COMMS', title:'CYBER / RF',  icon: GiSatelliteCommunication, desc:'Secure networks, RF systems and strategic communications.', metric:'SIGNAL', value:'88%' },
];

/* ── Multi-speed parallax hook ────────────────────────────── */
function useParallax(ref, speed = 0.3) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);
  return y;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [time,   setTime  ] = useState('00:00:00');
  const [heroIn,  setHeroIn ] = useState(false);     // triggers HyperText
  const heroRef   = useRef(null);
  const missionRef = useRef(null);

  // Live clock
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fire hero kinetic text after 400ms mount delay
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Parallax Y for the hero visual column (moves slower than scroll)
  const heroVisualY = useParallax(heroRef, 0.18);
  // Parallax for the grid overlay (moves even slower)
  const gridY = useParallax(heroRef, 0.06);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const ActiveIcon = domains[active].icon;

  return (
    <>
      <div id="home" className="astra-pro">
        {/* ══════════════════════════════════════════════
            HERO SECTION — Joby-inspired kinetic layout
            ══════════════════════════════════════════ */}
        <section className="pro-hero" ref={heroRef} style={{ overflow: 'hidden' }}>
          <LiquidMetalBackdrop className="liquid-metal--hero" />

          {/* Parallax grid layer — moves at 0.06× scroll speed */}
          <motion.div
            className="hero-grid-pro"
            style={{ y: gridY }}
            aria-hidden="true"
          />

          {/* Coordinate meta — top corners */}
          <div className="hero-meta left">
            ASTRA / NX-01<br />
            <b>DEFENCE R&amp;D COLLECTIVE</b>
          </div>
          <div className="hero-meta right">
            BMSIT&amp;M // BENGALURU<br />
            <b>13.1341° N / 77.5694° E</b>
          </div>

          {/* ── Two-column hero layout ─────────────── */}
          <div className="hero-layout">

            {/* LEFT — Text column */}
            <div className="hero-main">
              {/* Eyebrow status bar */}
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <i />
                SYSTEM ONLINE&nbsp;
                <b style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
                  {time}
                </b>
              </motion.div>

              {/* ── KINETIC HEADLINE — HyperText scramble reveal ── */}
              <h1
                style={{
                  margin: '26px 0 12px',
                  font: `700 clamp(5.3rem,13.8vw,13.5rem)/.78 var(--font-display)`,
                  letterSpacing: '-0.105em',
                  color: 'var(--ivory)',
                }}
              >
                <HyperText
                  text="ASTR"
                  trigger={heroIn}
                  charDelay={55}
                  duration={600}
                  delay={200}
                />
                <span style={{ color: 'var(--gold)' }}>
                  <HyperText
                    text="A"
                    trigger={heroIn}
                    charDelay={55}
                    duration={600}
                    delay={200 + 4 * 55}
                  />
                </span>
                <em style={{ fontStyle: 'normal', color: 'var(--cream)', fontSize: '0.45em' }}>
                  <HyperText
                    text="."
                    trigger={heroIn}
                    charDelay={55}
                    duration={400}
                    delay={200 + 5 * 55}
                  />
                </em>
              </h1>

              {/* Rule line */}
              <motion.div
                className="hero-rule"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <span>ARMED SQUAD FOR TACTICAL READINESS &amp; AWARENESS</span>
                <i />
              </motion.div>

              {/* Sub-headline */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                BUILD THE <strong>FUTURE.</strong>
              </motion.h2>

              {/* Body copy */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25 }}
                style={{ maxWidth: '610px', margin: 0, color: 'var(--muted)' }}
              >
                A student defence-tech collective turning engineering into real systems — from
                autonomous machines and aerospace platforms to AI, RF and cyber.
              </motion.p>

              {/* CTA row — ShimmerButton primary + outline secondary */}
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <ShimmerButton
                  onClick={() => go('register')}
                  shimmerColor="rgba(243,211,139,0.55)"
                  borderColor="rgba(243,211,139,0.6)"
                >
                  <HiPlay style={{ fontSize: '14px' }} />
                  INITIATE MISSION
                </ShimmerButton>

                <button
                  className="btn-secondary"
                  onClick={() => go('domains')}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                >
                  EXPLORE DOMAINS <HiArrowRight />
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.6 }}
              >
                <div><small>DOMAINS</small><b>04</b></div>
                <div><small>PROJECTS</small><b>10+</b></div>
                <div><small>MISSION</small><b>BUILD</b></div>
              </motion.div>
            </div>

            {/* RIGHT — Status panel (parallax, slower scroll) */}
            <motion.div
              className="hero-flight"
              style={{ y: heroVisualY }}
            >
              <TiltCard maxTilt={6} scale={1.01}>
                <div className="status-panel" aria-label="Mission control status">
                  <div className="status-panel-head">
                    <span>NX-01 // MISSION CONTROL</span>
                    <b><i /> ONLINE</b>
                  </div>
                  <div className="status-panel-body">
                    <div className="status-emblem">
                      <span>A</span><small>ASTRA</small>
                    </div>
                    <div className="status-copy">
                      <small>ORBITAL DEFENCE NETWORK</small>
                      <strong>SECURE LINK<br />ESTABLISHED</strong>
                      <div className="status-line"><span>NODE</span><b>BLR-01</b></div>
                      <div className="status-line"><span>ALTITUDE</span><b>408 KM</b></div>
                      <div className="status-line"><span>READINESS</span><b>94%</b></div>
                    </div>
                  </div>
                  <div className="status-panel-foot">
                    <span>VECTOR  /  18.4°</span>
                    <span>TRACKING  /  ACTIVE</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Bottom status bar */}
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <button onClick={() => go('about')}><HiArrowDown /></button>
            <span>01 / MISSION PROFILE</span>
            <span>02 / DOMAINS</span>
            <span>03 / REGISTER</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            MARQUEE — scroll-velocity tech domains
            ══════════════════════════════════════════ */}
        <div className="pro-marquee">
          <div>
            {['DEFENCE TECHNOLOGY','AEROSPACE','AI & AUTONOMY','ROBOTICS','CYBER / RF','STRATEGIC AWARENESS','PROPULSION','TELEMETRY'].map((x, i) => (
              <span key={i}>{x}<b>◆</b></span>
            ))}
            {/* Duplicate for seamless loop */}
            {['DEFENCE TECHNOLOGY','AEROSPACE','AI & AUTONOMY','ROBOTICS','CYBER / RF','STRATEGIC AWARENESS','PROPULSION','TELEMETRY'].map((x, i) => (
              <span key={`d${i}`}>{x}<b>◆</b></span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MISSION SECTION — with rotating jet video
            ══════════════════════════════════════════ */}
        <motion.section
          ref={missionRef}
          className="mission-pro holographic-section reveal"
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag">01 <span>MISSION PROFILE</span></div>
          <div className="mission-grid">
            <div>
              <p className="display-line">
                ENGINEERING<br /><strong>WITH PURPOSE.</strong>
              </p>
              <p className="muted">
                ASTRA is built around one idea: give students a place to move beyond theory
                and build systems that matter.
              </p>
              <button
                className="text-link"
                onClick={() => go('contact')}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}
              >
                MEET THE COLLECTIVE <HiArrowRight />
              </button>
            </div>

            {/* Jet video hologram */}
            <TiltCard maxTilt={4} scale={1.005} glare>
              <div className="mission-jet-visual">
                <video
                  className="mission-jet-video"
                  src="/rotating_jet.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/astra-logo.svg"
                  aria-label="Rotating jet hologram"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </TiltCard>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════
            DOMAINS CONSOLE — MagicCard + TiltCard
            ══════════════════════════════════════════ */}
        <motion.section
          className="domains-pro holographic-section"
          id="domains"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag">02 <span>MISSION DOMAINS</span></div>
          <div className="domain-head">
            <h2>CHOOSE YOUR<br /><strong>VECTOR.</strong></h2>
            <p>Select a domain. The system will load its focus profile.</p>
          </div>

          <div className="domain-console">
            {/* Sidebar list */}
            <div className="domain-list">
              {domains.map((d, i) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.code}
                    className={active === i ? 'active' : ''}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span>{d.no}</span>
                    <Icon />
                    <div><b>{d.title}</b><small>{d.code}</small></div>
                    <HiArrowRight />
                  </button>
                );
              })}
            </div>

            {/* Detail panel — MagicCard spotlight */}
            <MagicCard
              className="domain-detail"
              spotlightColor="rgba(243,211,139,0.10)"
              style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '25px', alignItems: 'center' }}
            >
              <TiltCard maxTilt={5} scale={1.02}>
                <div className="domain-orbit">
                  <div className="domain-icon"><ActiveIcon /></div>
                  <span>ASTRA / {domains[active].code}</span>
                </div>
              </TiltCard>

              <div>
                <small>ACTIVE VECTOR</small>
                <h3>{domains[active].title}</h3>
                <p>{domains[active].desc}</p>
                <div className="meter">
                  <span style={{ width: domains[active].value }} />
                </div>
                <div className="detail-foot">
                  <b>{domains[active].value}</b>
                  <span>{domains[active].metric}</span>
                </div>
              </div>
            </MagicCard>
          </div>
        </motion.section>
      </div>
    </>
  );
}
