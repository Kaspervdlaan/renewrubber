import { gymLocations } from '../lib/maps';

export default function BrandCarousel() {
  // Duplicate the list for seamless infinite scrolling
  const duplicatedGyms = [...gymLocations, ...gymLocations];

  return (
    <section className="py-16 bg-brand-accent-gray overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
        Our Partner Gyms
      </h2>

      {/* Carousel container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-brand-accent-gray to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-brand-accent-gray to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll">
          {duplicatedGyms.map((gym, index) => (
            <div
              key={`${gym.id}-${index}`}
              className="shrink-0 mx-3"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 whitespace-nowrap">
                <span className="text-white font-medium text-sm">
                  {gym.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
