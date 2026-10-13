import { fetchCbListingDetail } from '../server/cb-agent-listings.js';

/**
 * Serves /listings/<slug> (via vercel.json rewrite) as the normal app HTML with that listing's title, description
 * and main photo in the meta tags, so link previews on Facebook, iMessage, LinkedIn etc. show the actual home.
 * Crawlers don't run JavaScript, so this has to happen on the server. The React app takes over as usual.
 * On any failure it falls back to the plain app HTML.
 */
const escape = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escape(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

export default async function handler(req, res) {
  const slug = String(req.query?.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`;

  let html;
  try {
    const r = await fetch(`${origin}/index.html`);
    html = await r.text();
  } catch (err) {
    console.error('listing-page: template fetch failed', err);
    res.setHeader('Location', '/listings');
    return res.status(302).end();
  }

  try {
    const detail = slug ? await fetchCbListingDetail(slug) : null;
    const l = detail?.listing;
    if (l) {
      const street = l.address?.split(',')[0] || l.address;
      const title = `${street} · ${l.price} | Dan Weihmiller, Coldwell Banker Realty`;
      const desc = `${l.beds} bed · ${l.baths} bath · ${l.squareFeet} sq ft in ${l.address
        ?.split(',')
        .slice(1)
        .join(',')
        .trim()}. See every photo and book a private showing with Dan Weihmiller.`;
      const url = `https://danweihmiller.com/listings/${l.slug || slug}`;
      const image = l.photos?.[0] || l.photo;

      html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
      html = setMeta(html, 'name', 'description', desc);
      html = setMeta(html, 'property', 'og:type', 'website');
      html = setMeta(html, 'property', 'og:title', `${street} · ${l.price}`);
      html = setMeta(html, 'property', 'og:description', desc);
      html = setMeta(html, 'property', 'og:url', url);
      html = setMeta(html, 'name', 'twitter:title', `${street} · ${l.price}`);
      html = setMeta(html, 'name', 'twitter:description', desc);
      if (image) {
        html = setMeta(html, 'property', 'og:image', image);
        html = setMeta(html, 'name', 'twitter:image', image);
        html = html.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*"\s*\/?>/g, '');
      }
      html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escape(url)}" />`);
    }
  } catch (err) {
    console.error('listing-page: listing lookup failed', err);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=3600');
  return res.status(200).send(html);
}
