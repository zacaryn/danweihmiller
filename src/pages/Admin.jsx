import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../services/aws-service';
import AdminInquiries from './AdminInquiries';
import { FaHome, FaList, FaEnvelope, FaCog } from 'react-icons/fa';
import SEO from '../components/shared/SEO';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const LogoutButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background-color: transparent;
  color: ${props => props.theme.colors.darkGray};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.primary};
  }
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 4rem auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FormTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.marginBottom ? props.theme.spacing.md : 0};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const Button = styled.button`
  ${props => props.fullWidth ? 'width: 100%;' : ''}
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: ${props => props.primary && !props.bordered ? 'none' : `1px solid ${props.theme.colors.primary}`};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  background-color: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
`;

const AdminNavigation = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  flex-wrap: wrap;
`;

const NavLink = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    transition: ${props => props.theme.transitions.fast};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const DashboardCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-2px);
  }
`;

const DashboardCardHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const DashboardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  &:last-of-type {
    border-bottom: none;
  }
`;

const StatLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.darkGray};
`;

const StatValue = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const GuideItem = styled.div`
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const GuideTitle = styled.h4`
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.primary};
`;

const GuideDescription = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  overflow: hidden;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SettingsCard = styled(Card)`
  overflow: hidden;
`;

const SettingsCardHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  margin: -${props => props.theme.spacing.lg} -${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const SettingsCardContent = styled.div`
  padding: 0;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
  color: ${props => props.theme.colors.darkGray};
`;

const CheckboxGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const CheckboxLabel = styled.span`
  color: ${props => props.theme.colors.darkGray};
`;

const authenticate = async (username, password) => {
  return AuthService.login(username, password);
};

const Admin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check URL parameters for active tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dashboard', 'inquiries', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await authenticate(username, password);

      if (result.success) {
        setIsLoggedIn(true);
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        // In the future, this will store the JWT token from AWS Cognito
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsLoggedIn(false);
      localStorage.removeItem('isAdminLoggedIn');
      // Will clear AWS Cognito tokens in the future
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToSection = (section) => {
    if (section === 'listings') {
      navigate('/admin/listings');
    } else {
      navigate(`/admin?tab=${section}`);
      setActiveTab(section);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <SEO pageName="Admin Portal">
          <meta name="robots" content="noindex, nofollow" />
        </SEO>
        
        <AdminContainer>
          <LoginForm onSubmit={handleLogin}>
            <FormTitle>Admin Login</FormTitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              marginBottom
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              marginBottom
              required
            />
            
            <Button type="submit" disabled={isLoading} primary fullWidth center>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </LoginForm>
        </AdminContainer>
      </>
    );
  }

  return (
    <>
      <SEO pageName="Admin Portal">
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>Admin Dashboard</AdminTitle>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </AdminHeader>

        <AdminNavigation>
          <NavLink 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          >
            <FaHome /> Dashboard
          </NavLink>
          <NavLink 
            active={activeTab === 'listings' || window.location.pathname === '/admin/listings'} 
            onClick={() => navigateToSection('listings')}
          >
            <FaList /> Listings
          </NavLink>
          <NavLink 
            active={activeTab === 'inquiries'} 
            onClick={() => setActiveTab('inquiries')}
          >
            <FaEnvelope /> Inquiries
          </NavLink>
          <NavLink 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </NavLink>
        </AdminNavigation>

        {activeTab === 'dashboard' && (
          <div>
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Manage your real estate website with these tools.</p>
            
            <DashboardGrid>
              <DashboardCard>
                <DashboardCardHeader>
                  <h3>Quick Stats</h3>
                </DashboardCardHeader>
                <DashboardContent>
                  <StatItem>
                    <StatLabel>Active Listings</StatLabel>
                    <StatValue>0</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Pending Inquiries</StatLabel>
                    <StatValue>0</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Last Website Update</StatLabel>
                    <StatValue>{new Date().toLocaleDateString()}</StatValue>
                  </StatItem>
                </DashboardContent>
              </DashboardCard>
              
              <DashboardCard>
                <DashboardCardHeader>
                  <h3>Quick Actions</h3>
                </DashboardCardHeader>
                <DashboardContent>
                  <ActionButton onClick={() => navigateToSection('listings')}>
                    <FaList /> Manage Listings
                  </ActionButton>
                  <ActionButton onClick={() => setActiveTab('inquiries')}>
                    <FaEnvelope /> View Inquiries
                  </ActionButton>
                  <ActionButton onClick={() => window.open('/', '_blank')}>
                    <FaHome /> View Website
                  </ActionButton>
                </DashboardContent>
              </DashboardCard>
              
              <DashboardCard>
                <DashboardCardHeader>
                  <h3>Getting Started</h3>
                </DashboardCardHeader>
                <DashboardContent>
                  <GuideList>
                    <GuideItem>
                      <GuideTitle>Add Your First Listing</GuideTitle>
                      <GuideDescription>Go to Listings and click "Add New Listing" to create your first property listing.</GuideDescription>
                    </GuideItem>
                    <GuideItem>
                      <GuideTitle>Respond to Inquiries</GuideTitle>
                      <GuideDescription>Check the Inquiries tab to see and respond to customer messages.</GuideDescription>
                    </GuideItem>
                    <GuideItem>
                      <GuideTitle>Update Your Settings</GuideTitle>
                      <GuideDescription>Configure your account settings in the Settings tab.</GuideDescription>
                    </GuideItem>
                  </GuideList>
                </DashboardContent>
              </DashboardCard>
            </DashboardGrid>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <h2>Contact Inquiries</h2>
            <p>Review and manage customer inquiries from the contact form.</p>
            <AdminInquiries />
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2>Admin Settings</h2>
            <p>Configure your account and website settings.</p>
            
            <SettingsGrid>
              <SettingsCard>
                <SettingsCardHeader>
                  <h3>Profile Settings</h3>
                </SettingsCardHeader>
                <SettingsCardContent>
                  <FormGroup>
                    <Label>Display Name</Label>
                    <Input type="text" defaultValue="Dan Weihmiller" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input type="email" defaultValue="buildingincolorado22@gmail.com" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input type="tel" defaultValue="(719) 301-8257" />
                  </FormGroup>
                  <Button primary center>Save Profile</Button>
                </SettingsCardContent>
              </SettingsCard>
              
              <SettingsCard>
                <SettingsCardHeader>
                  <h3>Password</h3>
                </SettingsCardHeader>
                <SettingsCardContent>
                  <FormGroup>
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input type="password" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </FormGroup>
                  <Button primary center>Update Password</Button>
                </SettingsCardContent>
              </SettingsCard>
              
              <SettingsCard>
                <SettingsCardHeader>
                  <h3>Notification Settings</h3>
                </SettingsCardHeader>
                <SettingsCardContent>
                  <CheckboxGroup>
                    <Checkbox defaultChecked>
                      <CheckboxLabel>Email me when I receive a new inquiry</CheckboxLabel>
                    </Checkbox>
                    <Checkbox defaultChecked>
                      <CheckboxLabel>Email me when a listing is viewed</CheckboxLabel>
                    </Checkbox>
                    <Checkbox>
                      <CheckboxLabel>Send weekly summary reports</CheckboxLabel>
                    </Checkbox>
                  </CheckboxGroup>
                  <Button primary center>Save Preferences</Button>
                </SettingsCardContent>
              </SettingsCard>
            </SettingsGrid>
          </div>
        )}
      </AdminContainer>
    </>
  );
};

export default Admin; 