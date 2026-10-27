import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '01{}[]<>/\\=+*#$%&;:_|~';
const START_GAP = 230;   // ms between each character starting to compile
const SCRAMBLE = 520;    // ms each character flickers before it resolves
const TICK = 45;

const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Types `text` in like code compiling: each character appears as noise, flickers through
 * code glyphs, then resolves to the real letter. Final letters reserve their width up front,
 * so nothing shifts while it runs. `classes` maps a character index to an extra class name.
 */
export default function DecodeText({ text, classes = {}, startDelay = 350 }) {
  const reduce = useReducedMotion();
  const [now, setNow] = useState(reduce ? Infinity : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const t0 = performance.now();
    const id = setInterval(() => {
      const t = performance.now() - t0 - startDelay;
      setNow(t);
      if (t > (text.length - 1) * START_GAP + SCRAMBLE + 1400) clearInterval(id);
    }, TICK);
    return () => clearInterval(id);
  }, [reduce, text, startDelay]);

  const lastResolved = (text.length - 1) * START_GAP + SCRAMBLE;
  const caretOn = Number.isFinite(now) && now > -startDelay && now < lastResolved + 1200;

  return (
    <span className="dt" role="text" aria-label={text}>
      {[...text].map((ch, i) => {
        const age = now - i * START_GAP;
        const state = age < 0 ? 'wait' : age < SCRAMBLE ? 'scramble' : 'done';
        return (
          <span key={i} className={`dt-ch ${classes[i] || ''} dt-${state}`} aria-hidden="true">
            <span className="dt-final">{ch}</span>
            {state !== 'wait' && <span className="dt-live">{state === 'done' ? ch : pick()}</span>}
          </span>
        );
      })}
      {caretOn && <span className="dt-caret" aria-hidden="true" />}
    </span>
  );
}
