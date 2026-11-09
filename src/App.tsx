import React, { useState } from 'react';
import { TravelDataProvider, useTravelData } from './context/TravelDataContext';
import { TopBar } from './components/public/TopBar';
import { Navbar } from './components/public/Navbar';
import { HeroBanner } from './components/public/HeroBanner';
import { SearchTourBar } from './components/public/SearchTourBar';
import { FeaturesBar } from './components/public/FeaturesBar';
import { PopularDestinations } from './components/public/PopularDestinations';
import { PackagesSection } from './components/public/PackagesSection';
import { HotelAndEventsSection } from './components/public/HotelAndEventsSection';
import { AboutAndReviewsSection } from './components/public/AboutAndReviewsSection';
import { CustomerSupportSection } from './components/public/CustomerSupportSection';
import { FooterBanner } from './components/public/FooterBanner';
import { BookingInquiryModal } from './components/public/BookingInquiryModal';
import { DestinationDetailModal } from './components/public/DestinationDetailModal';
import { PackageDetailModal } from './components/public/PackageDetailModal';

// Admin Components
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminAnalyticsView } from './components/admin/AdminAnalyticsView';
import { AdminInquiriesView } from './components/admin/AdminInquiriesView';
import { AdminDestinationsView } from './components/admin/AdminDestinationsView';
import { AdminPackagesView } from './components/admin/AdminPackagesView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

import { Destination, TourPackage } from './types/travel';
import {
  LayoutDashboard,
  CalendarCheck,
  Megaphone,
  Radio,
  ArrowUp,
  X,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeMode,
    setActiveMode,
    adminTab,
    settings,
    openBookingModal,
    activeNow,
    liveEvents,
  } = useTravelData();

  const [activeSection, setActiveSection] = useState('home');
  const [modalDestination, setModalDestination] = useState<Destination | null>(null);
  const [modalPackage, setModalPackage] = useState<TourPackage | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Scroll to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-amber-300 selection:text-slate-900">
      {/* Top Promotional Announcement Ticker */}
      {settings.showAnnouncement && showAnnouncement && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 text-xs py-1.5 px-4 font-bold shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              <Megaphone className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span className="truncate">{settings.announcementText}</span>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-slate-950/70 hover:text-slate-950 p-0.5 rounded shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Render Public Portal vs Admin Control Panel */}
      {activeMode === 'public' ? (
        <div className="flex-1 flex flex-col">
          {/* Top Contact Bar from screenshot */}
          <TopBar />

          {/* Main Logo & Navigation from screenshot */}
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Hero Banner with screenshot graphics, checkmark pills, and CTA */}
          <HeroBanner />

          {/* Floating Search Tour Widget from screenshot */}
          <SearchTourBar
            onSearchSubmit={() => {
              setActiveSection('destinations');
            }}
          />

          {/* 5 Features Bar from screenshot */}
          <FeaturesBar />

          {/* Popular Destinations section matching the 6 iconic cards in screenshot */}
          <PopularDestinations
            onSelectDestination={(dest) => setModalDestination(dest)}
          />

          {/* Featured Tour Packages with Day-by-Day Itineraries */}
          <PackagesSection
            onSelectPackage={(pkg) => setModalPackage(pkg)}
          />

          {/* Comfortable Hotels & Group Departures */}
          <HotelAndEventsSection />

          {/* About Us, Credentials & Customer Reviews */}
          <AboutAndReviewsSection />

          {/* 24x7 Customer Support & Office Info */}
          <CustomerSupportSection />

          {/* Signature Footer Banner from screenshot */}
          <FooterBanner />

          {/* Floating Quick Action Controls */}
          <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
            {/* Control Panel Quick Switcher Pill */}
            <button
              onClick={() => setActiveMode('admin')}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white shadow-xl backdrop-blur-md border border-slate-700 hover:border-amber-400 transition-all text-xs font-bold"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Control Panel</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-600 text-[10px] font-mono">
                {activeNow} live
              </span>
            </button>

            {/* Quick Book Button */}
            <button
              onClick={() => openBookingModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff6600] hover:bg-[#e05a00] text-white shadow-xl hover:shadow-orange-500/30 transition-all text-xs font-extrabold cursor-pointer transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Plan Holiday</span>
            </button>
          </div>
        </div>
      ) : (
        /* Real-Time Control Panel & CMS Mode */
        <div className="flex-1 flex flex-col bg-slate-100 min-h-screen">
          <AdminHeader />

          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
            {adminTab === 'analytics' && <AdminAnalyticsView />}
            {adminTab === 'inquiries' && <AdminInquiriesView />}
            {adminTab === 'destinations' && <AdminDestinationsView />}
            {adminTab === 'packages' && <AdminPackagesView />}
            {adminTab === 'settings' && <AdminSettingsView />}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <BookingInquiryModal />
      <DestinationDetailModal
        destination={modalDestination}
        onClose={() => setModalDestination(null)}
      />
      <PackageDetailModal
        pkg={modalPackage}
        onClose={() => setModalPackage(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <TravelDataProvider>
      <MainAppContent />
    </TravelDataProvider>
  );
}
