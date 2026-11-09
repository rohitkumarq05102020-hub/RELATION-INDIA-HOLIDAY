import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Send,
  Sparkles,
  Plane,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { UserInquiry } from '../../types/travel';

export const BookingInquiryModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingPreselect,
    destinations,
    submitInquiry,
    settings,
  } = useTravelData();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [budget, setBudget] = useState('₹40,000 - ₹70,000');
  const [message, setMessage] = useState('');
  const [packageTitle, setPackageTitle] = useState('');

  const [submittedLead, setSubmittedLead] = useState<UserInquiry | null>(null);

  // Sync preselected values when modal opens
  useEffect(() => {
    if (bookingPreselect) {
      if (bookingPreselect.destination) setDestination(bookingPreselect.destination);
      if (bookingPreselect.packageTitle) setPackageTitle(bookingPreselect.packageTitle);
    } else if (destinations.length > 0 && !destination) {
      setDestination(destinations[0].name);
    }
  }, [bookingPreselect, destinations]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const lead = submitInquiry({
      customerName,
      customerEmail: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      customerPhone,
      destination: destination || 'Goa',
      packageTitle: packageTitle || `${destination} Customized Holiday`,
      travelDate: travelDate || new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
      guestCount,
      budget,
      departureCity: departureCity || 'Dhanbad',
      message: message || 'Please contact me with customized itinerary and flight/hotel fare details.',
      priority: 'High',
    });

    setSubmittedLead(lead);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setSubmittedLead(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#004b93] to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Plan Your Dream Holiday
              </h3>
              <p className="text-xs text-blue-100">
                Relation India Holiday · Fast Quote & Free Itinerary
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto">
          {submittedLead ? (
            <div className="text-center py-6 px-2 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                Inquiry Received Successfully!
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you <b>{submittedLead.customerName}</b>. Your booking reference number is{' '}
                <span className="font-mono font-bold text-[#004b93] bg-blue-50 px-1.5 py-0.5 rounded">
                  #{submittedLead.id.toUpperCase()}
                </span>. Our tour specialist will call you shortly on <b>{submittedLead.customerPhone}</b>.
              </p>

              {/* Status card */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-800">{submittedLead.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-bold text-slate-800">{submittedLead.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-bold text-slate-800">{submittedLead.guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Departure City:</span>
                  <span className="font-bold text-slate-800">{submittedLead.departureCity}</span>
                </div>
              </div>

              {/* Quick WhatsApp connect */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Relation%20India%20Holiday,%20I%20just%20submitted%20an%20inquiry%20%23${submittedLead.id}%20for%20${submittedLead.destination}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                >
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {packageTitle && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-amber-800 font-bold uppercase">Selected Package</span>
                    <p className="font-bold text-slate-900">{packageTitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPackageTitle('')}
                    className="text-amber-800 hover:text-amber-950 text-[11px] underline"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 99341 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  />
                </div>

                {/* Departure City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Departure City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dhanbad / Ranchi / Kolkata"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Travelers
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 Persons (Couple)</option>
                    <option value={3}>3 Persons</option>
                    <option value={4}>4 Persons (Family)</option>
                    <option value={6}>6+ Group</option>
                  </select>
                </div>
              </div>

              {/* Message / Special Needs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom Requirements or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Need vegetarian food, 4-star hotel preference, flight tickets from Kolkata, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-[#004b93]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#ff6600] hover:bg-[#e05a00] text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Holiday Inquiry · Get Best Quote</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 No advance payment needed now. Instant entry into our CRM system.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
