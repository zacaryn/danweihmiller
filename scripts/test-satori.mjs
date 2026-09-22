import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import React from 'react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, '..', 'public', 'images', 'CBLogo.png');
const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

const fontData = await fetch(
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-500-normal.woff'
).then(r => r.arrayBuffer());

const fonts = [{ name: 'Noto Sans', data: fontData, weight: 500, style: 'normal' }];

const svg = await satori(
  React.createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0E1F45',
        color: 'white',
        padding: 48,
        fontFamily: 'Noto Sans',
        fontSize: 48,
      },
    },
    React.createElement('img', { src: logoBase64, width: 72, height: 72 }),
    React.createElement('div', null, 'Test OG')
  ),
  { width: 1200, height: 630, fonts }
);

const png = await sharp(Buffer.from(svg)).png().toBuffer();
fs.writeFileSync('og-satori-test.png', png);
console.log('OK', png.length);
