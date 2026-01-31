
import React, { useState, useMemo } from 'react';
import { Users, Search, Plus, Mail, Phone, History, Edit, X, Star, ChevronDown, ChevronUp, ShoppingBag, Calendar, ReceiptText, Tag, UserPlus, CheckCircle2, Percent, ShieldCheck } from 'lucide-react';
import { MOCK_CUSTOMERS, CURRENT_USER } from '../../mockData';
import { Customer, Sale, UserRole } from '../../types';
import { formatCurrency, generateId } from '../../utils/helpers';

// Helper to generate dummy sales for the history view
const generateMockHistory = (customerId: string): Sale[] => {
  return [
    {
      id: `S-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      items: [
        { id: '1', sku: 'ELEC-001', name: 'Ultra Wireless Mouse', category: 'Electronics', price: 39.99, cost: 20, stock: 10, minStock: 2, quantity: 1 }
      ],
      subtotal: 39.99,
      tax: 3.20,
      discount: 0,
      total: 43.19,
      paymentMethod: 'CARD',
      customerId,
      cashierId: 'u1'
    }
  ];
};

interface CustomerModalProps {
  customer?: Customer;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onClose, onSave }) => {
  const isEdit = !!customer;
  const user = CURRENT_USER;
  const canEditDiscount = user.role === UserRole.ADMIN || user.role === UserRole.MANAGER;

  const [formData, setFormData] = useState<Partial<Customer>>(customer || {
    name: '', 
    email: '', 
    phone: '', 
    membershipId: `MEM-${Math.floor(10000 + Math.random() * 90000)}`, 
    loyaltyPoints: 0, 
    totalSpent: 0,
    discountLevel: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Full name is required';
    if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    
    const discount = Number(formData.discountLevel);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ 
        ...formData, 
        id: formData.id || generateId(), 
        joinDate: formData.joinDate || new Date().toISOString(),
        discountLevel: Number(formData.discountLevel) || 0
      } as Customer);
    }
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
              {isEdit ? <Edit size={22}/> : <UserPlus size={22}/>}
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                {isEdit ? 'Update Member' : 'Register New Member'}
              </h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                {isEdit ? 'Modify existing account' : 'Create a new loyalty profile'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Identity Details</label>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <input 
                    className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                    placeholder="Member Full Name"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                    autoFocus 
                  />
                  {errors.name && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.name}</p>}
                </div>
                <div className="relative">
                  <input 
                    className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-mono text-xs text-zinc-500 outline-none cursor-not-allowed" 
                    value={formData.membershipId} 
                    readOnly
                    title="Membership ID is auto-generated"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300">
                    <Tag size={14} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Contact Information</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                  {errors.email && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.email}</p>}
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="Phone Number"
                    className={`w-full bg-zinc-50 dark:bg-zinc-900 border ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    required 
                  />
                  {errors.phone && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* NEW: Loyalty & Perks Section */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loyalty & Perks</label>
                {!canEditDiscount && <ShieldCheck size={10} className="text-zinc-300" />}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl">
                   <div className="flex justify-between items-center mb-1">
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Membership Discount</p>
                      {canEditDiscount && <Edit size={10} className="text-blue-500" />}
                   </div>
                   <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        disabled={!canEditDiscount}
                        className={`w-full bg-transparent font-black text-xl outline-none ${canEditDiscount ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 cursor-not-allowed'}`}
                        value={formData.discountLevel}
                        onChange={e => setFormData({...formData, discountLevel: Number(e.target.value)})}
                      />
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400"><Percent size={16}/></span>
                   </div>
                   {errors.discount && <p className="text-[8px] font-black text-red-500 uppercase mt-1">{errors.discount}</p>}
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl flex flex-col justify-center">
                   <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter mb-1">Total Rewards Point</p>
                   <p className="text-xl font-black text-amber-500 flex items-center gap-2">
                     {formData.loyaltyPoints} <Star size={14} fill="currentColor"/>
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              {isEdit ? 'Save Changes' : 'Confirm Registration'}
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CRMView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.membershipId.toLowerCase().includes(search.toLowerCase()) || 
      c.phone.includes(search)
    );
  }, [customers, search]);

  const toggleHistory = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSaveCustomer = (customer: Customer) => {
    setCustomers(prev => {
      const exists = prev.find(c => c.id === customer.id);
      if (exists) {
        return prev.map(c => c.id === customer.id ? customer : c);
      }
      return [customer, ...prev];
    });
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-6 sm:gap-10 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto relative transition-colors custom-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="min-w-0">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Customers</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Manage member profiles and loyalty rewards.</p>
        </div>
        <button 
          onClick={() => { setSelectedCustomer(undefined); setShowModal(true); }} 
          className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          <UserPlus size={18} strokeWidth={3} /> Register Member
        </button>
      </div>

      <div className="relative w-full max-w-2xl shrink-0 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search by name, ID, or phone..." 
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl py-4 sm:py-5 pl-14 pr-6 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm sm:text-base shadow-sm" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8 pb-10">
        {filteredCustomers.map(customer => {
          const isExpanded = expandedId === customer.id;
          const mockHistory = isExpanded ? generateMockHistory(customer.id) : [];

          return (
            <div key={customer.id} className={`bg-white dark:bg-zinc-900 rounded-[2.5rem] border transition-all duration-300 relative group shadow-sm overflow-hidden flex flex-col ${isExpanded ? 'border-blue-600 ring-4 ring-blue-600/5' : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-600/40'}`}>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-5 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl sm:text-2xl shrink-0 border border-zinc-100 dark:border-zinc-700">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest truncate leading-tight">{customer.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="text-[9px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-600/10 px-2 py-0.5 rounded-md w-fit">{customer.membershipId}</div>
                       {customer.discountLevel > 0 && (
                          <div className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-600/10 px-2 py-0.5 rounded-md w-fit flex items-center gap-1">
                            <Percent size={8}/> {customer.discountLevel} Discount
                          </div>
                       )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 self-start">
                    <button 
                      onClick={() => { setSelectedCustomer(customer); setShowModal(true); }} 
                      className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-zinc-400 hover:text-blue-600 transition-all active:scale-90 border border-zinc-100 dark:border-zinc-700"
                      title="Edit Customer"
                    >
                      <Edit size={16}/>
                    </button>
                    <button 
                      onClick={() => toggleHistory(customer.id)}
                      className={`p-3 rounded-2xl transition-all active:scale-90 border ${isExpanded ? 'bg-blue-600 text-white border-blue-600' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-blue-600 border-zinc-100 dark:border-zinc-700'}`}
                      title="Order History"
                    >
                      <History size={16}/>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-8">
                   <div className="flex items-center gap-3 text-zinc-500">
                      <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl"><Mail size={12} className="shrink-0" /></div>
                      <span className="text-[11px] font-bold truncate">{customer.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-zinc-500">
                      <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl"><Phone size={12} className="shrink-0" /></div>
                      <span className="text-[11px] font-bold truncate">{customer.phone}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                   <div>
                      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Gross Spend</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter leading-none">{formatCurrency(customer.totalSpent)}</p>
                   </div>
                   <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-2xl border border-amber-500/20 shadow-sm">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 tracking-tight">{customer.loyaltyPoints} Pts</span>
                   </div>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-top-4 duration-500">
                  <div className="p-6 sm:p-8 space-y-5">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                      <ShoppingBag size={12}/> Recent Ledger
                    </h5>
                    
                    {mockHistory.length > 0 ? (
                      <div className="space-y-4">
                        {mockHistory.map((sale) => (
                          <div key={sale.id} className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3 group/sale">
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                  <ReceiptText size={12} className="text-blue-500"/> {sale.id}
                                </span>
                                <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                                  <Calendar size={12}/> {new Date(sale.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                                {formatCurrency(sale.total)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
                              {sale.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-xl border border-zinc-100 dark:border-zinc-700">
                                  <Tag size={10} className="text-zinc-400"/>
                                  <span className="text-[10px] font-bold text-zinc-500">
                                    {item.quantity}x {item.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-10 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-[11px] font-bold text-zinc-400 italic">No ledger records found.</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => toggleHistory(customer.id)}
                      className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    >
                      Collapse Details <ChevronUp size={14}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
            <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-400">
              <SearchX size={48} strokeWidth={1}/>
            </div>
            <p className="text-zinc-500 font-bold">No members found matching your search.</p>
          </div>
        )}
      </div>

      {showModal && (
        <CustomerModal 
          customer={selectedCustomer} 
          onClose={() => setShowModal(false)} 
          onSave={handleSaveCustomer} 
        />
      )}
    </div>
  );
};

// Internal icon for empty states not exported from lucide
const SearchX = ({ size = 24, strokeWidth = 2 }: { size?: number, strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

export default CRMView;
