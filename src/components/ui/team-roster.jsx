import React, { useState } from 'react';
import './team-roster.css';

const initials = (name) => {
  const p = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!p.length) return '?';
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
};

// Deal members round-robin into columns, then repeat until each column is long
// enough that a drifting loop never shows a gap.
function dealColumns(count, columns, minPer) {
  const cols = Array.from({ length: columns }, () => []);
  for (let i = 0; i < count; i++) cols[i % columns].push({ index: i, dup: false });
  cols.forEach((col, c) => {
    let k = 0;
    while (col.length < minPer && count) {
      col.push({ index: (c + k * columns + Math.floor(count / 2)) % count, dup: true });
      k++;
    }
  });
  return cols;
}

function Card({ member, dup }) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className="ttr-card" tabIndex={dup ? -1 : 0} aria-hidden={dup || undefined}>
      <div className="ttr-photo">
        {member.photo && !broken ? (
          <img
            src={member.photo}
            alt={dup ? '' : member.name}
            loading="lazy"
            onError={() => setBroken(true)}
            style={{ objectPosition: member.focus || '50% 25%' }}
          />
        ) : (
          <div className="ttr-plate">{initials(member.name)}</div>
        )}
      </div>
      <span className="ttr-chip">{member.craft || member.role}</span>
      <figcaption className="ttr-panel">
        <b>{member.name}</b>
        <span>{member.role}</span>
      </figcaption>
    </figure>
  );
}

export default function TeamRoster({
  members = [],
  eyebrow = 'Meet',
  title = 'Our\nTeam',
  intro,
  columns = 3,
  driftSeconds = 38,
}) {
  const [paused, setPaused] = useState(false);
  const lines = String(title).split(' ');
  const cols = dealColumns(members.length, columns, Math.max(6, Math.ceil(members.length / columns) * 2));
  return (
    <section className="ttr" data-paused={paused || undefined} aria-label="Team">
      <div className="ttr-field" />
      <div className="ttr-in">
        <div className="ttr-copy">
          <span className="ttr-eyebrow">{eyebrow}</span>
          <h2 className="ttr-title">{lines.map((l, i) => <span key={i}>{l}</span>)}</h2>
          {intro && <p className="ttr-intro">{intro}</p>}
          <button type="button" className="ttr-pause" onClick={() => setPaused((p) => !p)}>
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
        <div className="ttr-wall" style={{ '--ttr-cols': columns }}>
          {cols.map((col, ci) => (
            <div className="ttr-col" key={ci} data-dir={ci % 2 ? 'down' : 'up'}>
              <div className="ttr-track" style={{ '--ttr-dur': `${driftSeconds + ci * 6}s` }}>
                {[0, 1].map((rep) =>
                  col.map((e, i) => (
                    <Card key={rep + '-' + i} member={members[e.index]} dup={e.dup || rep === 1} />
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tritone: shadows black, mids deep red, highlights warm white. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="ttr-tritone" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.02 0.40 0.95" />
            <feFuncG type="table" tableValues="0.01 0.07 0.83" />
            <feFuncB type="table" tableValues="0.01 0.12 0.83" />
          </feComponentTransfer>
        </filter>
      </svg>
    </section>
  );
}
