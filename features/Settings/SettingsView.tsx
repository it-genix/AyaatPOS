
import React, { useState } from 'react';
import { 
  Settings, Store, Percent, ShieldCheck, Database, RefreshCw, Save, 
  Trash2, Bell, Smartphone, Globe, Lock, ShieldAlert, Cpu, Sparkles, 
  MapPin, Phone, LayoutGrid, Plus, X, CheckCircle2, ChevronRight,
  Shield, UserCog, Languages, Clock, Zap, FileText, MonitorCheck
} from 'lucide-react';
import { CURRENT_USER, MOCK_STORES } from '../../mockData';
import { UserRole, Store as StoreType } from '../../types';
import { generateId } from '../../utils/helpers';

interface StoreModalProps {
  store?: StoreType;
  onClose: () => void;
  onSave: (store: StoreType) => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<StoreType>>(store || {
    name: '',
    code: '',
    address: '',
    phone: '',
    status: 'OPEN',
    terminalCount: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || generateId(),
    } as StoreType);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
              <Store size={22}/>
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">New Branch Entry</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Branch Name</label>
              <input 
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm" 
                placeholder="Ex: Gulshan Outlet"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Branch Code</label>
                <input 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-mono text-xs font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" 
                  placeholder="GUL-01"
                  value={formData.code} 
                  onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} 
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Active Terminals</label>
                <input 
                  type="number"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm" 
                  value={formData.terminalCount} 
                  onChange={e => setFormData({...formData, terminalCount: parseInt(e.target.value)})} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Physical Address</label>
              <input 
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm" 
                placeholder="Road 11, Block G..."
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Contact Hotline</label>
              <input 
                type="tel"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm" 
                placeholder="+880..."
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">Discard</button>
            <button type="submit" className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
              Confirm Branch
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SettingsView: React.FC = () => {
  const user = CURRENT_USER;
  const isAdmin = user.role === UserRole.ADMIN;

  const [activeTab, setActiveTab] = useState<'GENERAL' | 'BRANCHES' | 'PERMISSIONS' | 'SECURITY' | 'MAINTENANCE'>('GENERAL');
  const [stores, setStores] = useState<StoreType[]>(MOCK_STORES);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreType | undefined>(undefined);

  const [storeSettings, setStoreSettings] = useState({
    name: 'Ayaat Retail Terminal',
    terminalId: 'TER-01',
    currency: 'BDT',
    taxRate: 5,
    loyaltyDiscount: 5,
    pointsPerDollar: 10,
    language: 'English (US)',
    timezone: 'Asia/Dhaka (GMT+6)'
  });

  const [systemSettings, setSystemSettings] = useState({
    strictPin: true,
    autoLock: 15,
    enableAI: true,
    cloudSync: true,
    darkModeDefault: true
  });

  // Role Permissions Mock Configuration
  const [rolePermissions, setRolePermissions] = useState({
    CASHIER: {
      canRefund: false,
      canApplyManualDiscount: true,
      canEditStock: true,
      canViewCostPrice: false,
      canDeleteItemsFromCart: true
    },
    MANAGER: {
      canRefund: true,
      canApplyManualDiscount: true,
      canEditStock: true,
      canViewCostPrice: true,
      canDeleteItemsFromCart: true,
      canOverridePricing: true
    }
  });

  const handleSave = () => {
    alert('Enterprise Configuration Updated Successfully.');
  };

  const handleSaveStore = (store: StoreType) => {
    setStores(prev => {
      const exists = prev.find(s => s.id === store.id);
      if (exists) return prev.map(s => s.id === store.id ? store : s);
      return [...prev, store];
    });
    setShowStoreModal(false);
  };

  const togglePermission = (role: 'CASHIER' | 'MANAGER', key: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...(prev[role] as any),
        [key]: !(prev[role] as any)[key]
      }
    }));
  };

  if (!isAdmin) {
    return (
      <div className="h-full flex items-center justify-center p-10 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-md text-center space-y-4">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Access Restricted</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Global Settings and system parameters are reserved for Administrator accounts only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto custom-scrollbar transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Settings</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Enterprise-wide governance and operational logic.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          {activeTab === 'BRANCHES' && (
            <button 
              onClick={() => { setEditingStore(undefined); setShowStoreModal(true); }}
              className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-xs uppercase tracking-widest"
            >
              <Plus size={18} /> New Branch
            </button>
          )}
          <button 
            onClick={handleSave}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
          >
            <Save size={18} strokeWidth={3} /> Commit Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl w-fit shrink-0 overflow-x-auto no-scrollbar">
        {[
          { id: 'GENERAL', label: 'General', icon: Store },
          { id: 'BRANCHES', label: 'Branches', icon: LayoutGrid },
          { id: 'PERMISSIONS', label: 'Roles', icon: UserCog },
          { id: 'SECURITY', label: 'Security', icon: ShieldCheck },
          { id: 'MAINTENANCE', label: 'System', icon: Database }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'GENERAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 pb-10">
            {/* Store Identity */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600">
                  <Store size={22} />
                </div>
                <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Identity Management</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Business Identity</label>
                  <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none dark:text-white" value={storeSettings.name} onChange={e => setStoreSettings({...storeSettings, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Master Currency</label>
                    <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none uppercase dark:text-white" value={storeSettings.currency} onChange={e => setStoreSettings({...storeSettings, currency: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Tax Engine (%)</label>
                    <input type="number" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none dark:text-white" value={storeSettings.taxRate} onChange={e => setStoreSettings({...storeSettings, taxRate: parseFloat(e.target.value)})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Parameters */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600/10 rounded-2xl text-emerald-600">
                  <Globe size={22} />
                </div>
                <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Regional Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">System Language</label>
                  <select className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none appearance-none dark:text-white" value={storeSettings.language} onChange={e => setStoreSettings({...storeSettings, language: e.target.value})}>
                     <option>English (US)</option>
                     <option>Bengali (BD)</option>
                     <option>Arabic (SA)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Timezone Node</label>
                  <select className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none appearance-none dark:text-white" value={storeSettings.timezone} onChange={e => setStoreSettings({...storeSettings, timezone: e.target.value})}>
                     <option>Asia/Dhaka (GMT+6)</option>
                     <option>Asia/Dubai (GMT+4)</option>
                     <option>UTC (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI & Cloud Integration */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600/10 rounded-2xl text-purple-600">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">AI & Cloud Hub</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { id: 'enableAI', label: 'Predictive Inventory', desc: 'Auto-suggestions for stock replenishment', color: 'bg-purple-600' },
                   { id: 'cloudSync', label: 'Global Data Mirror', desc: 'Real-time backup across all nodes', color: 'bg-blue-600' }
                 ].map(item => (
                   <div key={item.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{item.label}</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => setSystemSettings({...systemSettings, [item.id]: !(systemSettings as any)[item.id]})}
                        className={`w-12 h-6 rounded-full transition-all relative ${(systemSettings as any)[item.id] ? item.color : 'bg-zinc-200 dark:bg-zinc-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(systemSettings as any)[item.id] ? 'left-7' : 'left-1'}`} />
                      </button>
                   </div>
                 ))}
              </div>
            </div>

            {/* Sales Terminal Parameters */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-600/10 rounded-2xl text-orange-600">
                  <MonitorCheck size={22} />
                </div>
                <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Terminal Parameters</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Automatic Session Lock</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Lock screen after inactivity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" className="w-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-center text-sm font-black outline-none dark:text-white" value={systemSettings.autoLock} onChange={e => setSystemSettings({...systemSettings, autoLock: parseInt(e.target.value)})} />
                    <span className="text-[10px] font-black text-zinc-400">MIN</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Dark Mode Enforcement</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Force dark theme on all terminals</p>
                  </div>
                  <button 
                    onClick={() => setSystemSettings({...systemSettings, darkModeDefault: !systemSettings.darkModeDefault})}
                    className={`w-12 h-6 rounded-full transition-all relative ${systemSettings.darkModeDefault ? 'bg-zinc-900' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${systemSettings.darkModeDefault ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'BRANCHES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 pb-10">
            {stores.map(st => (
              <div key={st.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col gap-6 hover:border-blue-600/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-blue-600 border border-zinc-100 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                    <Store size={28} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    st.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {st.status}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{st.name}</h4>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Branch Code: {st.code}</p>
                </div>
                <div className="space-y-3 pt-6 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center gap-3 text-zinc-500">
                    <MapPin size={14} />
                    <span className="text-[11px] font-bold">{st.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <Phone size={14} />
                    <span className="text-[11px] font-bold">{st.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <LayoutGrid size={14} />
                    <span className="text-[11px] font-bold">{st.terminalCount} Terminals Active</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setEditingStore(st); setShowStoreModal(true); }}
                  className="w-full py-4 mt-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-600/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Configure Branch
                </button>
              </div>
            ))}
            
            {/* Quick Add Placeholder */}
            <button 
              onClick={() => { setEditingStore(undefined); setShowStoreModal(true); }}
              className="border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-zinc-300 dark:text-zinc-800 hover:text-blue-500 hover:border-blue-500/50 transition-all group"
            >
              <Plus size={48} className="mb-4 group-hover:scale-125 transition-transform" />
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">Add New Storefront</span>
            </button>
          </div>
        )}

        {activeTab === 'PERMISSIONS' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 pb-10">
            {/* Cashier Permissions */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100">
                  <UserCog size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Cashier Role</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Terminal operational limits</p>
                </div>
              </div>
              <div className="space-y-6">
                {Object.entries(rolePermissions.CASHIER).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase">Access control level</p>
                    </div>
                    <button 
                      onClick={() => togglePermission('CASHIER', key)}
                      className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Manager Permissions */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600/10 rounded-2xl text-emerald-600">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Manager Role</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Delegated administrative powers</p>
                </div>
              </div>
              <div className="space-y-6">
                {Object.entries(rolePermissions.MANAGER).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase">Privileged access control</p>
                    </div>
                    <button 
                      onClick={() => togglePermission('MANAGER', key)}
                      className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-emerald-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SECURITY' && (
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-top-4">
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600/10 rounded-2xl text-amber-600">
                    <Lock size={22} />
                  </div>
                  <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Global Security Access</h3>
                </div>
                <div className="space-y-6">
                   {[
                     { id: 'strictPin', label: 'Strict PIN Enforcement', desc: 'Bypass prevented even for Managers' },
                     { id: 'maskIdentity', label: 'Personnel Privacy', desc: 'Mask sensitive contact info from Generic roles' },
                     { id: 'twoFactor', label: 'Global 2FA Override', desc: 'Mandatory for all Administrator accounts' }
                   ].map(sec => (
                     <div key={sec.id} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                        <div className="space-y-1">
                          <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{sec.label}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">{sec.desc}</p>
                        </div>
                        <button className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" /></button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'MAINTENANCE' && (
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-top-4 pb-10">
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600/10 rounded-2xl text-red-600">
                    <Database size={22} />
                  </div>
                  <h3 className="font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">System Reliability</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <button className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-blue-600/50 transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Index Optimization</p>
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Sync Catalog</p>
                      </div>
                      <RefreshCw size={20} className="text-zinc-300 group-hover:text-blue-600 group-hover:rotate-180 transition-all" />
                   </button>
                   <button className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-blue-600/50 transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Global Flush</p>
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Clear Caches</p>
                      </div>
                      <Globe size={20} className="text-zinc-300 group-hover:text-blue-600" />
                   </button>
                </div>
                <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800">
                   <button className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                     Purge All Transaction Data
                   </button>
                </div>
             </div>

             {/* Audit Ledger Link */}
             <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 flex items-center justify-between hover:scale-[1.02] transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                   <div className="p-4 bg-white/10 rounded-2xl"><FileText size={24}/></div>
                   <div>
                      <h4 className="text-lg font-black tracking-tight">Enterprise Audit Ledger</h4>
                      <p className="text-xs text-zinc-400 font-medium">Review detailed system logs and administrative changes.</p>
                   </div>
                </div>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
             </div>
          </div>
        )}
      </div>

      {showStoreModal && (
        <StoreModal 
          store={editingStore} 
          onClose={() => setShowStoreModal(false)} 
          onSave={handleSaveStore} 
        />
      )}
    </div>
  );
};

export default SettingsView;
