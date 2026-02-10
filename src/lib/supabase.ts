import type { User, Order } from '../types';

// Mock Supabase client configuration
// In production, replace with actual Supabase SDK
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
};

// Mock user for demonstration
const mockUser: User = {
  id: 'user_01',
  email: 'climber@example.com',
  fullName: 'Alex van der Berg',
  phone: '+31 6 1234 5678',
  preferredGym: 'Monk Bouldergym Amsterdam',
  createdAt: '2024-01-15T10:00:00Z',
};

// Mock orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-02-01',
    items: [
      { id: 'item_01', productName: 'Vibram XS Edge Resole', quantity: 1, price: 4500 },
    ],
    status: 'In Progress',
    total: 4500,
    pickupGym: 'Monk Bouldergym Amsterdam',
    estimatedCompletion: '2024-02-15',
    trackingTimeline: [
      { label: 'Order Received', date: '2024-02-01', completed: true },
      { label: 'Shoes Collected from Gym', date: '2024-02-03', completed: true },
      { label: 'Resoling In Progress', date: '2024-02-05', completed: true },
      { label: 'Quality Check', completed: false },
      { label: 'Ready for Pickup', completed: false },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-15',
    items: [
      { id: 'item_02', productName: 'Full Resole + Toe Cap', quantity: 1, price: 6500 },
    ],
    status: 'Completed',
    total: 6500,
    pickupGym: 'Klimhal Amsterdam',
    estimatedCompletion: '2024-01-29',
    trackingTimeline: [
      { label: 'Order Received', date: '2024-01-15', completed: true },
      { label: 'Shoes Collected from Gym', date: '2024-01-17', completed: true },
      { label: 'Resoling In Progress', date: '2024-01-19', completed: true },
      { label: 'Quality Check', date: '2024-01-26', completed: true },
      { label: 'Ready for Pickup', date: '2024-01-28', completed: true },
    ],
  },
  {
    id: 'ORD-2025-003',
    date: '2025-12-20',
    items: [
      { id: 'item_03', productName: 'Vibram XS Grip 2 Resole', quantity: 1, price: 4500 },
      { id: 'item_04', productName: 'Toe Rand Repair', quantity: 1, price: 3500 },
    ],
    status: 'Received',
    total: 8000,
    pickupGym: 'Boulderhal Sterk - Utrecht',
    estimatedCompletion: '2026-01-05',
    trackingTimeline: [
      { label: 'Order Received', date: '2025-12-20', completed: true },
      { label: 'Shoes Collected from Gym', completed: false },
      { label: 'Resoling In Progress', completed: false },
      { label: 'Quality Check', completed: false },
      { label: 'Ready for Pickup', completed: false },
    ],
  },
  {
    id: 'ORD-2025-004',
    date: '2025-11-10',
    items: [
      { id: 'item_05', productName: 'Express Resole Service', quantity: 1, price: 6000 },
    ],
    status: 'Ready for Pickup',
    total: 6000,
    pickupGym: 'El Capitan - Den Haag',
    estimatedCompletion: '2025-11-15',
    trackingTimeline: [
      { label: 'Order Received', date: '2025-11-10', completed: true },
      { label: 'Shoes Collected from Gym', date: '2025-11-10', completed: true },
      { label: 'Resoling In Progress', date: '2025-11-11', completed: true },
      { label: 'Quality Check', date: '2025-11-14', completed: true },
      { label: 'Ready for Pickup', date: '2025-11-15', completed: true },
    ],
  },
];

// Simulated authentication functions
let currentUser: User | null = null;

export async function signUp(email: string, password: string, metadata: { fullName: string; preferredGym?: string }): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Simulate validation
  if (!email || !password) throw new Error('Email and password are required');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  
  const user: User = {
    id: `user_${Date.now()}`,
    email,
    fullName: metadata.fullName,
    preferredGym: metadata.preferredGym,
    createdAt: new Date().toISOString(),
  };
  currentUser = user;
  localStorage.setItem('renewrubber_user', JSON.stringify(user));
  return user;
}

export async function signIn(email: string, _password: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!email || !_password) throw new Error('Email and password are required');
  
  // For demo, always return mock user
  currentUser = { ...mockUser, email };
  localStorage.setItem('renewrubber_user', JSON.stringify(currentUser));
  return currentUser;
}

export async function signOut(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  currentUser = null;
  localStorage.removeItem('renewrubber_user');
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser;
  const stored = localStorage.getItem('renewrubber_user');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  return null;
}

export async function updateProfile(updates: Partial<User>): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const updatedUser = { ...user, ...updates };
  currentUser = updatedUser;
  localStorage.setItem('renewrubber_user', JSON.stringify(updatedUser));
  return updatedUser;
}

export async function fetchUserOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockOrders;
}

export async function resetPassword(_email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Simulated — in production, Supabase sends reset email
}
