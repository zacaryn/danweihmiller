/**
 * Post-deploy check: static OG images + crawler meta on public routes.
 * Usage: node scripts/verify-seo.mjs [baseUrl]
 */
import { SEO_ROUTES, ogImageSlug } from './seo-routes.mjs';

const base = (process.argv[2] || 'https://danweihmiller.com').replace(/\/$/, '');

const failures = [];

async function checkOgImages() {
  for (const route of SEO_ROUTES) {
    const slug = ogImageSlug(route.path);
    const url = `${base}/og/${slug}.png`;
    let res;
    try {
      res = await fetch(url, { method: 'HEAD' });
      if (res.status === 405) res = await fetch(url);
    } catch (err) {
      failures.push(`OG PNG ${url} → network error ${err}`);
      continue;
    }
    if (!res.ok) {
      failures.push(`OG PNG ${url} → HTTP ${res.status}`);
      continue;
    }
    const type = res.headers.get('content-type') || '';
    if (!type.includes('image')) {
      failures.push(`OG PNG ${url} → wrong content-type: ${type}`);
    }
  }
}

async function checkRoute(route) {
  const url = route.path === '/' ? `${base}/` : `${base}${route.path}`;
  const res = await fetch(url);
  if (!res.ok) {
    failures.push(`${url} → HTTP ${res.status}`);
    return;
  }
  const html = await res.text();
  if (!html.includes('property="og:image"')) {
    failures.push(`${url} → missing og:image meta`);
    return;
  }
  const slug = ogImageSlug(route.path);
  if (!html.includes(`/og/${slug}.png`)) {
    failures.push(`${url} → og:image does not point at /og/${slug}.png`);
  }
  if (route.path !== '/' && !html.includes(route.title.slice(0, 40))) {
    failures.push(`${url} → title meta may not match expected route shell`);
  }
}

console.log(`Verifying SEO at ${base}…`);
await checkOgImages();
for (const route of SEO_ROUTES) {
  await checkRoute(route);
}

if (failures.length) {
  console.error('\nFailures:');
  for (const f of failures) console.error('  -', f);
  process.exit(1);
}

console.log(`OK: ${SEO_ROUTES.length} OG PNGs and route HTML shells.`);
