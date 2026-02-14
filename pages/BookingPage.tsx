
import React, { useState } from 'react';
import { useApp } from '../AppContext';

const BookingPage: React.FC = () => {
  const { setView } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    pincode: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupSlot: 'Morning (9 AM - 12 PM)',
    deliveryType: 'Standard' as 'Standard' | 'Express'
  });

  const slots = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (1 PM - 4 PM)',
    'Evening (5 PM - 8 PM)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate here
    setView('PAYMENT');
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setView('CART')} className="p-2 bg-white rounded-xl border border-slate-100">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Booking Info</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="text-blue-600">👤</span> Contact Details
          </h2>
          <div className="space-y-3">
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              required
              type="tel" 
              placeholder="Mobile Number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="text-blue-600">📍</span> Pickup Address
          </h2>
          <div className="space-y-3">
            <textarea 
              required
              placeholder="House/Flat No, Street, Landmark" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 min-h-[80px]"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
            <input 
              required
              type="text" 
              placeholder="Pincode" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
              value={formData.pincode}
              onChange={(e) => setFormData({...formData, pincode: e.target.value})}
            />
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="text-blue-600">📅</span> Schedule Pickup
          </h2>
          <div className="space-y-3">
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
              value={formData.pickupDate}
              onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
            />
            <div className="grid grid-cols-1 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData({...formData, pickupSlot: slot})}
                  className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                    formData.pickupSlot === slot 
                    ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' 
                    : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800">Delivery Speed</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({...formData, deliveryType: 'Standard'})}
              className={`p-4 rounded-2xl border text-left transition-all ${
                formData.deliveryType === 'Standard' 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-bold mb-1">Standard</div>
              <div className="text-xs">48 Hours</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, deliveryType: 'Express'})}
              className={`p-4 rounded-2xl border text-left transition-all ${
                formData.deliveryType === 'Express' 
                ? 'bg-orange-50 border-orange-500 text-orange-700' 
                : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-bold mb-1">Express (+₹50)</div>
              <div className="text-xs">24 Hours</div>
            </button>
          </div>
        </section>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-all text-lg"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
