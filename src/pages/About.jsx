import React from 'react';
import TeamRoster from '../components/ui/team-roster';
import { motion } from 'framer-motion';
import { GiShield, GiDeliveryDrone, GiRobotLeg, GiSecurityGate, GiBrain, GiSatelliteCommunication, GiTrophy, GiPublicSpeaker } from 'react-icons/gi';
import { HiLightningBolt, HiChip, HiGlobe, HiAcademicCap, HiFire, HiShieldCheck } from 'react-icons/hi';

const About = () => {
  const galleryImages = [
    "/gallery/gallery_1.jpeg",
    "/gallery/gallery_2.jpeg",
    "/gallery/gallery_3.jpeg",
    "/gallery/gallery_4.jpeg",
    "/gallery/gallery_5.jpeg",
    "/gallery/gallery_6.jpeg",
    "/gallery/gallery_7.jpeg",
    "/gallery/gallery_8.jpeg",
    "/gallery/gallery_9.jpeg",
    "/gallery/gallery_10.jpeg",
    "/gallery/gallery_11.jpeg",
    "/gallery/gallery_12.jpeg",
    "/gallery/gallery_13.jpeg",
    "/gallery/gallery_14.jpeg",
    "/gallery/gallery_15.jpeg",
    "/gallery/gallery_16.jpeg",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const teamMembers = [
    { name: "Vaibhav Pandey", role: "President", photo: "/team_heads/ID CARD_page-0008.jpg" },
    { name: "Sharath Y Kudachi", role: "Vice President", photo: "/team_heads/ID CARD_page-0015.jpg" },
    { name: "Rakshak M. K.", role: "Chief Secretary", photo: "/team_heads/ID CARD_page-0017.jpg" },
    { name: "Sagar Sahoo", role: "Secretary", photo: "/team_heads/ID CARD_page-0006.jpg" },
    { name: "Sushant Bichha", role: "Treasurer", photo: "/team_heads/ID CARD_page-0013.jpg" },
    { name: "Reyyi Shreyash", role: "Technical Team Head", photo: "/team_heads/ID CARD_page-0019.jpg" },
    { name: "Varnika Kirani", role: "Tech. Team Vice Head", photo: "/team_heads/ID CARD_page-0009.jpg" },
    { name: "Arshad Alam", role: "Event Team Head", photo: "/team_heads/ID CARD_page-0011.jpg" },
    { name: "Rakshitha G", role: "Event Team Vice Head", photo: "/team_heads/ID CARD_page-0016.jpg" },
    { name: "Sneha C.", role: "Media Team Head", photo: "/team_heads/ID CARD_page-0001.jpg" },
    { name: "Siddhartha Patel", role: "Media Team Vice Head", photo: "/team_heads/ID CARD_page-0007.jpg" },
    { name: "Prarthana Dilip", role: "Marketing Team Head", photo: "/team_heads/ID CARD_page-0003.jpg" },
    { name: "Rakshitha Bhat", role: "Marketing Team Vice Head", photo: "/team_heads/ID CARD_page-0018.jpg" },
  ];

  const roster = teamMembers.map((m) => ({ ...m, focus: '50% 20%' }));

  return (
    <>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20 holographic-section"
      id="about"
    >
      {/* Section B - ASTRA Club Detailed */}
      <motion.section variants={containerVariants}>
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="label-badge text-accent-ember mb-4 block">Operation Awareness</span>
          <h2 className="text-4xl md:text-6xl font-orbitron mb-4 font-black italic tracking-tighter">ABOUT <span className="text-accent-red">ASTRA CLUB</span></h2>
          <div className="h-1 w-24 bg-accent-red mx-auto mb-8" />
        </motion.div>

        {/* Intro */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-8 mb-24">
          <div className="bg-bg-surface border border-custom-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <GiShield className="text-[10rem] -rotate-12" />
            </div>
            <p className="text-xl text-text-primary font-inter leading-relaxed relative z-10">
              ASTRA (Armed Squad for Tactical Readiness and Awareness) is a student-led defence technology club at <span className="text-accent-red font-bold font-orbitron">BMS Institute of Technology and Management</span>, Bengaluru, established on 23 September 2025.
            </p>
            <p className="text-lg text-text-muted font-inter leading-relaxed mt-6 relative z-10">
              The club is focused on building interest, awareness, and practical expertise in modern defence and strategic technologies. ASTRA aims to bridge the gap between academic learning and real-world defence applications by promoting hands-on development, interdisciplinary collaboration, and industry-oriented exposure.
            </p>
          </div>
        </motion.div>

        {/* What We Do */}
        <div className="mb-32 holographic-grid-zone">
          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-12 justify-center">
            <div className="h-[2px] w-12 bg-accent-red" />
            <h3 className="text-3xl font-orbitron tracking-widest text-text-primary uppercase">What We Do</h3>
            <div className="h-[2px] w-12 bg-accent-red" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <GiDeliveryDrone />, title: "Tactical Systems", text: "Development of defence-oriented projects such as autonomous UAV systems and surveillance technologies." },
              { icon: <HiLightningBolt />, title: "Expert Intelligence", text: "Workshops, guest lectures, and technical sessions with experts from defence and industry." },
              { icon: <HiChip />, title: "Tech Exploration", text: "Exploration of domains like artificial intelligence, cybersecurity, aerospace, and robotics." },
              { icon: <HiGlobe />, title: "Strategic Dialogue", text: "Discussions on emerging global security challenges and defence strategies." }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-bg-elevated border border-custom-border p-8 flex space-x-6 group hover:border-accent-red/50 transition-all"
              >
                <div className="w-16 h-16 shrink-0 border border-accent-red/30 flex items-center justify-center text-3xl text-accent-red group-hover:bg-accent-red/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-orbitron text-lg text-text-primary mb-3 tracking-wider uppercase">{item.title}</h4>
                  <p className="text-text-muted font-inter text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision & Industry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
          <motion.div variants={itemVariants} className="bg-bg-surface border-l-4 border-accent-red/60 p-10">
            <div className="flex items-center space-x-3 mb-6">
              <HiAcademicCap className="text-accent-red text-xl" />
              <h3 className="font-orbitron text-xl text-text-primary tracking-widest">VISION & APPROACH</h3>
            </div>
            <p className="text-text-muted font-inter leading-relaxed">
              The club promotes a strong foundation in both technical innovation and strategic awareness, encouraging students to think beyond conventional engineering and work on solutions aligned with national security needs.
            </p>
            <p className="text-text-muted font-inter leading-relaxed mt-4">
              ASTRA also focuses on responsible and ethical innovation, ensuring that advancements in defence technology are aligned with global standards and frameworks.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-bg-surface border-l-4 border-accent-ember/60 p-10">
            <div className="flex items-center space-x-3 mb-6">
              <HiShieldCheck className="text-accent-ember text-xl" />
              <h3 className="font-orbitron text-xl text-text-primary tracking-widest">INDUSTRY & EXPOSURE</h3>
            </div>
            <p className="text-text-muted font-inter leading-relaxed">
              ASTRA actively works towards connecting students with the defence ecosystem by exploring collaborations with organizations such as <span className="text-text-primary font-bold">DRDO and BEL</span>, providing insights into real-world defence production and research environments.
            </p>
          </motion.div>
        </div>

        {/* Activities & Initiatives */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-orbitron text-text-primary mb-8 border-b border-custom-border pb-4 font-black italic">ACTIVITIES</h3>
              <ul className="space-y-6">
                {[
                  "Technical workshops and hands-on sessions",
                  "Defence-focused hackathons and competitions",
                  "Strategic discussions and defence dialogues",
                  "Project-based development initiatives"
                ].map((act, i) => (
                  <li key={i} className="flex items-center space-x-4 group">
                    <div className="w-1.5 h-1.5 bg-accent-red group-hover:scale-150 transition-transform" />
                    <span className="font-rajdhani text-lg font-bold tracking-widest text-text-muted group-hover:text-text-primary transition-colors uppercase">{act}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-orbitron text-accent-red mb-8 border-b border-accent-red/30 pb-4 font-black italic">FLAGSHIP INITIATIVES</h3>
              <div className="space-y-6">
                {[
                  { name: "ASTRA Defence Tech Expo", icon: <GiSatelliteCommunication /> },
                  { name: "National Level Defence Hackathon", icon: <HiFire /> },
                  { name: "Annual Defence Dialogue", icon: <GiPublicSpeaker /> }
                ].map((flag, i) => (
                  <div key={i} className="flex items-center space-x-6 p-4 bg-bg-surface border border-accent-red/10 hover:border-accent-red/40 transition-all">
                    <div className="text-2xl text-accent-red">{flag.icon}</div>
                    <span className="font-orbitron text-sm text-text-primary tracking-wider uppercase">{flag.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final Mission */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center border border-accent-red/30 p-12 bg-bg-surface relative mb-32">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent-red" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent-red" />
          <span className="label-badge text-accent-red mb-4 block">Strategic Objective</span>
          <h3 className="text-2xl font-orbitron text-text-primary mb-6">OUR MISSION</h3>
          <p className="text-xl text-text-primary font-inter italic leading-relaxed max-w-2xl mx-auto">
            "To develop technically skilled and strategically aware engineers who can contribute meaningfully to defence, aerospace, and national technology ecosystems."
          </p>
        </motion.div>
      </motion.section>

      {/* Section C - Mission Gallery */}
      <section className="mb-32 overflow-hidden">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="label-badge text-accent-red mb-4 block">Visual Archive</span>
          <h2 className="text-4xl md:text-5xl font-orbitron mb-4">Event Gallery</h2>
        </motion.div>

        <div className="relative flex w-full">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }
            }}
            className="flex space-x-8 min-w-max pb-10"
          >
            {[...galleryImages, ...galleryImages].map((imgUrl, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.95 }}
                className="w-[400px] h-64 bg-bg-surface border border-custom-border group relative overflow-hidden flex-shrink-0 transition-all duration-700"
              >
                <img
                  src={imgUrl}
                  alt={`Event Image ${idx}`}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </motion.div>
    <div id="team"><TeamRoster members={roster} eyebrow="Meet" title="Our Team" intro="The students who lead ASTRA across technical, events, media and marketing." /></div>
    </>
  );
};

export default About;
