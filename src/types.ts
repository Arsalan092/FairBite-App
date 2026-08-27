export type UserRole = 'customer' | 'restaurant' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  restaurantId?: string | null;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Starters' | 'Main Course' | 'Breads' | 'Beverages' | 'Desserts';
  veg: boolean;
  available?: boolean;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  image: string;
  distance: string;
  subscription: 'Starter' | 'Growth' | 'Premium';
  location: string;
  featured: boolean;
  isOpen: boolean;
  address: string;
  phone: string;
  menu: MenuItem[];
  monthlyRevenue?: number;
  joinedDate?: string;
  commissionSaved?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartState {
  restaurant: Restaurant | null;
  items: CartItem[];
  subtotal: number;
}

export type OrderStatus = 'placed' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  platformMarkupSaved: number;
  total: number;
  status: OrderStatus;
  date: string;
  time: string;
  address: string;
  customerName: string;
  customerPhone: string;
  driverName?: string;
  driverPhone?: string;
  estimatedTime?: string;
  note?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  ordersCap: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}
