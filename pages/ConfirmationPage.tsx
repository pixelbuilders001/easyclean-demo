
import React from 'react';
import { useApp } from '../AppContext';

const ConfirmationPage: React.FC = () => {
  const { lastOrder, setView } = useApp();

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          ✓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Order Confirmed!</h1>
        <p className="text-slate-500">Your laundry pickup is scheduled and our champion is on their way.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Order ID</span>
            <span className="text-lg font-black text-blue-600">#{lastOrder?.id || 'CS-2045'}</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Amount Paid</span>
            <span className="font-bold text-slate-800">₹{lastOrder?.totalAmount || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Pickup Date</span>
            <span className="font-bold text-slate-800">15 Feb, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Time Slot</span>
            <span className="font-bold text-slate-800">9 AM - 12 PM</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
         <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-1.01 3.692 3.791-1c.783.428 1.586.66 2.443.66h.001c3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.767-5.767-5.767zm3.39 8.161c-.146.415-.852.79-1.157.846-.305.056-.68.106-1.934-.411-1.254-.518-2.062-1.789-2.124-1.873-.062-.084-.504-.672-.504-1.284 0-.612.319-.912.434-1.034.114-.122.25-.152.334-.152.083 0 .167.001.238.005.071.004.167-.027.262.203.095.23.327.797.355.856.028.059.046.128.009.203-.037.075-.056.122-.112.188-.056.066-.118.147-.168.197-.059.059-.122.124-.053.243.069.119.308.508.662.823.456.406.84.532.959.592.119.06.188.049.259-.034.071-.083.305-.355.387-.476.082-.121.163-.102.274-.061.112.041.705.332.827.393.121.061.202.091.232.142.03.05.03.29-.116.705z"/>
              </svg>
            </div>
            <span className="font-bold text-green-800 text-sm">WhatsApp Confirmation</span>
         </div>
         <div className="bg-white/50 rounded-xl p-3 border border-green-200/50">
            <p className="text-xs italic text-green-900/70">
              "Hello Rajeev, your order #CS-2045 has been scheduled for pickup on 15 Feb. Track it here: cln.sw/2045"
            </p>
         </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={() => setView('TRACK')}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100"
        >
          Track My Order
        </button>
        <button 
          onClick={() => setView('HOME')}
          className="w-full bg-white text-slate-600 py-4 rounded-2xl font-bold border border-slate-100"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
