import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './aws-service';

export const OneHomeService = {
  // Extract listing ID and token from OneHome URL
  parseOneHomeUrl(url) {
    try {
      // Extract the property ID and token from the URL
      const urlObj = new URL(url);
      const propertyPath = urlObj.pathname.split('/').pop();
      const token = urlObj.searchParams.get('token');
      
      if (!propertyPath || !token) {
        throw new Error('Invalid OneHome URL format');
      }
      
      return { propertyPath, token };
    } catch (error) {
      console.error('Error parsing OneHome URL:', error);
      throw new Error('Failed to parse OneHome URL');
    }
  },
  
  // Scrape property data from OneHome using the server endpoint
  async scrapePropertyData(oneHomeUrl) {
    try {
      console.log('Scraping property data from OneHome URL:', oneHomeUrl);
      
      // Use server proxy endpoint
      const response = await axios.post('/api/proxy/scrape-onehome', { 
        url: oneHomeUrl 
      });
      
      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || 'Failed to fetch property data');
      }
      
      console.log('Successfully retrieved property data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error scraping OneHome property:', error);
      throw error;
    }
  },
  
  // Download and store property images
  async processPropertyImages(imageUrls) {
    try {
      console.log('Processing property images:', imageUrls?.length || 0);
      
      if (!imageUrls || imageUrls.length === 0) {
        console.warn('No images to process');
        return [];
      }
      
      const uploadedImages = [];
      
      // Process images in parallel with a limit of 3 concurrent uploads
      const chunks = [];
      for (let i = 0; i < imageUrls.length; i += 3) {
        chunks.push(imageUrls.slice(i, i + 3));
      }
      
      for (const chunk of chunks) {
        const promises = chunk.map(async (imageUrl, index) => {
          try {
            console.log(`Downloading image ${index + 1}/${imageUrls.length}: ${imageUrl}`);
            
            // Fetch the image
            const imageResponse = await fetch(imageUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://portal.onehome.com/'
              }
            });
            
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch image: ${imageResponse.status}`);
            }
            
            const imageBlob = await imageResponse.blob();
            if (imageBlob.size === 0) {
              throw new Error('Empty image received');
            }
            
            // Generate a file name with the original extension if possible
            const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
            const extension = contentType.split('/')[1] || 'jpg';
            const fileName = `imported/${uuidv4()}.${extension}`;
            
            console.log(`Uploading image to S3: ${fileName}`);
            
            // Upload to S3
            const uploadedUrl = await StorageService.uploadImage(
              new File([imageBlob], fileName, { type: contentType }),
              fileName
            );
            
            console.log(`Successfully uploaded image: ${uploadedUrl}`);
            return uploadedUrl;
          } catch (err) {
            console.error(`Error processing image ${imageUrl}:`, err);
            // If S3 fails, return the original URL as fallback
            return imageUrl;
          }
        });
        
        const results = await Promise.all(promises);
        uploadedImages.push(...results.filter(url => url !== null));
      }
      
      console.log(`Successfully processed ${uploadedImages.length} images`);
      return uploadedImages;
    } catch (error) {
      console.error('Error processing property images:', error);
      // Return original URLs as fallback in case of error
      return imageUrls;
    }
  },
  
  // Convert scraped data to listing format
  formatPropertyData(scrapedData, images) {
    try {
      const { 
        address, city, state, zipCode, price, 
        bedrooms, bathrooms, squareFeet,
        description, mlsNumber, oneHomeUrl
      } = scrapedData;
      
      // Ensure numeric values are properly parsed
      const parsedBedrooms = parseInt(bedrooms.replace(/[^\d.]/g, '')) || 0;
      const parsedBathrooms = parseFloat(bathrooms.replace(/[^\d.]/g, '')) || 0;
      const parsedSquareFeet = parseInt(squareFeet.replace(/[^\d.]/g, '')) || 0;
      const parsedPrice = parseFloat(price.replace(/[$,]/g, '')) || 0;
      
      return {
        id: uuidv4(),
        title: address,
        price: parsedPrice,
        address,
        city,
        state,
        zipCode,
        description,
        features: [],
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        squareFeet: parsedSquareFeet,
        images,
        status: 'active',
        datePosted: new Date().toISOString(),
        mlsNumber,
        oneHomeUrl
      };
    } catch (error) {
      console.error('Error formatting property data:', error);
      throw error;
    }
  },
  
  // Main method to import a property from OneHome
  async importProperty(oneHomeUrl) {
    try {
      console.log('Importing property from OneHome:', oneHomeUrl);
      
      // Step 1: Scrape the property data
      const scrapedData = await this.scrapePropertyData(oneHomeUrl);
      
      // Step 2: Process the property images
      const processedImages = await this.processPropertyImages(scrapedData.images);
      
      // Step 3: Format the data for our system
      const formattedListing = this.formatPropertyData(scrapedData, processedImages);
      
      return formattedListing;
    } catch (error) {
      console.error('Error importing property from OneHome:', error);
      throw error;
    }
  }
};

export default OneHomeService; 