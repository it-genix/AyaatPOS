import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Package, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const data = [
  { name: '08:00', sales: 400 },
  { name: '10:00', sales: 1200 },
  { name: '12:00', sales: 3400 },
  { name: '14:00', sales: 2800 },
  { name: '16:00', sales: 3800 },
  { name: '18:00', sales: 4200 },
  { name: '20:00', sales: 1800 },
];

const topProducts = [
  { name: 'Wireless Mouse', value: 450, color: '#3b82f6' },
  { name: 'Mechanical Keyboard', value: 380, color: '#6366f1' },
  { name: 'USB-C Charger', value: 320, color: '#8b5cf6' },
  { name: 'Headphones', value: 290, color: '#a855f7' },
];

const AnalyticsView: React.FC = () => {
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="p-4 sm:p-8 h-full flex flex-col gap-6 sm:gap-8 bg-white dark:bg-zinc-950 overflow-y-auto transition-colors custom-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Performance Overview</h2>
          <p className="text-zinc-500 text-[10px] sm:text-base">Real-time terminal sales reporting.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all">
            Today
          </button>
          <button className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shrink-0">
        {[
          { label: 'Today\'s Sales', value: '$12,450.00', icon: DollarSign, trend: '+12.5%', color: 'text-blue-600 dark:text-blue-500' },
          { label: 'Total Orders', value: '154', icon: Package, trend: '+8.2%', color: 'text-purple-600 dark:text-purple-500' },
          { label: 'New Customers', value: '12', icon: Users, trend: '+4.1%', color: 'text-green-600 dark:text-green-500' },
          { label: 'Avg. Ticket', value: '$80.84', icon: TrendingUp, trend: '-2.4%', color: 'text-orange-600 dark:text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-50 dark:bg-zinc-900 p-5 sm:p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 hover:border-blue-600/20 transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-500' : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-zinc-500 text-[10px] sm:text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pb-8">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">Hourly Volume</h3>
          </div>
          <div className="h-[250px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#27272a" : "#e4e4e7"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#71717a' : '#a1a1aa', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#71717a' : '#a1a1aa', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#18181b' : '#ffffff', 
                    border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`, 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: isDark ? '#fff' : '#18181b' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold mb-6 text-zinc-900 dark:text-zinc-100">Best Sellers</h3>
            <div className="space-y-5">
              {topProducts.map((p, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] sm:text-sm">
                    <span className="text-zinc-700 dark:text-zinc-300 font-bold">{p.name}</span>
                    <span className="text-zinc-500">{p.value}u</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(p.value / 500) * 100}%`, backgroundColor: p.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 rounded-[2rem] text-white relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-blue-600/20">
            <Sparkles className="absolute top-4 right-4 text-blue-200/40" size={24} />
            <div className="relative z-10">
              <h4 className="text-base font-bold mb-1.5">AI Insights</h4>
              <p className="text-[11px] sm:text-xs text-blue-100 mb-4 leading-relaxed">
                Projected growth of 15% next week in "Electronics". Consider restocking popular items.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all backdrop-blur-md">
                Detailed Forecast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;