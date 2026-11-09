import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const HeroBanner: React.FC = () => {
  const { settings, openBookingModal, logPublicAction } = useTravelData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Discover the World with',
      subtitle: 'Plan Your Dream Holiday... with Us!',
      description: 'Exclusive domestic & international holiday packages crafted with luxury hotels, smooth transfers, and unforgettable memories.',
      tag: 'Special Holiday Season',
    },
    {
      title: 'Experience Exotic Dubai & Thailand with',
      subtitle: 'Luxury International Tours at Unbeatable Prices!',
      description: 'Burj Khalifa visits, red dune desert safaris, coral island speedboats, and 5-star marina dinner cruises with visa support.',
      tag: 'International Special',
    },
    {
      title: 'Explore Majestic Himalayas & Andaman with',
      subtitle: 'Snow Adventures & Turquoise Island Retreats!',
      description: 'Radhanagar white sand beaches, Solang valley snow paragliding, and romantic Alleppey backwater houseboats.',
      tag: 'Domestic Explorer',
    },
  ];

  const handlePlanClick = () => {
    logPublicAction('booking_inquiry', 'Clicked Plan Your Trip Today', 'User opened the holiday planner modal from the Hero CTA');
    openBookingModal();
  };

  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Background Hero Photography */}
      <div className="relative min-h-[480px] lg:min-h-[540px] w-full flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/public/assets/aistudio/image_b068ab7e.png"
            alt="Relation India Holiday Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_28%] filter brightness-[0.92] contrast-[1.05]"
          />
          {/* Subtle gradient scrim to guarantee text contrast on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-[62%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full">
          <div className="max-w-2xl">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 text-[#004b93] text-xs font-bold border border-blue-200/80 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{heroSlides[currentSlide].tag}</span>
            </div>

            {/* Main Headline matching screenshot typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004b93] tracking-tight leading-[1.15] font-heading">
              {heroSlides[currentSlide].title}{' '}
              <span className="text-[#ff6600] inline-block font-black">
                Holiday
              </span>
            </h1>

            {/* Script Subheading matching "Plan Your Dream Holiday... with Us!" */}
            <p className="mt-2 text-xl sm:text-2xl lg:text-3xl font-serif italic text-slate-800 font-semibold tracking-wide">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* 4 Feature Checkmark Bullets from screenshot */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-md border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#004b93] shrink-0 fill-blue-100" />
                <span>Domestic & International Tours</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-md border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#004b93] shrink-0 fill-blue-100" />
                <span>Best Travel Packages</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-md border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#004b93] shrink-0 fill-blue-100" />
                <span>Comfortable Hotels</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-md border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#004b93] shrink-0 fill-blue-100" />
                <span>Memorable Experiences</span>
              </div>
            </div>

            {/* CTA Button matching orange pill from screenshot */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={handlePlanClick}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white text-base font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Plan Your Trip Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-sm font-semibold border border-slate-300 shadow-sm transition-all"
              >
                <Compass className="w-4 h-4 text-[#004b93]" />
                <span>Explore Packages</span>
              </a>
            </div>

            {/* Slider Dots */}
            <div className="mt-8 flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all rounded-full ${
                    currentSlide === idx
                      ? 'w-7 h-2.5 bg-[#004b93]'
                      : 'w-2.5 h-2.5 bg-slate-400/80 hover:bg-slate-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-slate-600 font-medium ml-2">
                0{currentSlide + 1} / 03
              </span>
            </div>
          </div>
        </div>

        {/* Floating Trust Roundel Badge from screenshot */}
        <div className="hidden lg:flex flex-col items-center absolute right-8 bottom-16 z-10 pointer-events-none">
          <div className="text-right mb-2">
            <span className="font-serif italic text-2xl font-bold text-sky-900 drop-shadow-md">
              Travel More... Live Better...
            </span>
          </div>

          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 p-1 shadow-2xl border-2 border-amber-300 flex flex-col items-center justify-center text-center text-white">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-200">
              Your
            </span>
            <span className="text-sm font-black tracking-tight leading-tight uppercase text-amber-100">
              Trusted
            </span>
            <span className="text-xs font-bold tracking-wider leading-tight text-white">
              Travel Partner
            </span>
            <div className="flex items-center gap-0.5 mt-1 text-amber-300">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next subtle controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
