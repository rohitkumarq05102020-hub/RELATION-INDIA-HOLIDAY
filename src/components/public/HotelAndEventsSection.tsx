import React from 'react';
import {
  Bed,
  Calendar,
  MapPin,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const HotelAndEventsSection: React.FC = () => {
  const { openBookingModal } = useTravelData();

  const partnerHotels = [
    {
      name: 'The Leela Goa Beach Resort',
      location: 'Cavelossim Beach, South Goa',
      rating: 5,
      type: 'Luxury 5-Star Beachfront',
      amenities: ['Private Beach Access', 'Lagoon Pool', 'Ayurvedic Spa', '4 Fine Dining Restos'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'JW Marriott Marquis Dubai',
      location: 'Business Bay, Downtown Dubai',
      rating: 5,
      type: 'Ultra-Luxury Skyscraper',
      amenities: ['Burj Khalifa Views', 'Saray Spa & Pool', 'Direct Metro Link', '12 Award-Winning Venues'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Kumarakom Lake Resort',
      location: 'Vembanad Lake, Kerala',
      rating: 5,
      type: 'Heritage Backwater Retreat',
      amenities: ['Meandering Pool Villas', 'Sunset Motorboat Cruising', 'Traditional Kathakali', 'Ayurvedic Center'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Christmas & New Year Dubai Special Departure',
      date: 'Dec 23 - Dec 28, 2026',
      route: 'Kolkata Direct -> Dubai',
      duration: '6 Days / 5 Nights',
      seatsRemaining: 7,
      price: '₹58,999',
      features: ['Gala Dinner Included', 'Burj Khalifa Fireworks Access', 'Marina Yacht Party'],
    },
    {
      title: 'Himalayan Winter Wonderland Group Tour',
      date: 'Jan 12 - Jan 18, 2027',
      route: 'Ranchi / Dhanbad -> Shimla & Manali',
      duration: '7 Days / 6 Nights',
      seatsRemaining: 11,
      price: '₹18,499',
      features: ['Snow activities in Solang', 'Dedicated Tour Manager from Dhanbad', 'DJ Night & Bonfire'],
    },
  ];

  return (
    <section id="hotel" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Comfortable Hotels Showcase */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
              Comfortable Hotels & Luxury Resorts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] font-heading mt-1">
              Handpicked Accommodations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every Relation India Holiday package guarantees sanitized, verified 3-star, 4-star, and 5-star properties.
            </p>
          </div>
          <button
            onClick={() => openBookingModal({ packageTitle: 'Custom Hotel Booking Inquiry' })}
            className="px-4 py-2 text-xs font-bold text-[#004b93] border border-[#004b93] rounded-lg hover:bg-blue-50 transition-colors self-start sm:self-auto"
          >
            Request Custom Hotel Stay
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerHotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}-Star Luxury</span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-bold text-blue-600 uppercase">
                  {hotel.type}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {hotel.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{hotel.location}</span>
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                  {hotel.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-1 truncate">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events & Fixed Departures */}
      <div id="event" className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
              Upcoming Events & Fixed Group Departures
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] font-heading mt-1">
              Group Tours from Dhanbad & Jharkhand
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Join friendly group departures led by our professional tour captains with guaranteed flights and departures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingEvents.map((evt, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-900 to-[#004b93] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              {/* Decorative accent */}
              <div className="absolute right-0 top-0 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-900 text-xs font-extrabold uppercase">
                    Fixed Group Departure
                  </span>
                  <span className="text-xs font-medium text-blue-200">
                    Seats left: <b className="text-white font-bold">{evt.seatsRemaining}</b>
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading">
                  {evt.title}
                </h3>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{evt.route}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {evt.features.map((feat, i) => (
                    <span key={i} className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-slate-200">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-200 block uppercase">All-Inclusive Fare</span>
                  <span className="text-xl font-black text-amber-300">{evt.price}</span>
                  <span className="text-[10px] text-blue-200"> / person</span>
                </div>

                <button
                  onClick={() => openBookingModal({ packageTitle: evt.title })}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
