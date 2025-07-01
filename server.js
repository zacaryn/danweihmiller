import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables from .env.local or .env
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' });

// Get the directory path for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect www to non-www for canonical URLs
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const redirectUrl = `https://${req.headers.host.slice(4)}${req.url}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

// Normalize trailing slashes (redirect trailing slashes to non-trailing for consistency)
app.use((req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/') && !req.path.includes('.')) {
    const redirectUrl = req.protocol + '://' + req.get('host') + req.path.slice(0, -1) + req.url.slice(req.path.length);
    return res.redirect(301, redirectUrl);
  }
  next();
});

// Simple rate limiting middleware
const rateLimit = (windowMs = 60000, max = 100) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up old requests
    requests.forEach((timestamp, key) => {
      if (timestamp < windowStart) {
        requests.delete(key);
      }
    });
    
    // Count requests for this IP
    const requestTimes = requests.get(ip) || [];
    requestTimes.push(now);
    requests.set(ip, requestTimes.filter(time => time > windowStart));
    
    // Check rate limit
    if (requests.get(ip).length > max) {
      return res.status(429).json({ 
        error: 'Too many requests', 
        message: 'Please try again later' 
      });
    }
    
    next();
  };
};

// Apply rate limiting to API routes
app.use('/api', rateLimit(60000, 120)); // 120 requests per minute

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
    );
  });
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

// Log environment variable loading for debugging (only in non-production)
if (!isProduction) {
  console.log('AWS Access Key available:', !!process.env.VITE_AWS_ACCESS_KEY_ID);
  console.log('AWS Secret Key available:', !!process.env.VITE_AWS_SECRET_ACCESS_KEY);
}

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
    return res.status(500).json({ 
      error: 'Error fetching listings',
      message: isProduction ? 'An unexpected error occurred' : error.message
    });
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
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiry.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
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
    return res.status(500).json({ 
      error: 'Error submitting inquiry',
      message: isProduction ? 'An unexpected error occurred' : error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: isProduction ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${isProduction ? 'production' : 'development'} mode on port ${PORT}`);
});

export default app; 