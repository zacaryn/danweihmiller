import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

// Initialize the DynamoDB client with credentials from environment variables
const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })
);

// Inquiries table name
const INQUIRIES_TABLE = 'danweihmiller-inquiries';

export const handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const inquiry = JSON.parse(event.body);
    
    // Basic validation
    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Create timestamp
    const timestamp = new Date().toISOString();
    
    // Prepare the item to store
    const item = {
      id: `inq_${uuid()}`,
      ...inquiry,
      isRead: false,
      createdAt: timestamp
    };

    // Store in DynamoDB
    await client.send(new PutCommand({
      TableName: INQUIRIES_TABLE,
      Item: item
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Inquiry submitted successfully' 
      })
    };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error submitting inquiry' })
    };
  }
}; 