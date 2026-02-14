
import React, { useState } from 'react';
import { useApp } from '../AppContext';

const TrackOrderPage: React.FC = () => {
  const { setView, orders } = useApp();
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const handleSearch = () => {
    const found = orders.find(o => o.id.toLowerCase().includes(searchId.toLowerCase()) || o.mobile.includes(searchId));
    setActiveOrder(found || null);
    if (!found) alert("Order not found. Try CS-8421");
  };

  const statuses = [
    { label: 'Pickup Scheduled', icon: '📅', done: true },
    { label: 'Picked Up', icon: '🚚', done: true },
    { label: 'In Cleaning', icon: '🧼', done: true },
    { label: 'Ready', icon: '✨', done: false },
    { label: 'Out for Delivery', icon: '🏍️', done: false },
    { label: 'Delivered', icon: '🎁', done: false },
  ];

  return (
    <div className="py-4 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Track Your Order</h1>
      
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <p className="text-sm text-slate-500">Enter Order ID or Mobile Number</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="e.g. CS-8421 or 98765..." 
            className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold active:scale-95 transition-all"
          >
            Track
          </button>
        </div>
      </div>

      {activeOrder ? (
        <div className="space-y-6 animate-in fade-in duration-500">
           <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Order #{activeOrder.id}</h2>
                  <p className="text-blue-100 text-sm">{activeOrder.customerName}</p>
                </div>
                <span className="bg-blue-400/30 px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                  {activeOrder.status}
                </span>
              </div>
              <div className="h-2 bg-blue-800 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/2 rounded-full"></div>
              </div>
              <div className="mt-2 text-xs text-blue-100 flex justify-between">
                <span>Progress: 50%</span>
                <span>Est. Delivery: Tomorrow</span>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute left-[47px] top-10 bottom-10 w-0.5 bg-slate-100"></div>
              
              <div className="space-y-8 relative">
                {statuses.map((s, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm z-10 border-4 border-white ${
                      s.done ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {s.done ? '✓' : i + 1}
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-xl">{s.icon}</span>
                       <span className={`font-bold ${s.done ? 'text-slate-800' : 'text-slate-300'}`}>
                         {s.label}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <button 
            onClick={() => setView('HOME')}
            className="w-full py-4 text-blue-600 font-bold"
           >
            Back to Home
           </button>
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
          <div className="text-6xl mb-4">📍</div>
          <p>Search results will appear here</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
