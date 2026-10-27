import React from 'react';
import Reveal from '../components/ui/reveal';
import { GiArtificialIntelligence, GiProcessor, GiDeliveryDrone } from 'react-icons/gi';

const domains = [
  { title: 'AI & Machine Learning', icon: <GiArtificialIntelligence />, desc: 'Target recognition, predictive analytics and intelligent command systems.' },
  { title: 'Embedded Systems', icon: <GiProcessor />, desc: 'The compact computing behind advanced sensors and telemetry.' },
  { title: 'UAVs & Drones', icon: <GiDeliveryDrone />, desc: 'Multi-rotors, fixed-wings and swarming tech for recon and logistics.' },
];

const Event = () => (
  <section className="ds-section" id="domains">
    <div className="ds-wrap">
      <div className="ds-stamp">Domains<i>.</i></div>
      <div className="ds-label"><b>03</b>/ 04</div>
      <Reveal as="h2" className="ds-h2 ds-h2--flush">Three focus areas.</Reveal>
      <Reveal delay={0.1}>
        <p className="ds-body" style={{ marginTop: 20 }}>Hands-on learning in the technologies shaping modern defence.</p>
      </Reveal>

      <ol className="ds-route">
        {domains.map((d, i) => (
          <Reveal as="li" className="ds-route-card" key={d.title} delay={i * 0.08}>
            <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="ico">{d.icon}</span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Event;
