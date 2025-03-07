// AWS Configuration for Amplify - TEMPLATE FILE
// Copy this file to aws-config.js and fill in your actual values
const awsConfig = {
  // IAM credentials - For production, use environment variables instead of hardcoding
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
  },
  Auth: {
    // Cognito User Pool configuration
    region: 'us-east-1',
    userPoolId: 'YOUR_USER_POOL_ID', // e.g., 'us-east-1_xxxxxxxx'
    userPoolWebClientId: 'YOUR_APP_CLIENT_ID', // e.g., 'xxxxxxxxxxxxxxxxxxxxxxxxxx'
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  Storage: {
    AWSS3: {
      bucket: 'YOUR_S3_BUCKET_NAME', // e.g., 'your-app-property-images'
      region: 'us-east-1',
      // Use the same credentials
      identityPoolId: undefined
    }
  },
  API: {
    endpoints: [
      {
        name: 'YOUR_API_NAME',
        endpoint: '', // Will be updated if you create an API Gateway
        region: 'us-east-1',
      }
    ]
  }
};

export default awsConfig; 