export interface Listing {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  features: string[];
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  status: 'active' | 'pending' | 'sold';
  datePosted: string;
} 