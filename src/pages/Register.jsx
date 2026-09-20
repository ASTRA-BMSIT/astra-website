import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const APPLY_URL = 'https://forms.gle/EALvMDj2SKFrY9jXA';

const Register = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className="hiring-section"
      id="register"
    >
      <div className="hiring-topline">
        <span>03 / JOIN ASTRA</span>
        <span>OPEN INTAKE // 2026</span>
      </div>

      <div className="hiring-grid">
        <div className="hiring-copy">
          <span className="hiring-kicker">ASTRA // RECRUITMENT</span>
          <h2>
            WE ARE <span>HIRING.</span>
          </h2>
          <p>
            Build with us. Join a student-led defence-tech collective working across aerospace,
            robotics, AI/ML and cyber/RF.
          </p>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hiring-apply"
          >
            APPLY HERE <HiArrowRight />
          </a>
        </div>

        <div className="hiring-panel" aria-label="ASTRA recruitment information">
          <div className="hiring-panel-head">
            <span>APPLICATION PORTAL</span>
            <b><i /> OPEN</b>
          </div>
          <div className="hiring-scan" />
          <div className="hiring-panel-body">
            <div className="hiring-mark">A</div>
            <div>
              <strong>READY TO BUILD?</strong>
              <span>Applications are open. The form opens directly in a new tab.</span>
            </div>
          </div>
          <div className="hiring-panel-foot">
            <span>NO INTERMEDIATE STEPS</span>
            <span>SECURE EXTERNAL FORM ↗</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Register;
