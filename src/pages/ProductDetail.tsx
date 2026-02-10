import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router';
import {
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  ShoppingCart,
  X,
  Loader2,
  PackageX,
} from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { fetchProduct, formatPrice } from '../lib/medusa';
import type { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const cart = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then((p) => {
        if (p) {
          setProduct(p);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
    setToast(`${quantity}× ${product.name} added to cart!`);
    setQuantity(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className="w-10 h-10 text-[#fb791c]" />
        </motion.div>
      </div>
    );
  }

  // 404 state
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <PackageX className="w-20 h-20 text-gray-300" />
        </motion.div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">
          Product Not Found
        </h1>
        <p className="text-gray-500">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#10b981] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 font-medium"
          >
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#fb791c] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shop</span>
        </Link>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl bg-red-600 px-6 py-3 rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Rubber type badge */}
            {product.rubberType && (
              <span className="inline-block w-fit text-xs font-semibold uppercase tracking-wider bg-[#fb791c]/10 text-[#fb791c] px-3 py-1 rounded-full mb-4">
                {product.rubberType}
              </span>
            )}

            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-[#1a1a1a] mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.longDescription || product.description}
            </p>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity selector + Add to Cart */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-[#1a1a1a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white text-lg font-semibold px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
