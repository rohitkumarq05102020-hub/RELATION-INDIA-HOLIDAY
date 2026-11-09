import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  Trash2,
  ChevronRight,
  X,
  Send,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { UserInquiry } from '../../types/travel';

export const AdminInquiriesView: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    addInquiryNote,
    submitInquiry,
    settings,
  } = useTravelData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | UserInquiry['status']>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<UserInquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isManualLeadOpen, setIsManualLeadOpen] = useState(false);

  // Manual Lead Form State
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualDestination, setManualDestination] = useState('Goa');
  const [manualDate, setManualDate] = useState('');
  const [manualGuests, setManualGuests] = useState(2);
  const [manualBudget, setManualBudget] = useState('₹50,000');
  const [manualDeparture, setManualDeparture] = useState('Dhanbad');
  const [manualMessage, setManualMessage] = useState('Dhanbad office walk-in inquiry.');

  // Filtered list
  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'All' && inq.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        inq.customerName.toLowerCase().includes(q) ||
        inq.customerPhone.toLowerCase().includes(q) ||
        inq.customerEmail.toLowerCase().includes(q) ||
        inq.destination.toLowerCase().includes(q) ||
        inq.departureCity?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: UserInquiry['status']) => {
    switch (status) {
      case 'New':
        return <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">New</span>;
      case 'Contacted':
        return <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">Contacted</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">In Progress</span>;
      case 'Confirmed':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Confirmed</span>;
      case 'Cancelled':
        return <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">Cancelled</span>;
      default:
        return null;
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,Customer Name,Phone,Email,Destination,Departure City,Travel Date,Guests,Budget,Status,Created At\n'];
    const rows = inquiries.map((i) =>
      `"${i.id}","${i.customerName}","${i.customerPhone}","${i.customerEmail}","${i.destination}","${i.departureCity || ''}","${i.travelDate}","${i.guestCount}","${i.budget || ''}","${i.status}","${i.createdAt}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relation_india_holiday_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNoteText.trim()) return;

    addInquiryNote(selectedInquiry.id, newNoteText.trim());
    setSelectedInquiry((prev) =>
      prev ? { ...prev, notes: [newNoteText.trim(), ...prev.notes] } : null
    );
    setNewNoteText('');
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    submitInquiry({
      customerName: manualName,
      customerEmail: manualEmail || `${manualName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      customerPhone: manualPhone,
      destination: manualDestination,
      packageTitle: `${manualDestination} Holiday Package`,
      travelDate: manualDate || new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
      guestCount: manualGuests,
      budget: manualBudget,
      departureCity: manualDeparture,
      message: manualMessage,
      priority: 'High',
    });

    setIsManualLeadOpen(false);
    setManualName('');
    setManualPhone('');
    setManualEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-heading">
            Customer Inquiries & Leads CRM
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline of booking requests, tour customizations, and walk-in leads.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsManualLeadOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#004b93] hover:bg-[#003d77] text-white font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-In Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-[#004b93]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-slate-100 rounded-lg">
          {(['All', 'New', 'Contacted', 'In Progress', 'Confirmed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Destination & Trip</th>
                <th className="py-3 px-4">Travel Date / Guests</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                    selectedInquiry?.id === inq.id ? 'bg-blue-50/70' : ''
                  }`}
                >
                  {/* Customer Details */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">
                      {inq.customerName}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600">
                      <a
                        href={`tel:${inq.customerPhone.replace(/\s+/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-blue-600 font-mono"
                      >
                        {inq.customerPhone}
                      </a>
                      <a
                        href={`https://wa.me/${inq.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          inq.customerName
                        )},%20this%20is%20from%20Relation%20India%20Holiday%20regarding%20your%20${encodeURIComponent(
                          inq.destination
                        )}%20trip.`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-600 hover:text-emerald-700 font-bold"
                      >
                        [WhatsApp]
                      </a>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      From: {inq.departureCity || 'Dhanbad'} · {inq.customerEmail}
                    </span>
                  </td>

                  {/* Destination & Package */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#004b93] text-sm block">
                      {inq.destination}
                    </span>
                    <span className="text-[11px] text-slate-600 line-clamp-1">
                      {inq.packageTitle || 'Custom Itinerary'}
                    </span>
                  </td>

                  {/* Date & Guests */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{inq.travelDate}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {inq.guestCount} Travelers
                    </span>
                  </td>

                  {/* Budget */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 tabular-nums">
                    {inq.budget || 'Custom Quote'}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateInquiryStatus(inq.id, e.target.value as UserInquiry['status'])
                      }
                      className="text-xs font-semibold px-2 py-1 rounded-md border border-slate-200 bg-white cursor-pointer focus:outline-[#004b93]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100"
                        title="View Lead Notes & Details"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete inquiry for ${inq.customerName}?`)) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInquiries.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold">No customer inquiries found</p>
              <p className="text-[11px] mt-0.5">Try adjusting your search query or status filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Lead Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                Lead Reference #{selectedInquiry.id}
              </span>
              <h3 className="text-base font-bold font-heading">
                {selectedInquiry.customerName}
              </h3>
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${selectedInquiry.customerPhone.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-xl bg-blue-50 text-[#004b93] font-bold flex items-center justify-center gap-1.5 border border-blue-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Traveler</span>
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.customerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center gap-1.5 border border-emerald-200"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </a>
            </div>

            {/* Travel Specs */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Package Title:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedInquiry.packageTitle || 'Custom'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Departure City:</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.departureCity || 'Dhanbad'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Date:</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Number of Guests:</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.guestCount} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Budget:</span>
                <span className="font-bold text-emerald-700">{selectedInquiry.budget || 'Open'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span>{getStatusBadge(selectedInquiry.status)}</span>
              </div>
            </div>

            {/* Customer Message */}
            {selectedInquiry.message && (
              <div>
                <span className="font-bold text-slate-500 block mb-1">Customer Inquiry Note:</span>
                <p className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-slate-700 italic">
                  "{selectedInquiry.message}"
                </p>
              </div>
            )}

            {/* Internal Notes History */}
            <div>
              <span className="font-bold text-slate-700 block mb-2">
                Internal CRM Log & Notes:
              </span>
              <div className="space-y-2">
                {selectedInquiry.notes.map((note, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 text-[11px]">
                    {note}
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Log call notes or quotation details..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-[#004b93]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#004b93] text-white rounded-lg text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Manual Lead Modal */}
      {isManualLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Add Walk-In / Phone Lead
              </h3>
              <button
                onClick={() => setIsManualLeadOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alok Mukherjee"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99341 00000"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination *</label>
                  <select
                    value={manualDestination}
                    onChange={(e) => setManualDestination(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Goa">Goa</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Himachal">Himachal</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Andaman">Andaman</option>
                    <option value="Kashmir">Kashmir</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guests</label>
                  <input
                    type="number"
                    min={1}
                    value={manualGuests}
                    onChange={(e) => setManualGuests(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Departure City</label>
                <input
                  type="text"
                  value={manualDeparture}
                  onChange={(e) => setManualDeparture(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Details</label>
                <textarea
                  rows={2}
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualLeadOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#004b93] text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
