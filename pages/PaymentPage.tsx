
import React, { useState } from 'react';
import { useApp } from '../AppContext';
// Added Order type import
import { Order } from '../types';

const PaymentPage: React.FC = () => {
  const { setView, cart, addOrder, clearCart } = useApp();
  const [method, setMethod] = useState<'UPI' | 'COD' | 'CARD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = Math.round(subtotal * 1.18) + (subtotal > 500 ? 0 : 49);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = 'CS-' + Math.floor(1000 + Math.random() * 9000);
      // Added explicit typing to newOrder to ensure the 'status' property matches the Order interface
      const newOrder: Order = {
        id: orderId,
        items: [...cart],
        totalAmount: total,
        status: 'Pickup Scheduled',
        createdAt: new Date().toISOString(),
        customerName: 'Customer', // In real app, from context/form
        mobile: '9876543210',
        pickupDate: 'Tomorrow',
        pickupSlot: 'Morning'
      };
      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setView('CONFIRMATION');
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Processing Payment</h2>
          <p className="text-slate-500">Please do not refresh the page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
       <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setView('BOOKING')} className="p-2 bg-white rounded-xl border border-slate-100">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Payment</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
        <p className="text-slate-500 text-sm mb-1">Amount to pay</p>
        <h2 className="text-3xl font-bold text-slate-800">₹{total}</h2>
      </div>

      <div className="space-y-3">
        {[
          { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
          { id: 'CARD', label: 'Debit / Credit Card', icon: '💳' },
          { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMethod(opt.id as any)}
            className={`w-full p-5 rounded-3xl border flex items-center gap-4 transition-all ${
              method === opt.id 
              ? 'bg-blue-50 border-blue-500' 
              : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
              method === opt.id ? 'bg-blue-600' : 'bg-slate-100'
            }`}>
              {opt.icon}
            </div>
            <span className={`font-bold text-sm ${method === opt.id ? 'text-blue-700' : 'text-slate-700'}`}>
              {opt.label}
            </span>
            <div className="ml-auto">
              {method === opt.id && <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>}
            </div>
          </button>
        ))}
      </div>

      {method === 'UPI' && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Scan QR to Pay</p>
          <div className="bg-white p-4 inline-block rounded-2xl shadow-inner border border-slate-200">
            {/* Mock QR Code */}
            <div className="w-40 h-40 bg-slate-900 flex items-center justify-center p-2 rounded-lg">
                <div className="w-full h-full bg-white grid grid-cols-4 gap-1 p-1">
                   {Array.from({length: 16}).map((_, i) => (
                     <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`}></div>
                   ))}
                </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Demo Payment: No real money will be deducted</p>
        </div>
      )}

      <button 
        onClick={handleConfirm}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-all text-lg"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default PaymentPage;
