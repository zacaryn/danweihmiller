import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { supabase } from '../lib/supabase';
import SEO from '../components/shared/SEO';

const Shell = styled.div`
  min-height: 100vh;
  padding: calc(72px + 2rem) 1.25rem 3rem;
  background: ${props => props.theme.colors.background};
`;

const Card = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.65rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const Hint = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.88rem;
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
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  font-weight: 600;
  color: #fff;
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.div`
  padding: 0.65rem;
  margin-bottom: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.88rem;
`;

const AdminSetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin?auth_error=Open+the+invite+link+again+or+sign+in', { replace: true });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    navigate('/admin', { replace: true });
  };

  if (!ready) {
    return (
      <Shell>
        <Hint style={{ textAlign: 'center', marginTop: '3rem' }}>Loading…</Hint>
      </Shell>
    );
  }

  return (
    <>
      <SEO pageName="Set password" useDynamicOg={false} noIndex />
      <Shell>
        <Card onSubmit={handleSubmit}>
          <Title>Set your password</Title>
          <Hint>Choose a password for the message portal. You will use this email and password at /admin.</Hint>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save and open messages'}
          </Button>
          <Hint style={{ marginTop: '1rem', marginBottom: 0 }}>
            <Link to="/admin">Back to sign in</Link>
          </Hint>
        </Card>
      </Shell>
    </>
  );
};

export default AdminSetPassword;
