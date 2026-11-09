import React, { useState } from 'react';
import {
  Home,
  Users,
  Plane,
  Bed,
  Calendar,
  MapPin,
  Headphones,
  CheckSquare,
  Menu,
  X,
  PhoneCall,
  Search,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const { settings, openBookingModal } = useTravelData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'traveling', label: 'Traveling', icon: Plane },
    { id: 'hotel', label: 'Hotel', icon: Bed },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'tours', label: 'Tours', icon: MapPin },
    { id: 'support', label: 'Customer Support', icon: Headphones },
    { id: 'booking', label: 'Final Booking', icon: CheckSquare },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'booking') {
      openBookingModal();
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo matching the screenshot */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* Globe & Airplane Vector Emblem */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Globe Circle */}
                <circle cx="45" cy="52" r="32" stroke="#004b93" strokeWidth="4.5" fill="#f0f7ff" />
                {/* Latitudes & Longitudes */}
                <path d="M15 52 Q45 66 75 52" stroke="#004b93" strokeWidth="2.5" fill="none" />
                <path d="M20 40 Q45 48 70 40" stroke="#004b93" strokeWidth="2" fill="none" />
                <path d="M20 64 Q45 56 70 64" stroke="#004b93" strokeWidth="2" fill="none" />
                <ellipse cx="45" cy="52" rx="16" ry="32" stroke="#004b93" strokeWidth="2.5" fill="none" />
                {/* Orange Flight Swoosh */}
                <path d="M8 72 C 30 78, 65 72, 88 44" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />
                {/* Jet Plane */}
                <g transform="translate(82, 38) rotate(42) scale(0.65)">
                  <path d="M0 10 L15 25 L45 15 L30 10 L50 0 L15 0 Z" fill="#004b93" />
                  <path d="M12 8 L32 4 L28 14 Z" fill="#ff6600" />
                </g>
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#004b93] font-heading">
                  Relation India
                </span>
                <span className="ml-1 text-xl sm:text-2xl font-black italic tracking-wide text-[#ff6600]">
                  Holiday
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 italic mt-0.5">
                {settings.slogan}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items matching screenshot pills */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#004b93] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#004b93] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Compact Nav for Large Screens (md/lg) */}
          <div className="hidden md:flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                activeSection === 'home' ? 'bg-[#004b93] text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('tours')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                activeSection === 'tours' ? 'bg-[#004b93] text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Popular Tours
            </button>
            <button
              onClick={() => handleNavClick('hotel')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Hotels
            </button>
            <button
              onClick={() => openBookingModal()}
              className="px-3 py-1.5 text-xs font-semibold bg-[#ff6600] text-white rounded-md hover:bg-[#e05a00] transition-colors"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => openBookingModal()}
              className="sm:hidden px-2.5 py-1 text-xs font-semibold bg-[#ff6600] text-white rounded"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-[#004b93] text-white'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Call: {settings.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-2.5 bg-[#ff6600] hover:bg-[#e05a00] text-white rounded-lg text-xs font-bold shadow"
            >
              Plan Your Trip Today
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
