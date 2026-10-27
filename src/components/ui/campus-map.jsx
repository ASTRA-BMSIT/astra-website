import React, { useState } from 'react';

const LAT_LNG = '13.13418757546676,77.56943486545431';

// Google Maps embed: fully interactive (drag, pinch, zoom, Street View) and always serves Google's current tiles.
// On touch screens the map starts locked so swiping past it keeps scrolling the page; tap to unlock it.
export default function CampusMap({ mapType }) {
  const [unlocked, setUnlocked] = useState(false);
  const t = mapType === 'satellite' ? 'h' : 'm';
  return (
    <div className={`ds-map-wrap${unlocked ? ' is-unlocked' : ''}`}>
      <iframe
        key={t}
        className={`ds-map-canvas ds-map-canvas--${mapType}`}
        title="Map of BMS Institute of Technology and Management"
        src={`https://www.google.com/maps?q=${LAT_LNG}&z=18&output=embed&t=${t}&hl=en`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <button type="button" className="ds-map-lock" onClick={() => setUnlocked(true)}>Tap to explore the map</button>
    </div>
  );
}
