import { ListingsDB } from './db-service';

// AWS-based Listings Service
export const getListings = async () => {
  try {
    return await ListingsDB.getAll();
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

export const getListing = async (id) => {
  try {
    return await ListingsDB.getById(id);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
};

export const addListing = async (listing) => {
  try {
    return await ListingsDB.add(listing);
  } catch (error) {
    console.error('Error adding listing:', error);
    throw error;
  }
};

export const updateListing = async (id, listing) => {
  try {
    return await ListingsDB.update(id, listing);
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

export const deleteListing = async (id) => {
  try {
    return await ListingsDB.delete(id);
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}; 