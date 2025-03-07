import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { InquiriesService, ListingsService } from '../../services/aws-service';
import { testDynamoDBConnection } from '../../services/db-service';

const FormContainer = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: ${props => props.theme.transitions.default};
  width: 100%;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
  }

  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: ${props => props.theme.transitions.fast};
  width: 100%;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xs};
    font-size: 0.95rem;
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: ${props => props.theme.transitions.fast};
  width: 100%;

  @media (max-width: 768px) {
    min-height: 100px;
    font-size: 0.95rem;
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  margin-top: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const SuccessMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: #d4edda;
  color: #155724;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
`;

const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
`;

const ListingInfo = styled.div`
  background-color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.md};

  h3 {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

const DiagnosticInfo = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: #f8f9fa;
  color: #333;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
`;

const submitContactForm = async (formData) => {
  try {
    console.log('Submitting contact form data:', JSON.stringify(formData));
    
    // Test DynamoDB connection first
    const testResult = await testDynamoDBConnection();
    console.log('DynamoDB connection test:', testResult);
    
    if (!testResult.success) {
      throw new Error(`DynamoDB connection test failed: ${testResult.message}`);
    }
    
    const result = await InquiriesService.submitInquiry(formData);
    console.log('Form submission result:', result);
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // Try to get more detailed error information
    if (error.code) {
      console.error(`AWS Error: ${error.code} - ${error.message}`);
    }
    throw error;
  }
};

const fetchListingDetails = async (listingId) => {
  try {
    return await ListingsService.getListing(listingId);
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
};

const ContactForm = ({ listingId = null }) => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general',
    listingId: listingId || searchParams.get('listing') || '',
    source: 'website'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);

  useEffect(() => {
    // Update listingId if it changes via props or URL
    const listingParam = searchParams.get('listing');
    if (listingParam || listingId) {
      setFormData(prev => ({
        ...prev,
        listingId: listingId || listingParam || '',
        inquiryType: 'property'
      }));

      // Fetch listing details if a listing ID is provided
      const fetchListing = async () => {
        try {
          const details = await fetchListingDetails(listingId || listingParam);
          if (details) {
            setListingDetails(details);
          }
        } catch (error) {
          console.error('Error fetching listing details:', error);
        }
      };

      fetchListing();
    }
  }, [searchParams, listingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Add timestamp and generate unique ID
      const dataToSubmit = {
        ...formData,
        id: `inquiry-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString()
      };
      
      console.log('Starting form submission process...');
      const result = await submitContactForm(dataToSubmit);
      console.log('Form submission completed with result:', result);
      
      if (result.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          inquiryType: 'general',
          listingId: listingId || searchParams.get('listing') || '',
          source: 'website'
        });
      } else {
        console.error('Form submission returned unsuccessful:', result);
        setSubmitError(`There was a problem submitting your message: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Form submission threw an exception:', error);
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      
      // Try to extract a more detailed error message
      if (error.code && error.message) {
        errorMessage = `Error (${error.code}): ${error.message}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      {listingDetails && (
        <ListingInfo>
          <h3>Inquiry About Property</h3>
          <p><strong>{listingDetails.title}</strong></p>
          <p>{listingDetails.address}</p>
          <p>${listingDetails.price?.toLocaleString()}</p>
        </ListingInfo>
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
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="inquiryType">Inquiry Type</Label>
          <Select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
          >
            <option value="general">General Inquiry</option>
            <option value="property">Property Inquiry</option>
            <option value="selling">Selling a Property</option>
            <option value="buying">Buying a Property</option>
          </Select>
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

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>

        {submitSuccess && (
          <SuccessMessage>
            Thank you for your message! Dan will get back to you as soon as possible.
          </SuccessMessage>
        )}

        {submitError && (
          <ErrorMessage>{submitError}</ErrorMessage>
        )}
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 