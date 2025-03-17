/**
 * Simple data service using localStorage for persistence.
 * This provides a clean interface for the application while supporting
 * basic CRUD operations without external dependencies.
 */

// Storage keys
const LISTINGS_STORAGE_KEY = 'danweihmiller_listings';
const INQUIRIES_STORAGE_KEY = 'danweihmiller_inquiries';

// Initialize storage if empty
const initializeStorage = () => {
  if (!localStorage.getItem(LISTINGS_STORAGE_KEY)) {
    localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(INQUIRIES_STORAGE_KEY)) {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([]));
  }
};

// Initialize storage on module load
initializeStorage();

// Listing Service
export const ListingsService = {
  getAllListings: async () => {
    try {
      const listings = JSON.parse(localStorage.getItem(LISTINGS_STORAGE_KEY) || '[]');
      return listings;
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  },

  getListing: async (id) => {
    try {
      const listings = JSON.parse(localStorage.getItem(LISTINGS_STORAGE_KEY) || '[]');
      return listings.find(item => item.id === id) || null;
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },

  createListing: async (listing) => {
    try {
      const listings = JSON.parse(localStorage.getItem(LISTINGS_STORAGE_KEY) || '[]');
      const timestamp = new Date().toISOString();
      const newListing = {
        id: `lst_${Date.now()}`,
        ...listing,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      listings.push(newListing);
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
      return newListing;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw new Error('Failed to create listing');
    }
  },

  updateListing: async (id, listing) => {
    try {
      const listings = JSON.parse(localStorage.getItem(LISTINGS_STORAGE_KEY) || '[]');
      const index = listings.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error('Listing not found');
      }

      const timestamp = new Date().toISOString();
      const updatedListing = {
        ...listings[index],
        ...listing,
        id,
        updatedAt: timestamp
      };

      listings[index] = updatedListing;
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
      return updatedListing;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  deleteListing: async (id) => {
    try {
      const listings = JSON.parse(localStorage.getItem(LISTINGS_STORAGE_KEY) || '[]');
      const filteredListings = listings.filter(item => item.id !== id);
      
      if (filteredListings.length === listings.length) {
        throw new Error('Listing not found');
      }
      
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(filteredListings));
      return true;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  }
};

// Inquiries Service
export const InquiriesService = {
  submitInquiry: async (inquiry) => {
    try {
      const inquiries = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
      const timestamp = new Date().toISOString();
      const newInquiry = {
        id: `inq_${Date.now()}`,
        ...inquiry,
        isRead: false,
        createdAt: timestamp
      };

      inquiries.push(newInquiry);
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
      return newInquiry;
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      throw new Error('Failed to submit inquiry');
    }
  },

  getInquiries: async () => {
    try {
      const inquiries = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
      return inquiries;
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return [];
    }
  },

  markAsRead: async (id) => {
    try {
      const inquiries = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
      const index = inquiries.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error('Inquiry not found');
      }

      inquiries[index].isRead = true;
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
      return inquiries[index];
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
      throw error;
    }
  },

  deleteInquiry: async (id) => {
    try {
      const inquiries = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
      const filteredInquiries = inquiries.filter(item => item.id !== id);
      
      if (filteredInquiries.length === inquiries.length) {
        throw new Error('Inquiry not found');
      }
      
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(filteredInquiries));
      return true;
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  }
};

// Authentication Service
export const AuthService = {
  login: async (username, password) => {
    // In a production environment, this would validate against a backend
    // For demo purposes, we're using simple hardcoded credentials
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  },

  logout: async () => {
    localStorage.removeItem('isAdminLoggedIn');
    return true;
  },

  isAuthenticated: async () => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  }
}; 