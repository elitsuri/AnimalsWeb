import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MOCK_RESTAURANTS } from '../constants';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, restaurantId, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === restaurantId);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">הסל שלך ריק</h2>
        <p className="text-gray-500 mb-8">נראה שעדיין לא הוספת פריטים לסל. זה הזמן להתחיל!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-rose-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-200"
        >
          התחל להזמין
        </button>
      </div>
    );
  }

  const deliveryFee = restaurant?.deliveryFee || 0;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowRight className="text-gray-700" />
        </button>
        <div className="flex-1">
            <h1 className="font-bold text-lg">הסל שלי</h1>
            <p className="text-xs text-gray-500">{restaurant?.name}</p>
        </div>
        <button onClick={clearCart} className="text-sm text-red-500 font-medium">
            רוקן סל
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100 last:border-0 flex gap-3">
                     <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                             <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                             <span className="font-medium text-gray-900">₪{item.price * item.quantity}</span>
                         </div>
                         <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                         
                         <div className="flex items-center justify-between">
                            <div className="flex items-center bg-gray-50 rounded-lg p-1">
                                <button 
                                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600"
                                >
                                    {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                </button>
                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                         </div>
                     </div>
                </div>
            ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
                <span>ביניים</span>
                <span>₪{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>דמי משלוח</span>
                <span>₪{deliveryFee}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                <span>סה"כ לתשלום</span>
                <span>₪{finalTotal}</span>
            </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-sm p-4">
             <h3 className="font-bold text-sm mb-2">הערות למסעדה</h3>
             <textarea 
                className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none h-20"
                placeholder="רגישויות, בקשות מיוחדות וכו'..."
             ></textarea>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-20">
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-rose-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-rose-200 flex justify-between px-6"
          >
              <span>המשך לתשלום</span>
              <span>₪{finalTotal}</span>
          </button>
      </div>
    </div>
  );
};
