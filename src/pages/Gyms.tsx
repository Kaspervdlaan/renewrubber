import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Globe, ExternalLink, Search, X } from 'lucide-react';
import GymMap from '../components/GymMap';
import { gymLocations, getUniqueRegions } from '../lib/maps';
import type { GymLocation } from '../types';

export default function Gyms() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [highlightedGym, setHighlightedGym] = useState<GymLocation | null>(null);

  const regions = useMemo(() => getUniqueRegions(), []);

  const filteredGyms = useMemo(() => {
    return gymLocations.filter((gym) => {
      const matchesSearch =
        !searchQuery ||
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        !selectedRegion || gym.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const hasFilters = searchQuery || selectedRegion;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
  };

  const handleGymClick = (gym: GymLocation) => {
    setHighlightedGym(gym);
    // Scroll to the gym card
    const el = document.getElementById(`gym-card-${gym.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fb791c]/20 to-[#ff6a00]/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Find Your Nearest Partner Gym
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Drop off your climbing shoes at any of our 20 partner gyms across the
            Netherlands. We&apos;ll pick them up, resole them, and return them to
            your chosen gym — simple as that.
          </motion.p>
        </div>
      </section>

      {/* Full-width Map Section */}
      <section className="w-full">
        <GymMap
          gyms={filteredGyms}
          height="500px"
          onGymClick={handleGymClick}
        />
      </section>

      {/* Search & Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by gym name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 transition-shadow"
            />
          </div>

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="appearance-none bg-gray-100 text-[#4a4a4a] text-sm font-medium pl-4 pr-10 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fb791c]/40 cursor-pointer"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-[#fb791c] bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear Filters
            </motion.button>
          )}

          {/* Result Count */}
          <span className="text-sm text-gray-500 ml-auto">
            {filteredGyms.length} gym{filteredGyms.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredGyms.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No gyms found matching your search.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[#fb791c] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym, index) => (
              <motion.div
                key={gym.id}
                id={`gym-card-${gym.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index % 6 * 0.08 }}
                className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-lg ${
                  highlightedGym?.id === gym.id
                    ? 'border-[#fb791c] ring-2 ring-[#fb791c]/20'
                    : 'border-gray-100'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1a1a1a] leading-tight">
                      {gym.name}
                    </h3>
                    <span className="shrink-0 ml-2 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-[#4a4a4a]">
                      {gym.city}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#fb791c] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#4a4a4a]">{gym.address}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#fb791c] shrink-0" />
                      <a
                        href={`tel:${gym.phone}`}
                        className="text-sm text-[#4a4a4a] hover:text-[#fb791c] transition-colors"
                      >
                        {gym.phone}
                      </a>
                    </div>

                    {gym.openingHours && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#fb791c] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#4a4a4a]">
                          {gym.openingHours}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(gym.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-white text-sm font-medium hover:shadow-lg hover:shadow-orange-200 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Get Directions
                    </a>
                    {gym.website && (
                      <a
                        href={gym.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 text-[#4a4a4a] text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
