import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Calendar,
  X,
  Hotel,
  Flame,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { TourPackage } from '../../types/travel';

export const AdminPackagesView: React.FC = () => {
  const { packages, destinations, addPackage, updatePackage, deletePackage } = useTravelData();

  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New package form state
  const [title, setTitle] = useState('');
  const [destName, setDestName] = useState('Goa');
  const [category, setCategory] = useState<TourPackage['category']>('Domestic');
  const [days, setDays] = useState(5);
  const [nights, setNights] = useState(4);
  const [price, setPrice] = useState(19999);
  const [originalPrice, setOriginalPrice] = useState(25000);
  const [hotelRating, setHotelRating] = useState(4);
  const [inclusionsText, setInclusionsText] = useState('4-Star Hotel, Daily Breakfast, Private Transfers, Guided Sightseeing');
  const [spotsTotal, setSpotsTotal] = useState(20);
  const [spotsLeft, setSpotsLeft] = useState(8);
  const [overview, setOverview] = useState('Complete holiday package including hotel stay, daily buffet breakfast, and sightseeing tours.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const matchedDest = destinations.find((d) => d.name === destName);

    addPackage({
      title,
      destinationId: matchedDest?.id || 'dest-custom',
      destinationName: destName,
      category,
      durationDays: Number(days),
      durationNights: Number(nights),
      pricePerPerson: Number(price),
      originalPrice: Number(originalPrice),
      hotelRating: Number(hotelRating),
      inclusions: inclusionsText.split(',').map((s) => s.trim()).filter(Boolean),
      spotsTotal: Number(spotsTotal),
      spotsLeft: Number(spotsLeft),
      isFeatured: true,
      image,
      overview,
      itinerary: [
        { day: 1, title: 'Arrival & Welcome', details: 'Check-in to hotel, welcome drink, leisure evening.' },
        { day: 2, title: 'Local Sightseeing & Highlights', details: 'Guided tour of top landmarks and scenic spots.' },
        { day: 3, title: 'Free Exploration & Leisure', details: 'Optional activities, shopping, or beach/mountain relaxation.' },
        { day: 4, title: 'Adventure & Excursion', details: 'Special local excursion with lunch included.' },
        { day: 5, title: 'Departure', details: 'Breakfast at hotel, timely transfer to airport/station.' },
      ],
    });

    setIsAddOpen(false);
    setTitle('');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    updatePackage(editingPkg.id, editingPkg);
    setEditingPkg(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-heading">
            Tour Packages Manager (CMS)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure pricing, inclusions, hotel tier ratings, and remaining spots across all holiday offerings.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#004b93] hover:bg-[#003d77] text-white font-bold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Packages Table & Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Package Title & Destination</th>
                <th className="py-3 px-4">Duration & Category</th>
                <th className="py-3 px-4">Hotel Tier</th>
                <th className="py-3 px-4">Price / Person</th>
                <th className="py-3 px-4">Spots Left</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-12 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">
                          {pkg.title}
                        </span>
                        <span className="text-[11px] text-[#004b93] font-medium">
                          {pkg.destinationName}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      {pkg.durationDays}D / {pkg.durationNights}N
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {pkg.category} Tour
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-amber-600">
                    {pkg.hotelRating}-Star Hotel
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 tabular-nums">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                    <span className="text-[10px] text-slate-400 block line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono tabular-nums">
                    <span className={pkg.spotsLeft <= 5 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                      {pkg.spotsLeft} / {pkg.spotsTotal}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingPkg(pkg)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="Edit Package"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete package ${pkg.title}?`)) {
                            deletePackage(pkg.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Package Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Edit Package: {editingPkg.title}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={editingPkg.title}
                  onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    value={editingPkg.pricePerPerson}
                    onChange={(e) => setEditingPkg({ ...editingPkg, pricePerPerson: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingPkg.originalPrice}
                    onChange={(e) => setEditingPkg({ ...editingPkg, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Days</label>
                  <input
                    type="number"
                    value={editingPkg.durationDays}
                    onChange={(e) => setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nights</label>
                  <input
                    type="number"
                    value={editingPkg.durationNights}
                    onChange={(e) => setEditingPkg({ ...editingPkg, durationNights: Number(e.target.value) })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Spots Left</label>
                  <input
                    type="number"
                    value={editingPkg.spotsLeft}
                    onChange={(e) => setEditingPkg({ ...editingPkg, spotsLeft: Number(e.target.value) })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingPkg.image}
                  onChange={(e) => setEditingPkg({ ...editingPkg, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview</label>
                <textarea
                  rows={2}
                  value={editingPkg.overview}
                  onChange={(e) => setEditingPkg({ ...editingPkg, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#004b93] text-white font-bold"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Package Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Create Tour Package
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Rajasthan Palace & Forts Explorer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination Name</label>
                  <select
                    value={destName}
                    onChange={(e) => setDestName(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TourPackage['category'])}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price per Person (₹) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Days</label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nights</label>
                  <input
                    type="number"
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotel Rating</label>
                  <select
                    value={hotelRating}
                    onChange={(e) => setHotelRating(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value={3}>3-Star</option>
                    <option value={4}>4-Star</option>
                    <option value={5}>5-Star Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inclusions (comma separated)</label>
                <input
                  type="text"
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#004b93] text-white font-bold"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
