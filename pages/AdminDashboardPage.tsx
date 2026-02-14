import React, { useState, useMemo } from 'react';
import { useApp } from '../AppContext';
import { Order } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { orders, addOrder, updateOrderStatus, deleteOrder } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'orders' | 'add'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Customer & Meta Info for New Order
  const [customerData, setCustomerData] = useState({
    name: '',
    mobile: '',
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  // Current items being added to the order
  const [currentItems, setCurrentItems] = useState<{ id: string; type: string; service: string; qty: number; price: number }[]>([]);

  // Individual item entry state
  const [itemEntry, setItemEntry] = useState({
    type: 'Shirt',
    service: 'Dry Clean',
    qty: 1,
    price: ''
  });

  const summary = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt.startsWith(today)).length;
    const pending = orders.filter(o => o.status !== 'Delivered').length;
    const ready = orders.filter(o => o.status === 'Ready').length;
    const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
    return { todayOrders, pending, ready, revenue };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.mobile.includes(searchQuery) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const addItemToOrder = () => {
    if (!itemEntry.price) {
      alert("Please enter a price for the item");
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      type: itemEntry.type,
      service: itemEntry.service,
      qty: itemEntry.qty,
      price: parseFloat(itemEntry.price)
    };
    setCurrentItems([...currentItems, newItem]);
    setItemEntry({ ...itemEntry, qty: 1, price: '' });
  };

  const removeItem = (id: string) => {
    setCurrentItems(currentItems.filter(i => i.id !== id));
  };

  const calculateTotal = () => {
    return currentItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItems.length === 0) {
      alert("Please add at least one item to the order");
      return;
    }

    const orderId = 'CS-' + Math.floor(1000 + Math.random() * 9000);
    const order: any = {
      id: orderId,
      customerName: customerData.name,
      mobile: customerData.mobile,
      totalAmount: calculateTotal(),
      status: 'Pickup Scheduled',
      createdAt: new Date().toISOString(),
      pickupDate: new Date().toISOString().split('T')[0],
      pickupSlot: 'Admin Entry',
      items: currentItems.map(i => ({
        id: i.id,
        name: i.type,
        category: i.service,
        price: i.price,
        quantity: i.qty
      }))
    };
    
    addOrder(order);
    alert(`Order Created! Token: ${orderId}`);
    
    // Reset Everything
    setCustomerData({
      name: '',
      mobile: '',
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setCurrentItems([]);
    setActiveTab('orders');
  };

  const statusOptions: Order['status'][] = ['Pickup Scheduled', 'Picked Up', 'In Cleaning', 'Ready', 'Out for Delivery', 'Delivered'];

  return (
    <div className="py-4 space-y-6">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-extrabold text-slate-800">Shop Dashboard</h1>
        <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md">Live</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
        {(['summary', 'orders', 'add'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'
            }`}
          >
            {tab === 'add' ? 'New Order' : tab}
          </button>
        ))}
      </div>

      {activeTab === 'summary' && (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Today</p>
            <h3 className="text-2xl font-black text-slate-800">{summary.todayOrders}</h3>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending</p>
            <h3 className="text-2xl font-black text-orange-600">{summary.pending}</h3>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ready</p>
            <h3 className="text-2xl font-black text-blue-600">{summary.ready}</h3>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue</p>
            <h3 className="text-2xl font-black text-green-600">₹{summary.revenue}</h3>
          </div>
          
          <div className="col-span-2 bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-lg font-bold mb-1">Quick Action</h4>
                <p className="text-blue-100 text-xs mb-4">You have {summary.pending} orders to process today.</p>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-xl text-xs font-bold"
                >
                  View Queue
                </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex gap-2">
            <input 
              type="text" 
              placeholder="Search mobile, name or ID..."
              className="flex-grow bg-slate-50 border-none rounded-xl px-4 py-2 text-sm text-slate-800 focus:ring-1 focus:ring-blue-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              className="bg-slate-50 border-none rounded-xl px-2 py-2 text-[10px] font-bold text-slate-800 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-slate-400 py-10 text-sm">No orders found.</p>
            ) : filteredOrders.map(order => (
              <div key={order.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{order.customerName}</h4>
                    <p className="text-xs text-slate-400">{order.mobile} • #{order.id}</p>
                  </div>
                  <button 
                    onClick={() => { if(confirm('Delete order?')) deleteOrder(order.id) }}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-600">₹{order.totalAmount}</span>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className={`px-3 py-1.5 rounded-full font-black text-[10px] uppercase border-none focus:ring-0 ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 px-1">Customer Info</h2>
            <div className="space-y-3">
              <input 
                required
                type="text" 
                placeholder="Customer Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 focus:bg-white outline-none transition-all"
                value={customerData.name}
                onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
              />
              <input 
                required
                type="tel" 
                placeholder="Mobile Number"
                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 focus:bg-white outline-none transition-all"
                value={customerData.mobile}
                onChange={(e) => setCustomerData({...customerData, mobile: e.target.value})}
              />
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Expected Delivery</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 outline-none"
                  value={customerData.deliveryDate}
                  onChange={(e) => setCustomerData({...customerData, deliveryDate: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 px-1">Add Items</h2>
            <div className="grid grid-cols-2 gap-2">
               <select 
                 className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 text-sm outline-none"
                 value={itemEntry.type}
                 onChange={(e) => setItemEntry({...itemEntry, type: e.target.value})}
               >
                 <option>Shirt</option>
                 <option>T-Shirt</option>
                 <option>Saree</option>
                 <option>Suit</option>
                 <option>Blanket</option>
                 <option>Lehenga</option>
                 <option>Shoes</option>
                 <option>Curtains</option>
                 <option>Other</option>
               </select>
               <select 
                 className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 text-sm outline-none"
                 value={itemEntry.service}
                 onChange={(e) => setItemEntry({...itemEntry, service: e.target.value})}
               >
                 <option>Dry Clean</option>
                 <option>Wash & Iron</option>
                 <option>Steam Iron</option>
                 <option>Shoe Clean</option>
                 <option>Stain Removal</option>
               </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
               <input 
                type="number" 
                placeholder="Qty"
                className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 outline-none"
                value={itemEntry.qty}
                onChange={(e) => setItemEntry({...itemEntry, qty: parseInt(e.target.value) || 1})}
              />
               <input 
                type="number" 
                placeholder="Price per item"
                className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 outline-none"
                value={itemEntry.price}
                onChange={(e) => setItemEntry({...itemEntry, price: e.target.value})}
              />
            </div>
            <button 
              type="button"
              onClick={addItemToOrder}
              className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-bold border border-blue-100 active:scale-95 transition-all text-sm uppercase tracking-wider"
            >
              + Add Item to List
            </button>
          </section>

          {currentItems.length > 0 && (
            <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-800 px-1">Order Summary</h2>
              <div className="space-y-2">
                {currentItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex-grow">
                      <p className="font-bold text-xs text-slate-800">{item.type} x {item.qty}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{item.service}</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <p className="font-black text-xs text-blue-600">₹{item.price * item.qty}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center px-1">
                <span className="text-slate-500 font-bold text-sm">Total Payable</span>
                <span className="text-xl font-black text-slate-900">₹{calculateTotal()}</span>
              </div>
            </section>
          )}

          <button 
            type="button"
            onClick={handleAddOrder}
            disabled={currentItems.length === 0}
            className={`w-full py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest ${
              currentItems.length > 0 
              ? 'bg-blue-600 text-white shadow-blue-100' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            Create Order & Generate Token
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;