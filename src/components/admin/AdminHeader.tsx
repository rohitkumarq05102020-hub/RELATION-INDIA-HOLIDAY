import React from 'react';
import {
  Activity,
  BarChart3,
  Users,
  Compass,
  Package,
  Settings,
  ExternalLink,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';

export const AdminHeader: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    setActiveMode,
    activeNow,
    inquiries,
    trafficSpeed,
    setTrafficSpeed,
    soundEnabled,
    setSoundEnabled,
    triggerSimulatedLead,
    triggerSimulatedSurge,
  } = useTravelData();

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Control Panel & Real-Time Engine
            </span>
          </div>

          <span className="text-slate-600">|</span>

          {/* Real-time active counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">Active Visitors:</span>
            <span className="text-emerald-400 font-bold tabular-nums text-sm">{activeNow}</span>
          </div>

          {/* Traffic Simulation Pace */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            <span>Traffic Pace:</span>
            <select
              value={trafficSpeed}
              onChange={(e) => setTrafficSpeed(e.target.value as 'normal' | 'rush' | 'paused')}
              className="bg-slate-800 text-white px-2 py-0.5 rounded text-xs border border-slate-700 cursor-pointer focus:outline-hidden"
            >
              <option value="normal">Normal (5s pulse)</option>
              <option value="rush">Rush Hour (2s pulse)</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Simulate Live Lead */}
          <button
            onClick={triggerSimulatedLead}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors"
            title="Inject a realistic incoming customer lead into the CRM pipeline"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Simulate Live Lead</span>
            <span className="sm:hidden">+Lead</span>
          </button>

          {/* Quick Traffic Surge */}
          <button
            onClick={triggerSimulatedSurge}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 transition-colors"
            title="Simulate sudden traffic spike from social media campaign"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Traffic Surge (+18)</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={soundEnabled ? 'Mute notification chimes' : 'Enable audio chimes'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <span className="text-slate-700">|</span>

          {/* Switch Back to Customer View */}
          <button
            onClick={() => setActiveMode('public')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'analytics'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Real-Time Analytics</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Live
            </span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries & Leads CRM</span>
            {newInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {newInquiriesCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('destinations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'destinations'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Destinations CMS</span>
          </button>

          <button
            onClick={() => setAdminTab('packages')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'packages'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Tour Packages CMS</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'settings'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Content & Banner</span>
          </button>
        </div>
      </div>
    </header>
  );
};
