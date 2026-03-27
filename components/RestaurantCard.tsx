import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Bike } from 'lucide-react';
import { Restaurant } from '../types';

interface Props {
  data: Restaurant;
  featured?: boolean;
}

export const RestaurantCard: React.FC<Props> = ({ data, featured }) => {
  return (
    <Link 
      to={`/restaurant/${data.id}`}
      className={`block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform active:scale-95 ${featured ? 'min-w-[280px] w-[280px]' : 'w-full'}`}
    >
      <div className="relative h-40 bg-gray-200">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" loading="lazy" />
        {data.isClosed && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">סגור כעת</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold">{data.rating}</span>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 truncate text-lg">{data.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <span className="truncate">{data.tags.join(', ')}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{data.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bike size={14} />
            <span>{data.deliveryFee === 0 ? 'חינם' : `₪${data.deliveryFee}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
