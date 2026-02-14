import React, { useState } from 'react';
import { useApp } from '../AppContext';

const AdminLoginPage: React.FC = () => {
  const { setView } = useApp();
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.user === 'admin' && credentials.pass === 'admin123') {
      setView('ADMIN_DASHBOARD');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="py-12 flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-100">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Portal</h1>
      <p className="text-slate-500 mb-8">Login to manage orders and shop status</p>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Username</label>
            <input 
              type="text" 
              placeholder="Enter admin username"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-400"
              value={credentials.user}
              onChange={(e) => setCredentials({...credentials, user: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Password</label>
            <input 
              type="password" 
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-400"
              value={credentials.pass}
              onChange={(e) => setCredentials({...credentials, pass: e.target.value})}
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          Sign In
        </button>
        
        <p className="text-center text-xs text-slate-400 mt-4">
          Demo: use <span className="font-bold">admin</span> / <span className="font-bold">admin123</span>
        </p>
      </form>
    </div>
  );
};

export default AdminLoginPage;