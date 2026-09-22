import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES } from './seo-routes.mjs';
import { ogSlugForPath, renderOgPng } from './og-render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'og');

fs.mkdirSync(outDir, { recursive: true });

for (const route of SEO_ROUTES) {
  const slug = ogSlugForPath(route.path);
  const png = await renderOgPng({
    title: route.ogTitle,
    description: route.ogDescription,
    eyebrow: route.ogEyebrow,
  });
  fs.writeFileSync(path.join(outDir, `${slug}.png`), png);
}

console.log(`generate-og-images: wrote ${SEO_ROUTES.length} PNGs to public/og/`);
