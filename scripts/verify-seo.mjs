/**
 * Post-deploy check: OG API + crawler meta on public routes.
 * Usage: node scripts/verify-seo.mjs [baseUrl]
 */
import { SEO_ROUTES } from './seo-routes.mjs';

const base = (process.argv[2] || 'https://danweihmiller.com').replace(/\/$/, '');

const failures = [];

async function checkOgApi() {
  const url = `${base}/api/og?title=SEO+Test&description=Verify`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    failures.push(`OG API ${url} → network error ${err}`);
    return;
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    failures.push(`OG API ${url} → ${res.status} ${body.slice(0, 120)}`);
    return;
  }
  const type = res.headers.get('content-type') || '';
  if (!type.includes('image')) {
    failures.push(`OG API wrong content-type: ${type}`);
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
  if (!html.includes('/api/og?')) {
    failures.push(`${url} → og:image does not point at /api/og`);
  }
  if (route.path !== '/' && !html.includes(escapeRegex(route.title.slice(0, 40)))) {
    failures.push(`${url} → title meta may not match expected route shell`);
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log(`Verifying SEO at ${base}…`);
await checkOgApi();
for (const route of SEO_ROUTES) {
  await checkRoute(route);
}

if (failures.length) {
  console.error('\nFailures:');
  for (const f of failures) console.error('  -', f);
  process.exit(1);
}

console.log(`OK: /api/og and ${SEO_ROUTES.length} public routes.`);
