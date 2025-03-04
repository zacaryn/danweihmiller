import styled from '@emotion/styled';
import { useState, useRef } from 'react';

const Form = styled.form`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  min-height: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const ImageUrlInput = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
`;

const ImageUrlList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ImageUrlRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const ImagePreview = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.sm};
`;

const PreviewImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.small};
  }

  button {
    position: absolute;
    top: -8px;
    right: -8px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    
    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const PreviewCard = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.lightGray};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 4px;
`;

const PreviewError = styled.div`
  padding: ${props => props.theme.spacing.sm};
  background: #fee;
  color: #c00;
  font-size: 0.9rem;
  text-align: center;
`;

const ListingForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    status: 'active',
    images: []
  });
  
  const [imageUrls, setImageUrls] = useState(['']);
  const [urlErrors, setUrlErrors] = useState({});
  const [previewErrors, setPreviewErrors] = useState({});
  const fileInputRef = useRef();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const checkImageUrl = async (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
    setUrlErrors({});
    setPreviewErrors({});
  };

  const updateImageUrl = async (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);

    // Clear existing errors
    const newUrlErrors = { ...urlErrors };
    const newPreviewErrors = { ...previewErrors };
    delete newUrlErrors[index];
    delete newPreviewErrors[index];

    // Validate URL format
    if (value.trim() !== '') {
      if (!validateUrl(value)) {
        newUrlErrors[index] = 'Please enter a valid URL';
      } else {
        // Check if image loads
        const isValidImage = await checkImageUrl(value);
        if (!isValidImage) {
          newPreviewErrors[index] = 'Unable to load image from URL';
        }
      }
    }

    setUrlErrors(newUrlErrors);
    setPreviewErrors(newPreviewErrors);
  };

  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
    
    // Remove errors for this index
    const newUrlErrors = { ...urlErrors };
    const newPreviewErrors = { ...previewErrors };
    delete newUrlErrors[index];
    delete newPreviewErrors[index];
    setUrlErrors(newUrlErrors);
    setPreviewErrors(newPreviewErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all URLs before submitting
    const newUrlErrors = {};
    imageUrls.forEach((url, index) => {
      if (url.trim() !== '' && !validateUrl(url)) {
        newUrlErrors[index] = 'Please enter a valid URL';
      }
    });

    if (Object.keys(newUrlErrors).length > 0) {
      setUrlErrors(newUrlErrors);
      return;
    }

    const validUrls = imageUrls.filter(url => url.trim() !== '' && validateUrl(url));
    onSubmit({ ...formData, images: validUrls });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrid>
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <Input
          placeholder="Address"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          required
        />
        <Input
          placeholder="City"
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <Input
          placeholder="State"
          value={formData.state}
          onChange={e => setFormData({ ...formData, state: e.target.value })}
          required
        />
        <Input
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Square Feet"
          value={formData.squareFeet}
          onChange={e => setFormData({ ...formData, squareFeet: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          required
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </FormGrid>

      <TextArea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />

      <ImageUrlInput>
        <h3>Property Images</h3>
        <ImageUrlList>
          {imageUrls.map((url, index) => (
            <ImageUrlRow key={index}>
              <div style={{ flex: 1 }}>
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                />
                {urlErrors[index] && (
                  <ErrorText>{urlErrors[index]}</ErrorText>
                )}
              </div>
              <Button type="button" onClick={() => removeImageUrl(index)}>
                Remove
              </Button>
            </ImageUrlRow>
          ))}
        </ImageUrlList>
        <Button type="button" onClick={addImageUrlField}>
          Add Image URL
        </Button>

        <ImagePreviewGrid>
          {imageUrls.map((url, index) => {
            if (!url.trim() || urlErrors[index]) return null;
            
            return (
              <PreviewCard key={index}>
                {previewErrors[index] ? (
                  <PreviewError>{previewErrors[index]}</PreviewError>
                ) : (
                  <img src={url} alt={`Preview ${index + 1}`} />
                )}
              </PreviewCard>
            );
          })}
        </ImagePreviewGrid>
      </ImageUrlInput>

      <ButtonGroup>
        <Button type="submit" primary>
          {initialData ? 'Update Listing' : 'Add Listing'}
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default ListingForm; 