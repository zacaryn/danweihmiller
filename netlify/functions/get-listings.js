import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// Initialize the DynamoDB client with credentials from environment variables
// These are set in Netlify's dashboard and never exposed to the client
const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })
);

// Listings table name
const LISTINGS_TABLE = 'danweihmiller-listings';

export const handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Get listing ID from query string if it exists
  const listingId = event.queryStringParameters?.id;

  try {
    let result;
    
    // If listingId is provided, get a specific listing
    if (listingId) {
      result = await client.send(new GetCommand({
        TableName: LISTINGS_TABLE,
        Key: { id: listingId }
      }));
      
      // Return 404 if listing not found
      if (!result.Item) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Listing not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.Item)
      };
    }
    
    // Otherwise, get all listings
    result = await client.send(new ScanCommand({
      TableName: LISTINGS_TABLE
    }));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items || [])
    };
  } catch (error) {
    console.error('Error fetching listing(s):', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching listings' })
    };
  }
}; 