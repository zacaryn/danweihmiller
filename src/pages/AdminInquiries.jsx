import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { InquiriesService } from '../services/aws-service';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTrash } from 'react-icons/fa';

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
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      
      setInquiries(sortedInquiries || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = (id) => {
    setInquiries(prev => prev.map(inquiry => {
      if (inquiry.id === id) {
        return { ...inquiry, status: 'resolved' };
      }
      return inquiry;
    }));
    // In a full implementation, this would also update the status in DynamoDB
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      // In a full implementation, this would also delete the inquiry from DynamoDB
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return inquiry.status === 'resolved';
    if (filter === 'pending') return !inquiry.status || inquiry.status !== 'resolved';
    if (filter === inquiry.inquiryType) return true;
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
            Pending
          </FilterButton>
          <FilterButton 
            active={filter === 'resolved'} 
            onClick={() => setFilter('resolved')}
          >
            Resolved
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
          <InquiryItem key={inquiry.id} status={inquiry.status}>
            <InquiryHeader>
              <div>
                <InquiryName>{inquiry.name}</InquiryName>
                <InquiryType>{inquiry.inquiryType || 'general'}</InquiryType>
              </div>
              <InquiryDate>
                <FaCalendarAlt /> {formatDate(inquiry.timestamp)}
              </InquiryDate>
            </InquiryHeader>
            
            <InquiryContact>
              <ContactItem>
                <FaEnvelope /> {inquiry.email}
              </ContactItem>
              {inquiry.phone && (
                <ContactItem>
                  <FaPhone /> {inquiry.phone}
                </ContactItem>
              )}
            </InquiryContact>
            
            <InquiryContent>
              <strong>Message:</strong>
              <InquiryMessage>{inquiry.message}</InquiryMessage>
            </InquiryContent>
            
            <InquiryActions>
              {(!inquiry.status || inquiry.status !== 'resolved') && (
                <Button primary onClick={() => markAsResolved(inquiry.id)}>
                  <FaCheckCircle /> Mark as Resolved
                </Button>
              )}
              <DeleteButton onClick={() => handleDelete(inquiry.id)}>
                <FaTrash /> Delete
              </DeleteButton>
            </InquiryActions>
          </InquiryItem>
        ))
      )}
    </InquiriesContainer>
  );
};

export default AdminInquiries; 