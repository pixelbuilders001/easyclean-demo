
import React, { useMemo } from 'react';
import { useApp } from '../AppContext';
import { SERVICE_ITEMS, CATEGORIES } from '../data';
import { Category } from '../types';

const CategoryPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory, addToCart, cart, updateQuantity, setView } = useApp();

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return SERVICE_ITEMS;
    return SERVICE_ITEMS.filter(i => i.category === selectedCategory);
  }, [selectedCategory]);

  const getItemQty = (id: string) => {
    return cart.find(i => i.id === id)?.quantity || 0;
  };

  return (
    <div className="py-4 space-y-6">
      {/* Category Horizontal Nav */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 sticky top-16 bg-white/80 backdrop-blur-sm -mx-4 px-4 py-2 z-40 border-b border-slate-100">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border transition-all ${
            !selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat, i) => (
          <button 
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border transition-all ${
              selectedCategory === cat.name ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => {
          const qty = getItemQty(item.id);
          return (
            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 rounded-2xl object-cover bg-slate-100" 
              />
              <div className="flex-grow">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{item.category}</p>
                <p className="text-blue-600 font-bold">₹{item.price}</p>
              </div>
              
              {qty === 0 ? (
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 active:scale-95"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center bg-blue-50 border border-blue-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-2 text-blue-600 font-bold hover:bg-blue-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-blue-700 font-bold">{qty}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-2 text-blue-600 font-bold hover:bg-blue-100"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-xl mx-auto z-50">
          <button 
            onClick={() => setView('CART')}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-between px-6 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
              <span>View Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span>₹{cart.reduce((a, b) => a + (b.price * b.quantity), 0)}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
