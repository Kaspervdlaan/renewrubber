export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // in cents
  image: string;
  category: string;
  rubberType?: string;
  features?: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GymLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  website?: string;
  openingHours?: string;
  region: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  pickupGym: string;
  estimatedCompletion?: string;
  trackingTimeline?: TrackingStep[];
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export type OrderStatus = 'Received' | 'In Progress' | 'Ready for Pickup' | 'Completed';

export interface TrackingStep {
  label: string;
  date?: string;
  completed: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  preferredGym?: string;
  createdAt: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  deliveryMethod: 'gym-pickup' | 'home-delivery';
  selectedGym?: string;
  paymentMethod: 'credit-card' | 'ideal' | 'bancontact';
  sameAsBilling: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
