
import React, { useState } from 'react';
import { 
  Settings, Store, Percent, ShieldCheck, Database, RefreshCw, Save, 
  Trash2, Bell, Smartphone, Globe, Lock, ShieldAlert, Cpu, Sparkles, 
  MapPin, Phone, LayoutGrid, Plus, X, CheckCircle2, ChevronRight,
  ReceiptText, FileText, UserSquare, Shield, AlertTriangle, Eye,
  Fingerprint, MonitorCheck, HardDrive, History
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

  const [activeTab, setActiveTab] = useState<'GENERAL' | 'BRANCHES' | 'ROLES' | 'SECURITY' | 'MAINTENANCE'>('GENERAL');
  const [stores, setStores] = useState<StoreType[]>(MOCK_STORES);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreType | undefined>(undefined);

  const [storeSettings, setStoreSettings] = useState({
    name: 'Ayaat Retail Terminal',
    terminalId: 'TER-01',
    currency: 'BDT',
    taxRate: 5,
    loyaltyDiscount: 5,
    pointsPerUnit: 10,
    allowNegativeStock: false,
    requireCustomer: false,
    receiptHeader: 'Thank you for choosing Ayaat!',
    receiptFooter: 'Warranty valid for 7 days with original receipt.',
    websiteUrl: 'https://ayaatpos.com'
  });

  const [permissions, setPermissions] = useState({
    CASHIER: { voidSale: false, editPrice: false, openDrawer: true, registerCustomer: true },
    MANAGER: { voidSale: true, editPrice: true, openDrawer: true, registerCustomer: true },
    ADMIN: { voidSale: true, editPrice: true, openDrawer: true, registerCustomer: true }
  });

  const [systemSettings, setSystemSettings] = useState({
    strictPin: true,
    autoLock: 15,
    enableAI: true,
    cloudSync: true,
    darkModeDefault: true,
    biometricAuth: false,
    auditLogging: true
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

  const togglePermission = (role: keyof typeof permissions, perm: string) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...(prev[role] as any),
        [perm]: !(prev[role] as any)[perm]
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
          <h2 className="text-2xl font-black tracking-tight">Access Restricted</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Global Settings are reserved for Administrator accounts only. Please contact your system provider for elevation.
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
          { id: 'ROLES', label: 'Roles', icon: Shield },
          { id: 'SECURITY', label: 'Security', icon: Lock },
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
            {/* Identity Panel */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600">
                  <Store size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Identity & Localization</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Core business configuration</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Master Brand Name</label>
                  <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={storeSettings.name} onChange={e => setStoreSettings({...storeSettings, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Tax Engine (%)</label>
                    <input type="number" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={storeSettings.taxRate} onChange={e => setStoreSettings({...storeSettings, taxRate: parseFloat(e.target.value)})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Terminal ID</label>
                    <input className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-mono text-xs font-bold outline-none opacity-60" value={storeSettings.terminalId} readOnly />
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Panel */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600/10 rounded-2xl text-emerald-600">
                  <ReceiptText size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Receipt Designer</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Customer billing template</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Header Message</label>
                  <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={storeSettings.receiptHeader} onChange={e => setStoreSettings({...storeSettings, receiptHeader: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Footer Legal/Policy</label>
                  <textarea rows={2} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-medium outline-none text-sm" value={storeSettings.receiptFooter} onChange={e => setStoreSettings({...storeSettings, receiptFooter: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Operational Panel */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-600/10 rounded-2xl text-amber-600">
                  <MonitorCheck size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Operational Logic</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Terminal behavioral rules</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                 {[
                   { id: 'allowNegativeStock', label: 'Allow Negative Stock', desc: 'Allow sales even if quantity is zero in database' },
                   { id: 'requireCustomer', label: 'Mandatory CRM Entry', desc: 'Require a customer profile for every transaction' },
                   { id: 'cloudSync', label: 'Real-time Mirroring', desc: 'Sync local sales to cloud instantly' },
                   { id: 'enableAI', label: 'Predictive Insights', desc: 'Enable AI performance forecasting' }
                 ].map(item => (
                   <div key={item.id} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{item.label}</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => setStoreSettings(prev => ({...prev, [item.id]: !(prev as any)[item.id]}))}
                        className={`w-12 h-6 rounded-full transition-all relative ${(storeSettings as any)[item.id] ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(storeSettings as any)[item.id] ? 'left-7' : 'left-1'}`} />
                      </button>
                   </div>
                 ))}
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
            
            <button 
              onClick={() => { setEditingStore(undefined); setShowStoreModal(true); }}
              className="border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-zinc-300 dark:text-zinc-800 hover:text-blue-500 hover:border-blue-500/50 transition-all group min-h-[350px]"
            >
              <Plus size={48} className="mb-4 group-hover:scale-125 transition-transform" />
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">Add New Storefront</span>
            </button>
          </div>
        )}

        {activeTab === 'ROLES' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4 mb-10">
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-800/20">
               <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600">
                 <Shield size={22} />
               </div>
               <div>
                  <h3 className="font-black text-xl tracking-tight">Privilege Matrix</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Fine-grained role access control</p>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 text-[10px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800">
                  <tr>
                    <th className="px-10 py-6">Operation Capability</th>
                    <th className="px-10 py-6 text-center">Cashier</th>
                    <th className="px-10 py-6 text-center">Manager</th>
                    <th className="px-10 py-6 text-center">Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  {[
                    { key: 'voidSale', label: 'Void Completed Transactions', desc: 'Permission to delete or reverse a sale' },
                    { key: 'editPrice', label: 'Override Item Pricing', desc: 'Allows manual price adjustment at POS' },
                    { key: 'openDrawer', label: 'Manual Drawer Release', desc: 'Permission to trigger cash drawer without sale' },
                    { key: 'registerCustomer', label: 'Register New Members', desc: 'Can add customers to CRM database' }
                  ].map(op => (
                    <tr key={op.key} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                      <td className="px-10 py-6">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{op.label}</p>
                          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wide">{op.desc}</p>
                        </div>
                      </td>
                      {(['CASHIER', 'MANAGER', 'ADMIN'] as const).map(role => (
                        <td key={role} className="px-10 py-6 text-center">
                          <button 
                            disabled={role === 'ADMIN'}
                            onClick={() => togglePermission(role, op.key)}
                            className={`w-10 h-5 rounded-full transition-all relative inline-block ${
                              (permissions[role] as any)[op.key] ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                            } ${role === 'ADMIN' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                              (permissions[role] as any)[op.key] ? 'left-5.5' : 'left-0.5'
                            }`} />
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-indigo-50 dark:bg-indigo-900/10 border-t border-indigo-100 dark:border-indigo-800 flex items-center gap-4">
               <ShieldAlert size={20} className="text-indigo-600 shrink-0" />
               <p className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest leading-relaxed">
                 Administrative role permissions are immutable to prevent system lockout. Role definitions are synchronized across all terminals in the enterprise network.
               </p>
            </div>
          </div>
        )}

        {activeTab === 'SECURITY' && (
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-top-4 pb-10">
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600/10 rounded-2xl text-red-600">
                    <Lock size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight">Security & Encryption</h3>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global access protection</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { id: 'strictPin', label: 'Strict PIN Enforcement', desc: 'Bypass prevented even for Senior Managers', icon: Fingerprint },
                     { id: 'auditLogging', label: 'Full Audit Mirroring', desc: 'Log every button press to blockchain ledger', icon: History },
                     { id: 'biometricAuth', label: 'Biometric Checkpoint', desc: 'Secondary face/touch ID for high-value voids', icon: Smartphone }
                   ].map(sec => (
                     <div key={sec.id} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                        <div className="flex gap-4">
                          <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl text-zinc-400"><sec.icon size={16}/></div>
                          <div className="space-y-0.5">
                            <p className="text-sm font-black">{sec.label}</p>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase">{sec.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSystemSettings(prev => ({...prev, [sec.id]: !(prev as any)[sec.id]}))}
                          className={`w-12 h-6 rounded-full transition-all relative ${(systemSettings as any)[sec.id] ? 'bg-red-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(systemSettings as any)[sec.id] ? 'left-7' : 'left-1'}`} />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'MAINTENANCE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 pb-10">
             <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-600">
                    <Database size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight">System Reliability</h3>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Maintenance & Sync</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <button className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-blue-600/50 transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Index Optimization</p>
                        <p className="text-sm font-black">Rebuild Catalog Cache</p>
                      </div>
                      <RefreshCw size={20} className="text-zinc-300 group-hover:text-blue-600 group-hover:rotate-180 transition-all" />
                   </button>
                   <button className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-blue-600/50 transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Mirror Protocol</p>
                        <p className="text-sm font-black">Force Cloud Sync</p>
                      </div>
                      <Globe size={20} className="text-zinc-300 group-hover:text-blue-600" />
                   </button>
                   <button className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-blue-600/50 transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Asset Backup</p>
                        <p className="text-sm font-black">Export Local DB</p>
                      </div>
                      <HardDrive size={20} className="text-zinc-300 group-hover:text-blue-600" />
                   </button>
                   <button className="flex items-center justify-between p-6 bg-red-500/5 dark:bg-red-500/10 rounded-3xl border border-red-200 dark:border-red-900/30 hover:bg-red-500 hover:text-white transition-all group">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-red-400 group-hover:text-white mb-1">Emergency Protocol</p>
                        <p className="text-sm font-black">Purge Data</p>
                      </div>
                      <Trash2 size={20} className="text-red-400 group-hover:text-white" />
                   </button>
                </div>
             </div>

             <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-600/20 rounded-full blur-[80px]" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white"><Cpu size={24}/></div>
                  <h4 className="text-lg font-black text-white leading-tight">Terminal Engine v8.4.2-ENT</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase"><span>Kernel Status</span><span className="text-emerald-500">STABLE</span></div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase"><span>Sync Nodes</span><span className="text-blue-400">12 ONLINE</span></div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase"><span>Uptime</span><span className="text-white">99.98%</span></div>
                  </div>
                </div>
                <button className="relative z-10 w-full py-4 mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all">Check for Core Updates</button>
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
