import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  LayoutDashboard,
  Radio,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const TopBar: React.FC = () => {
  const { settings, activeMode, setActiveMode, activeNow } = useTravelData();

  return (
    <div className="bg-[#062444] text-white text-xs py-2 px-4 border-b border-slate-700/60 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Details */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-200">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{settings.address.split(',')[1]?.trim() || 'Dhanbad, Jharkhand'} – India</span>
          </div>

          <span className="hidden sm:inline text-slate-500">|</span>

          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{settings.email}</span>
          </a>

          <span className="hidden sm:inline text-slate-500">|</span>

          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 font-medium hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{settings.phone}</span>
          </a>
        </div>

        {/* Right: Slogan, Socials & Control Panel Switcher */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Social Icons matching screenshot */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="text-[10px] font-bold">f</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="text-[9px] font-bold">ig</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="text-[9px] font-bold">▶</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="text-[9px] font-bold">in</span>
            </a>
          </div>

          <span className="hidden md:inline italic font-serif text-slate-300 text-[11px] tracking-wide">
            Travel • Explore • Enjoy
          </span>

          <span className="hidden md:inline text-slate-500">|</span>

          {/* Real-Time Live Control Panel Quick Switch */}
          <button
            onClick={() => setActiveMode(activeMode === 'admin' ? 'public' : 'admin')}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm ${
              activeMode === 'admin'
                ? 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
            title="Switch between Public Travel Portal and Real-Time Admin Control Panel"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{activeMode === 'admin' ? 'Back to Public Site' : 'Control Panel'}</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-black/25 text-[10px] font-mono">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>{activeNow} live</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
