import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Globe, Clock, X } from 'lucide-react';
import type { GymLocation } from '../types';

interface GymMapProps {
  gyms: GymLocation[];
  height?: string;
  onGymClick?: (gym: GymLocation) => void;
}

// Netherlands bounding box (approximate)
const NL_BOUNDS = {
  minLat: 50.75,
  maxLat: 53.55,
  minLng: 3.35,
  maxLng: 7.25,
};

function latLngToPosition(lat: number, lng: number) {
  const x =
    ((lng - NL_BOUNDS.minLng) / (NL_BOUNDS.maxLng - NL_BOUNDS.minLng)) * 100;
  const y =
    ((NL_BOUNDS.maxLat - lat) / (NL_BOUNDS.maxLat - NL_BOUNDS.minLat)) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

export default function GymMap({
  gyms,
  height = '500px',
  onGymClick,
}: GymMapProps) {
  const [selectedGym, setSelectedGym] = useState<GymLocation | null>(null);
  const [hoveredGym, setHoveredGym] = useState<number | null>(null);

  const handleGymClick = (gym: GymLocation) => {
    setSelectedGym(gym);
    onGymClick?.(gym);
  };

  return (
    <section className="w-full bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          Find a Partner Gym
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-center mb-12 max-w-xl mx-auto"
        >
          Drop off and pick up your climbing shoes at any of our 20 partner gyms
          across the Netherlands.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map visualization */}
          <div className="lg:col-span-2">
            <div
              className="relative bg-[#2a2a2a] rounded-2xl overflow-hidden border border-white/10"
              style={{ height }}
            >
              {/* Netherlands outline SVG background */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full opacity-10"
                preserveAspectRatio="none"
              >
                <rect
                  x="10"
                  y="5"
                  width="80"
                  height="90"
                  rx="4"
                  fill="white"
                  opacity="0.1"
                />
              </svg>

              {/* Grid lines */}
              <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`h-${i}`}>
                    <div
                      className="absolute left-0 right-0 border-t border-white"
                      style={{ top: `${(i + 1) * 10}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 border-l border-white"
                      style={{ left: `${(i + 1) * 10}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Gym markers */}
              {gyms.map((gym) => {
                const pos = latLngToPosition(gym.lat, gym.lng);
                const isHovered = hoveredGym === gym.id;
                const isSelected = selectedGym?.id === gym.id;

                return (
                  <button
                    key={gym.id}
                    onClick={() => handleGymClick(gym)}
                    onMouseEnter={() => setHoveredGym(gym.id)}
                    onMouseLeave={() => setHoveredGym(null)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    aria-label={`${gym.name} in ${gym.city}`}
                  >
                    {/* Ping animation for selected */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-40" />
                    )}

                    {/* Marker dot */}
                    <motion.div
                      animate={{
                        scale: isHovered || isSelected ? 1.5 : 1,
                      }}
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        isSelected
                          ? 'bg-brand-orange border-brand-orange-dark'
                          : isHovered
                            ? 'bg-brand-orange border-white'
                            : 'bg-white/80 border-white/60'
                      }`}
                    />

                    {/* Tooltip on hover */}
                    {isHovered && !isSelected && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
                        <div className="bg-white text-brand-charcoal px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                          {gym.name}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Map attribution */}
              <div className="absolute bottom-3 left-3 text-white/30 text-xs">
                {gyms.length} partner gyms across the Netherlands
              </div>
            </div>
          </div>

          {/* Gym info panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedGym ? (
                <motion.div
                  key={selectedGym.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#2a2a2a] rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {selectedGym.name}
                    </h3>
                    <button
                      onClick={() => setSelectedGym(null)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">
                          {selectedGym.address}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedGym.city}, {selectedGym.region}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                      <a
                        href={`tel:${selectedGym.phone}`}
                        className="text-white text-sm hover:text-brand-orange transition-colors"
                      >
                        {selectedGym.phone}
                      </a>
                    </div>

                    {selectedGym.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-brand-orange shrink-0" />
                        <a
                          href={selectedGym.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-sm hover:text-brand-orange transition-colors truncate"
                        >
                          {selectedGym.website.replace('https://', '')}
                        </a>
                      </div>
                    )}

                    {selectedGym.openingHours && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                        <p className="text-white text-sm">
                          {selectedGym.openingHours}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Embedded Google Maps for selected gym */}
                  <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
                    <iframe
                      title={`Map of ${selectedGym.name}`}
                      src={`https://maps.google.com/maps?q=${selectedGym.lat},${selectedGym.lng}&z=15&output=embed`}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#2a2a2a] rounded-2xl p-6 border border-white/10 h-full flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <MapPin className="w-12 h-12 text-brand-orange mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Select a Gym
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Click on any marker on the map to see gym details and
                    directions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
