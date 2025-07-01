import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Auth } from 'aws-amplify';

console.log('Loading aws-config.js...');

// AWS Configuration object
const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_XBqJFPwIP',
    userPoolWebClientId: '56nbv13c7sbl7ermpn0gdrh6co',
    identityPoolId: 'us-east-1:abc0e3ca-0416-4585-b711-7234599c0d46',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'danweihmiller.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: ['http://localhost:5173/', 'https://danweihmiller.com'],
      redirectSignOut: ['http://localhost:5173/', 'https://danweihmiller.com'],
      responseType: 'code'
    }
  },
  Storage: {
    AWSS3: {
      bucket: 'danweihmiller-property-images',
      region: 'us-east-1'
    }
  },
  API: {
    endpoints: [
      {
        name: 'danweihmillerapi',
        endpoint: '',
        region: 'us-east-1',
        custom_header: async () => {
          try {
            const session = await Auth.currentSession();
            return { Authorization: session.getIdToken().getJwtToken() };
          } catch (e) {
            console.error('Error getting session:', e);
            return {};
          }
        }
      }
    ]
  }
};

// Create a DynamoDB client for public operations
const publicDynamoDBClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1'
  })
);

console.log('Created publicDynamoDBClient:', publicDynamoDBClient);

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

console.log('Exporting from aws-config.js:', { publicDynamoDBClient, createAuthenticatedDynamoDBClient });

export { publicDynamoDBClient, createAuthenticatedDynamoDBClient };
export default awsConfig; 