import express from 'express';
import cors from 'cors';
import { scrapeOneHomeProperty } from './scraper';

const router = express.Router();

// Enable CORS
router.use(cors());
router.use(express.json());

// Endpoint for scraping OneHome property data
router.post('/proxy/scrape-onehome', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const propertyData = await scrapeOneHomeProperty(url);
    
    return res.json(propertyData);
  } catch (error) {
    console.error('Scraping API error:', error);
    return res.status(500).json({ error: error.message || 'Failed to scrape property data' });
  }
});

export default router; 