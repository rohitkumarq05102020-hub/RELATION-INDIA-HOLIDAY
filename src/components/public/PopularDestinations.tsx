import React, { useState } from 'react';
import {
  Compass,
  Star,
  Clock,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { Destination } from '../../types/travel';

interface PopularDestinationsProps {
  onSelectDestination: (dest: Destination) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onSelectDestination }) => {
  const { destinations, searchFilter, logPublicAction, openBookingModal } = useTravelData();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Domestic' | 'International'>('All');

  const filteredDestinations = destinations.filter((dest) => {
    if (!dest.isActive) return false;
    if (activeCategory !== 'All' && dest.category !== activeCategory) return false;
    if (
      searchFilter.destination &&
      !dest.name.toLowerCase().includes(searchFilter.destination.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCardClick = (dest: Destination) => {
    logPublicAction(
      'destination_click',
      `Destination Opened: ${dest.name}`,
      `User viewed destination details and package itineraries for ${dest.name} (${dest.category})`
    );
    onSelectDestination(dest);
  };

  const handleQuickBook = (e: React.MouseEvent, dest: Destination) => {
    e.stopPropagation();
    logPublicAction(
      'booking_inquiry',
      `Booking Started: ${dest.name}`,
      `User clicked Quick Book on ${dest.name} card`
    );
    openBookingModal({ destination: dest.name });
  };

  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header matching the screenshot title with subtle accent lines */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="flex items-center gap-4 w-full max-w-xl justify-center">
          <div className="h-[2px] bg-gradient-to-r from-transparent to-[#004b93] flex-1" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] tracking-tight font-heading whitespace-nowrap">
            Popular Destinations
          </h2>
          <div className="h-[2px] bg-gradient-to-l from-transparent to-[#004b93] flex-1" />
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
          Handpicked top-rated holiday gateways with custom itineraries, verified hotels, and seamless ground transfers.
        </p>

        {/* Category Filters */}
        <div className="mt-4 inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeCategory === 'All'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Places
          </button>
          <button
            onClick={() => setActiveCategory('Domestic')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeCategory === 'Domestic'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Domestic (India)
          </button>
          <button
            onClick={() => setActiveCategory('International')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeCategory === 'International'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            International
          </button>
        </div>
      </div>

      {/* Destinations Grid matching the 6-item layout from screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleCardClick(dest)}
            className="group relative h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60 bg-slate-800"
          >
            {/* Background Photography with fallback */}
            <img
              src={dest.image}
              alt={dest.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              onError={(e) => {
                // styled fallback in case of network issues
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Gradient Scrim matching screenshot */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:from-black/90" />

            {/* Top metadata: category & rating */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white z-10">
              <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs font-medium text-amber-300 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{dest.rating}</span>
              </span>
              <span className="text-[10px] font-bold text-white/90 bg-[#004b93]/80 px-1.5 py-0.5 rounded">
                {dest.category === 'Domestic' ? 'India' : 'Intl'}
              </span>
            </div>

            {/* Bottom Content matching the bold center title from screenshot */}
            <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col items-center justify-end text-center z-10">
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide font-heading drop-shadow-md group-hover:text-amber-300 transition-colors">
                {dest.name}
              </h3>

              {/* Price & Duration reveal on hover */}
              <div className="mt-1 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                <span className="text-amber-300 font-bold tabular-nums">
                  From ₹{dest.startingPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-white/60">·</span>
                <span className="text-[11px] text-white/80">{dest.duration.split('/')[0]}</span>
              </div>

              {/* Action buttons on card hover */}
              <div className="mt-2 w-full pt-1.5 border-t border-white/20 hidden group-hover:flex items-center justify-center gap-2 animate-in fade-in duration-200">
                <button
                  onClick={(e) => handleQuickBook(e, dest)}
                  className="px-2 py-1 rounded bg-[#ff6600] hover:bg-[#e05a00] text-white text-[11px] font-bold shadow-xs"
                >
                  Book Tour
                </button>
                <span className="text-[10px] text-slate-200 underline">Details</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6">
          <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No destinations match your search</h4>
          <p className="text-xs text-slate-500 mt-1">Try clearing filters or search query.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="mt-3 px-3 py-1.5 text-xs font-semibold bg-[#004b93] text-white rounded-md"
          >
            Show All Destinations
          </button>
        </div>
      )}
    </section>
  );
};
