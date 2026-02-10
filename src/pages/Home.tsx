import { useCart } from '../lib/CartContext';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import ProductCard from '../components/ProductCard';
import GymMap from '../components/GymMap';
import BrandCarousel from '../components/BrandCarousel';
import { mockProducts } from '../lib/medusa';
import { gymLocations } from '../lib/maps';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield, Clock } from 'lucide-react';
import type { Product } from '../types';

export default function Home() {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  // Show first 3 products as preview
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Products / Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Professional resoling services using premium rubber from top brands.
              Give your climbing shoes a second life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why RenewRubber */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Why RenewRubber?
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              More than just a resoling service — we are committed to sustainability,
              quality, and the climbing community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainable',
                description:
                  'Resoling extends shoe life by years, keeping thousands of shoes out of landfills. One resole saves approximately 1kg of waste.',
              },
              {
                icon: Shield,
                title: 'Quality Guaranteed',
                description:
                  'We use only premium rubber from Vibram and Unparallel. Every pair is inspected before and after resoling for maximum performance.',
              },
              {
                icon: Clock,
                title: 'Convenient',
                description:
                  'Drop off at any of our 20 partner gyms. No shipping hassle — just leave your shoes and pick them up when they are ready.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#4a4a4a] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Find Us - Map Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Where to Find Us
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              20 partner climbing gyms across the Netherlands. Drop off your shoes
              at the gym nearest to you.
            </p>
          </motion.div>

          <GymMap gyms={gymLocations} height="500px" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/gyms"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
            >
              Find Your Gym
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Carousel */}
      <div className="mt-0">
        <BrandCarousel />
      </div>

      {/* Spacer before footer */}
      <div className="h-[60px]" />
    </div>
  );
}
