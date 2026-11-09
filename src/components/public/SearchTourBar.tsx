import React, { useState } from 'react';
import {
  MapPin,
  Plane,
  Calendar,
  Users,
  Search,
  Check,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

interface SearchTourBarProps {
  onSearchSubmit?: () => void;
}

export const SearchTourBar: React.FC<SearchTourBarProps> = ({ onSearchSubmit }) => {
  const {
    destinations,
    searchFilter,
    setSearchFilter,
    logPublicAction,
  } = useTravelData();

  const [isSearched, setIsSearched] = useState(false);

  const departureCities = [
    'Dhanbad (Jharkhand)',
    'Ranchi (Jharkhand)',
    'Kolkata (West Bengal)',
    'Patna (Bihar)',
    'Bokaro Steel City',
    'Jamshedpur (Tatanagar)',
    'Asansol (West Bengal)',
    'New Delhi',
    'Mumbai',
    'Bengaluru',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);

    const fromLabel = searchFilter.fromCity || 'Dhanbad';
    const toLabel = searchFilter.destination || 'All Destinations';
    const dateLabel = searchFilter.travelDate || 'Flexible';
    const guestsLabel = `${searchFilter.guests} Guest${searchFilter.guests > 1 ? 's' : ''}`;

    logPublicAction(
      'search',
      `Search: ${toLabel}`,
      `Departing from ${fromLabel} on ${dateLabel} (${guestsLabel})`,
      `${fromLabel.split(' ')[0]}, India`
    );

    if (onSearchSubmit) {
      onSearchSubmit();
    }

    // Scroll to destinations or packages
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => setIsSearched(false), 2000);
  };

  return (
    <div className="relative -mt-8 sm:-mt-10 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-3 sm:p-4 transition-all"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Zone 1: From City */}
          <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#004b93] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#004b93]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                From
              </label>
              <select
                value={searchFilter.fromCity}
                onChange={(e) =>
                  setSearchFilter((prev) => ({ ...prev, fromCity: e.target.value }))
                }
                className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="">Select City (Default: Dhanbad)</option>
                {departureCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zone 2: To Destination */}
          <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#004b93] flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-[#004b93]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                To
              </label>
              <select
                value={searchFilter.destination}
                onChange={(e) =>
                  setSearchFilter((prev) => ({ ...prev, destination: e.target.value }))
                }
                className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="">Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.name}>
                    {dest.name} ({dest.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zone 3: Travel Date */}
          <div className="lg:col-span-2 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#004b93] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#004b93]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Travel Date
              </label>
              <input
                type="date"
                value={searchFilter.travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  setSearchFilter((prev) => ({ ...prev, travelDate: e.target.value }))
                }
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Zone 4: Guests */}
          <div className="lg:col-span-2 flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#004b93] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#004b93]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Guests
              </label>
              <select
                value={searchFilter.guests}
                onChange={(e) =>
                  setSearchFilter((prev) => ({ ...prev, guests: parseInt(e.target.value, 10) }))
                }
                className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults (Couple)</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults (Family)</option>
                <option value={5}>5+ Group</option>
              </select>
            </div>
          </div>

          {/* Zone 5: Search Button matching screenshot */}
          <div className="lg:col-span-2 flex items-center">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#004b93] hover:bg-[#003c75] active:bg-[#003160] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              {isSearched ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search Tour</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
