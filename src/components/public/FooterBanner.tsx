import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  LayoutDashboard,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const FooterBanner: React.FC = () => {
  const { settings, setActiveMode } = useTravelData();

  return (
    <footer className="mt-12">
      {/* Signature Bottom Banner matching screenshot */}
      <div className="bg-[#0b2447] text-white py-6 px-4 sm:px-6 relative overflow-hidden border-t-4 border-[#ff6600]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Cursive flourish "Explore. Book. Travel Happy..." */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="font-serif italic text-2xl sm:text-3xl text-white font-bold tracking-wide drop-shadow-sm">
              Explore. Book. Travel Happy...
            </span>
            <div className="w-48 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mt-1" />
          </div>

          {/* Center: Address */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Relation India Holiday
              </span>
              <span className="text-xs text-slate-300">
                Dhanbad, Jharkhand – 828402
              </span>
            </div>
          </div>

          {/* Right Center: Warm Yellow Contact Pill matching screenshot */}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#febb12] hover:bg-[#eab308] text-slate-900 font-extrabold shadow-lg shadow-amber-500/20 transform hover:scale-102 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-[#febb12] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 fill-[#febb12]" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase font-bold text-slate-800">
                Contact Us
              </span>
              <span className="text-sm font-black tracking-tight text-slate-950 font-mono">
                {settings.phone}
              </span>
            </div>
          </a>

          {/* Right: Follow Us Social Icons matching screenshot */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-200">
              Follow Us :
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-[10px] font-bold">ig</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-[10px] font-bold">▶</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-[10px] font-bold">in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Sub-Footer */}
      <div className="bg-[#05162d] text-slate-400 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          <div>
            <span className="text-white font-bold text-sm block mb-2 font-heading">
              Relation India Holiday
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted travel partner for domestic and international tours, holiday packages, luxury hotels, and group departures.
            </p>
          </div>

          <div>
            <span className="text-white font-bold text-xs uppercase tracking-wider block mb-2">
              Popular Gateways
            </span>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Goa Beach Packages</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Dubai Burj Khalifa & Desert Safari</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Kerala Backwater Houseboat</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Himachal Snow Tours (Manali)</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Andaman Havelock Radhanagar</a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-bold text-xs uppercase tracking-wider block mb-2">
              Quick Assistance
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>24x7 Customer Helpline: {settings.phone}</li>
              <li>Email: {settings.email}</li>
              <li>Branch: Dhanbad, Jharkhand, India</li>
              <li>Approved Domestic & Intl Tour Operator</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-bold text-xs uppercase tracking-wider block mb-2">
              Site Administration
            </span>
            <p className="text-xs text-slate-400 mb-3">
              Manage website content, destination catalog, lead inquiries, and live analytics.
            </p>
            <button
              onClick={() => setActiveMode('admin')}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Open Control Panel</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} Relation India Holiday. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for travelers worldwide
          </span>
        </div>
      </div>
    </footer>
  );
};
