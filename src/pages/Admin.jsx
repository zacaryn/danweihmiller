import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 4rem auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      navigate('/admin/listings');
    }
  };

  if (!isLoggedIn) {
    return (
      <AdminContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </LoginForm>
      </AdminContainer>
    );
  }

  return null;
};

export default Admin; 