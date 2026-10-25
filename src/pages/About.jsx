import React from 'react';
import TeamRoster from '../components/ui/team-roster';
import Reveal from '../components/ui/reveal';
import { GiSatelliteCommunication, GiPublicSpeaker } from 'react-icons/gi';
import { HiFire } from 'react-icons/hi';

const galleryImages = Array.from({ length: 16 }, (_, i) => `/gallery/gallery_${i + 1}.jpeg`);

const activities = [
  'Technical workshops and hands-on sessions',
  'Defence-focused hackathons and competitions',
  'Strategic discussions and defence dialogues',
  'Project-based development initiatives',
];

const flagships = [
  { name: 'ASTRA Defence Tech Expo', icon: <GiSatelliteCommunication /> },
  { name: 'National Level Defence Hackathon', icon: <HiFire /> },
  { name: 'Annual Defence Dialogue', icon: <GiPublicSpeaker /> },
];

const teamMembers = [
  { name: 'Vaibhav Pandey', role: 'President', photo: '/team_heads/ID CARD_page-0008.jpg' },
  { name: 'Sharath Y Kudachi', role: 'Vice President', photo: '/team_heads/ID CARD_page-0015.jpg' },
  { name: 'Rakshak M. K.', role: 'Chief Secretary', photo: '/team_heads/ID CARD_page-0017.jpg' },
  { name: 'Sagar Sahoo', role: 'Secretary', photo: '/team_heads/ID CARD_page-0006.jpg' },
  { name: 'Sushant Bichha', role: 'Treasurer', photo: '/team_heads/ID CARD_page-0013.jpg' },
  { name: 'Reyyi Shreyash', role: 'Technical Team Head', photo: '/team_heads/ID CARD_page-0019.jpg' },
  { name: 'Varnika Kirani', role: 'Tech. Team Vice Head', photo: '/team_heads/ID CARD_page-0009.jpg' },
  { name: 'Arshad Alam', role: 'Event Team Head', photo: '/team_heads/ID CARD_page-0011.jpg' },
  { name: 'Rakshitha G', role: 'Event Team Vice Head', photo: '/team_heads/ID CARD_page-0016.jpg' },
  { name: 'Sneha C.', role: 'Media Team Head', photo: '/team_heads/ID CARD_page-0001.jpg' },
  { name: 'Siddhartha Patel', role: 'Media Team Vice Head', photo: '/team_heads/ID CARD_page-0007.jpg' },
  { name: 'Prarthana Dilip', role: 'Marketing Team Head', photo: '/team_heads/ID CARD_page-0003.jpg' },
  { name: 'Rakshitha Bhat', role: 'Marketing Team Vice Head', photo: '/team_heads/ID CARD_page-0018.jpg' },
];

const roster = teamMembers.map((m) => ({ ...m, focus: '50% 20%' }));
const pad = (n) => String(n + 1).padStart(2, '0');

const About = () => (
  <>
    <section className="ds-section" id="about">
      <div className="ds-wrap">
        <div className="ds-stamp">About<i>.</i></div>
        <div className="ds-split">
          <div className="ds-label"><b>02</b>/ 04</div>
          <Reveal as="h2" className="ds-h2">A student-led defence technology club.</Reveal>
        </div>

        <div className="ds-about-intro">
          <Reveal>
            <p className="ds-body"><strong>ASTRA (Armed Squad for Tactical Readiness and Awareness)</strong> is a student-led defence technology club at BMS Institute of Technology and Management, Bengaluru, established on 23 September 2025.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="ds-body">The club is focused on building interest, awareness, and practical expertise in modern defence and strategic technologies. ASTRA aims to bridge the gap between academic learning and real-world defence applications by promoting hands-on development, interdisciplinary collaboration, and industry-oriented exposure.</p>
          </Reveal>
        </div>

        {/* Vision & industry */}
        <div className="ds-sub">
          <div className="ds-sub-head"><h3>Vision &amp; reach</h3><span className="ds-label">Approach</span></div>
          <div className="ds-cols">
            <Reveal className="ds-col">
              <h4>Vision &amp; Approach</h4>
              <p>The club promotes a strong foundation in both technical innovation and strategic awareness, encouraging students to think beyond conventional engineering and work on solutions aligned with national security needs.</p>
              <p>ASTRA also focuses on responsible and ethical innovation, ensuring that advancements in defence technology are aligned with global standards and frameworks.</p>
            </Reveal>
            <Reveal className="ds-col" delay={0.1}>
              <h4>Industry &amp; Exposure</h4>
              <p>ASTRA actively works towards connecting students with the defence ecosystem by exploring collaborations with organizations such as <strong>DRDO and BEL</strong>, providing insights into real-world defence production and research environments.</p>
            </Reveal>
          </div>
        </div>

        {/* Activities & flagships */}
        <div className="ds-sub">
          <div className="ds-cols" style={{ marginTop: 0 }}>
            <Reveal className="ds-col">
              <div className="ds-sub-head"><h3>Activities</h3></div>
              <ul className="ds-rows">
                {activities.map((a, i) => (
                  <li key={a}><span className="n">{pad(i)}</span><span className="t">{a}</span><span /></li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="ds-col" delay={0.1}>
              <div className="ds-sub-head"><h3>Flagship initiatives</h3></div>
              <ul className="ds-rows">
                {flagships.map((f, i) => (
                  <li key={f.name}><span className="n">{pad(i)}</span><span className="t">{f.name}</span>{f.icon}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Gallery */}
        <div className="ds-gallery">
          <div className="ds-sub-head" style={{ marginBottom: 32 }}><h3>Event gallery</h3><span className="ds-label">Visual archive</span></div>
          <div className="ds-gallery-track">
            {[...galleryImages, ...galleryImages].map((src, i) => (
              <div className="ds-shot" key={i}><img src={src} alt={`ASTRA event ${(i % galleryImages.length) + 1}`} loading="lazy" /></div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div id="team">
      <TeamRoster members={roster} eyebrow="Meet" title="Our Team" intro="The students who lead ASTRA across technical, events, media and marketing." />
    </div>
  </>
);

export default About;
