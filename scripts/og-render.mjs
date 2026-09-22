import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import React from 'react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const COLORS = {
  navy: '#0E1F45',
  navyMid: '#1B3366',
  white: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.72)',
  faint: 'rgba(255, 255, 255, 0.45)',
  line: 'rgba(255, 255, 255, 0.14)',
};

const NOTO_WOFF =
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-500-normal.woff';

async function loadGoogleFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OG/1.0)' },
  }).then(res => res.text());
  const match = css.match(/src: url\((.+?)\) format\('woff2'\)/);
  if (!match) throw new Error(`Could not load font ${family}`);
  const data = await fetch(match[1]).then(res => res.arrayBuffer());
  return { name: family.replace(/\+/g, ' '), data, weight, style: 'normal' };
}

let fontsPromise;

export async function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      try {
        const [heading, body] = await Promise.all([
          loadGoogleFont('Cormorant+Garamond', 600),
          loadGoogleFont('Source+Sans+3', 500),
        ]);
        return { fonts: [heading, body], custom: true };
      } catch {
        const data = await fetch(NOTO_WOFF).then(res => res.arrayBuffer());
        const fallback = { name: 'Noto Sans', data, weight: 500, style: 'normal' };
        return {
          fonts: [fallback, { ...fallback, weight: 600 }],
          custom: false,
        };
      }
    })();
  }
  return fontsPromise;
}

function logoDataUrl() {
  const logoPath = path.join(ROOT, 'public', 'images', 'CBLogo.png');
  const buf = fs.readFileSync(logoPath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function el(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function buildElement({ title, description, eyebrow, logoSrc, customFonts }) {
  const descText =
    description.length > 140 ? `${description.slice(0, 137)}…` : description;
  const titleSize = title.length > 40 ? 56 : 68;
  const headingFont = customFonts ? 'Cormorant Garamond' : 'Noto Sans';
  const bodyFont = customFonts ? 'Source Sans 3' : 'Noto Sans';

  return el(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 52%, ${COLORS.navy} 100%)`,
        padding: '56px 64px',
        fontFamily: bodyFont,
        color: COLORS.white,
        position: 'relative',
      },
    },
    el('div', {
      style: {
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.08) 0%, transparent 45%)',
      },
    }),
    el(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          position: 'relative',
        },
      },
      el('img', {
        src: logoSrc,
        width: 72,
        height: 72,
        alt: '',
        style: { objectFit: 'contain' },
      }),
      el(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
        el('div', {
          style: {
            fontFamily: headingFont,
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          },
          children: 'Dan Weihmiller',
        }),
        el('div', {
          style: {
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: COLORS.muted,
          },
          children: 'Coldwell Banker Realty',
        })
      )
    ),
    el(
      'div',
      {
        style: {
          marginTop: 48,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          maxWidth: 980,
        },
      },
      el('div', {
        style: {
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: COLORS.faint,
          marginBottom: 16,
        },
        children: eyebrow,
      }),
      el('div', {
        style: {
          fontFamily: headingFont,
          fontSize: titleSize,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 20,
        },
        children: title,
      }),
      el('div', {
        style: {
          fontSize: 24,
          lineHeight: 1.45,
          color: COLORS.muted,
          maxWidth: 920,
        },
        children: descText,
      })
    ),
    el(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${COLORS.line}`,
          paddingTop: 22,
          position: 'relative',
          fontSize: 17,
        },
      },
      el('div', {
        style: { fontWeight: 600, letterSpacing: '0.04em' },
        children: 'danweihmiller.com',
      }),
      el('div', {
        style: { color: COLORS.faint, fontSize: 15 },
        children: 'Colorado Springs · Military & VA · Since 1985',
      })
    )
  );
}

export async function renderOgPng({ title, description, eyebrow }) {
  const { fonts, custom } = await loadOgFonts();
  const logoSrc = logoDataUrl();
  const element = buildElement({
    title,
    description,
    eyebrow,
    logoSrc,
    customFonts: custom,
  });
  const svg = await satori(element, { width: 1200, height: 630, fonts });
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export function ogSlugForPath(routePath) {
  if (routePath === '/') return 'home';
  return routePath.replace(/^\//, '').replace(/\//g, '-');
}
