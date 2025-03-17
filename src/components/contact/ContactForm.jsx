import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { InquiriesService, ListingsService } from '../../services/aws-service';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  border: 1px solid ${props => props.theme.colors.lightGray};
  
  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: ${props => props.theme.spacing.md};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(14, 31, 69, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 140px;
  resize: vertical;
  transition: ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(14, 31, 69, 0.1);
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  margin-top: ${props => props.theme.spacing.sm};
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.lightGray};
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
  text-align: center;
  
  ${props => props.type === 'success' && `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.type === 'error' && `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

const PropertyInfo = styled.div`
  background-color: #f8f9fa;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.md};
  border-left: 4px solid ${props => props.theme.colors.primary};

  h3 {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.text};
  }
`;

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get('listing');
  const [listingDetails, setListingDetails] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    listingId: null
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    message: null,
    type: null
  });

  // Fetch listing details if a listing ID is provided
  useEffect(() => {
    const fetchListingDetails = async () => {
      if (listingId) {
        try {
          const listing = await ListingsService.getListing(listingId);
          setListingDetails(listing);
          // Pre-populate the message with just listing title for better UX
          setFormData(prev => ({
            ...prev,
            listingId,
            message: `I'm interested in inquiring about ${listing.address}`
          }));
        } catch (error) {
          console.error('Error fetching listing details:', error);
        }
      }
    };

    fetchListingDetails();
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        message: 'Please fill out all required fields.',
        type: 'error'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        message: 'Please enter a valid email address.',
        type: 'error'
      });
      return;
    }

    setStatus({ submitting: true, message: null, type: null });

    try {
      console.log('Submitting inquiry from contact form');
      await InquiriesService.submitInquiry({
        ...formData,
        listingId: listingId || null // Ensure listingId is included if present
      });
      setStatus({
        submitting: false,
        message: "Thank you for your message! We'll get back to you soon.",
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        listingId: null
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus({
        submitting: false,
        message: error.message || 'Sorry, there was an error sending your message. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <FormContainer>
      {listingDetails && (
        <PropertyInfo>
          <h3>Inquiry about: {listingDetails.address}</h3>
          {listingDetails.city && listingDetails.state && (
            <p>{listingDetails.city}, {listingDetails.state}</p>
          )}
        </PropertyInfo>
      )}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={status.submitting}>
          {status.submitting ? 'Sending...' : 'Send Message'}
        </Button>

        {status.message && (
          <Message type={status.type}>{status.message}</Message>
        )}
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 