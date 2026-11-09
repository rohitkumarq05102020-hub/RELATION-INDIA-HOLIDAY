import React from 'react';
import {
  Globe2,
  ShieldCheck,
  Headphones,
  BadgePercent,
  Sparkles,
} from 'lucide-react';

export const FeaturesBar: React.FC = () => {
  const features = [
    {
      icon: Globe2,
      title: 'Worldwide Destinations',
      desc: 'Top domestic & international gateways',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure Travel',
      desc: 'Verified hotels & sanitized vehicles',
    },
    {
      icon: Headphones,
      title: '24x7 Customer Support',
      desc: 'Dedicated tour manager on call',
    },
    {
      icon: BadgePercent,
      title: 'Best Price Guarantee',
      desc: 'Direct supplier contracts & no hidden fees',
    },
    {
      icon: Sparkles,
      title: 'Unforgettable Experiences',
      desc: 'Handcrafted itineraries & authentic local visits',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-2">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-2 py-1 ${
                  index !== features.length - 1
                    ? 'lg:border-r border-slate-200/90'
                    : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-50/80 text-[#004b93] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#004b93]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
