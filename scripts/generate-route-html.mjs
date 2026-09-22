import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, SEO_SITE_NAME } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applySeo(html, route) {
  let out = html;
  const ogImage = escapeHtml(route.ogImage);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const ogTitle = escapeHtml(route.title);
  const ogDescription = escapeHtml(route.ogDescription);
  const twitterDescription = escapeHtml(route.twitterDescription);
  const canonical = escapeHtml(route.canonical);

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${ogDescription}" />`
  );
  out = out.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${ogTitle}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${twitterDescription}" />`
  );
  out = out.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  );
  out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);

  if (!out.includes('og:site_name')) {
    out = out.replace(
      /<meta property="og:locale" content="en_US" \/>/,
      `<meta property="og:site_name" content="${escapeHtml(SEO_SITE_NAME)}" />\n    <meta property="og:locale" content="en_US" />`
    );
  }

  return out;
}

if (!fs.existsSync(templatePath)) {
  console.error('generate-route-html: dist/index.html not found — run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

for (const route of SEO_ROUTES) {
  const html = applySeo(template, route);
  if (route.path === '/') {
    fs.writeFileSync(templatePath, html);
    continue;
  }
  const dir = path.join(distDir, route.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log(`generate-route-html: wrote ${SEO_ROUTES.length} route HTML shells.`);
