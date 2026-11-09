import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Destination,
  TourPackage,
  UserInquiry,
  SiteSettings,
  LiveVisitor,
  LiveEvent,
  SearchFilterState,
} from '../types/travel';
import {
  INITIAL_SETTINGS,
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_INQUIRIES,
} from '../data/initialData';

interface TravelDataContextType {
  // Public & Admin mode
  activeMode: 'public' | 'admin';
  setActiveMode: (mode: 'public' | 'admin') => void;
  adminTab: 'analytics' | 'inquiries' | 'destinations' | 'packages' | 'settings';
  setAdminTab: (tab: 'analytics' | 'inquiries' | 'destinations' | 'packages' | 'settings') => void;

  // Data
  destinations: Destination[];
  packages: TourPackage[];
  inquiries: UserInquiry[];
  settings: SiteSettings;

  // Search & Navigation Filters
  searchFilter: SearchFilterState;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  selectedPackage: TourPackage | null;
  setSelectedPackage: (pkg: TourPackage | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingPreselect: { destination?: string; packageId?: string; packageTitle?: string } | null;
  openBookingModal: (preselect?: { destination?: string; packageId?: string; packageTitle?: string }) => void;

  // Real-time Analytics
  activeNow: number;
  todayVisitors: number;
  liveVisitors: LiveVisitor[];
  liveEvents: LiveEvent[];
  trafficSpeed: 'normal' | 'rush' | 'paused';
  setTrafficSpeed: (speed: 'normal' | 'rush' | 'paused') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;

  // Actions
  submitInquiry: (inquiryData: Omit<UserInquiry, 'id' | 'createdAt' | 'status' | 'notes'>) => UserInquiry;
  updateInquiryStatus: (id: string, status: UserInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  addInquiryNote: (id: string, note: string) => void;

  addDestination: (destination: Omit<Destination, 'id' | 'viewsCount' | 'inquiriesCount'>) => void;
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  addPackage: (pkg: Omit<TourPackage, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<TourPackage>) => void;
  deletePackage: (id: string) => void;

  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;

  // Simulation Triggers
  triggerSimulatedLead: () => void;
  triggerSimulatedSurge: () => void;
  logPublicAction: (type: LiveEvent['type'], title: string, details: string, location?: string) => void;
}

const TravelDataContext = createContext<TravelDataContextType | undefined>(undefined);

// Web Audio sound generator for notifications
function playChime(type: 'success' | 'alert' | 'pop' = 'success') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'success') {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      osc2.frequency.setValueAtTime(880, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.3); // D6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } else {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {
    // AudioContext might be blocked until user gesture, ignore silently
  }
}

const CITIES = [
  { city: 'Dhanbad', state: 'Jharkhand', country: 'India', flag: '🇮🇳' },
  { city: 'Ranchi', state: 'Jharkhand', country: 'India', flag: '🇮🇳' },
  { city: 'Kolkata', state: 'West Bengal', country: 'India', flag: '🇮🇳' },
  { city: 'Patna', state: 'Bihar', country: 'India', flag: '🇮🇳' },
  { city: 'Bokaro', state: 'Jharkhand', country: 'India', flag: '🇮🇳' },
  { city: 'Jamshedpur', state: 'Jharkhand', country: 'India', flag: '🇮🇳' },
  { city: 'New Delhi', state: 'Delhi NCR', country: 'India', flag: '🇮🇳' },
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', flag: '🇮🇳' },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India', flag: '🇮🇳' },
  { city: 'Pune', state: 'Maharashtra', country: 'India', flag: '🇮🇳' },
  { city: 'Hyderabad', state: 'Telangana', country: 'India', flag: '🇮🇳' },
  { city: 'Dubai', state: 'Dubai Emirate', country: 'UAE', flag: '🇦🇪' },
];

const PAGES = ['/home', '/destinations', '/package-details', '/hotels', '/tours', '/booking-checkout'];
const DEVICES: ('Desktop' | 'Mobile' | 'Tablet')[] = ['Desktop', 'Mobile', 'Tablet'];
const BROWSERS = ['Chrome 122', 'Safari 17.4', 'Firefox 124', 'Edge 122', 'Mobile Chrome'];

export const TravelDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mode: public site or admin control panel
  const [activeMode, setActiveMode] = useState<'public' | 'admin'>('public');
  const [adminTab, setAdminTab] = useState<'analytics' | 'inquiries' | 'destinations' | 'packages' | 'settings'>('analytics');

  // Core Data with localStorage caching
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem('rih_destinations');
      return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
    } catch {
      return INITIAL_DESTINATIONS;
    }
  });

  const [packages, setPackages] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem('rih_packages');
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  const [inquiries, setInquiries] = useState<UserInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('rih_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('rih_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // UI state for public view
  const [searchFilter, setSearchFilter] = useState<SearchFilterState>({
    fromCity: '',
    destination: '',
    travelDate: '',
    guests: 1,
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPreselect, setBookingPreselect] = useState<{ destination?: string; packageId?: string; packageTitle?: string } | null>(null);

  // Real-time Analytics States
  const [activeNow, setActiveNow] = useState(24);
  const [todayVisitors, setTodayVisitors] = useState(1482);
  const [trafficSpeed, setTrafficSpeed] = useState<'normal' | 'rush' | 'paused'>('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live Visitor pool
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitor[]>(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const loc = CITIES[i % CITIES.length];
      return {
        id: `vis-${Date.now()}-${i}`,
        ip: `103.${45 + i}.${12 + (i * 7)}.${100 + i}`,
        city: loc.city,
        state: loc.state,
        country: loc.country,
        flag: loc.flag,
        currentPage: PAGES[i % PAGES.length],
        device: DEVICES[i % DEVICES.length],
        browser: BROWSERS[i % BROWSERS.length],
        activeSeconds: 30 + i * 25,
        lastAction: 'Browsing popular holiday packages',
        timestamp: Date.now() - i * 15000,
      };
    });
  });

  // Real-time Event Feed
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([
    {
      id: 'evt-init-1',
      type: 'booking_inquiry',
      title: 'New Booking Inquiry',
      details: 'Dr. Sunita Murmu inquired for Himachal 6D5N Snow Paradise',
      location: 'Ranchi, India 🇮🇳',
      timestamp: Date.now() - 1000 * 60 * 8,
      value: 14499,
    },
    {
      id: 'evt-init-2',
      type: 'destination_click',
      title: 'Destination Card Viewed',
      details: 'Visitor clicked to inspect Dubai Burj Khalifa & Desert Safari',
      location: 'Kolkata, India 🇮🇳',
      timestamp: Date.now() - 1000 * 60 * 14,
    },
    {
      id: 'evt-init-3',
      type: 'search',
      title: 'Tour Search Executed',
      details: 'Searched: Dhanbad -> Andaman for Dec 2026 (3 Guests)',
      location: 'Dhanbad, India 🇮🇳',
      timestamp: Date.now() - 1000 * 60 * 22,
    },
    {
      id: 'evt-init-4',
      type: 'pageview',
      title: 'Portal Landed',
      details: 'User entered via Google Search "Relation India Holiday Dhanbad"',
      location: 'Patna, India 🇮🇳',
      timestamp: Date.now() - 1000 * 60 * 35,
    },
  ]);

  // Sync back to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rih_destinations', JSON.stringify(destinations));
    } catch {}
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem('rih_packages', JSON.stringify(packages));
    } catch {}
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('rih_inquiries', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('rih_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Open booking modal helper
  const openBookingModal = useCallback((preselect?: { destination?: string; packageId?: string; packageTitle?: string }) => {
    if (preselect) {
      setBookingPreselect(preselect);
    }
    setIsBookingModalOpen(true);
  }, []);

  // Public logging of user clicks
  const logPublicAction = useCallback((type: LiveEvent['type'], title: string, details: string, location: string = 'Current Visitor (Local)') => {
    const newEvt: LiveEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      title,
      details,
      location,
      timestamp: Date.now(),
    };
    setLiveEvents(prev => [newEvt, ...prev.slice(0, 39)]);
  }, []);

  // Submit Inquiry (Public action)
  const submitInquiry = useCallback((inquiryData: Omit<UserInquiry, 'id' | 'createdAt' | 'status' | 'notes'>): UserInquiry => {
    const newInquiry: UserInquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-5)}`,
      status: 'New',
      priority: 'High',
      createdAt: new Date().toISOString(),
      notes: [`Inquiry received online from ${inquiryData.departureCity || 'Web Portal'}. Initial lead created.`],
    };

    setInquiries(prev => [newInquiry, ...prev]);

    // Update destination inquiry stats
    if (inquiryData.destination) {
      setDestinations(prev =>
        prev.map(d =>
          d.name.toLowerCase() === inquiryData.destination.toLowerCase()
            ? { ...d, inquiriesCount: d.inquiriesCount + 1 }
            : d
        )
      );
    }

    // Add Live Event
    const event: LiveEvent = {
      id: `evt-inq-${Date.now()}`,
      type: 'booking_inquiry',
      title: 'Fresh Inquiry Submitted!',
      details: `${newInquiry.customerName} submitted a trip request for ${newInquiry.destination} (${newInquiry.guestCount} Travelers)`,
      location: `${inquiryData.departureCity || 'Online'}, India 🇮🇳`,
      timestamp: Date.now(),
      value: 25000,
    };
    setLiveEvents(prev => [event, ...prev.slice(0, 39)]);

    // Trigger celebration effects
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#004b93', '#ff6600', '#ffc107', '#10b981'],
      });
    } catch {}

    if (soundEnabled) {
      playChime('success');
    }

    return newInquiry;
  }, [soundEnabled]);

  // Real-time Traffic Simulator loop
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (trafficSpeed === 'paused') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const intervalTime = trafficSpeed === 'rush' ? 2200 : 5500;

    intervalRef.current = window.setInterval(() => {
      // 1. Randomly fluctuate active visitors
      setActiveNow(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const updated = Math.max(12, Math.min(68, prev + delta));
        return updated;
      });

      // 2. Increment total pageviews / today's visits
      setTodayVisitors(prev => prev + 1);

      // 3. Update visitors list (progress seconds or rotate visitors)
      setLiveVisitors(prev => {
        const updated = prev.map(v => ({
          ...v,
          activeSeconds: v.activeSeconds + Math.floor(intervalTime / 1000),
        }));

        // occasionally add a new visitor
        if (Math.random() > 0.4) {
          const loc = CITIES[Math.floor(Math.random() * CITIES.length)];
          const newVis: LiveVisitor = {
            id: `vis-${Date.now()}`,
            ip: `103.${Math.floor(Math.random() * 180)}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}`,
            city: loc.city,
            state: loc.state,
            country: loc.country,
            flag: loc.flag,
            currentPage: PAGES[Math.floor(Math.random() * PAGES.length)],
            device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
            browser: BROWSERS[Math.floor(Math.random() * BROWSERS.length)],
            activeSeconds: 5,
            lastAction: `Checking ${['Goa beaches', 'Kerala houseboats', 'Dubai desert safari', 'Himachal snow tours', 'Andaman corals'][Math.floor(Math.random() * 5)]}`,
            timestamp: Date.now(),
          };
          return [newVis, ...updated.slice(0, 9)];
        }
        return updated;
      });

      // 4. Occasionally generate a real-time visitor event
      const eventChance = Math.random();
      if (eventChance > 0.45) {
        const loc = CITIES[Math.floor(Math.random() * CITIES.length)];
        const destSample = destinations[Math.floor(Math.random() * destinations.length)] || INITIAL_DESTINATIONS[0];

        let evtType: LiveEvent['type'] = 'destination_click';
        let evtTitle = `Viewed ${destSample.name} Package`;
        let evtDetails = `Visitor from ${loc.city} opened detailed itinerary for ${destSample.name}`;

        if (eventChance > 0.8) {
          evtType = 'search';
          evtTitle = `Searched ${destSample.name} Holidays`;
          evtDetails = `Search filter: ${loc.city} -> ${destSample.name} for upcoming dates`;
        } else if (eventChance > 0.65) {
          evtType = 'contact_click';
          evtTitle = 'Clicked Call Support (+91 9934114613)';
          evtDetails = `Visitor in ${loc.city} tapped direct phone hotline`;
        }

        const newEvt: LiveEvent = {
          id: `evt-${Date.now()}`,
          type: evtType,
          title: evtTitle,
          details: evtDetails,
          location: `${loc.city}, ${loc.country} ${loc.flag}`,
          timestamp: Date.now(),
        };

        setLiveEvents(prevEvents => [newEvt, ...prevEvents.slice(0, 39)]);
      }
    }, intervalTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trafficSpeed, destinations]);

  // Trigger simulated Lead for Admin demo
  const triggerSimulatedLead = useCallback(() => {
    const sampleNames = ['Abhishek Pandey', 'Ritu & Saurav Sen', 'Mohan Lal Agarwal', 'Kavita Chawla', 'Tarun Banerjee'];
    const sampleLocs = ['Dhanbad', 'Kolkata', 'Ranchi', 'Patna', 'Asansol'];
    const chosenName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const chosenLoc = sampleLocs[Math.floor(Math.random() * sampleLocs.length)];
    const chosenDest = destinations[Math.floor(Math.random() * destinations.length)] || INITIAL_DESTINATIONS[0];
    const guestNum = Math.floor(Math.random() * 4) + 2;

    submitInquiry({
      customerName: chosenName,
      customerEmail: `${chosenName.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`,
      customerPhone: `+91 ${9800000000 + Math.floor(Math.random() * 199999999)}`,
      destination: chosenDest.name,
      packageTitle: `${chosenDest.name} Premium Holiday`,
      travelDate: new Date(Date.now() + 86400000 * (15 + Math.floor(Math.random() * 45))).toISOString().split('T')[0],
      guestCount: guestNum,
      budget: `₹${(chosenDest.startingPrice * guestNum * 1.2).toFixed(0)}`,
      departureCity: chosenLoc,
      message: `Simulated Live Inquiry: Looking for premium hotel stay and sightseeing arrangements for ${chosenDest.name}.`,
      priority: 'High',
    });
  }, [destinations, submitInquiry]);

  // Trigger simulated traffic surge
  const triggerSimulatedSurge = useCallback(() => {
    setActiveNow(prev => prev + 18);
    setTodayVisitors(prev => prev + 45);
    setLiveEvents(prev => [
      {
        id: `evt-surge-${Date.now()}`,
        type: 'pageview',
        title: '⚡ Traffic Surge Detected',
        details: 'Social media promo referral spike: 18 new visitors arrived simultaneously',
        location: 'Jharkhand & West Bengal 🇮🇳',
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    if (soundEnabled) playChime('pop');
  }, [soundEnabled]);

  // CRUD Actions
  const updateInquiryStatus = useCallback((id: string, status: UserInquiry['status']) => {
    setInquiries(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status,
              notes: [`Status updated to "${status}" on ${new Date().toLocaleTimeString()}`, ...item.notes],
            }
          : item
      )
    );
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  }, []);

  const addInquiryNote = useCallback((id: string, note: string) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, notes: [note, ...item.notes] } : item))
    );
  }, []);

  const addDestination = useCallback((dest: Omit<Destination, 'id' | 'viewsCount' | 'inquiriesCount'>) => {
    const newDest: Destination = {
      ...dest,
      id: `dest-${Date.now()}`,
      viewsCount: 1,
      inquiriesCount: 0,
    };
    setDestinations(prev => [newDest, ...prev]);
  }, []);

  const updateDestination = useCallback((id: string, updatedFields: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => (d.id === id ? { ...d, ...updatedFields } : d)));
  }, []);

  const deleteDestination = useCallback((id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  }, []);

  const addPackage = useCallback((pkg: Omit<TourPackage, 'id'>) => {
    const newPkg: TourPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    setPackages(prev => [newPkg, ...prev]);
  }, []);

  const updatePackage = useCallback((id: string, updatedFields: Partial<TourPackage>) => {
    setPackages(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  }, []);

  const deletePackage = useCallback((id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateSiteSettings = useCallback((updated: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setDestinations(INITIAL_DESTINATIONS);
    setPackages(INITIAL_PACKAGES);
    setInquiries(INITIAL_INQUIRIES);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('rih_destinations');
    localStorage.removeItem('rih_packages');
    localStorage.removeItem('rih_inquiries');
    localStorage.removeItem('rih_settings');
  }, []);

  return (
    <TravelDataContext.Provider
      value={{
        activeMode,
        setActiveMode,
        adminTab,
        setAdminTab,
        destinations,
        packages,
        inquiries,
        settings,
        searchFilter,
        setSearchFilter,
        selectedDestination,
        setSelectedDestination,
        selectedPackage,
        setSelectedPackage,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingPreselect,
        openBookingModal,
        activeNow,
        todayVisitors,
        liveVisitors,
        liveEvents,
        trafficSpeed,
        setTrafficSpeed,
        soundEnabled,
        setSoundEnabled,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addInquiryNote,
        addDestination,
        updateDestination,
        deleteDestination,
        addPackage,
        updatePackage,
        deletePackage,
        updateSiteSettings,
        resetToDefaults,
        triggerSimulatedLead,
        triggerSimulatedSurge,
        logPublicAction,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
};

export const useTravelData = () => {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error('useTravelData must be used within a TravelDataProvider');
  }
  return context;
};
