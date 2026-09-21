import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Supabase puts tokens or errors in the URL hash. Invite links often land on Site URL (/).
 * Forward those hashes to /auth/callback so we can finish sign-in.
 */
const SupabaseHashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (!hash || hash.length <= 1) return;
    if (location.pathname === '/auth/callback') return;

    const needsCallback =
      hash.includes('access_token=') ||
      hash.includes('error=') ||
      hash.includes('error_code=');

    if (needsCallback) {
      navigate(`/auth/callback${hash}`, { replace: true });
    }
  }, [location.hash, location.pathname, navigate]);

  return null;
};

export default SupabaseHashRedirect;
