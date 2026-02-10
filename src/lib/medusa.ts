import type { Product } from '../types';

// Mock Medusa.js client configuration
// In production, replace with actual Medusa.js SDK
const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export const medusaClient = {
  baseUrl: MEDUSA_BACKEND_URL,
};

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 'prod_01',
    name: 'Vibram XS Edge Resole',
    description: 'Premium edge rubber for technical climbing. The go-to choice for precision footwork on small edges.',
    longDescription: 'The Vibram XS Edge is the gold standard for technical climbing. This 4mm rubber compound offers exceptional edging performance on the smallest holds. Perfect for sport climbing, competition, and technical boulder problems where precision is paramount. Our expert craftsmen carefully apply this rubber to restore your shoes to peak performance.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80',
    category: 'resole',
    rubberType: 'Vibram XS Edge',
    features: ['4mm thickness', 'Superior edge performance', 'Long-lasting durability', 'Professional application'],
    inStock: true,
  },
  {
    id: 'prod_02',
    name: 'Vibram XS Grip 2 Resole',
    description: 'Maximum friction for steep terrain. Ideal for bouldering and overhanging routes.',
    longDescription: 'Vibram XS Grip 2 is engineered for maximum friction on steep and overhanging terrain. This softer compound excels where grip is more important than edging precision. The rubber molds perfectly to holds, providing confidence on smears and volumes. Our resoling service restores your shoes with this premium rubber for a fraction of the cost of new shoes.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80',
    category: 'resole',
    rubberType: 'Vibram XS Grip 2',
    features: ['4mm thickness', 'Maximum friction', 'Soft compound', 'Ideal for overhangs'],
    inStock: true,
  },
  {
    id: 'prod_03',
    name: 'Full Resole + Toe Cap',
    description: 'Complete restoration with new toe rand. Best value for heavily worn shoes.',
    longDescription: 'Our most comprehensive resoling package. This includes a full sole replacement plus a new toe rand/cap, giving your shoes a complete refresh. Ideal for shoes with significant toe wear or damage to the rand. We use premium Vibram rubber and expert techniques to bring your shoes back to life. This service extends the life of your shoes significantly.',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1606928824898-aacda4f1763e?w=600&q=80',
    category: 'resole',
    rubberType: 'Vibram XS Edge / XS Grip 2',
    features: ['Full sole replacement', 'New toe rand', 'Choice of rubber', 'Best value restoration'],
    inStock: true,
  },
  {
    id: 'prod_04',
    name: 'Toe Rand Repair',
    description: 'Targeted repair for worn toe areas. Extend the life of your favorite pair.',
    longDescription: 'A focused repair that addresses the most common wear point on climbing shoes - the toe area. Our toe rand repair patches and reinforces the toe cap without requiring a full resole. This is a cost-effective option for shoes where the sole is still in good condition but the toe area shows wear. Quick turnaround and excellent results.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?w=600&q=80',
    category: 'repair',
    rubberType: 'Vibram XS Edge',
    features: ['Toe area focus', 'Quick turnaround', 'Cost-effective', 'Preserves shoe shape'],
    inStock: true,
  },
  {
    id: 'prod_05',
    name: 'Unparallel RH Resole',
    description: 'High-performance rubber with exceptional sensitivity and grip balance.',
    longDescription: 'Unparallel RH (Real Honor) rubber offers an excellent balance of sensitivity, grip, and durability. This newer rubber compound has quickly become a favorite among climbers who want to feel the rock while maintaining excellent friction. Our resolers are trained specifically in applying Unparallel rubber for optimal performance.',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80',
    category: 'resole',
    rubberType: 'Unparallel RH',
    features: ['Excellent sensitivity', 'Balanced performance', 'Modern compound', 'Versatile climbing'],
    inStock: true,
  },
  {
    id: 'prod_06',
    name: 'Express Resole Service',
    description: 'Priority handling with 5-day turnaround. For when you cannot wait.',
    longDescription: 'Need your shoes back fast? Our Express Resole Service puts your shoes at the front of the queue. With a guaranteed 5 business day turnaround (standard is 2-3 weeks), you will be back on the wall in no time. Includes your choice of Vibram XS Edge or XS Grip 2 rubber with the same expert craftsmanship as our standard service.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
    category: 'resole',
    rubberType: 'Choice of Vibram',
    features: ['5-day turnaround', 'Priority handling', 'Choice of rubber', 'Same quality guarantee'],
    inStock: true,
  },
];

// Simulated API functions
export async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts;
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProducts.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
