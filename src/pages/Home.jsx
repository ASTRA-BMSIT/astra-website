import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiArrowRight, HiPlay } from 'react-icons/hi';
import { GiBrain, GiDeliveryDrone, GiSatelliteCommunication, GiRobotLeg } from 'react-icons/gi';

const domains = [
  { no:'01', code:'AERO', title:'AEROSPACE', icon:GiDeliveryDrone, desc:'UAVs, flight systems, propulsion and autonomous platforms.', metric:'FLIGHT SYSTEMS', value:'84%' },
  { no:'02', code:'ROBO', title:'ROBOTICS', icon:GiRobotLeg, desc:'Embedded control, sensing, actuation and intelligent machines.', metric:'AUTONOMY', value:'76%' },
  { no:'03', code:'AIML', title:'AI / ML', icon:GiBrain, desc:'Vision, edge intelligence and autonomous decision systems.', metric:'EDGE AI', value:'91%' },
  { no:'04', code:'COMMS', title:'CYBER / RF', icon:GiSatelliteCommunication, desc:'Secure networks, RF systems and strategic communications.', metric:'SIGNAL', value:'88%' },
];

export default function Home(){
  const [active,setActive]=useState(0);
  const [time,setTime]=useState('00:00:00');
  useEffect(()=>{const tick=()=>setTime(new Date().toLocaleTimeString('en-IN',{hour12:false}));tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  const ActiveIcon = domains[active].icon;
  return <>
    <div id="home" className="astra-pro">
      <section className="pro-hero">
        <video className="hero-video" src="/hero-loop.mp4" autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
        <div className="hero-video-shade"/>
        <div className="hero-meta left">ASTRA / NX-01<br/><b>DEFENCE R&amp;D COLLECTIVE</b></div>
        <div className="hero-meta right">BMSIT&amp;M // BENGALURU<br/><b>13.1341° N / 77.5694° E</b></div>
        <div className="hero-layout">
          <div className="hero-main">
            <div className="eyebrow"><i/> SYSTEM ONLINE <b>{time}</b></div>
            <h1>ASTR<span>A</span><em>.</em></h1>
            <div className="hero-rule"><span>ARMED SQUAD FOR TACTICAL READINESS &amp; AWARENESS</span><i/></div>
            <h2>BUILD THE <strong>FUTURE.</strong></h2>
            <p>A student defence-tech collective turning engineering into real systems — from autonomous machines and aerospace platforms to AI, RF and cyber.</p>
            <div className="hero-actions"><button className="btn-primary" onClick={()=>go('about')}><HiPlay/> EXPLORE ASTRA</button><button className="btn-secondary" onClick={()=>go('domains')}>EXPLORE DOMAINS <HiArrowRight/></button></div>
            <div className="hero-stats"><div><small>DOMAINS</small><b>04</b></div><div><small>PROJECTS</small><b>10+</b></div><div><small>MISSION</small><b>BUILD</b></div></div>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><button onClick={()=>go('about')}><HiArrowDown/></button><span>01 / MISSION PROFILE</span><span>02 / DOMAINS</span><span>03 / REGISTER</span></div>
      </section>
      <div className="pro-marquee"><div>{['DEFENCE TECHNOLOGY','AEROSPACE','AI & AUTONOMY','ROBOTICS','CYBER / RF','STRATEGIC AWARENESS'].map((x,i)=><span key={i}>{x}<b>◆</b></span>)}</div></div>
      <motion.section className="mission-pro holographic-section" id="about" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><div className="section-tag">01 <span>MISSION PROFILE</span></div><div className="mission-grid"><div><p className="display-line">ENGINEERING<br/><strong>WITH PURPOSE.</strong></p><p className="muted">ASTRA is built around one idea: give students a place to move beyond theory and build systems that matter.</p><button className="text-link" onClick={()=>go('contact')}>MEET THE COLLECTIVE <HiArrowRight/></button></div></div></motion.section>
      <motion.section className="domains-pro holographic-section" id="domains" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><div className="section-tag">02 <span>MISSION DOMAINS</span></div><div className="domain-head"><h2>CHOOSE YOUR<br/><strong>VECTOR.</strong></h2><p>Select a domain. The system will load its focus profile.</p></div><div className="domain-console"><div className="domain-list">{domains.map((d,i)=>{const Icon=d.icon;return <button key={d.code} className={active===i?'active':''} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}><span>{d.no}</span><Icon/><div><b>{d.title}</b><small>{d.code}</small></div><HiArrowRight/></button>})}</div><div className="domain-detail"><div className="domain-orbit"><div className="domain-icon"><ActiveIcon /></div><span>ASTRA / {domains[active].code}</span></div><div><small>ACTIVE VECTOR</small><h3>{domains[active].title}</h3><p>{domains[active].desc}</p><div className="meter"><span style={{width:domains[active].value}}/></div><div className="detail-foot"><b>{domains[active].value}</b><span>{domains[active].metric}</span></div></div></div></div></motion.section>
    </div>
  </>;
}
