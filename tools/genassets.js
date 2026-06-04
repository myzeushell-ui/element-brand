// ЭЛЕМЕНТ — generator of branded placeholder PNG assets.
// Pure Node (zlib only), no external deps. Draws simple GPU/emblem motifs so
// the brandbook has real, intentional-looking raster assets until the final
// white-GPU photography is dropped in. See REPORT.md.
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const OUT = path.join(__dirname, '..', 'assets');

// ---- tiny RGBA canvas ----------------------------------------------------
function Canvas(w, h) {
  const data = Buffer.alloc(w * h * 4, 0); // transparent
  return {
    w, h, data,
    set(x, y, r, g, b, a = 255) {
      x = Math.round(x); y = Math.round(y);
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      const i = (y * w + x) * 4;
      const ia = a / 255, inv = 1 - ia;
      data[i] = Math.round(data[i] * inv + r * ia);
      data[i + 1] = Math.round(data[i + 1] * inv + g * ia);
      data[i + 2] = Math.round(data[i + 2] * inv + b * ia);
      data[i + 3] = Math.max(data[i + 3], a);
    },
  };
}

function fillRect(c, x0, y0, x1, y1, col) {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) c.set(x, y, ...col);
}

function fillRoundRect(c, x0, y0, x1, y1, rad, col) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const dx = Math.min(x - x0, x1 - 1 - x);
      const dy = Math.min(y - y0, y1 - 1 - y);
      if (dx < rad && dy < rad) {
        const cx = x < x0 + rad ? x0 + rad : x1 - 1 - rad;
        const cy = y < y0 + rad ? y0 + rad : y1 - 1 - rad;
        if (Math.hypot(x - cx, y - cy) > rad) continue;
      }
      c.set(x, y, ...col);
    }
  }
}

function vGradient(c, top, bot) {
  for (let y = 0; y < c.h; y++) {
    const t = y / (c.h - 1);
    const r = Math.round(top[0] + (bot[0] - top[0]) * t);
    const g = Math.round(top[1] + (bot[1] - top[1]) * t);
    const b = Math.round(top[2] + (bot[2] - top[2]) * t);
    for (let x = 0; x < c.w; x++) c.set(x, y, r, g, b, 255);
  }
}

function hexagon(c, cx, cy, R, col, line = 0) {
  // pointy-top hexagon, optionally only an outline of width `line`
  const pts = [];
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 180 * (60 * k - 90);
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  const inside = (x, y, poly) => {
    let s = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) s = !s;
    }
    return s;
  };
  for (let y = cy - R - 2; y <= cy + R + 2; y++) {
    for (let x = cx - R - 2; x <= cx + R + 2; x++) {
      const inOuter = inside(x, y, pts);
      if (!inOuter) continue;
      if (line > 0) {
        const inner = pts.map(([px, py]) => {
          const vx = px - cx, vy = py - cy, len = Math.hypot(vx, vy);
          const s = (len - line) / len;
          return [cx + vx * s, cy + vy * s];
        });
        if (inside(x, y, inner)) continue;
      }
      c.set(x, y, ...col);
    }
  }
}

// crude vertical "fins" to suggest a GPU heatsink/shroud
function fins(c, x0, y0, x1, y1, col, step = 14, gap = 6) {
  for (let x = x0; x < x1; x += step) {
    fillRect(c, x, y0, Math.min(x + step - gap, x1), y1, col);
  }
}

// ---- PNG encoder ---------------------------------------------------------
function encodePNG(c) {
  const { w, h, data } = c;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: none
    data.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const chunk = (type, payload) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(payload.length, 0);
    const t = Buffer.from(type);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, payload])) >>> 0, 0);
    return Buffer.concat([len, t, payload, crc]);
  };
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

// ---- palette -------------------------------------------------------------
const INK = [14, 17, 22];
const COPPER = [184, 115, 51];
const COPPER_HI = [214, 156, 102];
const WHITE = [248, 249, 250];
const SOFT = [228, 231, 235];
const GREY = [205, 210, 217];

function gpuCard(opts) {
  const { copper = false, badged = false } = opts;
  const W = 1000, H = 640;
  const c = Canvas(W, H);
  vGradient(c, WHITE, [232, 234, 238]);
  // GPU shroud body (white)
  fillRoundRect(c, 120, 170, 880, 470, 26, [255, 255, 255, 255]);
  fillRoundRect(c, 120, 170, 880, 470, 26, [255, 255, 255, 255]);
  // top edge highlight
  fillRect(c, 132, 178, 868, 188, SOFT);
  // heatsink fins
  fins(c, 150, 210, 760, 430, copper ? COPPER_HI : GREY, 18, 7);
  // fan circles
  for (const fx of [300, 600]) {
    hexagon(c, fx, 320, 78, SOFT);
    hexagon(c, fx, 320, 78, copper ? COPPER : GREY, 8);
    hexagon(c, fx, 320, 18, copper ? COPPER : [170, 176, 184]);
  }
  // copper accent bar
  if (copper) fillRect(c, 120, 452, 880, 470, COPPER);
  // emblem badge
  if (badged) {
    hexagon(c, 800, 240, 56, [255, 255, 255, 255]);
    hexagon(c, 800, 240, 56, COPPER, 7);
    // stylised "Э"
    fillRoundRect(c, 778, 214, 822, 224, 4, INK);
    fillRoundRect(c, 778, 235, 822, 245, 4, INK);
    fillRoundRect(c, 778, 256, 822, 266, 4, INK);
    fillRect(c, 812, 214, 822, 266, INK);
  }
  return c;
}

function badge() {
  const S = 512;
  const c = Canvas(S, S);
  hexagon(c, S / 2, S / 2, 230, INK);
  hexagon(c, S / 2, S / 2, 230, COPPER, 14);
  hexagon(c, S / 2, S / 2, 175, [22, 26, 33]);
  // "Э"
  const x0 = 175, x1 = 337;
  fillRoundRect(c, x0, 175, x1, 200, 8, WHITE);
  fillRoundRect(c, x0, 244, x1, 269, 8, COPPER_HI);
  fillRoundRect(c, x0, 312, x1, 337, 8, WHITE);
  fillRect(c, x1 - 26, 175, x1, 337, WHITE);
  return c;
}

fs.writeFileSync(path.join(OUT, 'gpu_white.png'), encodePNG(gpuCard({})));
fs.writeFileSync(path.join(OUT, 'gpu_white_copper.png'), encodePNG(gpuCard({ copper: true })));
fs.writeFileSync(path.join(OUT, 'gpu_white_badged.png'), encodePNG(gpuCard({ copper: true, badged: true })));
fs.writeFileSync(path.join(OUT, 'badge.png'), encodePNG(badge()));
console.log('assets written to', OUT);
