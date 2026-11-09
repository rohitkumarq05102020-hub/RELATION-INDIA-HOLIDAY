import React, { useState } from 'react';
import {
  Award,
  Users,
  Compass,
  Star,
  Quote,
  CheckCircle,
  ThumbsUp,
  Send,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

interface Testimonial {
  id: string;
  author: string;
  city: string;
  destination: string;
  rating: number;
  date: string;
  comment: string;
}

export const AboutAndReviewsSection: React.FC = () => {
  const { settings, logPublicAction } = useTravelData();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 't-1',
      author: 'Vikash Kumar Verma',
      city: 'Dhanbad',
      destination: 'Dubai 5D4N Spectacular',
      rating: 5,
      date: 'October 2026',
      comment:
        'Booking our family Dubai vacation with Relation India Holiday was the best decision! Everything from Kolkata flights, 4-star hotel in Deira, Burj Khalifa tickets to desert safari was coordinated flawlessly. Mr. Amit from the Dhanbad office was always a phone call away.',
    },
    {
      id: 't-2',
      author: 'Sunil & Swati Ghosh',
      city: 'Ranchi',
      destination: 'Kerala Munnar & Alleppey Houseboat',
      rating: 5,
      date: 'September 2026',
      comment:
        'The private Alleppey houseboat experience was surreal! Freshly prepared Kerala meals, candle light dinner, and our driver was so polite. Relation India Holiday delivered 100% on every promise made.',
    },
    {
      id: 't-3',
      author: 'Ananya Chakraborty',
      city: 'Kolkata',
      destination: 'Andaman Island Escape',
      rating: 5,
      date: 'August 2026',
      comment:
        'Radhanagar beach in Havelock took our breath away. Makruzz catamaran tickets were pre-booked smoothly. 10/10 recommend Relation India Holiday to anyone wanting hassle-free travel!',
    },
  ]);

  // Review Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newDest, setNewDest] = useState('Goa');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Testimonial = {
      id: `t-${Date.now()}`,
      author: newAuthor,
      city: newCity || 'Traveler',
      destination: newDest,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
    };

    setTestimonials([newRev, ...testimonials]);
    logPublicAction('booking_inquiry', `New Traveler Review: ${newAuthor}`, `Rating: ${newRating}/5 for ${newDest}`);
    setSubmitted(true);
    setTimeout(() => {
      setNewAuthor('');
      setNewCity('');
      setNewComment('');
      setSubmitted(false);
    }, 2500);
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* About Relation India Holiday */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-7">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
            About Relation India Holiday
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004b93] font-heading mt-1 leading-tight">
            Your Trusted Travel Partner... Always!
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            Headquartered in Dhanbad, Jharkhand, <b>Relation India Holiday</b> has been a premier name in crafting extraordinary domestic and international holiday experiences for over a decade. Whether it’s an exotic beach holiday in Goa or Andaman, a romantic backwater cruise in Kerala, snowy adventures in Himachal, or luxury shopping in Dubai & Thailand, we take care of every detail so you can simply relax and make lifelong memories.
          </p>

          {/* 4 Quantitative Proof Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#004b93] font-heading tabular-nums">
                12+
              </span>
              <span className="text-xs text-slate-600 block font-medium mt-0.5">Years of Trust</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#ff6600] font-heading tabular-nums">
                45,000+
              </span>
              <span className="text-xs text-slate-600 block font-medium mt-0.5">Happy Travelers</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#004b93] font-heading tabular-nums">
                250+
              </span>
              <span className="text-xs text-slate-600 block font-medium mt-0.5">Custom Itineraries</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading tabular-nums">
                99.4%
              </span>
              <span className="text-xs text-slate-600 block font-medium mt-0.5">Satisfaction Rate</span>
            </div>
          </div>
        </div>

        {/* Dhanbad Office Trust Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#004b93] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
              Authorized Travel Agency
            </span>
            <h3 className="text-xl font-bold font-heading mt-3">
              Visit Us in Dhanbad, Jharkhand
            </h3>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              We welcome customers to visit our office for in-person consultation, customized family itineraries, group bookings, and passport/visa guidance.
            </p>

            <div className="mt-5 space-y-2 text-xs text-slate-200">
              <p>📍 <b>Address:</b> {settings.address}</p>
              <p>📞 <b>Helpline:</b> {settings.phone}</p>
              <p>✉️ <b>Email:</b> {settings.email}</p>
              <p>⏰ <b>Office Hours:</b> Mon - Sat: 9:30 AM to 8:00 PM</p>
            </div>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition-all"
            >
              <span>Call Us Directly: {settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Traveler Testimonials & Reviews */}
      <div className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">
              Real Travelers, Real Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004b93] font-heading mt-1">
              Customer Reviews & Feedback
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{test.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{test.author}</h4>
                  <span className="text-[11px] text-slate-500">{test.city} · {test.destination}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Card */}
        <div className="mt-8 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6">
          <h3 className="text-base font-bold text-[#004b93]">
            Traveled with Relation India Holiday? Leave your review!
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Share your feedback with fellow travelers. It updates immediately on our website and control panel.
          </p>

          {submitted ? (
            <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
                className="px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:outline-[#004b93]"
              />
              <input
                type="text"
                placeholder="Your City (e.g. Dhanbad)"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:outline-[#004b93]"
              />
              <select
                value={newDest}
                onChange={(e) => setNewDest(e.target.value)}
                className="px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:outline-[#004b93]"
              >
                <option value="Goa">Goa Holiday</option>
                <option value="Dubai">Dubai Tour</option>
                <option value="Kerala">Kerala Backwaters</option>
                <option value="Himachal">Himachal Snow</option>
                <option value="Thailand">Thailand Tour</option>
                <option value="Andaman">Andaman Islands</option>
              </select>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                className="px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:outline-[#004b93]"
              >
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Good)</option>
              </select>
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Share a short summary of your holiday experience *"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:outline-[#004b93]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#004b93] hover:bg-[#003d78] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Review</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
