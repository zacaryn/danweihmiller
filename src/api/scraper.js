import axios from 'axios';
import cheerio from 'cheerio';

// Handles the OneHome property scraping
export const scrapeOneHomeProperty = async (url) => {
  try {
    console.log('Starting OneHome property scrape for:', url);
    
    // Add headers to mimic a browser request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Referer': 'https://portal.onehome.com/',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    };
    
    // Fetch the OneHome property page
    const response = await axios.get(url, { headers });
    
    if (response.status !== 200) {
      throw new Error(`Failed to fetch OneHome property: ${response.status}`);
    }
    
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Extract property details
    // These selectors would need to be updated based on OneHome's actual HTML structure
    const fullAddress = $('.property-address').text().trim();
    const addressParts = fullAddress.split(',');
    const address = addressParts[0].trim();
    const cityState = addressParts[1].trim().split(' ');
    const city = cityState.slice(0, -2).join(' ').trim();
    const state = cityState[cityState.length - 2];
    const zipCode = cityState[cityState.length - 1].replace('-', '');
    
    const price = $('.property-price').text().trim();
    const bedrooms = $('.property-beds').text().trim();
    const bathrooms = $('.property-baths').text().trim();
    const squareFeet = $('.property-sqft').text().trim().replace(/[^0-9]/g, '');
    const mlsNumber = $('.property-mls').text().trim().replace('MLS #', '');
    
    // Extract description
    const description = $('.property-description').text().trim();
    
    // Extract image URLs
    const images = [];
    $('.property-image img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc && !imgSrc.includes('placeholder')) {
        images.push(imgSrc);
      }
    });
    
    // Compile all the data
    const propertyData = {
      address,
      city,
      state,
      zipCode,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
      description,
      mlsNumber,
      images
    };
    
    console.log('Successfully scraped OneHome property data:', address);
    return propertyData;
    
  } catch (error) {
    console.error('Error scraping OneHome property:', error);
    throw error;
  }
};

export default {
  scrapeOneHomeProperty
}; 