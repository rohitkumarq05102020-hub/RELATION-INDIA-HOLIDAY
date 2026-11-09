import React from 'react';
import {
  X,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Destination } from '../../types/travel';
import { useTravelData } from '../../context/TravelDataContext';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({ destination, onClose }) => {
  const { openBookingModal } = useTravelData();

  if (!destination) return null;

  const handleBook = () => {
    onClose();
    openBookingModal({
      destination: destination.name,
      packageTitle: `${destination.name} Special Holiday Package`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Banner with image */}
        <div className="relative h-64 bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & tag */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-0.5 rounded-full bg-[#004b93] text-white text-[11px] font-bold">
              {destination.category} · {destination.tag}
            </span>
            <h3 className="text-3xl font-black font-heading mt-1">
              {destination.name}
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              {destination.country} · Best Time: {destination.bestTimeToVisit}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            {destination.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Key Tour Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block">Recommended Duration</span>
              <span className="font-bold text-slate-800 text-sm">{destination.duration}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Starting From</span>
              <span className="text-lg font-black text-[#004b93] tabular-nums">
                ₹{destination.startingPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Back to Catalog
          </button>
          <button
            onClick={handleBook}
            className="px-6 py-2.5 rounded-xl bg-[#ff6600] hover:bg-[#e05a00] text-white text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <span>Plan & Book {destination.name} Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
