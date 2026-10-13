/**
 * Meta Pixel helpers. The base code (init + first PageView) lives in index.html so it runs before React.
 * Every call is a no-op when the pixel is blocked or not loaded (ad blockers, local dev without network).
 */
export const META_PIXEL_ID = '1120114437027347';

function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

/** Standard events: PageView, ViewContent, Lead, Contact, Schedule, ... */
export function trackPixel(event, params) {
  fbq('track', event, params);
}

/** Custom events, e.g. ViewCBListing (click-out to the full Coldwell Banker listing) */
export function trackPixelCustom(event, params) {
  fbq('trackCustom', event, params);
}
