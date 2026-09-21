import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { submitContactMessage } from '../../services/contact-api';

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
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.lightGray};
  width: 100%;
  height: 50px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(14, 31, 69, 0.1);
    background-color: white;
  }

  &::placeholder {
    color: ${props => props.theme.colors.darkGray};
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    height: 55px;
  }
`;

const Textarea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 140px;
  resize: vertical;
  transition: ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.lightGray};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(14, 31, 69, 0.1);
    background-color: white;
  }

  &::placeholder {
    color: ${props => props.theme.colors.darkGray};
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    min-height: 160px;
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 54px;

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

  @media (max-width: 768px) {
    font-size: 1.1rem;
    height: 56px;
    margin-top: ${props => props.theme.spacing.md};
  }
`;

const Message = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
  text-align: center;

  ${props =>
    props.type === 'success' &&
    `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}

  ${props =>
    props.type === 'error' &&
    `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const topicFromUrl = searchParams.get('topic') || searchParams.get('context') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    context: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    message: null,
    type: null,
  });

  useEffect(() => {
    if (topicFromUrl) {
      setFormData(prev => ({
        ...prev,
        context: topicFromUrl,
        message: prev.message || "I'm interested in learning more about this property.",
      }));
    }
  }, [topicFromUrl]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        message: 'Please fill out all required fields.',
        type: 'error',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setStatus({ submitting: true, message: null, type: null });

    try {
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        context: formData.context.trim() || undefined,
        message: formData.message.trim(),
      });
      setStatus({
        submitting: false,
        message: "Thank you for your message! Dan will get back to you soon.",
        type: 'success',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        context: topicFromUrl || '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus({
        submitting: false,
        message:
          error.message || 'Sorry, there was an error sending your message. Please try again.',
        type: 'error',
      });
    }
  };

  return (
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
          placeholder="Your name"
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
          placeholder="Your email address"
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
          placeholder="Your phone number"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="context">Property or topic (optional)</Label>
        <Input
          type="text"
          id="context"
          name="context"
          value={formData.context}
          onChange={handleChange}
          placeholder="Address, MLS#, or how we can help"
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
          placeholder="How can Dan help you today?"
        />
      </FormGroup>

      <Button type="submit" disabled={status.submitting}>
        {status.submitting ? 'Sending...' : 'Send Message'}
      </Button>

      {status.message && <Message type={status.type}>{status.message}</Message>}
    </Form>
  );
};

export default ContactForm;
