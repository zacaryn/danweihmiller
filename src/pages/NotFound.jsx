import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SEO from '../components/shared/SEO';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 120px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 20px 80px;
  }
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  color: #0E1F45;
  margin: 0;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 90px;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 36px;
  margin: 0 0 30px;
  color: #0E1F45;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 40px;
  color: #555;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #0E1F45;
  color: white;
  border: 2px solid #0E1F45;
  
  &:hover {
    background-color: #0c1a3a;
    box-shadow: 0 4px 12px rgba(14, 31, 69, 0.2);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #0E1F45;
  border: 2px solid #0E1F45;
  
  &:hover {
    background-color: #f5f8ff;
    box-shadow: 0 4px 12px rgba(14, 31, 69, 0.1);
  }
`;

const NotFound = () => {
  return (
    <>
      <SEO 
        pageName="Page Not Found" 
        description="The page you're looking for doesn't exist. Browse our Colorado Springs real estate listings or return to the homepage."
      />
      <NotFoundContainer>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          We're sorry, but the page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to our homepage to find what you're looking for.
        </ErrorMessage>
        <ActionButtons>
          <PrimaryButton to="/">
            <FaHome /> Return to Homepage
          </PrimaryButton>
          <SecondaryButton to="/listings">
            <FaSearch /> Browse Listings
          </SecondaryButton>
        </ActionButtons>
      </NotFoundContainer>
    </>
  );
};

export default NotFound; 