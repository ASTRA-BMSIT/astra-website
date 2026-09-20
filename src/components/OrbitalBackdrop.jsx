import React from 'react';

export default function OrbitalBackdrop() {
  return (
    <div className="orbital-backdrop" aria-hidden="true">
      <div className="orbital-noise" />
      <div className="orbital-system">
        <div className="bg-orbit bg-orbit-wide" />
        <div className="bg-orbit bg-orbit-inner" />
        <div className="bg-orbit bg-orbit-accent" />
        <div className="bg-earth-glow" />

        <div className="bg-earth">
          <div className="bg-earth-surface">
            <div className="bg-earth-lights" />
            <div className="bg-earth-continent c1" />
            <div className="bg-earth-continent c2" />
            <div className="bg-earth-continent c3" />
            <div className="bg-earth-grid" />
          </div>
          <div className="bg-earth-meridian meridian-a" />
          <div className="bg-earth-meridian meridian-b" />
          <div className="bg-earth-shine" />
          <span>EARTH / ASTRA-01</span>
        </div>

        <div className="bg-target-ring" />
      </div>

      <div className="orbital-readout orbital-readout-a">
        <span>ORBITAL VECTOR</span><b>NX-01</b>
      </div>
      <div className="orbital-readout orbital-readout-b">
        <span>ALTITUDE</span><b>408 KM</b>
      </div>
      <div className="orbital-readout orbital-readout-c">
        <span>LINK</span><b>SECURE</b>
      </div>
    </div>
  );
}
