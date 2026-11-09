import React, { useState } from 'react';
import {
  Compass,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  ExternalLink,
  Sparkles,
  Upload,
} from 'lucide-react';
import { useTravelData } from '../../context/TravelDataContext';
import { Destination } from '../../types/travel';

export const AdminDestinationsView: React.FC = () => {
  const {
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    setActiveMode,
  } = useTravelData();

  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Destination Form
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('India');
  const [newCategory, setNewCategory] = useState<'Domestic' | 'International'>('Domestic');
  const [newTag, setNewTag] = useState('Hill Station');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
  const [newPrice, setNewPrice] = useState(15999);
  const [newDuration, setNewDuration] = useState('5 Days / 4 Nights');
  const [newRating, setNewRating] = useState(4.8);
  const [newDescription, setNewDescription] = useState('Picturesque landscapes, relaxing nature walks, and local authentic experiences.');
  const [newHighlights, setNewHighlights] = useState('Scenic Viewpoints, Local Sightseeing, Traditional Cuisine, Nature Trek');
  const [newBestTime, setNewBestTime] = useState('October to April');
  const [newIsPopular, setNewIsPopular] = useState(true);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    addDestination({
      name: newName,
      country: newCountry,
      category: newCategory,
      tag: newTag,
      image: newImage,
      startingPrice: Number(newPrice),
      currency: '₹',
      duration: newDuration,
      rating: Number(newRating),
      reviewsCount: 120,
      description: newDescription,
      highlights: newHighlights.split(',').map((s) => s.trim()).filter(Boolean),
      bestTimeToVisit: newBestTime,
      isPopular: newIsPopular,
      isActive: true,
    });

    setIsAddOpen(false);
    setNewName('');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    updateDestination(editingDest.id, editingDest);
    setEditingDest(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-heading">
            Destinations Content Manager (CMS)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public destinations, prices, featured cards, and itinerary highlights. Any changes reflect instantly on the website.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#004b93] hover:bg-[#003d77] text-white font-bold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Destination</span>
        </button>
      </div>

      {/* Grid of Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className={`bg-white rounded-2xl overflow-hidden border transition-all ${
              dest.isActive ? 'border-slate-200 shadow-sm' : 'border-slate-300 opacity-60 bg-slate-50'
            }`}
          >
            {/* Image Preview */}
            <div className="relative h-44 bg-slate-800">
              <img
                src={dest.image}
                alt={dest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#004b93] text-white text-[10px] font-bold">
                  {dest.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/50 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{dest.rating}</span>
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-lg font-bold font-heading">{dest.name}</h3>
                <span className="text-xs text-slate-200">{dest.country}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Starting Price:</span>
                <span className="font-bold text-[#004b93] tabular-nums text-sm">
                  ₹{dest.startingPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Duration:</span>
                <span className="font-semibold text-slate-800">{dest.duration}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Public Status:</span>
                <span className={dest.isActive ? 'font-bold text-emerald-600' : 'font-bold text-slate-400'}>
                  {dest.isActive ? 'Active on Site' : 'Hidden'}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Popular Flag:</span>
                <span className={dest.isPopular ? 'font-bold text-amber-600' : 'text-slate-400'}>
                  {dest.isPopular ? '★ Popular Carousel' : 'Standard'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => updateDestination(dest.id, { isActive: !dest.isActive })}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
                >
                  {dest.isActive ? 'Hide from Site' : 'Make Active'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingDest(dest)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Edit Destination"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${dest.name}?`)) {
                        deleteDestination(dest.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Destination Modal */}
      {editingDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Edit Destination: {editingDest.name}
              </h3>
              <button onClick={() => setEditingDest(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.name}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.country}
                    onChange={(e) => setEditingDest({ ...editingDest, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingDest.category}
                    onChange={(e) => setEditingDest({ ...editingDest, category: e.target.value as 'Domestic' | 'International' })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Domestic">Domestic (India)</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={editingDest.startingPrice}
                    onChange={(e) => setEditingDest({ ...editingDest, startingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingDest.image}
                  onChange={(e) => setEditingDest({ ...editingDest, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration Text</label>
                <input
                  type="text"
                  value={editingDest.duration}
                  onChange={(e) => setEditingDest({ ...editingDest, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDest.description}
                  onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingDest.isPopular}
                    onChange={(e) => setEditingDest({ ...editingDest, isPopular: e.target.checked })}
                    className="rounded text-[#004b93]"
                  />
                  <span>Show in "Popular Destinations"</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingDest.isActive}
                    onChange={(e) => setEditingDest({ ...editingDest, isActive: e.target.checked })}
                    className="rounded text-[#004b93]"
                  />
                  <span>Publish Active on Site</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#004b93] text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Destination Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Create New Destination
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashmir / Bali"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="India / Indonesia"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'Domestic' | 'International')}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration Text</label>
                <input
                  type="text"
                  placeholder="5 Days / 4 Nights"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Highlights (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Beach walks, Luxury Resort, Snorkeling"
                  value={newHighlights}
                  onChange={(e) => setNewHighlights(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
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
                  Publish Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
