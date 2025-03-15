// Import from aws-amplify using named exports only
import { Storage, Auth } from 'aws-amplify';
import awsConfig from '../config/aws-config';
import { ListingsDB, InquiriesDB } from './db-service';

// No extra configuration needed - main.jsx already configures Amplify correctly

// Listings Service (DynamoDB)
export const ListingsService = {
  // Get all listings
  async getListings() {
    try {
      return await ListingsDB.getAll();
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  // Get a single listing by ID
  async getListing(id) {
    try {
      return await ListingsDB.getById(id);
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  },

  // Add a new listing
  async addListing(listing) {
    try {
      return await ListingsDB.add(listing);
    } catch (error) {
      console.error('Error adding listing:', error);
      throw error;
    }
  },

  // Update a listing
  async updateListing(id, listing) {
    try {
      return await ListingsDB.update(id, listing);
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  // Delete a listing
  async deleteListing(id) {
    try {
      return await ListingsDB.delete(id);
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  }
};

// Contact Inquiries Service (DynamoDB)
export const InquiriesService = {
  // Submit a new inquiry
  async submitInquiry(inquiry) {
    try {
      return await InquiriesDB.add(inquiry);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    }
  },

  // Get all inquiries
  async getInquiries() {
    try {
      return await InquiriesDB.getAll();
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }
  },

  // Get inquiries for a specific listing
  async getInquiriesForListing(listingId) {
    try {
      return await InquiriesDB.getByListingId(listingId);
    } catch (error) {
      console.error('Error fetching inquiries for listing:', error);
      throw error;
    }
  }
};

// Storage Service (S3)
export const StorageService = {
  // Test the AWS credentials
  async testConnection() {
    try {
      console.log("Testing AWS credentials and S3 connection...");
      
      // First, check if Storage is available
      if (!Storage) {
        throw new Error("Storage is not properly configured");
      }
      
      // Try to list objects in the S3 bucket
      const result = await Storage.list('', { 
        level: 'public',
        customPrefix: {
          public: ''
        }
      });
      console.log(`Successfully connected to S3. Found ${result.length} objects.`);
      
      return {
        success: true,
        message: `Successfully connected to S3`,
        objectCount: result.length
      };
    } catch (error) {
      console.error("AWS connection test failed:", error);
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
        error: error
      };
    }
  },

  // Upload an image to S3
  async uploadImage(file, path) {
    try {
      console.log(`Starting upload process for file:`, {
        name: file.name,
        type: file.type,
        size: file.size,
        path: path
      });
      
      if (!file) {
        throw new Error('No file provided for upload');
      }
      
      // Override public access to prevent CORS issues
      const uploadOptions = {
        contentType: file.type,
        progressCallback: (progress) => {
          console.log(`Upload progress: ${Math.round((progress.loaded / progress.total) * 100)}%`);
        },
        level: 'public',
        customPrefix: {
          public: ''
        }
      };
      
      console.log('Attempting upload with options:', uploadOptions);
      
      const result = await Storage.put(path, file, uploadOptions);
      console.log('Upload result:', result);
      
      if (!result || !result.key) {
        throw new Error('Upload failed: No result key returned from S3');
      }
      
      console.log(`Upload successful, getting URL for key: ${result.key}`);
      
      const imageUrl = await Storage.get(result.key, { 
        level: 'public',
        download: false,
        expires: 60 * 60 * 24 * 365
      });
      
      console.log(`Final image URL: ${imageUrl}`);
      return imageUrl;
      
    } catch (error) {
      console.error('Detailed upload error:', error);
      throw error;
    }
  },

  // Delete an image from S3
  async deleteImage(path) {
    try {
      console.log(`Deleting image from S3 at path ${path}...`);
      // Now that S3 is set up, we can use:
      await Storage.remove(path);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Authentication Service (Cognito)
export const AuthService = {
  // Log in with username and password
  async login(username, password) {
    try {
      console.log(`Logging in as ${username}...`);
      // Use the configured Cognito authentication
      const user = await Auth.signIn(username, password);
      return { success: true, user };
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.code === 'UserNotFoundException' || error.code === 'NotAuthorizedException') {
        return { success: false, message: 'Invalid username or password' };
      }
      throw error;
    }
  },

  // Log out
  async logout() {
    try {
      console.log('Logging out...');
      await Auth.signOut();
      localStorage.removeItem('isAdminLoggedIn');
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Check if user is logged in
  async isAuthenticated() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return !!user;
    } catch (error) {
      return false;
    }
  },
  
  // Get current user's information
  async getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};

// Property Search Service
export const PropertySearchService = {
  // Search for properties
  async searchProperties(criteria) {
    try {
      console.log('Searching for properties with criteria:', criteria);
      // This will be connected to a real estate API in the future
      
      // Mock search results for now
      return [
        {
          id: '123',
          address: '123 Main Street',
          city: 'Colorado Springs',
          state: 'CO',
          zipCode: '80920',
          price: 450000,
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1800,
          year: 2005,
          mlsNumber: 'MLS123456',
          image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
          id: '456',
          address: '456 Park Avenue',
          city: 'Denver',
          state: 'CO',
          zipCode: '80202',
          price: 550000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2200,
          year: 2010,
          mlsNumber: 'MLS789012',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        }
      ];
    } catch (error) {
      console.error('Error searching for properties:', error);
      throw error;
    }
  }
};

export default {
  ListingsService,
  InquiriesService,
  StorageService,
  AuthService,
  PropertySearchService
}; 