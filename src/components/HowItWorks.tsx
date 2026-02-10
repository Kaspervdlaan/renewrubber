import { motion } from 'motion/react';
import { Box, Palette, Wrench, Package } from 'lucide-react';

const steps = [
  {
    icon: Box,
    step: 1,
    title: 'Drop Off at Your Gym',
    description:
      'Bring your worn climbing shoes to any of our 20 partner gyms across the Netherlands.',
  },
  {
    icon: Palette,
    step: 2,
    title: 'Choose Your Rubber',
    description:
      'Select from premium rubber options including Vibram XS Edge, XS Grip 2, and more.',
  },
  {
    icon: Wrench,
    step: 3,
    title: 'We Resole',
    description:
      'Our expert craftsmen carefully resole your shoes with precision and care.',
  },
  {
    icon: Package,
    step: 4,
    title: 'Pick Up',
    description:
      'Collect your revived shoes from the same gym. Ready to climb again!',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-brand-charcoal mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              {/* Icon circle */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-r from-brand-orange to-brand-orange-dark flex items-center justify-center">
                <item.icon className="w-8 h-8 text-white" />
              </div>

              {/* Step number */}
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wide">
                Step {item.step}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-charcoal mt-2 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-brand-gray leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
