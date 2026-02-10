import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../lib/medusa';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Product image - clickable */}
      <Link to={`/shop/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg bg-red-600 px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product details */}
      <div className="p-6">
        <Link to={`/shop/${product.id}`}>
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 hover:text-[#fb791c] transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1a1a1a]">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className="flex items-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
