import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { supabase } from '../lib/supabase';

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
`;

function parseHashParams() {
  const raw = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  return new URLSearchParams(raw);
}

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Completing sign-in…');

  useEffect(() => {
    if (!supabase) {
      navigate('/admin?auth_error=Supabase+is+not+configured', { replace: true });
      return;
    }

    const run = async () => {
      const hashParams = parseHashParams();
      const authError =
        hashParams.get('error_description') || hashParams.get('error_code') || hashParams.get('error');

      if (authError) {
        const readable = decodeURIComponent(authError.replace(/\+/g, ' '));
        navigate(`/admin?auth_error=${encodeURIComponent(readable)}`, { replace: true });
        return;
      }

      const type = hashParams.get('type');

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate(
          `/admin?auth_error=${encodeURIComponent(error?.message || 'Sign-in link could not be verified. Request a new invite.')}`,
          { replace: true }
        );
        return;
      }

      window.history.replaceState(null, '', window.location.pathname);

      if (type === 'invite' || type === 'recovery' || type === 'signup') {
        navigate('/admin/set-password', { replace: true });
        return;
      }

      navigate('/admin', { replace: true });
    };

    run().catch(err => {
      console.error(err);
      setMessage('Something went wrong. Redirecting…');
      navigate('/admin?auth_error=Unexpected+error', { replace: true });
    });
  }, [navigate]);

  return <Wrap>{message}</Wrap>;
};

export default AuthCallback;
