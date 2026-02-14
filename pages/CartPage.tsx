
import React from 'react';
import { useApp } from '../AppContext';

const CartPage: React.FC = () => {
  const { cart, setView, updateQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const pickupCharge = subtotal > 500 ? 0 : 49;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + pickupCharge + gst;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="text-8xl">🛒</div>
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500">Add some clothes to your laundry basket!</p>
        <button 
          onClick={() => setView('HOME')}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-blue-100"
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setView('CATEGORY')} className="p-2 bg-white rounded-xl border border-slate-100">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Order Details</h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        {cart.map((item) => (
          <div key={item.id} className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                <p className="text-xs text-slate-400">₹{item.price} / item</p>
              </div>
            </div>
            
            <div className="flex items-center bg-slate-50 rounded-lg">
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-blue-600"
              >
                -
              </button>
              <span className="w-6 text-center text-slate-700 font-bold text-sm">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-blue-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-slate-800">Bill Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Item Total</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Pickup & Delivery Charge</span>
            <span className={pickupCharge === 0 ? 'text-green-600' : ''}>
              {pickupCharge === 0 ? 'FREE' : `₹${pickupCharge}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>GST (18%)</span>
            <span>₹{gst}</span>
          </div>
          <hr className="border-slate-50 my-2" />
          <div className="flex justify-between font-bold text-lg text-slate-800 pt-2">
            <span>To Pay</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Safety info */}
      <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-blue-700 text-xs">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Clothes are processed in a WHO-certified sanitized environment.</span>
      </div>

      <div className="pb-4">
        <button 
          onClick={() => setView('BOOKING')}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-all text-lg"
        >
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

export default CartPage;
