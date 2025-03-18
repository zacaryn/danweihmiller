import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Get the directory path for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Initialize the DynamoDB client with credentials from environment variables
const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  })
);

// Log environment variable loading for debugging
console.log('AWS Access Key available:', !!process.env.VITE_AWS_ACCESS_KEY_ID);
console.log('AWS Secret Key available:', !!process.env.VITE_AWS_SECRET_ACCESS_KEY);

// Constants for DynamoDB tables
const LISTINGS_TABLE = 'danweihmiller-listings';
const INQUIRIES_TABLE = 'danweihmiller-inquiries';

// API endpoint to get all listings or a single listing
app.get('/api/listings/:id?', async (req, res) => {
  try {
    const listingId = req.params.id;
    
    // If listingId is provided, get a specific listing
    if (listingId) {
      const result = await client.send(new GetCommand({
        TableName: LISTINGS_TABLE,
        Key: { id: listingId }
      }));
      
      // Return 404 if listing not found
      if (!result.Item) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      
      return res.json(result.Item);
    }
    
    // Otherwise, get all listings
    const result = await client.send(new ScanCommand({
      TableName: LISTINGS_TABLE
    }));
    
    return res.json(result.Items || []);
  } catch (error) {
    console.error('Error fetching listing(s):', error);
    return res.status(500).json({ error: 'Error fetching listings' });
  }
});

// API endpoint to submit an inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = req.body;
    
    // Basic validation
    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      return res.status(400).json({ error: 'Missing required fields' });
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
    
    return res.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({ error: 'Error submitting inquiry' });
  }
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 