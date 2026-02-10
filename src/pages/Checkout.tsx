import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  CreditCard,
  MapPin,
  Mail,
  Phone,
  User,
  Home,
  Building2,
  Hash,
  Lock,
  CalendarDays,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { formatPrice } from '../lib/medusa';
import { gymLocations } from '../lib/maps';
import type { CheckoutFormData } from '../types';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [form, setForm] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    deliveryMethod: 'gym-pickup',
    selectedGym: '',
    paymentMethod: 'ideal',
    sameAsBilling: true,
  });

  // Card fields (mock)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const shippingCost = form.deliveryMethod === 'home-delivery' ? 595 : 0;
  const orderTotal = totalPrice + shippingCost;

  const updateField = <K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (form.deliveryMethod === 'gym-pickup' && !form.selectedGym) {
      newErrors.selectedGym = 'Please select a gym';
    }
    if (form.deliveryMethod === 'home-delivery') {
      if (!form.address.trim()) newErrors.address = 'Street address is required';
      if (!form.city.trim()) newErrors.city = 'City is required';
      if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    if (form.paymentMethod === 'credit-card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16)
        newErrors.cardNumber = 'Valid card number is required';
      if (!cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!cardCvc.trim() || cardCvc.length < 3)
        newErrors.cardCvc = 'Valid CVC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();
    const orderId = `ORD-${Date.now()}`;
    navigate(`/order-success/${orderId}`);
  };

  // Redirect if empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const inputClassName = (field: string) =>
    `w-full bg-gray-50 border ${
      errors[field] ? 'border-[#ef4444]' : 'border-gray-300'
    } rounded-lg px-4 py-3 pl-11 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 focus:border-[#fb791c] transition-colors`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#1a1a1a] mb-8"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Section 1: Contact Info */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-5 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#fb791c]" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="John"
                        className={inputClassName('firstName')}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-[#ef4444] text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Doe"
                        className={inputClassName('lastName')}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-[#ef4444] text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@example.com"
                        className={inputClassName('email')}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[#ef4444] text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+31 6 12345678"
                        className={inputClassName('phone')}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[#ef4444] text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </motion.section>

              {/* Section 2: Delivery Method */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fb791c]" />
                  Delivery Method
                </h2>

                <div className="space-y-3">
                  {/* Gym Pickup */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      form.deliveryMethod === 'gym-pickup'
                        ? 'border-[#fb791c] bg-[#fb791c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryMethod === 'gym-pickup'}
                      onChange={() => updateField('deliveryMethod', 'gym-pickup')}
                      className="w-4 h-4 text-[#fb791c] focus:ring-[#fb791c]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#1a1a1a]">
                        Gym Pickup
                      </span>
                      <span className="ml-2 text-sm font-medium text-[#10b981]">
                        Free
                      </span>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Drop off and pick up at your local climbing gym
                      </p>
                    </div>
                  </label>

                  {/* Gym selection */}
                  {form.deliveryMethod === 'gym-pickup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-7"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Select Gym *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={form.selectedGym || ''}
                          onChange={(e) => updateField('selectedGym', e.target.value)}
                          className={`${inputClassName('selectedGym')} appearance-none pr-10`}
                        >
                          <option value="">Choose a gym location…</option>
                          {gymLocations.map((gym) => (
                            <option key={gym.id} value={gym.name}>
                              {gym.name} — {gym.city}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.selectedGym && (
                        <p className="text-[#ef4444] text-xs mt-1">
                          {errors.selectedGym}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Home Delivery */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      form.deliveryMethod === 'home-delivery'
                        ? 'border-[#fb791c] bg-[#fb791c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryMethod === 'home-delivery'}
                      onChange={() => updateField('deliveryMethod', 'home-delivery')}
                      className="w-4 h-4 text-[#fb791c] focus:ring-[#fb791c]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#1a1a1a]">
                        Home Delivery
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">
                        +€5.95
                      </span>
                      <p className="text-sm text-gray-500 mt-0.5">
                        We'll send a shipping label to your address
                      </p>
                    </div>
                  </label>

                  {/* Address fields */}
                  {form.deliveryMethod === 'home-delivery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-7 space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Street Address *
                        </label>
                        <div className="relative">
                          <Home className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={form.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            placeholder="Keizersgracht 123"
                            className={inputClassName('address')}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-[#ef4444] text-xs mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            City *
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={form.city}
                              onChange={(e) => updateField('city', e.target.value)}
                              placeholder="Amsterdam"
                              className={inputClassName('city')}
                            />
                          </div>
                          {errors.city && (
                            <p className="text-[#ef4444] text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Postal Code *
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={form.postalCode}
                              onChange={(e) =>
                                updateField('postalCode', e.target.value)
                              }
                              placeholder="1015 AB"
                              className={inputClassName('postalCode')}
                            />
                          </div>
                          {errors.postalCode && (
                            <p className="text-[#ef4444] text-xs mt-1">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.section>

              {/* Section 3: Payment Method */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#fb791c]" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {/* Credit Card */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      form.paymentMethod === 'credit-card'
                        ? 'border-[#fb791c] bg-[#fb791c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'credit-card'}
                      onChange={() => updateField('paymentMethod', 'credit-card')}
                      className="w-4 h-4 text-[#fb791c] focus:ring-[#fb791c]"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-[#1a1a1a]">
                      Credit Card
                    </span>
                  </label>

                  {/* Credit card fields */}
                  {form.paymentMethod === 'credit-card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-7 space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Card Number *
                        </label>
                        <div className="relative">
                          <CreditCard className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                              const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
                              setCardNumber(formatted);
                              if (errors.cardNumber)
                                setErrors((p) => {
                                  const c = { ...p };
                                  delete c.cardNumber;
                                  return c;
                                });
                            }}
                            placeholder="4242 4242 4242 4242"
                            className={inputClassName('cardNumber')}
                          />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-[#ef4444] text-xs mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Expiry Date *
                          </label>
                          <div className="relative">
                            <CalendarDays className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => {
                                let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
                                if (raw.length > 2) raw = raw.slice(0, 2) + '/' + raw.slice(2);
                                setCardExpiry(raw);
                                if (errors.cardExpiry)
                                  setErrors((p) => {
                                    const c = { ...p };
                                    delete c.cardExpiry;
                                    return c;
                                  });
                              }}
                              placeholder="MM/YY"
                              className={inputClassName('cardExpiry')}
                            />
                          </div>
                          {errors.cardExpiry && (
                            <p className="text-[#ef4444] text-xs mt-1">
                              {errors.cardExpiry}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            CVC *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setCardCvc(val);
                                if (errors.cardCvc)
                                  setErrors((p) => {
                                    const c = { ...p };
                                    delete c.cardCvc;
                                    return c;
                                  });
                              }}
                              placeholder="123"
                              className={inputClassName('cardCvc')}
                            />
                          </div>
                          {errors.cardCvc && (
                            <p className="text-[#ef4444] text-xs mt-1">
                              {errors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* iDEAL */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      form.paymentMethod === 'ideal'
                        ? 'border-[#fb791c] bg-[#fb791c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'ideal'}
                      onChange={() => updateField('paymentMethod', 'ideal')}
                      className="w-4 h-4 text-[#fb791c] focus:ring-[#fb791c]"
                    />
                    <span className="font-bold text-[#cc0066] text-lg">iDEAL</span>
                    <span className="font-semibold text-[#1a1a1a]">iDEAL</span>
                  </label>
                  {form.paymentMethod === 'ideal' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pl-7 text-sm text-gray-500"
                    >
                      You will be redirected to your bank's iDEAL environment to
                      complete the payment.
                    </motion.p>
                  )}

                  {/* Bancontact */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      form.paymentMethod === 'bancontact'
                        ? 'border-[#fb791c] bg-[#fb791c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'bancontact'}
                      onChange={() => updateField('paymentMethod', 'bancontact')}
                      className="w-4 h-4 text-[#fb791c] focus:ring-[#fb791c]"
                    />
                    <span className="font-bold text-[#005498] text-sm">Bancontact</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      Bancontact
                    </span>
                  </label>
                  {form.paymentMethod === 'bancontact' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pl-7 text-sm text-gray-500"
                    >
                      You will be redirected to Bancontact to complete the
                      payment securely.
                    </motion.p>
                  )}
                </div>
              </motion.section>

              {/* Submit button (mobile) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white text-lg font-semibold px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Place Order — {formatPrice(orderTotal)}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 sticky top-8"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-5">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1a1a1a] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#1a1a1a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={
                        shippingCost === 0
                          ? 'text-[#10b981] font-medium'
                          : ''
                      }
                    >
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#1a1a1a] border-t border-gray-200 pt-3 mt-3">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                {/* Submit button (desktop) */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="hidden lg:flex mt-6 w-full items-center justify-center gap-2 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold px-6 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
