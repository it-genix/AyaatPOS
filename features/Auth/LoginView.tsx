
import React, { useState } from 'react';
import { User, Lock, ArrowRight, ShieldCheck, UserCircle2, ChevronRight, LogIn, Check } from 'lucide-react';
import { User as UserType, UserRole } from '../../types';
import { MOCK_USERS } from '../../mockData';

interface LoginViewProps {
  onLogin: (user: UserType) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [pin, setPin] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Branding Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-2xl mb-6">A</div>
            <h1 className="text-4xl font-black tracking-tightest leading-tight">AyaatPOS<br/>Terminal Suite</h1>
            <p className="mt-4 text-blue-100 font-medium leading-relaxed">Enterprise-grade retail management with real-time analytics and multi-role synchronization.</p>
          </div>
          
          <div className="relative z-10 flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
            <div className="p-3 bg-white/20 rounded-2xl"><ShieldCheck size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Security Protocol</p>
              <p className="text-sm font-bold tracking-tight">Active Session Encryption v4.2</p>
            </div>
          </div>

          {/* Abstract Design Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="w-full h-full border-[40px] border-white rounded-full scale-150" />
          </div>
        </div>

        {/* Login Form Side */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-zinc-900">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-black text-white tracking-tight">Terminal Access</h2>
            <p className="text-zinc-500 text-sm font-medium mt-1">Select your profile to initialize terminal session.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Staff Profile</label>
              <div className="grid grid-cols-1 gap-2">
                {MOCK_USERS.filter(u => u.status === 'ACTIVE').map(user => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      selectedUser?.id === user.id 
                      ? 'bg-blue-600/10 border-blue-500 ring-2 ring-blue-500/20' 
                      : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-500 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${selectedUser?.id === user.id ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-500'}`}>
                        <User size={20} />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-bold ${selectedUser?.id === user.id ? 'text-white' : ''}`}>{user.name}</p>
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-wider">{user.role}</p>
                      </div>
                    </div>
                    {selectedUser?.id === user.id && <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white"><Check size={12} strokeWidth={4}/></div>}
                  </button>
                ))}
              </div>
            </div>

            {selectedUser && (
              <div className="space-y-3 animate-in slide-in-from-top-4 duration-300">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Security PIN</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 pl-14 pr-5 text-white tracking-[1em] focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-black"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedUser || pin.length < 4}
              className="w-full py-5 bg-blue-600 disabled:bg-zinc-800 text-white disabled:text-zinc-600 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95 group shadow-lg"
            >
              Initialize Terminal
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-center gap-2 text-zinc-600">
            <ShieldCheck size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Terminal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
