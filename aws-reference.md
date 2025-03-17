# AWS Configuration Reference

## Amazon Cognito
### User Pool
- Region: us-east-1
- User Pool ID: us-east-1_XBqJFPwIP
- App Client ID: 56nbv13c7sbl7ermpn0gdrh6co
- Domain: danweihmiller.auth.us-east-1.amazoncognito.com

### Identity Pool
- Region: us-east-1
- Identity Pool ID: us-east-1:abc0e3ca-0416-4585-b711-7234599c0d46

## Amazon S3
### Property Images Bucket
- Bucket Name: danweihmiller-property-images
- Region: us-east-1
- Access Level: Protected (authenticated users only)

## Amazon DynamoDB
### Tables
1. Listings Table
   - Table Name: danweihmiller-listings
   - Primary Key: id (String)
   - Required Fields:
     - title (String)
     - price (Number)
     - status (String)
     - bedrooms (Number)
     - bathrooms (Number)
     - squareFeet (Number)
     - description (String)
     - externalLink (String)
     - coverImage (String)
     - createdAt (String - ISO timestamp)
     - updatedAt (String - ISO timestamp)

2. Inquiries Table
   - Table Name: danweihmiller-inquiries
   - Primary Key: id (String)
   - Required Fields:
     - name (String)
     - email (String)
     - message (String)
     - isRead (Boolean)
     - createdAt (String - ISO timestamp)

## Authentication Flow
- Type: USER_PASSWORD_AUTH
- Mandatory Sign In: false
- OAuth Settings:
  - Scopes: email, openid, profile
  - Local Redirect URLs:
    - Sign In: http://localhost:5173/
    - Sign Out: http://localhost:5173/

## API Configuration
- API Name: danweihmillerapi
- Region: us-east-1
- Authentication: JWT Token from Cognito User Pool

## Access Patterns
### Public Operations
- View all listings
- View single listing
- Submit inquiry

### Authenticated Operations (Admin)
- Create listing
- Update listing
- Delete listing
- View all inquiries
- Mark inquiry as read
- Delete inquiry