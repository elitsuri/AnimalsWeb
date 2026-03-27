import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Phone, Check, MapPin, ChefHat, Bike } from 'lucide-react';

export const OrderTracking = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(0); // 0: Received, 1: Preparing, 2: On the way, 3: Delivered

  // Simulate status progression
  useEffect(() => {
    const timer1 = setTimeout(() => setStatus(1), 3000);
    const timer2 = setTimeout(() => setStatus(2), 8000);
    const timer3 = setTimeout(() => setStatus(3), 15000);
    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
    };
  }, []);

  const steps = [
      { label: 'הזמנה התקבלה', icon: Check, time: '19:30' },
      { label: 'בהכנה', icon: ChefHat, time: '19:35' },
      { label: 'בדרך אליך', icon: Bike, time: '19:50' },
      { label: 'נמסרה', icon: MapPin, time: '20:00' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Map Placeholder */}
      <div className="h-1/2 w-full bg-gray-200 relative min-h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
             <div className="text-gray-500 flex flex-col items-center">
                 <MapPin size={40} className="mb-2 text-rose-600 animate-bounce" />
                 <span className="font-bold">מפה בזמן אמת</span>
             </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10"
          >
            <Home size={20} className="text-gray-800" />
          </button>
      </div>

      {/* Status Card */}
      <div className="-mt-6 relative bg-white rounded-t-3xl px-6 py-8 shadow-lg min-h-[50vh]">
          <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
          </div>

          <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {status === 3 ? 'המשלוח הגיע!' : 'המשלוח בדרך'}
              </h1>
              <p className="text-gray-500">זמן הגעה משוער: 20:00</p>
          </div>

          {/* Stepper */}
          <div className="relative pl-4 space-y-8">
               {/* Vertical Line */}
               <div className="absolute right-[19px] top-2 bottom-10 w-0.5 bg-gray-100"></div>
               {/* Progress Line */}
               <div 
                className="absolute right-[19px] top-2 w-0.5 bg-rose-500 transition-all duration-1000 ease-in-out"
                style={{ height: `${status * 33}%` }}
               ></div>

               {steps.map((step, index) => {
                   const Icon = step.icon;
                   const isCompleted = index <= status;
                   const isCurrent = index === status;

                   return (
                       <div key={index} className={`flex items-center gap-4 relative z-10 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                               <Icon size={20} />
                           </div>
                           <div className="flex-1">
                               <h4 className={`font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>{step.label}</h4>
                           </div>
                           <span className="text-xs text-gray-400 font-medium">{step.time}</span>
                       </div>
                   )
               })}
          </div>

          {/* Courier Info */}
          {status >= 2 && (
             <div className="mt-8 bg-gray-50 p-4 rounded-xl flex items-center gap-4 animate-fade-in">
                 <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                     <img src="https://picsum.photos/100/100?random=user" alt="Courier" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                     <p className="font-bold text-gray-900">דני השליח</p>
                     <p className="text-xs text-gray-500">טויוטה קורולה כסופה</p>
                 </div>
                 <button className="bg-white p-2 rounded-full shadow-sm text-rose-600">
                     <Phone size={20} />
                 </button>
             </div>
          )}
      </div>
    </div>
  );
};
