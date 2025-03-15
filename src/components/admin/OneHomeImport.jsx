import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { OneHomeService } from '../../services/onehome-service';
import { ListingsService, StorageService } from '../../services/aws-service';
import { FaArrowUp, FaArrowDown, FaTrash, FaImage, FaStar } from 'react-icons/fa';

const ImportContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ImportTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1.3rem;
`;

const ImportForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: ${props => props.primary && !props.bordered ? 'none' : `1px solid ${props.theme.colors.primary}`};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
  background-color: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  border-left: 4px solid #dc3545;
`;

const StatusMessage = styled.div`
  padding: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
  background-color: ${props => props.error ? '#f8d7da' : '#d4edda'};
  color: ${props => props.error ? '#721c24' : '#155724'};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
`;

const ProgressContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
  
  span {
    margin-left: ${props => props.theme.spacing.xs};
    color: ${props => 
      props.status === 'completed' ? '#155724' : 
      props.status === 'error' ? '#721c24' : 
      props.status === 'loading' ? '#856404' : '#6c757d'
    };
  }
`;

const ImageUploadContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  border: 2px dashed ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  font-weight: 500;
  margin-top: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ImagePreviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.accent};
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.small};
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isCover ? props.theme.colors.primary : 'transparent'};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const ImageActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 2px;
  background: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: ${props => props.theme.borderRadius.small};
`;

const ImageActionButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImportSection = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
`;

const SectionTitle = styled.h4`
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
`;

// Add a visible backup file input for direct uploads
const VisibleFileInput = styled.input`
  margin: ${props => props.theme.spacing.md} 0;
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const DebugButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const DebugButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const OneHomeImport = ({ onImportComplete }) => {
  const [oneHomeUrl, setOneHomeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({
    scraping: 'pending',
    processingImages: 'pending',
    importingListing: 'pending',
    message: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [scrapedData, setScrapedData] = useState(null);
  const fileInputRef = useRef(null);
  
  // Add a specific check for fileInputRef initialization
  useEffect(() => {
    console.log('StorageService available:', !!StorageService);
    console.log('StorageService methods:', StorageService ? Object.keys(StorageService) : 'Not available');
    
    // Check if fileInputRef is initialized properly
    if (!fileInputRef.current) {
      console.warn('File input reference is not initialized on component mount');
    } else {
      console.log('File input reference initialized successfully');
    }
  }, []);
  
  const updateStatus = (step, newStatus, message = '') => {
    setStatus(prev => ({
      ...prev,
      [step]: newStatus,
      message: message || prev.message
    }));
  };
  
  const handleUrlChange = (e) => {
    setOneHomeUrl(e.target.value);
    setError(null);
  };
  
  const handleImport = async (e) => {
    e.preventDefault();
    
    if (!oneHomeUrl.trim()) {
      setError('Please enter a OneHome URL');
      return;
    }
    
    if (!oneHomeUrl.includes('onehome.com')) {
      setError('Please enter a valid OneHome URL');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Reset status
    setStatus({
      scraping: 'loading',
      processingImages: 'pending',
      importingListing: 'pending',
      message: 'Starting import process...'
    });
    
    try {
      // Step 1: Scrape property data
      updateStatus('scraping', 'loading', 'Scraping property data from OneHome...');
      const data = await OneHomeService.scrapePropertyData(oneHomeUrl);
      setScrapedData(data);
      updateStatus('scraping', 'completed', 'Successfully scraped property data!');
      
      // Step 2: Process images
      updateStatus('processingImages', 'loading', 'Processing property images...');
      let processedImages = [];
      
      // If there are scraped images, process them
      if (data.images && data.images.length > 0) {
        processedImages = await OneHomeService.processPropertyImages(data.images);
        updateStatus('processingImages', 'completed', `Successfully processed ${processedImages.length} images!`);
      } else {
        updateStatus('processingImages', 'completed', 'No images found in the listing. You can upload your own images below.');
      }
      
      // Combine with any manually uploaded images
      const allImages = [...processedImages, ...uploadedImages];
      setUploadedImages(allImages);
      
      if (allImages.length === 0) {
        setError('No images found. Please upload at least one image before creating the listing.');
        setIsLoading(false);
        return;
      }
      
    } catch (error) {
      console.error('Error importing OneHome property:', error);
      setError(error.message || 'Failed to import property from OneHome');
      
      // Update status based on where the error occurred
      if (status.scraping === 'loading') {
        updateStatus('scraping', 'error', 'Failed to scrape property data');
      } else if (status.processingImages === 'loading') {
        updateStatus('processingImages', 'error', 'Failed to process images');
      }
      
      setIsLoading(false);
    }
  };
  
  const handleUploadImages = (e) => {
    e.stopPropagation(); // Stop event propagation
    console.log('Upload button clicked, triggering file input...');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('File input reference is not available');
    }
  };
  
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    console.log(`Selected ${files.length} files for upload`);
    setIsLoading(true);
    setError(null);
    updateStatus('processingImages', 'loading', `Uploading ${files.length} images...`);
    
    try {
      // Check if we can authenticate before proceeding
      console.log("Checking AWS configuration...");
      
      // Use StorageService directly for consistency
      const uploadPromises = files.map(async (file, index) => {
        try {
          const timestamp = Date.now();
          const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const fileName = `imported/${timestamp}-${index}-${cleanFileName}`;
          console.log(`Uploading file ${index + 1}/${files.length}: ${fileName}`);
          
          // Use the StorageService from aws-service.js
          const uploadedUrl = await StorageService.uploadImage(
            file,
            fileName
          );
          console.log(`Successfully uploaded to: ${uploadedUrl}`);
          return uploadedUrl;
        } catch (err) {
          console.error('Error uploading image:', err);
          // Track which file failed for better error reporting
          const errorMsg = err.message || "Unknown error";
          setError(prev => 
            prev ? `${prev}\n• File ${file.name}: ${errorMsg}` : 
            `Upload Error:\n• File ${file.name}: ${errorMsg}`
          );
          return null;
        }
      });
      
      const results = await Promise.all(uploadPromises);
      const validUploads = results.filter(url => url !== null);
      
      console.log(`Successfully uploaded ${validUploads.length} images`);
      
      if (validUploads.length === 0) {
        // If all uploads failed and they appear to be authentication issues
        if (setError._currentValue && 
            (setError._currentValue.includes('authentication') || 
             setError._currentValue.includes('authorization') ||
             setError._currentValue.includes('credentials'))) {
          throw new Error('AWS authentication failed. Please check your AWS credentials in the configuration.');
        } else if (setError._currentValue && setError._currentValue.includes('CORS')) {
          throw new Error('CORS error detected. The S3 bucket CORS settings need to be updated.');
        } else {
          throw new Error('No images were uploaded successfully. Please try again.');
        }
      }
      
      // Update status based on partial or complete success
      if (validUploads.length < files.length) {
        updateStatus('processingImages', 'warning', 
          `Uploaded ${validUploads.length}/${files.length} images. Some failed to upload.`);
      } else {
        updateStatus('processingImages', 'completed', `Successfully uploaded ${validUploads.length} images!`);
      }
      
      // Update the state with new uploaded images
      setUploadedImages(prev => {
        const newImages = [...prev, ...validUploads];
        console.log(`Total images after upload: ${newImages.length}`);
        return newImages;
      });
      
      // Clear the file input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setError(prev => prev || 'Failed to upload images: ' + error.message);
      updateStatus('processingImages', 'error', 'Failed to upload images');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleMoveImage = (index, direction) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      if (direction === 'up' && index > 0) {
        [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
      } else if (direction === 'down' && index < newImages.length - 1) {
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      }
      return newImages;
    });
  };
  
  const handleSetCover = (index) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      if (index > 0) {
        const coverImage = newImages[index];
        newImages.splice(index, 1);
        newImages.unshift(coverImage);
      }
      return newImages;
    });
  };
  
  const handleCreateListing = async () => {
    if (!scrapedData) {
      setError('Please import data from OneHome first');
      return;
    }
    
    if (uploadedImages.length === 0) {
      setError('Please add at least one image');
      return;
    }
    
    setIsLoading(true);
    updateStatus('importingListing', 'loading', 'Creating new listing...');
    
    try {
      // Format the data, including the original OneHome URL
      const formattedListing = OneHomeService.formatPropertyData(
        { ...scrapedData, oneHomeUrl },  // Add the OneHome URL to the data
        uploadedImages
      );
      
      // Add listing to database
      await ListingsService.addListing(formattedListing);
      updateStatus('importingListing', 'completed', 'Successfully imported listing!');
      
      // Notify parent component
      if (onImportComplete) {
        onImportComplete(formattedListing);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      setError(error.message || 'Failed to create listing');
      updateStatus('importingListing', 'error', 'Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    if (onImportComplete) {
      onImportComplete(null);
    }
  };
  
  const validateImages = () => {
    if (uploadedImages.length === 0) {
      setError('Please upload at least one image before creating the listing');
      return false;
    }
    return true;
  };
  
  const testAwsConnection = async () => {
    try {
      // First show the AWS config
      const awsConfig = await import('../../config/aws-config').then(m => m.default);
      console.log("AWS Configuration:", {
        region: awsConfig.Storage.AWSS3.region,
        bucket: awsConfig.Storage.AWSS3.bucket,
        hasCredentials: !!awsConfig.credentials && !!awsConfig.credentials.accessKeyId
      });
      
      const result = await StorageService.testConnection();
      if (result.success) {
        alert(`✅ SUCCESS! ${result.message}\n\nFound ${result.objectCount} objects in bucket.\n\nS3 Bucket: ${awsConfig.Storage.AWSS3.bucket}\nRegion: ${awsConfig.Storage.AWSS3.region}`);
      } else {
        // Display more helpful debug info on failure
        alert(`❌ TEST FAILED: ${result.message}\n\nPlease check the console for more details.\n\nS3 Bucket: ${awsConfig.Storage.AWSS3.bucket}\nRegion: ${awsConfig.Storage.AWSS3.region}\nHas Credentials: ${!!awsConfig.credentials && !!awsConfig.credentials.accessKeyId}`);
      }
      console.log("AWS connection test result:", result);
      return result;
    } catch (error) {
      console.error("Error testing AWS connection:", error);
      alert(`❌ ERROR: ${error.message}\n\nPlease check the browser console for details.`);
      return { success: false, error };
    }
  };
  
  return (
    <ImportContainer>
      <ImportTitle>Import Listing from OneHome</ImportTitle>
      
      <ImportForm onSubmit={handleImport}>
        <InputGroup>
          <Label htmlFor="oneHomeUrl">OneHome Property URL</Label>
          <Input
            id="oneHomeUrl"
            type="text"
            value={oneHomeUrl}
            onChange={handleUrlChange}
            placeholder="https://portal.onehome.com/en-US/property/..."
            disabled={isLoading || scrapedData}
          />
        </InputGroup>
        
        <ButtonContainer>
          {!scrapedData ? (
            <Button type="submit" primary disabled={isLoading}>
              {isLoading ? 'Importing...' : 'Import Property'}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleCreateListing} 
              primary 
              disabled={isLoading || uploadedImages.length === 0}
              style={uploadedImages.length > 0 ? { backgroundColor: '#28a745', transform: 'scale(1.05)' } : {}}
            >
              {isLoading ? 'Creating...' : 'Create Listing'} 
              {uploadedImages.length > 0 ? ` (${uploadedImages.length} images)` : ' (Upload images first)'}
            </Button>
          )}
          <Button type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
        </ButtonContainer>
      </ImportForm>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {isLoading && (
        <ProgressContainer>
          <ProgressStep status={status.scraping}>
            <span>1. Scraping property data: {status.scraping === 'loading' ? 'In progress...' : status.scraping}</span>
          </ProgressStep>
          <ProgressStep status={status.processingImages}>
            <span>2. Processing images: {status.processingImages === 'loading' ? 'In progress...' : status.processingImages}</span>
          </ProgressStep>
          <ProgressStep status={status.importingListing}>
            <span>3. Creating listing: {status.importingListing === 'loading' ? 'In progress...' : status.importingListing}</span>
          </ProgressStep>
          
          <StatusMessage>{status.message}</StatusMessage>
        </ProgressContainer>
      )}
      
      {scrapedData && (
        <ImportSection>
          <SectionTitle>Property Images</SectionTitle>
          <p>You can add your own images or reorder the existing ones. The first image will be used as the cover image.</p>
          
          <ImageUploadContainer>
            <FaImage size={32} color="#8B7355" />
            <p>Upload property images</p>
            <UploadButton type="button" onClick={handleUploadImages}>
              <FaImage size={16} /> Select Images
            </UploadButton>
            <HiddenInput 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              multiple 
              accept="image/*" 
            />
          </ImageUploadContainer>
          
          <div>
            <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
              If the button above doesn't work, you can use this direct file input:
            </p>
            <VisibleFileInput
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </div>
          
          {uploadedImages.length > 0 && (
            <ImagePreviewsContainer>
              {uploadedImages.map((image, index) => (
                <ImagePreviewWrapper key={index} isCover={index === 0}>
                  <ImagePreview src={image} alt={`Property image ${index + 1}`} />
                  <ImageActions>
                    {index !== 0 && (
                      <ImageActionButton 
                        onClick={() => handleSetCover(index)} 
                        title="Set as cover image"
                      >
                        <FaStar size={14} />
                      </ImageActionButton>
                    )}
                    {index > 0 && (
                      <ImageActionButton 
                        onClick={() => handleMoveImage(index, 'up')} 
                        title="Move up"
                      >
                        <FaArrowUp size={14} />
                      </ImageActionButton>
                    )}
                    {index < uploadedImages.length - 1 && (
                      <ImageActionButton 
                        onClick={() => handleMoveImage(index, 'down')} 
                        title="Move down"
                      >
                        <FaArrowDown size={14} />
                      </ImageActionButton>
                    )}
                    <ImageActionButton 
                      onClick={() => handleRemoveImage(index)} 
                      title="Remove image"
                    >
                      <FaTrash size={14} />
                    </ImageActionButton>
                  </ImageActions>
                </ImagePreviewWrapper>
              ))}
            </ImagePreviewsContainer>
          )}
        </ImportSection>
      )}
      
      {!isLoading && status.importingListing === 'completed' && (
        <StatusMessage>
          Successfully imported property! You can now edit or publish this listing.
        </StatusMessage>
      )}
      
      {error && (
        <ErrorMessage>
          {error}
          <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
            <strong>Debug info:</strong> File input ref exists: {fileInputRef.current ? 'Yes' : 'No'}
          </div>
        </ErrorMessage>
      )}
      
      {uploadedImages.length > 0 && !isLoading && (
        <StatusMessage style={{ backgroundColor: '#d4edda', marginTop: '1rem' }}>
          <strong>{uploadedImages.length} images uploaded successfully!</strong> 
          <div>You can now click "Create Listing" to complete the process.</div>
        </StatusMessage>
      )}
      
      <DebugButtonContainer>
        <DebugButton onClick={testAwsConnection} type="button">
          Test AWS Connection
        </DebugButton>
      </DebugButtonContainer>
    </ImportContainer>
  );
};

export default OneHomeImport; 