// This script helps verify your AWS configuration
// Run with: node verify-aws-config.js

import { S3, STS } from '@aws-sdk/client-s3';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

// This assumes you have AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY set in your environment
// Or you have a properly configured ~/.aws/credentials file

const verifyAwsConfig = async () => {
  try {
    console.log('Verifying AWS Configuration...');
    
    // Check credentials
    console.log('1. Checking credentials...');
    const sts = new STSClient({ region: 'us-east-1' });
    
    try {
      const identity = await sts.send(new GetCallerIdentityCommand({}));
      console.log('✅ Credentials valid:', {
        AccountId: identity.Account,
        UserId: identity.UserId,
        Arn: identity.Arn
      });
    } catch (error) {
      console.error('❌ Credentials invalid:', error.message);
    }
    
    // Check S3 bucket
    console.log('\n2. Checking S3 bucket...');
    const s3 = new S3({ region: 'us-east-1' });
    const bucketName = 'danweihmiller-property-images';
    
    try {
      const bucketExists = await s3.headBucket({ Bucket: bucketName });
      console.log(`✅ Bucket "${bucketName}" exists and is accessible`);
    } catch (error) {
      console.error(`❌ Bucket "${bucketName}" issue:`, error.message);
    }
    
    // Check CORS configuration
    console.log('\n3. Checking CORS configuration...');
    try {
      const corsConfig = await s3.getBucketCors({ Bucket: bucketName });
      console.log('✅ CORS configuration found:', JSON.stringify(corsConfig.CORSRules, null, 2));
    } catch (error) {
      if (error.name === 'NoSuchCORSConfiguration') {
        console.error('❌ No CORS configuration found for this bucket');
      } else {
        console.error('❌ Error checking CORS configuration:', error.message);
      }
    }
    
    // Check bucket policy
    console.log('\n4. Checking bucket policy...');
    try {
      const policy = await s3.getBucketPolicy({ Bucket: bucketName });
      console.log('✅ Bucket policy found:', JSON.stringify(JSON.parse(policy.Policy), null, 2));
    } catch (error) {
      if (error.name === 'NoSuchBucketPolicy') {
        console.error('❌ No bucket policy found');
      } else {
        console.error('❌ Error checking bucket policy:', error.message);
      }
    }
    
    // Check public access block settings
    console.log('\n5. Checking public access block settings...');
    try {
      const publicAccessBlock = await s3.getPublicAccessBlock({ Bucket: bucketName });
      console.log('Public access block configuration:', publicAccessBlock.PublicAccessBlockConfiguration);
      
      if (publicAccessBlock.PublicAccessBlockConfiguration.BlockPublicAcls ||
          publicAccessBlock.PublicAccessBlockConfiguration.BlockPublicPolicy ||
          publicAccessBlock.PublicAccessBlockConfiguration.IgnorePublicAcls ||
          publicAccessBlock.PublicAccessBlockConfiguration.RestrictPublicBuckets) {
        console.warn('⚠️ Some public access blocking is enabled, which might prevent public access to images');
      } else {
        console.log('✅ Public access block settings are not restricting public access');
      }
    } catch (error) {
      console.error('❌ Error checking public access block settings:', error.message);
    }
    
    console.log('\nVerification complete. ✅ means passed, ⚠️ means potential issue, ❌ means failed');
  } catch (error) {
    console.error('Error verifying AWS configuration:', error);
  }
};

verifyAwsConfig(); 