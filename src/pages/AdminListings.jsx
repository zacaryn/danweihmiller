import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ListingForm from '../components/admin/ListingForm';
import { ListingsService } from '../services/aws-service';
import { toast } from 'react-hot-toast';

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 2rem;
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const ListingCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

const ListingImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; // 3:2 aspect ratio
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListingContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const ListingTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
`;

const ListingPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ListingStatus = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background-color: #4CAF50;
          color: white;
        `;
      case 'pending':
        return `
          background-color: #FFA000;
          color: white;
        `;
      case 'sold':
        return `
          background-color: #F44336;
          color: white;
        `;
      default:
        return '';
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ActionButton = styled(Button)`
  flex: 1;
  font-size: 0.875rem;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  
  ${props => props.variant === 'secondary' && `
    background-color: ${props.theme.colors.lightGray};
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.accent};
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background-color: #F44336;
    
    &:hover {
      background-color: #D32F2F;
    }
  `}
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  margin: ${props => props.theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  padding: ${props => props.theme.spacing.xl};
`;

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  
  useEffect(() => {
    fetchListings();
  }, []);
  
  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await ListingsService.getAllListings();
      setListings(data);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddListing = () => {
    setEditingListing(null);
    setShowForm(true);
  };
  
  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };
  
  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }
    
    try {
      await ListingsService.deleteListing(id);
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      console.error('Error deleting listing:', err);
      alert('Failed to delete listing. Please try again.');
    }
  };
  
  const handleSubmit = async (formData) => {
    try {
      if (editingListing) {
        await ListingsService.updateListing(editingListing.id, formData);
      } else {
        await ListingsService.createListing(formData);
      }
      
      setShowForm(false);
      fetchListings();
    } catch (err) {
      console.error('Error saving listing:', err);
      alert('Failed to save listing. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <LoadingSpinner>Loading listings...</LoadingSpinner>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage>{error}</ErrorMessage>
    );
  }
  
  return (
    <>
      <Header>
        <Button onClick={handleAddListing}>Add New Listing</Button>
      </Header>
      
      <ListingsGrid>
        {listings.map(listing => (
          <ListingCard key={listing.id}>
            <ListingImage>
              <img src={listing.coverImage} alt={listing.title} />
            </ListingImage>
            
            <ListingContent>
              <ListingTitle>{listing.title}</ListingTitle>
              <ListingPrice>{formatPrice(listing.price)}</ListingPrice>
              <ListingStatus status={listing.status}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </ListingStatus>
              
              <ButtonGroup>
                <ActionButton
                  onClick={() => handleEditListing(listing)}
                >
                  <FaEdit /> Edit
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  <FaTrash /> Delete
                </ActionButton>
              </ButtonGroup>
            </ListingContent>
          </ListingCard>
        ))}
      </ListingsGrid>
      
      {showForm && (
        <Modal onClick={() => setShowForm(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ListingForm
              initialData={editingListing}
              onSubmit={handleSubmit}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AdminListings; 