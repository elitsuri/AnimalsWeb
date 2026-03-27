import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, Bike, Info, Plus } from 'lucide-react';
import { MOCK_RESTAURANTS } from '../constants';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

export const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState<string>(restaurant?.categories[0]?.id || '');

  if (!restaurant) return <div className="p-8 text-center">מסעדה לא נמצאה</div>;

  const getItemQty = (itemId: string) => {
    return cartItems.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Hero Image */}
      <div className="relative h-56 w-full">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md z-10"
        >
          <ArrowRight size={20} className="text-gray-800" />
        </button>
      </div>

      {/* Info Header */}
      <div className="px-4 py-5 -mt-6 bg-white relative rounded-t-3xl border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{restaurant.name}</h1>
        <p className="text-gray-500 text-sm mb-3">{restaurant.tags.join(' • ')}</p>
        
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
          <div className="flex flex-col items-center flex-1 border-l border-gray-200">
            <div className="flex items-center gap-1 font-bold text-gray-800">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              {restaurant.rating}
            </div>
            <span className="text-[10px] text-gray-400">דירוג</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-gray-200">
            <div className="flex items-center gap-1 font-bold text-gray-800">
              <Clock size={14} />
              {restaurant.deliveryTime}
            </div>
            <span className="text-[10px] text-gray-400">זמן משלוח</span>
          </div>
          <div className="flex flex-col items-center flex-1">
             <div className="flex items-center gap-1 font-bold text-gray-800">
              <Bike size={14} />
              {restaurant.deliveryFee === 0 ? 'חינם' : `₪${restaurant.deliveryFee}`}
            </div>
            <span className="text-[10px] text-gray-400">משלוח</span>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-6">
          {restaurant.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                selectedCategory === cat.id 
                  ? 'border-rose-600 text-rose-600' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-2">
        {restaurant.categories.map(cat => (
          <div key={cat.id} id={cat.id} className={selectedCategory === cat.id ? 'block' : 'hidden'}>
            <h3 className="font-bold text-lg my-4">{cat.name}</h3>
            <div className="space-y-6">
              {cat.items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-medium">₪{item.price}</span>
                      {getItemQty(item.id) > 0 ? (
                        <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-2 py-1 rounded-lg text-sm font-bold">
                          <span>{getItemQty(item.id)}x בסל</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item, restaurant.id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-full transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-28 h-28 flex-shrink-0 relative">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                     {getItemQty(item.id) > 0 && (
                        <button 
                            onClick={() => addToCart(item, restaurant.id)}
                            className="absolute bottom-2 left-2 bg-rose-600 text-white p-1 rounded-full shadow-lg"
                        >
                            <Plus size={16} />
                        </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating Cart Button if items exist */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-20">
           <button 
            onClick={() => navigate('/cart')}
            className="w-full bg-rose-600 text-white py-3.5 rounded-xl shadow-lg shadow-rose-200 flex items-center justify-between px-6 font-bold"
           >
             <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
             <span>צפה בהזמנה</span>
             <span>₪{cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0)}</span>
           </button>
        </div>
      )}
    </div>
  );
};
