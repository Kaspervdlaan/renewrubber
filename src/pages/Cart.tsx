import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Truck,
} from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { formatPrice } from '../lib/medusa';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  // Empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <ShoppingBag className="w-24 h-24 text-gray-300" />
        </motion.div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">
          Your cart is empty
        </h1>
        <p className="text-gray-500 text-center max-w-md">
          Looks like you haven't added any resoling services yet. Browse our
          shop to get started!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#1a1a1a] mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/shop/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-28 h-28 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/shop/${item.product.id}`}
                          className="text-lg font-bold text-[#1a1a1a] hover:text-[#fb791c] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.product.rubberType && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.product.rubberType}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-[#ef4444] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-semibold text-sm text-[#1a1a1a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-lg font-bold text-[#1a1a1a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue shopping */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#fb791c] transition-colors mt-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-8"
            >
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="font-medium text-[#10b981]">
                    Free with gym pickup
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-[#1a1a1a]">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
