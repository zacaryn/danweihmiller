import { Storage, Auth } from 'aws-amplify';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  GetCommand, 
  ScanCommand, 
  DeleteCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

// Constants
const REGION = 'us-east-1';
const LISTINGS_TABLE = 'danweihmiller-listings';
const INQUIRIES_TABLE = 'danweihmiller-inquiries';
const S3_BUCKET = 'danweihmiller-property-images';

// Create a public DynamoDB client with explicit IAM credentials for unauthenticated operations
const publicClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ 
    region: REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  })
);

// Function to get an authenticated DynamoDB client
const getAuthenticatedClient = async () => {
  try {
    const credentials = await Auth.currentCredentials();
    const client = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: REGION,
        credentials
      })
    );
    return client;
  } catch (error) {
    console.error('Error getting authenticated client:', error);
    throw new Error('Authentication required for this operation');
  }
};

// Listing Service - uses DynamoDB for listings data
export const ListingsService = {
  // Helper to process images in listings
  _processListingImages: (listing) => {
    // Create a copy to avoid modifying the original object
    const processedListing = { ...listing };
    
    // If the listing has protected image URLs that are expired or inaccessible,
    // we can return a fallback to handle it in the UI
    if (processedListing.coverImage && processedListing.coverImage.includes('/protected/')) {
      // Log for debugging
      console.log('Protected image URL detected:', processedListing.coverImage);
    }
    
    // If the listing has an images array with protected URLs
    if (processedListing.images && Array.isArray(processedListing.images)) {
      processedListing.images.forEach((imageUrl, index) => {
        if (imageUrl && imageUrl.includes('/protected/')) {
          console.log('Protected image URL in array:', imageUrl);
        }
      });
    }
    
    return processedListing;
  },

  // Get all listings (public)
  getAllListings: async () => {
    try {
      const result = await publicClient.send(new ScanCommand({
        TableName: LISTINGS_TABLE
      }));
      
      // Process each listing to handle image URLs
      const processedItems = (result.Items || []).map(item => 
        ListingsService._processListingImages(item)
      );
      
      return processedItems;
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  },

  // Get listings (alias for getAllListings)
  getListings: async () => {
    return ListingsService.getAllListings();
  },

  // Get a single listing by ID (public)
  getListing: async (id) => {
    try {
      const result = await publicClient.send(new GetCommand({
        TableName: LISTINGS_TABLE,
        Key: { id }
      }));
      
      if (!result.Item) return null;
      
      // Process the listing to handle image URLs
      return ListingsService._processListingImages(result.Item);
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },

  // Create a new listing (admin only)
  createListing: async (listing) => {
    try {
      const client = await getAuthenticatedClient();
      const timestamp = new Date().toISOString();
      const id = `lst_${uuid()}`;
      
      // Upload image if it's a File object
      let imageUrl = listing.coverImage;
      if (listing.coverImage instanceof File) {
        const fileName = `listings/${id}/${listing.coverImage.name}`;
        
        // Upload to protected location for admin access
        await Storage.put(fileName, listing.coverImage, {
          contentType: listing.coverImage.type,
          level: 'protected'
        });
        
        // Also upload to public location for user access
        await Storage.put(fileName, listing.coverImage, {
          contentType: listing.coverImage.type,
          level: 'public'
        });
        
        // Use the public URL for the listing
        imageUrl = `https://danweihmiller-property-images.s3.us-east-1.amazonaws.com/public/${fileName}`;
      }
      
      const item = {
        id,
        ...listing,
        coverImage: imageUrl,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      await client.send(new PutCommand({
        TableName: LISTINGS_TABLE,
        Item: item
      }));

      return item;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  // Update an existing listing (admin only)
  updateListing: async (id, listing) => {
    try {
      const client = await getAuthenticatedClient();
      const timestamp = new Date().toISOString();
      
      // Get the existing listing first
      const existingResult = await client.send(new GetCommand({
        TableName: LISTINGS_TABLE,
        Key: { id }
      }));
      
      if (!existingResult.Item) {
        throw new Error('Listing not found');
      }
      
      // Upload new image if provided as a File
      let imageUrl = listing.coverImage;
      if (listing.coverImage instanceof File) {
        const fileName = `listings/${id}/${listing.coverImage.name}`;
        
        // Upload to protected location for admin access
        await Storage.put(fileName, listing.coverImage, {
          contentType: listing.coverImage.type,
          level: 'protected'
        });
        
        // Also upload to public location for user access
        await Storage.put(fileName, listing.coverImage, {
          contentType: listing.coverImage.type,
          level: 'public'
        });
        
        // Use the public URL for the listing
        imageUrl = `https://danweihmiller-property-images.s3.us-east-1.amazonaws.com/public/${fileName}`;
      }
      
      const updatedItem = {
        ...existingResult.Item,
        ...listing,
        id,
        coverImage: imageUrl || existingResult.Item.coverImage,
        updatedAt: timestamp
      };

      await client.send(new PutCommand({
        TableName: LISTINGS_TABLE,
        Item: updatedItem
      }));

      return updatedItem;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  // Delete a listing (admin only)
  deleteListing: async (id) => {
    try {
      const client = await getAuthenticatedClient();
      await client.send(new DeleteCommand({
        TableName: LISTINGS_TABLE,
        Key: { id }
      }));
      return true;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  }
};

// Inquiries Service - uses DynamoDB for inquiries data
export const InquiriesService = {
  // Submit a new inquiry (public)
  submitInquiry: async (inquiry) => {
    try {
      if (!import.meta.env.VITE_AWS_ACCESS_KEY_ID || !import.meta.env.VITE_AWS_SECRET_ACCESS_KEY) {
        console.error('AWS credentials are not configured');
        throw new Error('Server configuration error. Please contact the administrator.');
      }

      const timestamp = new Date().toISOString();
      const item = {
        id: `inq_${uuid()}`,
        ...inquiry,
        isRead: false,
        createdAt: timestamp
      };

      console.log('Submitting inquiry with public client');
      await publicClient.send(new PutCommand({
        TableName: INQUIRIES_TABLE,
        Item: item
      }));

      return item;
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      if (error.name === 'CredentialsProviderError') {
        throw new Error('Authentication error. Please try again later.');
      } else if (error.name === 'AccessDeniedException') {
        throw new Error('Permission denied. Your request cannot be processed.');
      } else {
        throw error;
      }
    }
  },

  // Get all inquiries (admin only)
  getInquiries: async () => {
    try {
      const client = await getAuthenticatedClient();
      const result = await client.send(new ScanCommand({
        TableName: INQUIRIES_TABLE
      }));
      return result.Items || [];
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return [];
    }
  },

  // Mark an inquiry as read (admin only)
  markAsRead: async (id) => {
    try {
      const client = await getAuthenticatedClient();
      const result = await client.send(new UpdateCommand({
        TableName: INQUIRIES_TABLE,
        Key: { id },
        UpdateExpression: 'set isRead = :isRead',
        ExpressionAttributeValues: {
          ':isRead': true
        },
        ReturnValues: 'ALL_NEW'
      }));
      return result.Attributes;
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
      throw error;
    }
  },

  // Delete an inquiry (admin only)
  deleteInquiry: async (id) => {
    try {
      const client = await getAuthenticatedClient();
      await client.send(new DeleteCommand({
        TableName: INQUIRIES_TABLE,
        Key: { id }
      }));
      return true;
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  }
};

// Storage Service - handles S3 operations for images
export const StorageService = {
  // Upload an image to S3
  uploadImage: async (file, customPath = null) => {
    try {
      const path = customPath || `images/${Date.now()}-${file.name}`;
      
      // Upload to protected location for admin access
      await Storage.put(path, file, {
        contentType: file.type,
        level: 'protected'
      });
      
      // Also upload to public location for user access
      await Storage.put(path, file, {
        contentType: file.type,
        level: 'public'
      });
      
      // Return the public URL for public-facing content
      return `https://danweihmiller-property-images.s3.us-east-1.amazonaws.com/public/${path}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete an image from S3
  deleteImage: async (path) => {
    try {
      // Remove from both protected and public locations
      await Storage.remove(path, { level: 'protected' });
      await Storage.remove(path, { level: 'public' });
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Simple authentication wrapper around Amplify Auth
export const AuthService = {
  login: async (username, password) => {
    try {
      await Auth.signIn(username, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Invalid username or password' 
      };
    }
  },

  logout: async () => {
    try {
      await Auth.signOut();
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  isAuthenticated: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return !!user;
    } catch (error) {
      return false;
    }
  },

  getCurrentUser: async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}; 