import { SITE_URL } from '../config/agent';

/**
 * Dynamic OG image URL (served by /api/og on Vercel).
 * Always absolute for crawlers (Discord, iMessage, etc.).
 */
export function buildOgImageUrl({ title, description, eyebrow }) {
  const params = new URLSearchParams();
  params.set('title', (title || 'Dan Weihmiller').slice(0, 100));
  if (description) {
    params.set('description', description.slice(0, 180));
  }
  if (eyebrow) {
    params.set('eyebrow', eyebrow.slice(0, 60));
  }
  const base =
    import.meta.env.VITE_SITE_URL ||
    import.meta.env.VITE_OG_IMAGE_ORIGIN ||
    SITE_URL;
  return `${base.replace(/\/$/, '')}/api/og?${params.toString()}`;
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
