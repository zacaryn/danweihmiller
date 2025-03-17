import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { InquiriesService, ListingsService } from '../services/aws-service';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTrash, FaHome } from 'react-icons/fa';

const InquiriesContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: ${props => props.theme.transitions.default};
`;

const InquiryItem = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  border-left: 4px solid ${props => props.status === 'resolved' ? props.theme.colors.secondary : props.theme.colors.primary};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-2px);
  }
`;

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const InquiryName = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

const InquiryDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const InquiryType = styled.span`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const InquiryContent = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InquiryMessage = styled.p`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.sm};
  line-height: 1.6;
`;

const InquiryContact = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InquiryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
    transform: translateY(-2px);
  }
`;

const DeleteButton = styled(Button)`
  color: #e74c3c;
  border-color: #e74c3c;
  
  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  p {
    color: ${props => props.theme.colors.darkGray};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background-color: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
`;

const Message = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  line-height: 1.6;
`;

const PropertyInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-left: 3px solid ${props => props.theme.colors.primary};
  gap: ${props => props.theme.spacing.xs};

  strong {
    color: ${props => props.theme.colors.primary};
    margin-right: ${props => props.theme.spacing.xs};
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.white};
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const InquiryCard = ({ inquiry, onMarkAsRead, onDelete }) => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loadingProperty, setLoadingProperty] = useState(false);
  
  useEffect(() => {
    // Fetch property details if there's a listingId
    const fetchPropertyDetails = async () => {
      if (inquiry.listingId) {
        try {
          setLoadingProperty(true);
          const listing = await ListingsService.getListing(inquiry.listingId);
          setPropertyDetails(listing);
        } catch (error) {
          console.error('Error fetching property details:', error);
        } finally {
          setLoadingProperty(false);
        }
      }
    };
    
    fetchPropertyDetails();
  }, [inquiry.listingId]);
  
  const isReadStatus = inquiry.isRead ? 'Read' : 'Unread';
  const statusColor = inquiry.isRead ? '#4CAF50' : '#FFC107';
  
  return (
    <Card>
      <CardHeader>
        <h3>{inquiry.name}</h3>
        <Status style={{ backgroundColor: statusColor }}>
          {isReadStatus}
        </Status>
      </CardHeader>
      <CardDetails>
        <ContactInfo>
          <InfoItem>
            <FaEnvelope /> {inquiry.email}
          </InfoItem>
          <InfoItem>
            <FaPhone /> {inquiry.phone || 'Not provided'}
          </InfoItem>
          <InfoItem>
            <FaCalendarAlt /> {new Date(inquiry.createdAt).toLocaleDateString()}
          </InfoItem>
        </ContactInfo>
        <Message>{inquiry.message}</Message>
        {inquiry.listingId && (
          <PropertyInfo>
            <FaHome />
            <strong>Related Property:</strong> 
            {loadingProperty ? (
              'Loading property details...'
            ) : propertyDetails ? (
              <a href={`/listings/${inquiry.listingId}`} target="_blank" rel="noopener noreferrer">
                {propertyDetails.title || 'Unknown property'}
              </a>
            ) : (
              `ID: ${inquiry.listingId}`
            )}
          </PropertyInfo>
        )}
        <InquiryActions>
          {!inquiry.isRead && (
            <Button primary onClick={() => onMarkAsRead(inquiry.id)}>
              <FaCheckCircle /> Mark as Read
            </Button>
          )}
          <Button danger onClick={() => onDelete(inquiry.id)}>
            <FaTrash /> Delete
          </Button>
        </InquiryActions>
      </CardDetails>
    </Card>
  );
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await InquiriesService.getInquiries();
      
      // Sort inquiries by date (newest first)
      const sortedInquiries = [...data].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setInquiries(sortedInquiries || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await InquiriesService.markAsRead(id);
      setInquiries(prev => prev.map(inquiry => {
        if (inquiry.id === id) {
          return { ...inquiry, isRead: true };
        }
        return inquiry;
      }));
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await InquiriesService.deleteInquiry(id);
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return inquiry.isRead === true;
    if (filter === 'pending') return inquiry.isRead === false;
    if (filter === 'property') return inquiry.listingId;
    if (filter === 'general') return !inquiry.listingId;
    return false;
  });

  if (loading) {
    return <LoadingState>Loading inquiries...</LoadingState>;
  }

  if (error) {
    return <ErrorState>{error}</ErrorState>;
  }

  return (
    <InquiriesContainer>
      <FilterBar>
        <Filters>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')}
          >
            Unread
          </FilterButton>
          <FilterButton 
            active={filter === 'resolved'} 
            onClick={() => setFilter('resolved')}
          >
            Read
          </FilterButton>
          <FilterButton 
            active={filter === 'property'} 
            onClick={() => setFilter('property')}
          >
            Property Inquiries
          </FilterButton>
          <FilterButton 
            active={filter === 'general'} 
            onClick={() => setFilter('general')}
          >
            General Inquiries
          </FilterButton>
        </Filters>
        <Button primary onClick={fetchInquiries}>
          Refresh
        </Button>
      </FilterBar>

      {filteredInquiries.length === 0 ? (
        <EmptyState>
          <h3>No Inquiries Found</h3>
          <p>You don't have any inquiries matching this filter.</p>
        </EmptyState>
      ) : (
        filteredInquiries.map(inquiry => (
          <InquiryCard 
            key={inquiry.id} 
            inquiry={inquiry} 
            onMarkAsRead={markAsRead} 
            onDelete={handleDelete} 
          />
        ))
      )}
    </InquiriesContainer>
  );
};

export default AdminInquiries; 