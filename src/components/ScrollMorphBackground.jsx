import React, { useEffect, useState } from 'react';
import MorphGallery from './ui/morph-gallery';

const ITEMS = [
  { src: '/bg/bg_1.jpg', alt: 'Indian Air Force Rafale' },
  { src: '/bg/bg_2.jpg', alt: 'Indian Air Force Su-30MKI and Rafale' },
  { src: '/bg/bg_3.jpg', alt: 'Indian and US forces in an amphibious landing, Exercise Tiger Triumph' },
  { src: '/bg/bg_4.jpg', alt: 'Indian Army T-90 Bhishma main battle tank' },
  { src: '/bg/bg_5.jpg', alt: 'Indian Para Special Forces commandos in training' },
  { src: '/bg/bg_6.jpg', alt: 'HAL Dhruv helicopter with commandos' },
  { src: '/bg/bg_7.jpg', alt: 'Indian Air Force AH-64E Apache' },
  { src: '/bg/bg_8.jpg', alt: 'HAL Dhruv helicopters' },
];

// Fixed full-screen backdrop whose slide follows page scroll progress.
export default function ScrollMorphBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // Progress runs from the Mission section (half in view) to the bottom of the page,
      // so the backdrop stays on its first slide while the hero is on screen.
      const mission = document.getElementById('mission');
      const start = mission ? mission.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5 : 0;
      const max = document.documentElement.scrollHeight - window.innerHeight - start;
      const p = max > 0 ? Math.min(Math.max((window.scrollY - start) / max, 0), 0.999) : 0;
      setIndex(Math.floor(p * ITEMS.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Page height changes as content/images load, so re-measure when the layout shifts.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-morph-bg" aria-hidden="true">
      <MorphGallery
        items={ITEMS}
        index={index}
        height="100svh"
        duration={1800}
        loop={false}
        arrows={false}
        thumbnails={false}
        interactive={false}
      />
      <div className="scroll-morph-bg__tint" />
    </div>
  );
}
