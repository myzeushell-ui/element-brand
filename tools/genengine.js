// Generates a clean, premium side-view illustration of a gas-engine genset
// (газопоршневая установка) as SVG, composed from primitives so it renders
// predictably on light surfaces. Brand: graphite + red accent.
const fs = require('fs');
const path = require('path');

function engineSVG({ accent = '#E11D2A' } = {}) {
  const W = 960, H = 560;
  const p = [];
  const push = (s) => p.push(s);

  // helpers
  const bolts = (x0, y, n, dx, r = 3, fill = '#6C727C') =>
    Array.from({ length: n }, (_, i) =>
      `<circle cx="${x0 + i * dx}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');

  push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Газопоршневая установка ЭЛЕМЕНТ">`);
  push(`<defs>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#EDEFF2"/><stop offset="0.5" stop-color="#C2C7CE"/><stop offset="1" stop-color="#9AA0A8"/>
    </linearGradient>
    <linearGradient id="steelDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3A3F47"/><stop offset="1" stop-color="#23262C"/>
    </linearGradient>
    <linearGradient id="skid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2B2F36"/><stop offset="1" stop-color="#171A1E"/>
    </linearGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F4F6F8"/><stop offset="1" stop-color="#B7BCC4"/>
    </linearGradient>
    <radialGradient id="alt" cx="0.35" cy="0.35" r="0.8">
      <stop offset="0" stop-color="#E9ECEF"/><stop offset="1" stop-color="#8F959D"/>
    </radialGradient>
  </defs>`);

  // soft ground shadow
  push(`<ellipse cx="480" cy="500" rx="380" ry="26" fill="#0E1116" opacity="0.10"/>`);

  // skid frame
  push(`<rect x="90" y="430" width="780" height="58" rx="8" fill="url(#skid)"/>`);
  push(`<rect x="90" y="430" width="780" height="6" rx="3" fill="${accent}"/>`);
  // skid feet
  push(`<rect x="140" y="486" width="70" height="14" rx="3" fill="#101317"/>`);
  push(`<rect x="750" y="486" width="70" height="14" rx="3" fill="#101317"/>`);

  // radiator (left)
  push(`<rect x="96" y="250" width="120" height="186" rx="10" fill="url(#steelDark)"/>`);
  for (let i = 0; i < 11; i++)
    push(`<rect x="106" y="${262 + i * 16}" width="100" height="7" rx="3" fill="#4A4F57"/>`);
  push(`<rect x="96" y="250" width="120" height="186" rx="10" fill="none" stroke="#0E1116" stroke-opacity="0.4"/>`);

  // engine block
  push(`<rect x="232" y="300" width="380" height="136" rx="10" fill="url(#steel)" stroke="#8A9099"/>`);
  // oil pan taper
  push(`<path d="M232 420 h380 v6 q0 10 -10 10 H242 q-10 0 -10 -10 z" fill="#9AA0A8"/>`);
  // crankcase bolts
  push(bolts(252, 412, 19, 19));

  // valve covers / cylinder heads on top
  push(`<rect x="250" y="252" width="344" height="52" rx="8" fill="url(#cyl)" stroke="#9197A0"/>`);
  for (let i = 0; i < 6; i++) {
    const x = 262 + i * 56;
    push(`<rect x="${x}" y="244" width="44" height="22" rx="5" fill="url(#steel)" stroke="#9197A0"/>`);
    push(bolts(x + 8, 255, 3, 14, 2.4, '#7B818B'));
  }

  // intake manifold (red accent runner)
  push(`<rect x="250" y="306" width="344" height="16" rx="8" fill="${accent}"/>`);
  push(`<rect x="250" y="306" width="344" height="16" rx="8" fill="#000" opacity="0.12"/>`);

  // exhaust manifold + stack
  push(`<rect x="258" y="222" width="316" height="14" rx="7" fill="#5A6069"/>`);
  push(`<path d="M566 229 q40 0 40 -46 v-44" fill="none" stroke="#5A6069" stroke-width="18" stroke-linecap="round"/>`);
  push(`<rect x="596" y="120" width="22" height="26" rx="4" fill="#3A3F47"/>`);

  // flywheel housing
  push(`<rect x="612" y="316" width="46" height="104" rx="8" fill="url(#steelDark)"/>`);

  // generator / alternator (right cylinder)
  push(`<rect x="656" y="300" width="190" height="136" rx="20" fill="url(#alt)" stroke="#8A9099"/>`);
  push(`<ellipse cx="846" cy="368" rx="22" ry="68" fill="#D7DBE0" stroke="#9197A0"/>`);
  push(`<ellipse cx="656" cy="368" rx="16" ry="68" fill="#AEB4BC"/>`);
  // cooling vents
  for (let i = 0; i < 7; i++)
    push(`<rect x="${686 + i * 20}" y="320" width="6" height="96" rx="3" fill="#7E848D" opacity="0.7"/>`);
  // brand ring
  push(`<circle cx="751" cy="368" r="30" fill="#fff" stroke="${accent}" stroke-width="4"/>`);
  push(`<path transform="translate(735 350) scale(0.5)" fill="${accent}" d="M33.7 3.2c1.2 6.4-1.1 11-4.6 14.9-3.7 4.1-8.7 7.8-11.6 13.2-2.7 5-3.4 11 .1 16.7 2.5 4.1 6.6 6.9 11 8.2-2.4-2.3-3.7-5.2-3.4-8.6.3-3.6 2.4-6.4 4.8-9.1.9 2.2 2.2 4 4.2 5.2 2.9 1.8 4.2 4.6 3.9 8-.2 2.2-1.2 4.1-2.7 5.7 5.4-1.6 9.9-5.2 12-10.6 2.2-5.6 1.2-11.6-1.6-16.8-2.1-3.9-5.1-7-7.2-10.9-2.2-4-2.8-8.3-1.3-12.7-2 .9-3.8 2.2-5.2 3.9.4-3.6-.2-7-2.4-10.2z"/>`);

  // control cabinet
  push(`<rect x="232" y="356" width="64" height="80" rx="6" fill="url(#steelDark)"/>`);
  push(`<rect x="242" y="368" width="44" height="30" rx="3" fill="#0E1116"/>`);
  push(`<rect x="246" y="372" width="36" height="9" rx="2" fill="${accent}" opacity="0.85"/>`);
  push(`<circle cx="252" cy="412" r="4" fill="${accent}"/>`);
  push(`<circle cx="268" cy="412" r="4" fill="#3DBE6B"/>`);

  push(`</svg>`);
  return p.join('\n');
}

const OUT = path.join(__dirname, '..', 'assets', 'img');
fs.writeFileSync(path.join(OUT, 'genset.svg'), engineSVG());
console.log('wrote', path.join(OUT, 'genset.svg'));
