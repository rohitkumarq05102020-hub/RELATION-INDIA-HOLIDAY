import React from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Hotel,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { TourPackage } from '../../types/travel';
import { useTravelData } from '../../context/TravelDataContext';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose }) => {
  const { openBookingModal } = useTravelData();

  if (!pkg) return null;

  const handleBook = () => {
    onClose();
    openBookingModal({
      destination: pkg.destinationName,
      packageId: pkg.id,
      packageTitle: pkg.title,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Banner with image */}
        <div className="relative h-56 bg-slate-900 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and metadata */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#004b93] text-white text-[11px] font-bold">
                {pkg.category} Holiday
              </span>
              <span className="px-2 py-0.5 rounded bg-black/40 text-amber-300 text-[11px] font-bold">
                {pkg.hotelRating}-Star Hotel
              </span>
              {pkg.spotsLeft <= 6 && (
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>Only {pkg.spotsLeft} spots!</span>
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading mt-1">
              {pkg.title}
            </h3>
            <span className="text-xs text-slate-200">
              {pkg.destinationName} · {pkg.durationDays} Days / {pkg.durationNights} Nights
            </span>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Trip Overview</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {pkg.overview}
            </p>
          </div>

          {/* Inclusions */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              Inclusions in this Package
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">
              Day-by-Day Detailed Itinerary
            </h4>
            <div className="space-y-3">
              {pkg.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#004b93] transition-colors"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#004b93] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      D{day.day}
                    </span>
                    <span>{day.title}</span>
                  </div>
                  <p className="text-slate-600 text-xs pl-8 leading-relaxed">
                    {day.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">
              Special Offer Fare
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-[#004b93] tabular-nums">
                ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{pkg.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="px-6 py-2.5 rounded-xl bg-[#ff6600] hover:bg-[#e05a00] text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <span>Book This Package Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
