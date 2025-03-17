import { useState } from 'react';
import styled from '@emotion/styled';
import { ListingsService, StorageService } from '../../services/aws-service';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4A4036;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4A4036;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4A4036;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4A4036;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5B4D42;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
  
  ${props => props.type === 'success' && `
    background-color: #d4edda;
    color: #155724;
  `}
  
  ${props => props.type === 'error' && `
    background-color: #f8d7da;
    color: #721c24;
  `}
`;

const ImagePreview = styled.img`
  max-width: 200px;
  margin-top: 0.5rem;
  border-radius: 4px;
`;

const ListingForm = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    price: '',
    status: 'active',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    description: '',
    externalLink: '',
    coverImage: null
  });

  const [status, setStatus] = useState({
    submitting: false,
    message: null,
    type: null
  });

  const [imagePreview, setImagePreview] = useState(initialData?.coverImage || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({
      ...prev,
      coverImage: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: null, type: null });

    try {
      let coverImageUrl = formData.coverImage;

      // If there's a new file to upload
      if (formData.coverImage instanceof File) {
        coverImageUrl = await StorageService.uploadImage(formData.coverImage);
      }

      const listingData = {
        ...formData,
        coverImage: coverImageUrl,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        squareFeet: parseInt(formData.squareFeet)
      };

      if (initialData?.id) {
        await ListingsService.updateListing(initialData.id, listingData);
      } else {
        await ListingsService.createListing(listingData);
      }

      setStatus({
        submitting: false,
        message: `Listing ${initialData ? 'updated' : 'created'} successfully!`,
        type: 'success'
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      setStatus({
        submitting: false,
        message: 'Error saving listing. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Price *</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status *</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            min="0"
            step="0.5"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="squareFeet">Square Feet *</Label>
          <Input
            type="number"
            id="squareFeet"
            name="squareFeet"
            value={formData.squareFeet}
            onChange={handleChange}
            required
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="externalLink">External Link</Label>
          <Input
            type="url"
            id="externalLink"
            name="externalLink"
            value={formData.externalLink}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="coverImage">Cover Image {initialData ? '(Leave empty to keep current)' : '*'}</Label>
          <Input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleImageChange}
            accept="image/*"
            required={!initialData}
          />
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Cover" />
          )}
        </FormGroup>

        <Button type="submit" disabled={status.submitting}>
          {status.submitting ? 'Saving...' : initialData ? 'Update Listing' : 'Create Listing'}
        </Button>

        {status.message && (
          <Message type={status.type}>{status.message}</Message>
        )}
      </Form>
    </FormContainer>
  );
};

export default ListingForm; 