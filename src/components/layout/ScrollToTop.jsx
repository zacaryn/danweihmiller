import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll on route changes. React Router does not do this by default,
 * so deep-linked pages otherwise keep the previous page's scroll position.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    // `instant` avoids a visible scroll animation between pages; fallback for older browsers
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo(0, 0);
    }

    // Safety: Search locks body scroll; ensure it is released when navigating away
    if (pathname !== '/search') {
      document.body.style.overflow = '';
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
