import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-rose-600' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-xs font-medium">בית</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center gap-1 ${isActive('/search') ? 'text-rose-600' : 'text-gray-400'}`}>
          <Search size={24} />
          <span className="text-xs font-medium">חיפוש</span>
        </Link>
        <Link to="/cart" className={`relative flex flex-col items-center gap-1 ${isActive('/cart') ? 'text-rose-600' : 'text-gray-400'}`}>
          <div className="relative">
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">הסל שלי</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-rose-600' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-xs font-medium">פרופיל</span>
        </Link>
      </div>
    </nav>
  );
};
