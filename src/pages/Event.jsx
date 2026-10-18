import React from 'react';
import { motion } from 'framer-motion';
import { 
  GiRobotLeg, 
  GiArtificialIntelligence, 
  GiLockSpy, 
  GiCctvCamera, 
  GiProcessor, 
  GiRadarSweep, 
  GiDeliveryDrone,
} from 'react-icons/gi';
import TiltCard from '../components/ui/TiltCard';
import MagicCard from '../components/ui/MagicCard';

const Event = () => {
  const domains = [
    { title: "Robotics & Autonomous Systems in Defence Technology", icon: <GiRobotLeg />, desc: "UGVs, rescue robots, and automated surveillance systems. Emphasis on navigation in unstructured environments and task automation." },
    { title: "AI & Machine Learning in Defence Technology", icon: <GiArtificialIntelligence />, desc: "Predictive analytics, target recognition, and intelligent command systems. Using data to stay three steps ahead of the adversary." },
    { title: "Cybersecurity & Ethical Hacking in Defence Technology", icon: <GiLockSpy />, desc: "Offensive and defensive digital operations. Securing communication channels and protecting critical national assets from digital threats." },
    { title: "IoT & Smart Surveillance in Defence Technology", icon: <GiCctvCamera />, desc: "Networked sensor arrays, smart perimeters, and wearable tech for soldiers. Enhancing situational awareness through connectivity." },
    { title: "Embedded Systems in Defence Technology", icon: <GiProcessor />, desc: "High-performance computing in compact form factors. Designing the brains behind advanced sensors, munitions, and telemetry." },
    { title: "Communication Technologies in Defence Technology", icon: <GiRadarSweep />, desc: "SDRs, encrypted protocols, and jam-resistant signals. Ensuring reliable communication in electronic warfare scenarios." },
    { title: "UAVs & Drones in Defence Technology", icon: <GiDeliveryDrone />, desc: "Multi-rotors, fixed-wings, and swarming tech for recon and logistics. Redefining aerial superiority through student-led innovation." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20 holographic-section holographic-grid-zone"
      id="domains"
    >
      {/* Overview */}
      <section className="mb-24 text-center max-w-3xl mx-auto">
        <span className="label-badge text-accent-orange mb-4 block">Technical Focus Areas</span>
        <h1 className="text-4xl md:text-5xl font-orbitron mb-8">ASTRA DOMAINS</h1>
        <p className="text-text-muted text-lg leading-relaxed font-inter">
          ASTRA brings together students interested in the technologies shaping modern defence and strategic systems. Our domains provide a starting point for hands-on learning, interdisciplinary collaboration, and responsible innovation.
        </p>
      </section>

      {/* Domain Cards */}
      <section className="mb-32">
        <h2 className="text-2xl font-orbitron mb-12 border-l-4 border-accent-orange pl-4">AREAS OF EXPLORATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, idx) => (
            <TiltCard key={idx} maxTilt={7} scale={1.03}>
              <MagicCard
                className="bg-bg-surface border border-custom-border p-8 hover:border-accent-orange transition-all group h-full"
                spotlightColor="rgba(243,211,139,0.10)"
                borderColor="rgba(243,211,139,0.6)"
              >
                <div className="text-4xl text-accent-orange mb-6 group-hover:scale-110 transition-transform" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(16px)' }}>
                  {domain.icon}
                </div>
                <h3 className="text-xl font-sora uppercase tracking-badge mb-4 text-text-primary">
                  {domain.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed border-t border-custom-border pt-4">
                  {domain.desc}
                </p>
              </MagicCard>
            </TiltCard>
          ))}
        </div>
      </section>

    </motion.div>
  );
};

export default Event;
