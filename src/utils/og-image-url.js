import { SITE_URL } from '../config/agent';

/** Static OG PNG slug (matches scripts/generate-og-images.mjs). */
export function ogImageSlug(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  const slug = path.slice(1).replace(/\//g, '-');
  if (slug.startsWith('listings-')) return 'listings';
  return slug;
}

/**
 * Pre-rendered OG image URL (built to /og/{slug}.png at deploy time).
 * Always absolute for crawlers (Discord, iMessage, etc.).
 */
export function buildOgImageUrl({ pathname }) {
  const base =
    import.meta.env.VITE_SITE_URL ||
    import.meta.env.VITE_OG_IMAGE_ORIGIN ||
    SITE_URL;
  const slug = ogImageSlug(pathname);
  return `${base.replace(/\/$/, '')}/og/${slug}.png`;
}

export function eyebrowForPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return 'Coldwell Banker · Since 1985';
  if (path === '/about') return 'About';
  if (path === '/contact') return 'Contact';
  if (path === '/listings') return 'MLS Listings';
  if (path === '/search') return 'Property Search';
  if (path === '/resources') return 'Resources';
  if (path.startsWith('/resources/')) return 'Real Estate Guide';
  if (path.startsWith('/legal/')) return 'Legal & Policies';
  return 'Dan Weihmiller · Colorado Springs';
}

export function headlineForPage(pageName, pathname) {
  if (pageName && pageName !== 'Home') return pageName;
  if (pathname === '/' || !pathname) return 'Dan Weihmiller';
  return pageName || 'Dan Weihmiller';
}
