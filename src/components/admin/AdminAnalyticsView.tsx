import React from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  CreditCard,
  Radio,
  Search,
  MapPin,
  Laptop,
  Smartphone,
  Tablet,
  Activity,
  ArrowUpRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const AdminAnalyticsView: React.FC = () => {
  const {
    activeNow,
    todayVisitors,
    inquiries,
    destinations,
    liveVisitors,
    liveEvents,
    triggerSimulatedLead,
    triggerSimulatedSurge,
  } = useTravelData();

  // Metrics calculation
  const totalInquiries = inquiries.length;
  const conversionRate = ((totalInquiries / Math.max(1, todayVisitors)) * 100).toFixed(1);
  const estimatedPipeline = inquiries
    .filter((i) => i.status !== 'Cancelled')
    .reduce((acc, curr) => {
      const match = curr.budget?.match(/(\d+[\d,]*)/);
      const val = match ? parseInt(match[1].replace(/,/g, ''), 10) : 35000;
      return acc + (isNaN(val) ? 35000 : val);
    }, 0);

  const getDeviceIcon = (dev: string) => {
    if (dev === 'Mobile') return <Smartphone className="w-3.5 h-3.5 text-blue-500" />;
    if (dev === 'Tablet') return <Tablet className="w-3.5 h-3.5 text-purple-500" />;
    return <Laptop className="w-3.5 h-3.5 text-slate-600" />;
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'booking_inquiry':
        return <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">New Lead</span>;
      case 'search':
        return <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Search</span>;
      case 'destination_click':
        return <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">Destination</span>;
      case 'contact_click':
        return <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Contact</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">PageView</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Real-Time Status & Quick Action Injection */}
      <div className="bg-gradient-to-r from-blue-900 via-[#004b93] to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Real-Time Analytics Stream Active
            </span>
          </div>
          <h2 className="text-2xl font-black font-heading">
            Live Travel Portal Intelligence
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            Monitoring active traveler sessions, search queries, destination traffic, and high-value holiday inquiries in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={triggerSimulatedLead}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Simulate Incoming Lead</span>
          </button>
          <button
            onClick={triggerSimulatedSurge}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Traffic Surge</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Now */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Right Now</span>
            </div>
            <div className="text-3xl font-black text-slate-900 font-heading tabular-nums">
              {activeNow}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              ↑ 12% higher than yesterday
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Card 2: Today's Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block mb-1">
              Today's Total Visits
            </span>
            <div className="text-3xl font-black text-[#004b93] font-heading tabular-nums">
              {todayVisitors.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500">
              Across 12 Indian states
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#004b93] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block mb-1">
              Inquiries & Leads
            </span>
            <div className="text-3xl font-black text-[#ff6600] font-heading tabular-nums">
              {totalInquiries}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              Conversion rate: <b>{conversionRate}%</b>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ff6600] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Estimated Pipeline Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block mb-1">
              Pipeline Booking Value
            </span>
            <div className="text-2xl font-black text-slate-900 font-heading tabular-nums">
              ₹{(estimatedPipeline / 100000).toFixed(2)} Lakh
            </div>
            <span className="text-[11px] text-slate-500">
              Avg ticket: ₹{(estimatedPipeline / Math.max(1, totalInquiries)).toFixed(0)}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Live Activity Feed & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Real-Time Event Feed */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#004b93]" />
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Live Visitor Activity Stream
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Auto-updating
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {liveEvents.slice(0, 15).map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getEventBadge(evt.type)}
                    <span className="text-xs font-bold text-slate-800">
                      {evt.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate">
                    {evt.details}
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    📍 {evt.location}
                  </span>
                </div>

                <span className="text-[10px] text-slate-400 whitespace-nowrap tabular-nums">
                  {Math.max(1, Math.floor((Date.now() - evt.timestamp) / 1000))}s ago
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Conversion Funnel & Top Destinations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <h3 className="text-sm font-bold text-slate-900 font-heading mb-4">
              Real-Time Conversion Funnel
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>1. Landed on Portal</span>
                  <span className="font-mono">{todayVisitors} (100%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>2. Searched Tour / Filtered</span>
                  <span className="font-mono">{Math.floor(todayVisitors * 0.48)} (48%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[48%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>3. Viewed Detailed Itinerary</span>
                  <span className="font-mono">{Math.floor(todayVisitors * 0.28)} (28%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>4. Opened Holiday Booking Form</span>
                  <span className="font-mono">{Math.floor(todayVisitors * 0.12)} (12%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[12%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-emerald-700 mb-1">
                  <span>5. Submitted Lead Inquiry</span>
                  <span className="font-mono">{totalInquiries} ({conversionRate}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.max(4, Math.min(100, parseFloat(conversionRate) * 8))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations Heat */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <h3 className="text-sm font-bold text-slate-900 font-heading mb-3">
              Destination Interest Ranking
            </h3>

            <div className="space-y-2.5">
              {destinations.slice(0, 5).map((d) => (
                <div key={d.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{d.name}</span>
                    <span className="text-[10px] text-slate-400">({d.category})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 tabular-nums">{d.viewsCount} views</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded tabular-nums">
                      {d.inquiriesCount} leads
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Visitors Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Current Active Visitor Sessions
            </h3>
            <p className="text-xs text-slate-500">
              Simulated real-time IP connections, device types, and browsing focus.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold font-mono">
            {liveVisitors.length} Connected Sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Location & IP</th>
                <th className="py-2.5 px-3">Device / Browser</th>
                <th className="py-2.5 px-3">Current Screen</th>
                <th className="py-2.5 px-3">Time on Site</th>
                <th className="py-2.5 px-3">Recent Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {liveVisitors.map((vis) => (
                <tr key={vis.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{vis.flag}</span>
                      <span>{vis.city}, {vis.country}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{vis.ip}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      {getDeviceIcon(vis.device)}
                      <span className="font-medium">{vis.device}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{vis.browser}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {vis.currentPage}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 tabular-nums">
                    {Math.floor(vis.activeSeconds / 60)}m {vis.activeSeconds % 60}s
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {vis.lastAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
