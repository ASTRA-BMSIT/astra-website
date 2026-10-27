import React, { useEffect, useState } from 'react';
import { HiArrowDown, HiArrowRight, HiPlay } from 'react-icons/hi';
import Reveal from '../components/ui/reveal';
import DecodeText from '../components/ui/decode-text';

const ticker = ['DEFENCE TECHNOLOGY','AEROSPACE','AI & AUTONOMY','ROBOTICS','CYBER / RF','STRATEGIC AWARENESS'];

const stats = [
  { v: 'Sep 2025', k: 'Founded at BMSIT&M' },
  { v: '3', k: 'Focus domains' },
  { v: 'DRDO · BEL', k: 'Collaborations explored' },
];

export default function Home(){
  const [time,setTime]=useState('00:00:00');
  useEffect(()=>{const tick=()=>setTime(new Date().toLocaleTimeString('en-IN',{hour12:false}));tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
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
            <h1><DecodeText text="ASTRA." classes={{4:'dt-hl',5:'dt-dot'}} /></h1>
            <div className="hero-rule"><span>ARMED SQUAD FOR TACTICAL READINESS &amp; AWARENESS</span><i/></div>
            <h2>BUILD THE <strong>FUTURE.</strong></h2>
            <p>A student defence-tech collective turning engineering into real systems — from autonomous machines and aerospace platforms to AI, RF and cyber.</p>
            <div className="hero-actions"><button className="btn-primary" onClick={()=>go('about')}><HiPlay/> EXPLORE ASTRA</button><button className="btn-secondary" onClick={()=>go('domains')}>EXPLORE DOMAINS <HiArrowRight/></button></div>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><button onClick={()=>go('about')}><HiArrowDown/></button><span>01 / MISSION PROFILE</span><span>02 / DOMAINS</span><span>03 / REGISTER</span></div>
      </section>
    </div>
    <div className="ds-ticker" aria-hidden="true"><div>{[...ticker,...ticker].map((x,i)=><React.Fragment key={i}><span>{x}</span><i>/</i></React.Fragment>)}</div></div>
    <section className="ds-section" id="mission">
      <div className="ds-wrap">
        <div className="ds-stamp">Mission<i>.</i></div>
        <div className="ds-split">
          <div className="ds-label"><b>01</b>/ 04</div>
          <div>
            <Reveal><p className="ds-lead">ASTRA gives students a place to move beyond theory and <em>build systems that matter.</em></p></Reveal>
            <Reveal delay={0.1}><p className="ds-body" style={{marginTop:28}}>A student-led defence technology collective at BMS Institute of Technology and Management — hands-on projects, expert sessions and strategic dialogue across the technologies shaping modern defence.</p></Reveal>
            <Reveal delay={0.15}><button className="ds-link" onClick={()=>go('about')}>About the club <HiArrowRight/></button></Reveal>
            <Reveal delay={0.1} className="ds-stats">{stats.map(s=><div className="ds-stat" key={s.k}><b>{s.v}</b><span>{s.k}</span></div>)}</Reveal>
          </div>
        </div>
      </div>
    </section>
  </>;
}
