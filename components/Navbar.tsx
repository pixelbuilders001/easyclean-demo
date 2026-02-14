
import React from 'react';
import { useApp } from '../AppContext';

const Navbar: React.FC = () => {
  const { setView, cart, currentView } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isAdminView = currentView === 'ADMIN_DASHBOARD' || currentView === 'ADMIN_LOGIN';

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center px-4 justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => setView('HOME')}
      >
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">CleanSwift</span>
      </div>

      <div className="flex items-center gap-3">
        {!isAdminView && currentView !== 'TRACK' && (
           <button 
           onClick={() => setView('TRACK')}
           className="text-xs font-bold text-slate-600 px-3 py-1.5 rounded-full bg-slate-100 active:scale-95 transition-all"
         >
           Track
         </button>
        )}

        {!isAdminView && (
          <button 
            onClick={() => setView('ADMIN_LOGIN')}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            title="Admin Login"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        )}

        {isAdminView && (
          <button 
            onClick={() => setView('HOME')}
            className="text-xs font-bold text-red-600 px-3 py-1.5 rounded-full bg-red-50 active:scale-95 transition-all"
          >
            Exit
          </button>
        )}
       
        {!isAdminView && (
          <button 
            onClick={() => setView('CART')}
            className="relative p-2 text-slate-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
