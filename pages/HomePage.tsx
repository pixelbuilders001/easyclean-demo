
import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { CATEGORIES } from '../data';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Premium Dry Cleaning & Laundry",
    subtitle: "World-class care for your everyday and luxury garments.",
    image: "https://plus.unsplash.com/premium_photo-1682129242439-952d7d2e7902?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Book Now"
  },
  {
    id: 2,
    title: "Eco-Friendly Expert Care",
    subtitle: "Gentle on fabrics, tough on stains. Sustainable cleaning at its best.",
    image: "https://plus.unsplash.com/premium_photo-1682129257696-dfe914806043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Explore Services"
  },
  {
    id: 3,
    title: "Express 24h Delivery",
    subtitle: "Need it quick? Our express service gets you ready for your big day.",
    image: "https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Track Order"
  }
];

const HomePage: React.FC = () => {
  const { setView, setSelectedCategory } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (cat: typeof CATEGORIES[0]) => {
    setSelectedCategory(cat.name);
    setView('CATEGORY');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Improved Hero Carousel */}
      <section className="relative h-72 md:h-96 w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-100 group">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-slate-900">
                <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <div className={`transition-all duration-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h1 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                    {slide.title}
                </h1>
                <p className="text-blue-50/90 text-sm md:text-lg mb-6 font-medium max-w-[90%] drop-shadow-md">
                    {slide.subtitle}
                </p>
                <div className="flex gap-3">
                    <button 
                    onClick={() => { setSelectedCategory(null); setView('CATEGORY'); }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-900/40 active:scale-95 transition-all text-sm md:text-base"
                    >
                    {slide.cta}
                    </button>
                    {index === 2 && (
                    <button 
                        onClick={() => setView('TRACK')}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-2xl font-bold active:scale-95 transition-all text-sm md:text-base"
                    >
                        Track Order
                    </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}

       
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { title: 'Free Pickup', icon: '🚚', color: 'bg-green-50 text-green-700' },
          { title: '48h Delivery', icon: '⚡', color: 'bg-orange-50 text-orange-700' },
          // { title: 'Safe & Clean', icon: '✨', color: 'bg-purple-50 text-purple-700' },
          // { title: 'Updates', icon: '📱', color: 'bg-blue-50 text-blue-700' },
        ].map((h, i) => (
          <div key={i} className={`${h.color} p-4 rounded-3xl flex flex-col items-center justify-center gap-1 border border-black/5 shadow-sm active:scale-95 transition-transform cursor-default`}>
            <span className="text-2xl mb-1">{h.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-center">{h.title}</span>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-800 px-1">How It Works</h2>
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-6">
          {[
            { step: 1, title: 'Select Clothes', desc: 'Choose items from our menu' },
            { step: 2, title: 'Schedule Pickup', desc: 'Pick a convenient time slot' },
            { step: 3, title: 'We Clean', desc: 'Expert care for your fabrics' },
            { step: 4, title: 'Delivered', desc: 'Fresh clothes back at home' },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {s.step}
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-slate-800 text-sm">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-xl font-bold text-slate-800">Categories</h2>
          <button 
            onClick={() => { setSelectedCategory(null); setView('CATEGORY'); }}
            className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.slice(0, 6).map((cat, i) => (
            <div 
              key={i} 
              onClick={() => handleCategoryClick(cat)}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">{cat.icon}</div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{cat.name}</h3>
              <p className="text-[10px] text-slate-400 font-medium mb-3">Starting at ₹{cat.startingPrice}</p>
              <div className="w-full py-2 bg-slate-50 text-blue-600 rounded-xl text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors text-center uppercase tracking-wider">
                Select
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10">
            <span className="text-3xl">🧼</span>
          </div>
          <h3 className="text-xl font-bold mb-2">100% Hygiene Guaranteed</h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-[80%] mx-auto">
            Your clothes are handled with utmost care using hospital-grade sterilization and premium detergents.
          </p>
          <button className="text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors">
            Our Cleaning Process &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
