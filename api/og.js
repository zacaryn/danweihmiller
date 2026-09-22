import satori from 'satori';
import sharp from 'sharp';
import React from 'react';

const COLORS = {
  navy: '#0E1F45',
  navyMid: '#1B3366',
  white: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.72)',
  faint: 'rgba(255, 255, 255, 0.45)',
  line: 'rgba(255, 255, 255, 0.14)',
};

const PRODUCTION_ORIGIN = 'https://danweihmiller.com';

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
  const name = family.replace(/\+/g, ' ');
  return { name, data, weight, style: 'normal' };
}

async function loadFonts() {
  try {
    const [heading, body] = await Promise.all([
      loadGoogleFont('Cormorant+Garamond', 600),
      loadGoogleFont('Source+Sans+3', 500),
    ]);
    return [heading, body];
  } catch (err) {
    console.warn('OG custom fonts failed, using Noto Sans fallback:', err?.message);
    const data = await fetch(NOTO_WOFF).then(res => res.arrayBuffer());
    const fallback = { name: 'Noto Sans', data, weight: 500, style: 'normal' };
    return [fallback, { ...fallback, weight: 600 }];
  }
}

function siteOrigin(req) {
  const forwarded = req.headers['x-forwarded-host'];
  const host = (forwarded || req.headers.host || '').split(',')[0].trim();
  if (host && !host.includes('localhost')) {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    return `${protocol}://${host}`;
  }
  return PRODUCTION_ORIGIN;
}

async function loadLogoDataUrl(origin) {
  const res = await fetch(`${origin}/images/CBLogo.png`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OG/1.0)' },
  });
  if (!res.ok) throw new Error(`Logo fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function el(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function buildOgElement({ title, description, eyebrow, logoSrc, fontsLoaded }) {
  const descText =
    description.length > 140 ? `${description.slice(0, 137)}…` : description;
  const titleSize = title.length > 40 ? 56 : 68;
  const headingFont = fontsLoaded ? 'Cormorant Garamond' : 'Noto Sans';
  const bodyFont = fontsLoaded ? 'Source Sans 3' : 'Noto Sans';

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

let fontsPromise;

function getFonts() {
  if (!fontsPromise) {
    fontsPromise = loadFonts();
  }
  return fontsPromise;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method not allowed');
  }

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'danweihmiller.com';
    const { searchParams } = new URL(req.url, `${protocol}://${host}`);

    const title = searchParams.get('title')?.trim() || 'Dan Weihmiller';
    const description =
      searchParams.get('description')?.trim() ||
      'Broker with Coldwell Banker Realty · Colorado Springs · Since 1985';
    const eyebrow =
      searchParams.get('eyebrow')?.trim() || 'Coldwell Banker · Colorado Springs';

    const origin = siteOrigin(req);
    const [fonts, logoSrc] = await Promise.all([
      getFonts(),
      loadLogoDataUrl(origin),
    ]);

    const element = buildOgElement({
      title,
      description,
      eyebrow,
      logoSrc,
      fontsLoaded: fonts.some(f => f.name === 'Cormorant Garamond'),
    });

    const svg = await satori(element, {
      width: 1200,
      height: 630,
      fonts,
    });

    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.status(200).end(png);
  } catch (error) {
    console.error('OG image error:', error);
    if (!res.headersSent) {
      res.status(500).end('Failed to generate image');
    }
  }
}
