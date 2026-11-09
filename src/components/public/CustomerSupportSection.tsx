import React, { useState } from 'react';
import {
  Headphones,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const CustomerSupportSection: React.FC = () => {
  const { settings, submitInquiry, logPublicAction } = useTravelData();

  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackQuery, setCallbackQuery] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I book a tour package with Relation India Holiday?',
      a: 'You can select any package online and click "Book Now", or call us directly at +91 99341 14613. Our tour specialists will customize your itinerary, confirm hotel rooms, and issue your official booking voucher.',
    },
    {
      q: 'Are flights and visa included in international tours like Dubai & Thailand?',
      a: 'Yes, our international holiday packages include comprehensive assistance: flights from Kolkata/Delhi, UAE/Thailand tourist visas, overseas travel insurance, and guided airport transfers.',
    },
    {
      q: 'Can I visit your office in Dhanbad for in-person holiday planning?',
      a: 'Absolutely! Our head office is situated at Relation India Holiday, Dhanbad, Jharkhand – 828402. Our office is open Monday to Saturday from 9:30 AM to 8:00 PM.',
    },
    {
      q: 'What are your payment modes and cancellation policies?',
      a: 'We accept UPI, NEFT/IMPS bank transfer, Credit/Debit cards, and Demand Drafts. You can block seats with an advance token of 25%–30%, with flexible cancellation and rescheduling options.',
    },
  ];

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;

    submitInquiry({
      customerName: callbackName,
      customerEmail: `${callbackName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      customerPhone: callbackPhone,
      destination: 'Callback Request',
      packageTitle: '24x7 Customer Support Callback',
      travelDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      guestCount: 2,
      departureCity: 'Dhanbad / Online',
      message: callbackQuery || 'Requested prompt phone callback from customer support.',
      priority: 'High',
    });

    logPublicAction('contact_click', 'Callback Requested', `${callbackName} requested support phone callback on ${callbackPhone}`);
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackName('');
      setCallbackPhone('');
      setCallbackQuery('');
      setCallbackSent(false);
    }, 3000);
  };

  return (
    <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
          24x7 Dedicated Assistance
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] font-heading mt-1">
          Customer Support & Help Desk
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
          Have questions regarding package customization, group discounts, or flight schedules? Our team in Dhanbad is ready to help 24x7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info & Callback Request */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Direct Contact Channels
            </h3>

            <div className="space-y-3 text-xs">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 text-[#004b93] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#004b93] text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-sm">{settings.phone}</span>
                  <span className="text-[11px] text-slate-500">24x7 Dedicated Helpline</span>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-sm">{settings.email}</span>
                  <span className="text-[11px] text-slate-500">Official Queries & Quotes</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-800">
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-xs">Headquarters</span>
                  <span className="text-[11px] text-slate-500">{settings.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Callback Card */}
          <div className="bg-gradient-to-br from-[#004b93] to-slate-900 text-white rounded-2xl p-6 shadow-md">
            <h3 className="text-base font-bold font-heading">
              Request an Instant Callback
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              Leave your number and our tour advisor will call you within 15 minutes.
            </p>

            {callbackSent ? (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Callback request received! Calling you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="mt-4 space-y-2.5 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 focus:outline-hidden"
                />
                <input
                  type="tel"
                  required
                  placeholder="Your Phone Number *"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder="Trip Destination (e.g. Dubai, Goa, Kerala)"
                  value={callbackQuery}
                  onChange={(e) => setCallbackQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#ff6600] hover:bg-[#e05a00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Call Me Back</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Frequently Asked Questions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[#004b93]" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
