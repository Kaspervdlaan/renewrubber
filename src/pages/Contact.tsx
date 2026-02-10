import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';
import type { ContactFormData } from '../types';

const subjects = [
  'General Inquiry',
  'Pricing Question',
  'Order Status',
  'Partnership',
  'Other',
];

const faqs = [
  {
    question: 'How long does resoling take?',
    answer:
      'Standard resoling takes 2-3 weeks. Express service available for 5 business days.',
  },
  {
    question: 'What rubber options do you offer?',
    answer:
      'We offer Vibram XS Edge, XS Grip 2, Unparallel RH, and more. You can choose your preferred rubber when placing your order.',
  },
  {
    question: 'How much does resoling cost?',
    answer:
      'Prices start from €35 for toe rand repair to €65 for full resole with toe cap. Check our shop for all options.',
  },
  {
    question: 'Can I choose which gym to pick up from?',
    answer:
      'Yes! Drop off and pick up from any of our 20 partner gyms across the Netherlands.',
  },
  {
    question: "What if I'm not satisfied with the result?",
    answer:
      'We stand behind our work with a satisfaction guarantee. If the rubber delaminates within 3 months under normal use, we\'ll redo it free of charge.',
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@renewrubber.nl',
    href: 'mailto:info@renewrubber.nl',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+31 20 123 4567',
    href: 'tel:+31201234567',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri 9:00–17:00',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Amsterdam, Netherlands',
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fb791c]/20 to-[#ff6a00]/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Have a question about resoling, pricing, or partnerships? We&apos;d
            love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form — 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#10b981]/10 mb-6">
                      <CheckCircle className="w-8 h-8 text-[#10b981]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#4a4a4a]">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="mt-6 text-[#fb791c] font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                        >
                          Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleChange('name', e.target.value)
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 ${
                            errors.name
                              ? 'border-[#ef4444] bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-[#ef4444]">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                        >
                          Email <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 ${
                            errors.email
                              ? 'border-[#ef4444] bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-[#ef4444]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange('phone', e.target.value)
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40"
                          placeholder="+31 6 1234 5678"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            handleChange('subject', e.target.value)
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#4a4a4a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 cursor-pointer"
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                      >
                        Message <span className="text-[#ef4444]">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          handleChange('message', e.target.value)
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 resize-none ${
                          errors.message
                            ? 'border-[#ef4444] bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        placeholder="Tell us how we can help..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-[#ef4444]">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#1a1a1a] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 shrink-0">
                      <item.icon className="w-5 h-5 text-[#fb791c]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white text-sm hover:text-[#fb791c] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini map / visual */}
              <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  title="RenewRubber Location"
                  src="https://maps.google.com/maps?q=Amsterdam,Netherlands&z=12&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4a4a4a]">
            Quick answers to common questions about our resoling service.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-[#1a1a1a]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#4a4a4a] shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-[#4a4a4a] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
