import { unstable_createNodejsStream } from '@vercel/og';
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

async function loadFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl).then(res => res.text());
  const match = css.match(/src: url\((.+?)\) format\('woff2'\)/);
  if (!match) {
    throw new Error(`Could not load font ${family}`);
  }
  return fetch(match[1]).then(res => res.arrayBuffer());
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

function el(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function buildOgElement({ title, description, eyebrow, logoUrl, fonts }) {
  const descText =
    description.length > 140 ? `${description.slice(0, 137)}…` : description;
  const titleSize = title.length > 40 ? 56 : 68;
  const headingFont = fonts.length ? 'Cormorant Garamond' : 'serif';
  const bodyFont = fonts.length ? 'Source Sans 3' : 'sans-serif';

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
        src: logoUrl,
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
    const logoUrl = `${origin}/images/CBLogo.png`;

    let fonts = [];
    try {
      const [headingFont, bodyFont] = await Promise.all([
        loadFont('Cormorant+Garamond', 600),
        loadFont('Source+Sans+3', 500),
      ]);
      fonts = [
        { name: 'Cormorant Garamond', data: headingFont, weight: 600, style: 'normal' },
        { name: 'Source Sans 3', data: bodyFont, weight: 500, style: 'normal' },
      ];
    } catch (fontError) {
      console.warn('OG fonts unavailable, using fallbacks:', fontError?.message);
    }

    const element = buildOgElement({ title, description, eyebrow, logoUrl, fonts });
    const stream = await unstable_createNodejsStream(element, {
      width: 1200,
      height: 630,
      fonts,
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    await new Promise((resolve, reject) => {
      stream.on('error', reject);
      res.on('error', reject);
      res.on('finish', resolve);
      stream.pipe(res);
    });
  } catch (error) {
    console.error('OG image error:', error);
    if (!res.headersSent) {
      res.status(500).end('Failed to generate image');
    }
  }
}
