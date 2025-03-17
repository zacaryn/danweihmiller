import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Auth } from 'aws-amplify';

console.log('Initializing DynamoDB clients...');

// Create a DynamoDB client for public operations using environment variables for credentials
const publicDynamoDBClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  })
);

// DynamoDB client factory for authenticated operations
const createAuthenticatedDynamoDBClient = async () => {
  try {
    const credentials = await Auth.currentCredentials();
    const client = new DynamoDBClient({
      region: 'us-east-1',
      credentials: credentials
    });
    return DynamoDBDocumentClient.from(client);
  } catch (error) {
    console.error('Error creating authenticated DynamoDB client:', error);
    throw error;
  }
};

console.log('DynamoDB clients initialized');

export { publicDynamoDBClient, createAuthenticatedDynamoDBClient }; 