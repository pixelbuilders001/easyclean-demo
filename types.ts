
export type Category = 
  | 'Shirts & T-Shirts'
  | 'Sarees'
  | 'Suits & Blazers'
  | 'Lehenga & Heavy Wear'
  | 'Blankets & Curtains'
  | 'Shoes Cleaning'
  | 'Wash & Iron'
  | 'Steam Iron Only';

export interface ServiceItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
}

export interface CartItem extends ServiceItem {
  quantity: number;
}

export interface Order {
  id: string;
  items?: CartItem[];
  customerName: string;
  mobile: string;
  address?: string;
  pickupDate: string;
  pickupSlot: string;
  deliveryType?: 'Standard' | 'Express';
  serviceType?: string; // For admin manual entry
  totalAmount: number;
  status: 'Pickup Scheduled' | 'Picked Up' | 'In Cleaning' | 'Ready' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export type View = 'HOME' | 'CATEGORY' | 'CART' | 'BOOKING' | 'PAYMENT' | 'CONFIRMATION' | 'TRACK' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';
