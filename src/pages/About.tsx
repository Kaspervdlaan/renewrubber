import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Wallet,
  Recycle,
  Heart,
  Search,
  Sparkles,
  Scissors,
  Layers,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const whyResolingCards = [
  {
    icon: Wallet,
    title: 'Save Money',
    description:
      'Resoling costs a fraction of buying new shoes. Get the same great performance at 40-60% less than replacement.',
  },
  {
    icon: Recycle,
    title: 'Reduce Waste',
    description:
      'Every pair resoled keeps rubber and materials out of landfills. Join us in building a more sustainable climbing community.',
  },
  {
    icon: Heart,
    title: 'Keep Your Fit',
    description:
      'Your favourite shoes are already broken in to your feet. Resoling lets you keep that perfect, personalised fit you love.',
  },
];

const processSteps = [
  {
    icon: Search,
    title: 'Inspection',
    description:
      'Every pair undergoes a thorough assessment. We check the upper, rand, toe box, and heel to determine the best resoling approach for your shoes.',
  },
  {
    icon: Sparkles,
    title: 'Cleaning',
    description:
      'We carefully clean and prepare the shoe surface, removing old adhesive residue and debris to ensure optimal bonding with the new rubber.',
  },
  {
    icon: Scissors,
    title: 'Old Sole Removal',
    description:
      'Using precision tools, we carefully strip the worn rubber without damaging the upper. This step requires years of experience to get right.',
  },
  {
    icon: Layers,
    title: 'New Rubber Application',
    description:
      'Premium rubber (Vibram or Unparallel) is shaped and bonded with industrial-grade adhesive. We match the original profile for consistent performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check',
    description:
      'Every resoled pair goes through rigorous testing — bond strength, edge precision, and visual inspection — before we approve it for pickup.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 to-[#1a1a1a]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            About{' '}
            <span className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-transparent">
              RenewRubber
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Expert climbing shoe resoling crafted with passion, precision, and a
            commitment to sustainability.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-[#4a4a4a] leading-relaxed">
              <p>
                At RenewRubber, we believe that every climbing shoe deserves a
                second chance. Founded in Amsterdam by passionate climbers, our
                mission is to extend the life of climbing shoes while reducing
                the environmental impact of the sport we love.
              </p>
              <p>
                The climbing industry produces thousands of tonnes of rubber
                waste each year from discarded shoes. We&apos;re changing that,
                one resole at a time. By giving worn shoes new life with premium
                rubber, we help climbers save money and reduce waste without
                compromising on performance.
              </p>
              <p>
                With our network of 20 partner gyms across the Netherlands,
                we&apos;ve made resoling as convenient as dropping off your
                shoes after a session. No shipping hassles, no long waits — just
                expert craftsmanship and shoes that feel like new.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"
                alt="Climbing and sustainability"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white rounded-2xl p-6 shadow-lg max-w-[200px]">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm opacity-90">Partner gyms nationwide</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Resoling Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Why Resoling?
            </h2>
            <p className="text-[#4a4a4a] max-w-xl mx-auto">
              Three great reasons to give your climbing shoes a new lease on
              life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyResolingCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white mb-5">
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#4a4a4a] text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — Vertical Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Our Resoling Process
          </h2>
          <p className="text-[#4a4a4a] max-w-xl mx-auto">
            Five meticulous steps to bring your shoes back to peak performance.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  isEven
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00] flex items-center justify-center text-white shadow-lg z-10">
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <span className="inline-block text-xs font-bold text-[#fb791c] uppercase tracking-wider mb-2">
                      Step {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#4a4a4a] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quality & Materials Section */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We use only premium materials and stand behind every resole.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Premium Rubber
              </h3>
              <ul className="space-y-3">
                {[
                  'Vibram XS Edge — precision edging',
                  'Vibram XS Grip 2 — all-round grip',
                  'Unparallel RH — high friction',
                  'Custom options on request',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#fb791c] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Turnaround */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Fast Turnaround
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-transparent">
                    2–3 weeks
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Standard resoling service
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5 days</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Express service available
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  We&apos;ll notify you as soon as your shoes are ready for
                  pickup at your chosen gym.
                </p>
              </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Our Guarantee
              </h3>
              <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                <p>
                  We stand behind every resole with a satisfaction guarantee. If
                  the rubber delaminates within the first 3 months under normal
                  use, we&apos;ll redo it free of charge.
                </p>
                <p>
                  Our cobblers have years of experience and a genuine passion for
                  climbing — your shoes are in expert hands.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Ready to Revive Your Shoes?
            </h2>
            <p className="text-[#4a4a4a] mb-8 max-w-lg mx-auto">
              Browse our resoling and repair services, place your order online,
              and drop off your shoes at a gym near you.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
