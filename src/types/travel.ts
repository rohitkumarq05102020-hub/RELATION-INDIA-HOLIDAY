export interface Destination {
  id: string;
  name: string;
  country: string;
  category: 'Domestic' | 'International';
  tag: string;
  image: string;
  startingPrice: number;
  currency: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  viewsCount: number;
  inquiriesCount: number;
  isPopular: boolean;
  isActive: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  category: 'Domestic' | 'International' | 'Honeymoon' | 'Pilgrimage' | 'Adventure';
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  hotelRating: number; // 3, 4, 5
  inclusions: string[];
  spotsTotal: number;
  spotsLeft: number;
  isFeatured: boolean;
  image: string;
  overview: string;
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
}

export interface UserInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination: string;
  packageTitle?: string;
  travelDate: string;
  guestCount: number;
  budget?: string;
  departureCity: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Confirmed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  notes: string[];
}

export interface LiveVisitor {
  id: string;
  ip: string;
  city: string;
  state: string;
  country: string;
  flag: string;
  currentPage: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  activeSeconds: number;
  lastAction: string;
  timestamp: number;
}

export interface LiveEvent {
  id: string;
  type: 'pageview' | 'search' | 'destination_click' | 'booking_inquiry' | 'package_view' | 'contact_click';
  title: string;
  details: string;
  location: string;
  timestamp: number;
  value?: number;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  heroHeading: string;
  heroSubheading: string;
  address: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  whatsapp: string;
  announcementText: string;
  showAnnouncement: boolean;
  emergencySupport: string;
}

export interface SearchFilterState {
  fromCity: string;
  destination: string;
  travelDate: string;
  guests: number;
}
