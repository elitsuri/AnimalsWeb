import React, { useState } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';
import { CATEGORIES, MOCK_RESTAURANTS } from '../constants';
import { RestaurantCard } from '../components/RestaurantCard';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    const matchesCategory = activeCategory === 'all' || r.tags.some(tag => {
      // Simple mapping for demo purposes
      if (activeCategory === 'pizza') return tag.includes('פיצה');
      if (activeCategory === 'burger') return tag.includes('המבורגר');
      if (activeCategory === 'sushi') return tag.includes('סושי');
      if (activeCategory === 'asian') return tag.includes('אסייתי');
      if (activeCategory === 'vegan') return tag.includes('טבעוני');
      return true;
    });
    
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.tags.some(t => t.includes(searchTerm));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-rose-600 mb-4 cursor-pointer">
          <MapPin size={20} />
          <div>
            <div className="text-xs text-gray-500 font-medium">נשלח אל</div>
            <div className="font-bold flex items-center gap-1">
              תל אביב, רוטשילד 25
              <span className="text-xs transform rotate-90">›</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <input 
            type="text"
            placeholder="איזה אוכל בא לך?"
            className="w-full bg-gray-100 rounded-full py-3 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-sm">
             <Filter size={14} className="text-gray-600" />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="mt-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 min-w-[70px] ${activeCategory === cat.id ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-colors ${activeCategory === cat.id ? 'bg-rose-100 border-2 border-rose-500' : 'bg-white'}`}>
                {cat.icon}
              </div>
              <span className={`text-xs font-medium ${activeCategory === cat.id ? 'text-rose-600 font-bold' : 'text-gray-600'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Horizontal */}
      {!searchTerm && activeCategory === 'all' && (
        <div className="mt-6 px-4">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-xl font-bold text-gray-900">מומלצים בשבילך</h2>
            <button className="text-rose-600 text-sm font-medium">ראה הכל</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {MOCK_RESTAURANTS.slice(0, 3).map(r => (
              <RestaurantCard key={r.id} data={r} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Restaurants List */}
      <div className="mt-4 px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">כל המסעדות</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(r => (
              <RestaurantCard key={r.id} data={r} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              לא נמצאו מסעדות התואמות את החיפוש
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
