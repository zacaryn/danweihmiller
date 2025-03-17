import { v4 as uuidv4 } from 'uuid';
import { publicDynamoDBClient, createAuthenticatedDynamoDBClient } from '../config/dynamodb-client.js';
import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

console.log('Loading db-service.js...');
console.log('Imported clients:', { publicDynamoDBClient, createAuthenticatedDynamoDBClient });

// Table names
const LISTINGS_TABLE = 'danweihmiller-listings';
const INQUIRIES_TABLE = 'danweihmiller-inquiries';

// Get DynamoDB client instance based on operation type
const getDynamoDBClient = async (requiresAuth = false) => {
  try {
    console.log('Getting DynamoDB client, requiresAuth:', requiresAuth);
    const client = requiresAuth ? 
      await createAuthenticatedDynamoDBClient() : 
      publicDynamoDBClient;
    console.log('Using client:', client);
    return client;
  } catch (error) {
    console.error('Error getting DynamoDB client:', error);
    throw error;
  }
};

// Listings Database Service
export const ListingsDB = {
  // Get all listings (public)
  async getAll() {
    try {
      const dynamodb = await getDynamoDBClient(false);
      const command = new ScanCommand({
        TableName: LISTINGS_TABLE
      });
      
      const result = await dynamodb.send(command);
      return result.Items;
    } catch (error) {
      console.error('Error getting all listings:', error);
      throw error;
    }
  },
  
  // Get a single listing by ID (public)
  async getById(id) {
    try {
      const dynamodb = await getDynamoDBClient(false);
      const command = new GetCommand({
        TableName: LISTINGS_TABLE,
        Key: { id }
      });
      
      const result = await dynamodb.send(command);
      return result.Item;
    } catch (error) {
      console.error('Error getting listing by ID:', error);
      throw error;
    }
  },
  
  // Add a new listing (requires auth)
  async add(listing) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const timestamp = new Date().toISOString();
      const item = {
        id: uuidv4(),
        ...listing,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      const command = new PutCommand({
        TableName: LISTINGS_TABLE,
        Item: item
      });
      
      await dynamodb.send(command);
      return item;
    } catch (error) {
      console.error('Error adding listing:', error);
      throw error;
    }
  },
  
  // Update a listing (requires auth)
  async update(id, listing) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const timestamp = new Date().toISOString();
      const command = new UpdateCommand({
        TableName: LISTINGS_TABLE,
        Key: { id },
        UpdateExpression: 'set title = :title, price = :price, status = :status, ' +
          'bedrooms = :bedrooms, bathrooms = :bathrooms, squareFeet = :squareFeet, ' +
          'description = :description, externalLink = :externalLink, ' +
          'coverImage = :coverImage, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':title': listing.title,
          ':price': listing.price,
          ':status': listing.status,
          ':bedrooms': listing.bedrooms,
          ':bathrooms': listing.bathrooms,
          ':squareFeet': listing.squareFeet,
          ':description': listing.description,
          ':externalLink': listing.externalLink,
          ':coverImage': listing.coverImage,
          ':updatedAt': timestamp
        },
        ReturnValues: 'ALL_NEW'
      });
      
      const result = await dynamodb.send(command);
      return result.Attributes;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },
  
  // Delete a listing (requires auth)
  async delete(id) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const command = new DeleteCommand({
        TableName: LISTINGS_TABLE,
        Key: { id }
      });
      
      await dynamodb.send(command);
      return true;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  }
};

// Inquiries Database Service
export const InquiriesDB = {
  // Get all inquiries (requires auth)
  async getAll() {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const command = new ScanCommand({
        TableName: INQUIRIES_TABLE
      });
      
      const result = await dynamodb.send(command);
      return result.Items;
    } catch (error) {
      console.error('Error getting all inquiries:', error);
      throw error;
    }
  },
  
  // Get a single inquiry by ID (requires auth)
  async getById(id) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const command = new GetCommand({
        TableName: INQUIRIES_TABLE,
        Key: { id }
      });
      
      const result = await dynamodb.send(command);
      return result.Item;
    } catch (error) {
      console.error('Error getting inquiry by ID:', error);
      throw error;
    }
  },
  
  // Add a new inquiry (public)
  async add(inquiry) {
    try {
      const dynamodb = await getDynamoDBClient(false);
      const timestamp = new Date().toISOString();
      const item = {
        id: uuidv4(),
        ...inquiry,
        isRead: false,
        createdAt: timestamp
      };

      const command = new PutCommand({
        TableName: INQUIRIES_TABLE,
        Item: item
      });
      
      await dynamodb.send(command);
      return item;
    } catch (error) {
      console.error('Error adding inquiry:', error);
      throw error;
    }
  },
  
  // Mark an inquiry as read (requires auth)
  async markAsRead(id) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const command = new UpdateCommand({
        TableName: INQUIRIES_TABLE,
        Key: { id },
        UpdateExpression: 'set isRead = :isRead',
        ExpressionAttributeValues: {
          ':isRead': true
        },
        ReturnValues: 'ALL_NEW'
      });
      
      const result = await dynamodb.send(command);
      return result.Attributes;
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
      throw error;
    }
  },
  
  // Delete an inquiry (requires auth)
  async delete(id) {
    try {
      const dynamodb = await getDynamoDBClient(true);
      const command = new DeleteCommand({
        TableName: INQUIRIES_TABLE,
        Key: { id }
      });
      
      await dynamodb.send(command);
      return true;
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  }
};

export default {
  ListingsDB,
  InquiriesDB
}; 