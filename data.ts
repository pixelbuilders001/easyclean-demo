
import { ServiceItem, Category } from './types';

export const CATEGORIES: { name: Category; icon: string; startingPrice: number }[] = [
  { name: 'Shirts & T-Shirts', icon: '👕', startingPrice: 79 },
  { name: 'Sarees', icon: '🥻', startingPrice: 199 },
  { name: 'Suits & Blazers', icon: '👔', startingPrice: 249 },
  { name: 'Lehenga & Heavy Wear', icon: '💃', startingPrice: 499 },
  { name: 'Blankets & Curtains', icon: '🛌', startingPrice: 299 },
  { name: 'Shoes Cleaning', icon: '👟', startingPrice: 149 },
  { name: 'Wash & Iron', icon: '🧺', startingPrice: 99 },
  { name: 'Steam Iron Only', icon: '💨', startingPrice: 49 },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  { id: '1', name: 'Cotton Shirt', category: 'Shirts & T-Shirts', price: 79, image: 'https://picsum.photos/seed/shirt1/200/200' },
  { id: '2', name: 'T-Shirt', category: 'Shirts & T-Shirts', price: 59, image: 'https://picsum.photos/seed/tshirt/200/200' },
  { id: '3', name: 'Silk Saree', category: 'Sarees', price: 249, image: 'https://picsum.photos/seed/saree/200/200' },
  { id: '4', name: 'Cotton Saree', category: 'Sarees', price: 149, image: 'https://picsum.photos/seed/saree2/200/200' },
  { id: '5', name: 'Business Suit (2pc)', category: 'Suits & Blazers', price: 449, image: 'https://picsum.photos/seed/suit/200/200' },
  { id: '6', name: 'Blazer', category: 'Suits & Blazers', price: 249, image: 'https://picsum.photos/seed/blazer/200/200' },
  { id: '7', name: 'Heavy Lehenga', category: 'Lehenga & Heavy Wear', price: 899, image: 'https://picsum.photos/seed/lehenga/200/200' },
  { id: '8', name: 'Designer Gown', category: 'Lehenga & Heavy Wear', price: 699, image: 'https://picsum.photos/seed/gown/200/200' },
  { id: '9', name: 'Single Blanket', category: 'Blankets & Curtains', price: 299, image: 'https://picsum.photos/seed/blanket/200/200' },
  { id: '10', name: 'Duvet / Rajai', category: 'Blankets & Curtains', price: 499, image: 'https://picsum.photos/seed/duvet/200/200' },
  { id: '11', name: 'Sports Shoes', category: 'Shoes Cleaning', price: 199, image: 'https://picsum.photos/seed/shoes/200/200' },
  { id: '12', name: 'Canvas Shoes', category: 'Shoes Cleaning', price: 149, image: 'https://picsum.photos/seed/canvas/200/200' },
  { id: '13', name: 'Wash & Iron (per kg)', category: 'Wash & Iron', price: 99, image: 'https://picsum.photos/seed/wash/200/200' },
  { id: '14', name: 'Steam Iron (Shirt)', category: 'Steam Iron Only', price: 29, image: 'https://picsum.photos/seed/iron/200/200' },
];

export const MOCK_ORDERS = [
  {
    id: 'CS-8421',
    customerName: 'Rajeev Kumar',
    mobile: '9876543210',
    status: 'In Cleaning',
    totalAmount: 549,
    createdAt: '2024-05-10',
    pickupDate: '2024-05-12',
    pickupSlot: 'Morning (9 AM - 12 PM)',
  }
];
