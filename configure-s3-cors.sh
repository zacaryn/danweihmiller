#!/bin/bash

# Configuration
BUCKET_NAME="danweihmiller-property-images"
AWS_REGION="us-east-1"

# Inform the user
echo "Configuring CORS for S3 bucket: $BUCKET_NAME"
echo "Make sure AWS CLI is installed and configured with appropriate credentials."

# Apply CORS configuration from the file
aws s3api put-bucket-cors \
  --bucket $BUCKET_NAME \
  --cors-configuration file://s3-cors-config.json \
  --region $AWS_REGION

# Check if the command succeeded
if [ $? -eq 0 ]; then
  echo "✅ CORS configuration successfully applied to $BUCKET_NAME"
  
  # Optionally verify the CORS configuration
  echo "Verifying CORS configuration:"
  aws s3api get-bucket-cors --bucket $BUCKET_NAME --region $AWS_REGION
else
  echo "❌ Failed to apply CORS configuration. Please check your AWS credentials and bucket permissions."
fi

# Also make sure the bucket has the correct public access settings
echo "Checking bucket access policy..."
aws s3api get-bucket-policy-status --bucket $BUCKET_NAME --region $AWS_REGION

echo ""
echo "If you need to set a public access policy, use the following command:"
echo "aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://s3-bucket-policy.json"
echo ""
echo "Done" 