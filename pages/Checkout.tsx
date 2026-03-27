import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleOrder = () => {
    setIsProcessing(true);
    // Simulate API Call
    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        navigate('/tracking');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowRight className="text-gray-700" />
        </button>
        <h1 className="font-bold text-lg">קופה</h1>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Delivery Address */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MapPin size={18} className="text-rose-600" />
                    כתובת למשלוח
                </h3>
                <button className="text-rose-600 text-xs font-bold">שינוי</button>
            </div>
            <div className="pr-6">
                <p className="font-medium text-gray-800">בית</p>
                <p className="text-gray-500 text-sm">שדרות רוטשילד 25, תל אביב</p>
                <p className="text-gray-400 text-xs mt-1">קומה 3, דירה 12</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
                 <input 
                    type="text" 
                    placeholder="הוראות לשליח (קוד לדלת, וכו')" 
                    className="w-full text-sm bg-transparent focus:outline-none"
                 />
            </div>
        </div>

        {/* Time */}
        <div className="bg-white rounded-xl shadow-sm p-4">
             <h3 className="font-bold text-gray-900 mb-3">זמן משלוח</h3>
             <div className="flex gap-3">
                 <button className="flex-1 bg-rose-50 border border-rose-200 text-rose-700 py-2 rounded-lg text-sm font-bold shadow-sm">
                     עכשיו (30-45 דק')
                 </button>
                 <button className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium">
                     תזמון להמשך
                 </button>
             </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-900 mb-3">אמצעי תשלום</h3>
            <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}>
                    <input 
                        type="radio" 
                        name="payment" 
                        className="accent-rose-600 w-4 h-4"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                    />
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <CreditCard size={20} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-sm text-gray-800">כרטיס אשראי</p>
                        <p className="text-xs text-gray-500">**** 4242</p>
                    </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'apple' ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}>
                    <input 
                        type="radio" 
                        name="payment" 
                        className="accent-rose-600 w-4 h-4"
                        checked={paymentMethod === 'apple'}
                        onChange={() => setPaymentMethod('apple')}
                    />
                     <div className="bg-gray-100 p-2 rounded-lg">
                        <Wallet size={20} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-sm text-gray-800">Apple Pay</p>
                    </div>
                </label>
            </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-20">
          <button 
            onClick={handleOrder}
            disabled={isProcessing}
            className={`w-full bg-rose-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-rose-200 flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70' : ''}`}
          >
              {isProcessing ? (
                  <>מעבד הזמנה...</>
              ) : (
                  <>
                    <span>בצע הזמנה</span>
                  </>
              )}
          </button>
      </div>
    </div>
  );
};
