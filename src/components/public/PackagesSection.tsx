import React, { useState } from 'react';
import {
  Calendar,
  Users,
  CheckCircle2,
  Hotel,
  Shield,
  ArrowRight,
  Sparkles,
  Flame,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { TourPackage } from '../../types/travel';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const { packages, openBookingModal, logPublicAction } = useTravelData();
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'International'>('All');

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'All') return true;
    return pkg.category === filter;
  });

  const handleBookNow = (pkg: TourPackage) => {
    logPublicAction(
      'booking_inquiry',
      `Package Selected: ${pkg.title}`,
      `User clicked Book Now for ₹${pkg.pricePerPerson.toLocaleString('en-IN')}/person`
    );
    openBookingModal({
      destination: pkg.destinationName,
      packageId: pkg.id,
      packageTitle: pkg.title,
    });
  };

  const handleViewDetails = (pkg: TourPackage) => {
    logPublicAction(
      'package_view',
      `Viewed Itinerary: ${pkg.title}`,
      `Inspected day-by-day plan for ${pkg.durationDays}D / ${pkg.durationNights}N`
    );
    onSelectPackage(pkg);
  };

  return (
    <section id="tours" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-slate-50/60 rounded-3xl my-6 border border-slate-200/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
            Curated Travel Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] font-heading mt-1">
            Featured Holiday Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            All-inclusive itineraries with premium accommodations, daily meals, private sightseeing, and zero hidden charges.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filter === 'All'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Packages
          </button>
          <button
            onClick={() => setFilter('Domestic')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filter === 'Domestic'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Domestic Holidays
          </button>
          <button
            onClick={() => setFilter('International')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filter === 'International'
                ? 'bg-[#004b93] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            International Specials
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Image Header */}
            <div className="relative h-52 overflow-hidden bg-slate-800">
              <img
                src={pkg.image}
                alt={pkg.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag & Spots Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#004b93] text-white text-[11px] font-bold shadow-xs">
                  {pkg.category} Tour
                </span>
                {pkg.spotsLeft <= 6 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs animate-pulse">
                    <Flame className="w-3 h-3" />
                    <span>Only {pkg.spotsLeft} slots left!</span>
                  </span>
                )}
              </div>

              {/* Destination & Duration on image bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <span className="text-xs font-bold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-amber-300">
                  {pkg.destinationName}
                </span>
                <span className="text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                </span>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004b93] transition-colors line-clamp-1">
                  {pkg.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {pkg.overview}
                </p>

                {/* Key Inclusions */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Package Inclusions
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {pkg.inclusions.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer with Pricing & CTA */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-[#004b93] tabular-nums">
                      ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">per person on twin sharing</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(pkg)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#004b93] hover:bg-slate-100 transition-colors"
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => handleBookNow(pkg)}
                    className="px-4 py-2 rounded-xl bg-[#ff6600] hover:bg-[#e05a00] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
