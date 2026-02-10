import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import {
  CheckCircle,
  Package,
  Clock,
  Mail,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

// Small confetti-like floating particles
function ConfettiDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: 4 + Math.random() * 6,
        color: ['#fb791c', '#ff6a00', '#10b981', '#fbbf24', '#3b82f6'][
          Math.floor(Math.random() * 5)
        ],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ y: -20, x: `${dot.x}vw`, opacity: 0, scale: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            ease: 'easeOut',
          }}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
        />
      ))}
    </div>
  );
}

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 relative flex items-center justify-center px-4 py-16">
      <ConfettiDots />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center"
      >
        {/* Animated check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mx-auto w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.4 }}
          >
            <CheckCircle className="w-12 h-12 text-[#10b981]" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-[#1a1a1a] mb-2"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 font-medium mb-1"
        >
          Order #{orderId}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[#fb791c] font-semibold mb-8"
        >
          Thank you for choosing RenewRubber
        </motion.p>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 mb-8"
        >
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#fb791c]/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#fb791c]" />
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] text-sm">
                Estimated Completion
              </p>
              <p className="text-gray-500 text-sm">2–3 weeks turnaround time</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#fb791c]/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-[#fb791c]" />
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] text-sm">
                Pickup / Delivery
              </p>
              <p className="text-gray-500 text-sm">
                We'll notify you when your shoes are ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#fb791c]/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#fb791c]" />
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] text-sm">
                Confirmation Sent
              </p>
              <p className="text-gray-500 text-sm">
                We've sent a confirmation to your email
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
          >
            Track Your Order
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/shop"
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-[#1a1a1a] font-semibold px-6 py-3.5 rounded-full hover:border-[#fb791c] hover:text-[#fb791c] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
