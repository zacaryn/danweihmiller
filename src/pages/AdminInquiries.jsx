import { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { InquiriesService, ListingsService } from '../services/aws-service';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTrash, FaHome, FaSpinner, FaInbox, FaCheckDouble, FaBuilding, FaQuestionCircle, FaStar } from 'react-icons/fa';

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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ScrollContainer = styled.div`
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-right: ${props => props.theme.spacing.sm};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
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

const CompactCard = styled(Card)`
  padding: 1.25rem;
  cursor: pointer;
  border: 1px solid #E5E7EB;
  border-left: 4px solid ${props => props.isRead ? '#10B981' : '#F59E0B'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  
  &:hover {
    border-color: ${props => props.isRead ? '#10B981' : '#F59E0B'};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompactHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const CompactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

const NameAndPreview = styled.div`
  flex: 1;
  min-width: 0;
  
  h3 {
    margin: 0;
    color: ${props => props.theme.colors.primary};
    font-size: 1rem;
    font-weight: ${props => !props.isRead ? '600' : '500'};
    margin-bottom: 0.25rem;
  }
  
  p {
    margin: 0;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6B7280;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const InquiryStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.isRead ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  color: ${props => props.isRead ? '#10B981' : '#F59E0B'};

  svg {
    font-size: 0.75rem;
  }
`;

const InquiryCardDetails = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #E5E7EB;
`;

const InquiryContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;

const InquiryInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6B7280;
  font-size: 0.875rem;

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const InquiryMessageContent = styled.div`
  background: #F9FAFB;
  padding: 1rem;
  border-radius: 6px;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

const InquiryPropertyInfo = styled.div`
  display: flex;
  align-items: center;
  background: rgba(14, 31, 69, 0.04);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.25rem;
  gap: 0.75rem;

  svg {
    color: ${props => props.theme.colors.primary};
  }

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InquiryActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${props => props.primary && `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.secondary};
    }
  `}

  ${props => props.danger && `
    background: white;
    color: #EF4444;
    border-color: #EF4444;
    
    &:hover {
      background: #FEE2E2;
    }
  `}
`;

const InquiryActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const InquiryCard = ({ inquiry, onMarkAsRead, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loadingProperty, setLoadingProperty] = useState(false);
  
  useEffect(() => {
    if (isExpanded && inquiry.listingId && !propertyDetails) {
      const fetchPropertyDetails = async () => {
        try {
          setLoadingProperty(true);
          const listing = await ListingsService.getListing(inquiry.listingId);
          setPropertyDetails(listing);
        } catch (error) {
          console.error('Error fetching property details:', error);
        } finally {
          setLoadingProperty(false);
        }
      };
      fetchPropertyDetails();
    }
  }, [isExpanded, inquiry.listingId, propertyDetails]);

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead(inquiry.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(inquiry.id);
  };

  const formattedDate = new Date(inquiry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <CompactCard isRead={inquiry.isRead} onClick={() => setIsExpanded(!isExpanded)}>
      <CompactHeader>
        <CompactInfo>
          <NameAndPreview isRead={inquiry.isRead}>
            <h3>{inquiry.name}</h3>
            <p>{inquiry.message}</p>
          </NameAndPreview>
        </CompactInfo>
        <MetaInfo>
          {inquiry.listingId && <FaHome title="Property Inquiry" />}
          <span>{formattedDate}</span>
          <InquiryStatus isRead={inquiry.isRead}>
            {inquiry.isRead ? <><FaCheckDouble /> Read</> : <><FaEnvelope /> Unread</>}
          </InquiryStatus>
        </MetaInfo>
      </CompactHeader>

      {isExpanded && (
        <InquiryCardDetails>
          <InquiryContactInfo>
            <InquiryInfoItem>
              <FaEnvelope /> {inquiry.email}
            </InquiryInfoItem>
            <InquiryInfoItem>
              <FaPhone /> {inquiry.phone || 'Not provided'}
            </InquiryInfoItem>
          </InquiryContactInfo>
          <InquiryMessageContent>{inquiry.message}</InquiryMessageContent>
          {inquiry.listingId && (
            <InquiryPropertyInfo>
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
            </InquiryPropertyInfo>
          )}
          <InquiryActionButtons>
            {!inquiry.isRead && (
              <InquiryActionButton primary onClick={handleMarkAsRead}>
                <FaCheckCircle /> Mark as Read
              </InquiryActionButton>
            )}
            <InquiryActionButton danger onClick={handleDelete}>
              <FaTrash /> Delete
            </InquiryActionButton>
          </InquiryActionButtons>
        </InquiryCardDetails>
      )}
    </CompactCard>
  );
};

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.95rem;
  margin: 0 0 2rem 0;
`;

const InboxLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  padding: 1.5rem;
  min-height: calc(100vh - 200px);
  background: #f8f9fa;
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.25rem 1rem;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const MainContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.darkGray};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    margin: 0 0 0.75rem 0.5rem;
  }
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: none;
  background: ${props => props.active ? 'rgba(14, 31, 69, 0.04)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: ${props => props.active ? '600' : '400'};
  text-align: left;
  margin-bottom: 0.25rem;

  &:hover {
    background: rgba(14, 31, 69, 0.04);
  }

  svg {
    font-size: 0.875rem;
    margin-right: 0.75rem;
    color: ${props => props.active ? props.theme.colors.primary : '#6B7280'};
  }

  .count {
    margin-left: auto;
    background: ${props => props.active ? props.theme.colors.primary : '#E5E7EB'};
    color: ${props => props.active ? 'white' : '#6B7280'};
    padding: 0.125rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    min-width: 1.5rem;
    text-align: center;
  }
`;

const HeaderButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.primary ? props.theme.colors.primary : 'white'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.primary ? 'transparent' : props.theme.colors.primary};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : 'rgba(14, 31, 69, 0.04)'};
  }
`;

const InboxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    margin: 0;
  }
`;

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

  const fetchInquiries = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const data = await InquiriesService.getInquiries();
      
      // Sort inquiries by date (newest first)
      const sortedInquiries = [...data].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      // Implement client-side pagination
      const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedInquiries = sortedInquiries.slice(startIndex, endIndex);
      
      if (append) {
        setInquiries(prev => [...prev, ...paginatedInquiries]);
      } else {
        setInquiries(paginatedInquiries);
      }
      
      setHasMore(endIndex < sortedInquiries.length);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || loadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      fetchInquiries(page + 1, true);
    }
  }, [loadingMore, hasMore, page]);

  useEffect(() => {
    fetchInquiries(1, false);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

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

  const handleRefresh = () => {
    setPage(1);
    fetchInquiries(1, false);
  };

  const getCounts = () => {
    const counts = {
      all: inquiries.length,
      pending: inquiries.filter(i => !i.isRead).length,
      resolved: inquiries.filter(i => i.isRead).length,
      property: inquiries.filter(i => i.listingId).length,
      general: inquiries.filter(i => !i.listingId).length
    };
    return counts;
  };

  if (loading) {
    return <LoadingState>Loading inquiries...</LoadingState>;
  }

  if (error) {
    return <ErrorState>{error}</ErrorState>;
  }

  const counts = getCounts();

  return (
    <>
      <PageTitle>Contact Inquiries</PageTitle>
      <PageDescription>Review and manage customer inquiries from the contact form.</PageDescription>
      
      <InboxLayout>
        <Sidebar>
          <SidebarSection>
            <h3>Inbox</h3>
            <SidebarItem 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              <FaInbox /> All Messages
              <span className="count">{counts.all}</span>
            </SidebarItem>
            <SidebarItem 
              active={filter === 'pending'} 
              onClick={() => setFilter('pending')}
            >
              <FaEnvelope /> Unread
              <span className="count">{counts.pending}</span>
            </SidebarItem>
            <SidebarItem 
              active={filter === 'resolved'} 
              onClick={() => setFilter('resolved')}
            >
              <FaCheckDouble /> Read
              <span className="count">{counts.resolved}</span>
            </SidebarItem>
          </SidebarSection>

          <SidebarSection>
            <h3>Categories</h3>
            <SidebarItem 
              active={filter === 'property'} 
              onClick={() => setFilter('property')}
            >
              <FaBuilding /> Property Inquiries
              <span className="count">{counts.property}</span>
            </SidebarItem>
            <SidebarItem 
              active={filter === 'general'} 
              onClick={() => setFilter('general')}
            >
              <FaQuestionCircle /> General Inquiries
              <span className="count">{counts.general}</span>
            </SidebarItem>
          </SidebarSection>
        </Sidebar>

        <MainContent>
          <InboxHeader>
            <h2>
              {filter === 'all' && 'All Messages'}
              {filter === 'pending' && 'Unread Messages'}
              {filter === 'resolved' && 'Read Messages'}
              {filter === 'property' && 'Property Inquiries'}
              {filter === 'general' && 'General Inquiries'}
            </h2>
            <HeaderButton primary onClick={handleRefresh}>
              Refresh
            </HeaderButton>
          </InboxHeader>

          {filteredInquiries.length === 0 ? (
            <EmptyState>
              <h3>No Inquiries Found</h3>
              <p>You don't have any inquiries matching this filter.</p>
            </EmptyState>
          ) : (
            <ScrollContainer ref={scrollContainerRef}>
              {filteredInquiries.map(inquiry => (
                <InquiryCard 
                  key={inquiry.id} 
                  inquiry={inquiry} 
                  onMarkAsRead={markAsRead} 
                  onDelete={handleDelete} 
                />
              ))}
              {loadingMore && (
                <LoadingSpinner>
                  <FaSpinner size={24} />
                </LoadingSpinner>
              )}
            </ScrollContainer>
          )}
        </MainContent>
      </InboxLayout>
    </>
  );
};

export default AdminInquiries; 