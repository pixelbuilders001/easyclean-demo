
import React, { useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import { View } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <HomePage />;
      case 'CATEGORY': return <CategoryPage />;
      case 'CART': return <CartPage />;
      case 'BOOKING': return <BookingPage />;
      case 'PAYMENT': return <PaymentPage />;
      case 'CONFIRMATION': return <ConfirmationPage />;
      case 'TRACK': return <TrackOrderPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 pt-16 pb-24 md:pb-8">
        {renderView()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
