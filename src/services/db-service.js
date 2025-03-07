import AWS from 'aws-sdk';
import awsConfig from '../config/aws-config';

// Configure AWS with the IAM credentials
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: awsConfig.credentials.accessKeyId,
  secretAccessKey: awsConfig.credentials.secretAccessKey
});

// Log AWS configuration for debugging
console.log('AWS SDK Version:', AWS.VERSION);
console.log('AWS Region:', AWS.config.region);
console.log('Using Access Key ID:', awsConfig.credentials.accessKeyId.substring(0, 5) + '...');

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

// DynamoDB table names
const LISTINGS_TABLE = 'Listings';
const INQUIRIES_TABLE = 'ContactInquiries';

// Listings operations
export const ListingsDB = {
  // Get all listings from DynamoDB
  async getAll() {
    const params = {
      TableName: LISTINGS_TABLE
    };
    
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error('Error fetching listings from DynamoDB:', error);
      throw error;
    }
  },
  
  // Get a single listing by ID
  async getById(id) {
    const params = {
      TableName: LISTINGS_TABLE,
      Key: { id }
    };
    
    try {
      const data = await docClient.get(params).promise();
      return data.Item;
    } catch (error) {
      console.error(`Error fetching listing ${id} from DynamoDB:`, error);
      throw error;
    }
  },
  
  // Add a new listing
  async add(listing) {
    const newListing = {
      ...listing,
      id: listing.id || `listing-${Date.now()}`,
      datePosted: new Date().toISOString(),
    };
    
    const params = {
      TableName: LISTINGS_TABLE,
      Item: newListing
    };
    
    try {
      await docClient.put(params).promise();
      return newListing.id;
    } catch (error) {
      console.error('Error adding listing to DynamoDB:', error);
      throw error;
    }
  },
  
  // Update an existing listing
  async update(id, listing) {
    // First, check if the listing exists
    const existingListing = await this.getById(id);
    if (!existingListing) {
      throw new Error(`Listing with id ${id} not found`);
    }
    
    // Create updated listing object
    const updatedListing = {
      ...existingListing,
      ...listing,
      id, // ensure ID remains the same
      updatedAt: new Date().toISOString()
    };
    
    const params = {
      TableName: LISTINGS_TABLE,
      Item: updatedListing
    };
    
    try {
      await docClient.put(params).promise();
      return true;
    } catch (error) {
      console.error(`Error updating listing ${id} in DynamoDB:`, error);
      throw error;
    }
  },
  
  // Delete a listing
  async delete(id) {
    const params = {
      TableName: LISTINGS_TABLE,
      Key: { id }
    };
    
    try {
      await docClient.delete(params).promise();
      return true;
    } catch (error) {
      console.error(`Error deleting listing ${id} from DynamoDB:`, error);
      throw error;
    }
  }
};

// Inquiries operations
export const InquiriesDB = {
  // Get all inquiries
  async getAll() {
    const params = {
      TableName: INQUIRIES_TABLE
    };
    
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error('Error fetching inquiries from DynamoDB:', error);
      throw error;
    }
  },
  
  // Get inquiries for a specific listing
  async getByListingId(listingId) {
    // Since there's no listingIdIndex, we'll use scan with a filter expression
    const params = {
      TableName: INQUIRIES_TABLE,
      FilterExpression: 'listingId = :listingId',
      ExpressionAttributeValues: {
        ':listingId': listingId
      }
    };
    
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error(`Error fetching inquiries for listing ${listingId} from DynamoDB:`, error);
      throw error;
    }
  },
  
  // Add a new inquiry
  async add(inquiry) {
    // Ensure the timestamp is included since it's part of the table's primary key
    const newInquiry = {
      ...inquiry,
      id: inquiry.id || `inquiry-${Date.now()}`,
      timestamp: inquiry.timestamp || new Date().toISOString()
    };
    
    const params = {
      TableName: INQUIRIES_TABLE,
      Item: newInquiry
    };
    
    try {
      console.log('Saving inquiry to DynamoDB:', JSON.stringify(newInquiry));
      await docClient.put(params).promise();
      console.log('Inquiry saved successfully with ID:', newInquiry.id);
      return { success: true, id: newInquiry.id };
    } catch (error) {
      console.error('Error adding inquiry to DynamoDB:', error);
      // Log more details about the error
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }
};

// Test function to diagnose DynamoDB connectivity
export const testDynamoDBConnection = async () => {
  try {
    console.log('Testing DynamoDB connectivity...');
    
    // 1. Test listing tables
    const dynamoDB = new AWS.DynamoDB();
    const tables = await dynamoDB.listTables().promise();
    console.log('Available DynamoDB tables:', tables.TableNames);
    
    // 2. Test scanning the inquiries table
    const params = {
      TableName: INQUIRIES_TABLE,
      Limit: 1
    };
    
    const scanResult = await docClient.scan(params).promise();
    console.log('Scan test result:', JSON.stringify(scanResult));
    
    return {
      success: true,
      message: 'DynamoDB connection successful',
      tables: tables.TableNames,
      scanResult
    };
  } catch (error) {
    console.error('DynamoDB connection test failed:', error);
    return {
      success: false,
      message: 'DynamoDB connection failed',
      error: {
        code: error.code,
        message: error.message,
        stack: error.stack
      }
    };
  }
};

export default {
  ListingsDB,
  InquiriesDB
}; 