import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminMessages from './AdminMessages';
import SEO from '../components/shared/SEO';

const Shell = styled.div`
  min-height: 100vh;
  padding: calc(72px + 2rem) clamp(1.25rem, 4vw, 2.5rem) 3rem;
  background: ${props => props.theme.colors.background};

  @media (max-width: 768px) {
    padding-top: calc(68px + 1.25rem);
  }
`;

const Inner = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: ${props => props.theme.borders.subtle};
`;

const TitleBlock = styled.div``;

const Eyebrow = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(14, 31, 69, 0.55);
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.darkGray};
  max-width: 42ch;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const TextButton = styled.button`
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.colors.darkGray};
  background: transparent;
  border: 1px solid rgba(14, 31, 69, 0.2);
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.primary};
  }
`;

const SiteLink = styled(Link)`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginCard = styled.form`
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FormTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.65rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const FormHint = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.darkGray};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(14, 31, 69, 0.2);
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(14, 31, 69, 0.12);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: 0.65rem 0.75rem;
  margin-bottom: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.88rem;
`;

const ConfigWarning = styled.div`
  padding: 1rem;
  background: #fff3cd;
  color: #856404;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const authErrorFromUrl = searchParams.get('auth_error');

  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authErrorFromUrl) {
      setError(decodeURIComponent(authErrorFromUrl.replace(/\+/g, ' ')));
      setSearchParams({}, { replace: true });
    }
  }, [authErrorFromUrl, setSearchParams]);

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    if (!supabase) return;
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  if (!supabase) {
    return (
      <Shell>
        <Inner>
          <ConfigWarning>
            Admin login requires <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> in your environment, then rebuild or restart
            the dev server.
          </ConfigWarning>
        </Inner>
      </Shell>
    );
  }

  if (checkingSession) {
    return (
      <Shell>
        <Inner>
          <Subtitle style={{ textAlign: 'center' }}>Checking session…</Subtitle>
        </Inner>
      </Shell>
    );
  }

  if (!session) {
    return (
      <>
        <SEO pageName="Admin Portal">
          <meta name="robots" content="noindex, nofollow" />
        </SEO>
        <Shell>
          <LoginCard onSubmit={handleLogin}>
            <FormTitle>Message portal</FormTitle>
            <FormHint>
              Sign in with the Supabase account your developer created for you. There is no public
              sign-up on this site.
            </FormHint>
            {error && (
              <ErrorMessage>
                {error}
                {error.toLowerCase().includes('expired') || error.toLowerCase().includes('invalid') ? (
                  <> Invite links are one-time and expire — send a new invite or create the user with a password in Supabase (Auto Confirm).</>
                ) : null}
              </ErrorMessage>
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </SubmitButton>
          </LoginCard>
        </Shell>
      </>
    );
  }

  return (
    <>
      <SEO pageName="Admin Portal">
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      <Shell>
        <Inner>
          <Header>
            <TitleBlock>
              <Eyebrow>Dan Weihmiller · Admin</Eyebrow>
              <Title>Messages</Title>
              <Subtitle>
                Contact form submissions. Listings sync from Coldwell Banker on the public site.
              </Subtitle>
            </TitleBlock>
            <HeaderActions>
              <SiteLink to="/">View website</SiteLink>
              <TextButton type="button" onClick={handleLogout}>
                Sign out
              </TextButton>
            </HeaderActions>
          </Header>
          <AdminMessages />
        </Inner>
      </Shell>
    </>
  );
};

export default Admin;
