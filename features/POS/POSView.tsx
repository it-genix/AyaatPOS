
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Wallet, Banknote, UserPlus, ShoppingCart, Pencil, X, Check, ChevronUp, Sparkles, Timer, Power, UserCheck, Star, SearchX, Delete, ReceiptText, ScanBarcode, AlertTriangle, RefreshCw, Camera, Loader2, CloudUpload, ImagePlus, User, Mail, Phone, Hash, PhoneForwarded, Percent, Printer, Send, QrCode, Settings2, Save, Package, Delete as BackspaceIcon, Zap, Lock, ShieldCheck, UserPlus2, CheckCircle2, Tag, ArrowRight, MapPin, Info, Globe, Coins, UserCircle } from 'lucide-react';
import { Product, CartItem, Customer, UserRole, Language } from '../../types';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS, CURRENT_USER } from '../../mockData';
import { formatCurrency, calculateTax, generateId } from '../../utils/helpers';
import { translations } from '../../translations';

const MANAGER_PIN = '8888';

const isOfferActive = (product: Product) => {
  if (!product.offerPrice || product.offerPrice <= 0) return false;
  if (product.isOfferManualActive === false) return false;
  return true;
};

// --- Sub-Component: Quick Customer Registration ---
const CustomerRegisterModal: React.FC<{ onClose: () => void; onSave: (customer: Customer) => void }> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Added missing discountLevel property to satisfy Customer type
    const newCustomer: Customer = {
      id: generateId(),
      membershipId: `MEM-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      loyaltyPoints: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString(),
      discountLevel: 0
    };
    onSave(newCustomer);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-600 rounded-xl text-white"><UserPlus size={20}/></div>
             <h3 className="font-black text-xl tracking-tight">Quick Register</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
           <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Full Name</label>
              <input autoFocus required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Phone Number</label>
              <input required type="tel" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Email (Optional)</label>
              <input type="email" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
           </div>
           <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest mt-4 shadow-xl shadow-blue-600/20 active:scale-95 transition-all">Enroll Member</button>
        </form>
      </div>
    </div>
  );
};

// --- Sub-Component: Manager PIN ---
const ManagerPINModal: React.FC<{ 
  onSuccess: () => void; 
  onClose: () => void; 
  title?: string 
}> = ({ onSuccess, onClose, title = "Authorization" }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === MANAGER_PIN) onSuccess();
    else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className={`bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-sm p-8 space-y-6 shadow-2xl border-2 transition-all ${error ? 'border-red-500 animate-shake' : 'border-blue-600/20'}`}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl mx-auto flex items-center justify-center text-blue-600 mb-4"><ShieldCheck size={32} /></div>
          <h3 className="font-black text-xl tracking-tight">{title}</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Entry Restricted to Management</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="password" autoFocus className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] outline-none" placeholder="••••" maxLength={4} value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))} />
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
            <button type="submit" disabled={pin.length < 4} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Unlock</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Sub-Component: Professional Cash Calculator ---
const CashCalculatorModal: React.FC<{ total: number; onClose: () => void; onComplete: (received: number) => void }> = ({ total, onClose, onComplete }) => {
  const [received, setReceived] = useState('');
  const amount = parseFloat(received) || 0;
  const change = amount - total;
  const isSufficient = amount >= total;

  const denominations = [50, 100, 500, 1000];

  const handleQuickAdd = (val: number) => {
    setReceived(prev => (parseFloat(prev || '0') + val).toString());
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">
        {/* Left Panel: Stats & Shortcuts */}
        <div className="w-full md:w-72 bg-zinc-50 dark:bg-zinc-950 p-8 space-y-8 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
             <h3 className="text-xl font-black tracking-tight">Checkout</h3>
             <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Payment Settlement</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Net Due</p>
              <p className="text-2xl font-black text-blue-600">{formatCurrency(total)}</p>
            </div>
            <div className={`p-5 rounded-2xl border transition-all ${isSufficient ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-400'}`}>
              <p className="text-[10px] font-black uppercase mb-1">{isSufficient ? 'Change to Return' : 'Balance Remaining'}</p>
              <p className="text-2xl font-black">{formatCurrency(Math.abs(change))}</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
             <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Quick Add</p>
             <div className="grid grid-cols-2 gap-2">
                {denominations.map(d => (
                  <button key={d} onClick={() => handleQuickAdd(d)} className="py-3 px-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black hover:border-blue-600 transition-all active:scale-95 shadow-sm">+{d}</button>
                ))}
             </div>
             <button onClick={() => setReceived(total.toString())} className="w-full py-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-900/20 active:scale-95 transition-all">Exact Amount</button>
          </div>
        </div>

        {/* Right Panel: Keypad */}
        <div className="flex-1 p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20"><Banknote size={20} /></div>
              <span className="font-black text-lg">Cash Terminal</span>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-400 transition-colors"><X size={24}/></button>
          </div>

          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 font-black text-2xl">৳</div>
            <input 
              readOnly 
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent group-hover:border-blue-600/10 py-8 px-12 rounded-[2rem] text-5xl font-black text-right outline-none transition-all" 
              placeholder="0" 
              value={received} 
            />
            {received && (
              <button onClick={() => setReceived('')} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-zinc-300 hover:text-red-500 transition-colors"><X size={20}/></button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k => (
              <button 
                key={k} 
                onClick={() => {
                  if (k === '⌫') setReceived(s => s.slice(0, -1));
                  else if (k === '.') { if (!received.includes('.')) setReceived(s => s + k); }
                  else setReceived(s => s + k);
                }} 
                className="h-16 sm:h-20 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-black text-2xl active:scale-95 transition-all shadow-sm flex items-center justify-center border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              >
                {k === '⌫' ? <BackspaceIcon size={24} /> : k}
              </button>
            ))}
          </div>

          <button 
            disabled={!isSufficient} 
            onClick={() => onComplete(amount)} 
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
          >
            {isSufficient ? <><CheckCircle2 size={22} /> Finalize Transaction</> : 'Awaiting Sufficient Cash'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface POSViewProps {
  onProcessSale: (sale: any) => void;
  language?: Language;
}

// --- Main POS View ---
const POSView: React.FC<POSViewProps> = ({ onProcessSale, language = 'EN' }) => {
  const user = CURRENT_USER;
  const t = translations[language]?.pos || translations.EN.pos;
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [showCustomerRegister, setShowCustomerRegister] = useState(false);
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [showCashCalc, setShowCashCalc] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  const filteredCustomers = useMemo(() => {
    if (!customerSearchTerm) return [];
    return MOCK_CUSTOMERS.filter(c => 
      c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) || 
      c.phone.includes(customerSearchTerm)
    );
  }, [customerSearchTerm]);

  const addToCart = (product: Product) => {
    const price = isOfferActive(product) ? product.offerPrice! : product.price;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...product, price, quantity: 1}];
    });
  };

  const processSale = (method: string, received?: number) => {
    const sale = { 
      id: `POS-${generateId()}`, items: [...cart], subtotal, tax, total, 
      paymentMethod: method, timestamp: new Date().toISOString(), 
      customerName: selectedCustomer?.name, customerId: selectedCustomer?.id, cashReceived: received,
      cashierName: user.name
    };
    onProcessSale(sale);
    setLastSale(sale);
    setCart([]);
    setSelectedCustomer(null);
    setMobileCartOpen(false);
    setShowCashCalc(false);
    setShowReceipt(true);
  };

  const handleRegisterCustomer = (customer: Customer) => {
    // In a real app, you'd save this to a database
    MOCK_CUSTOMERS.push(customer);
    setSelectedCustomer(customer);
    setShowCustomerRegister(false);
    setShowCustomerSearch(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors">
      <div className="no-print flex-1 flex flex-col p-4 sm:p-8 lg:p-10 min-w-0 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 shrink-0">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600" size={20} />
            <input type="text" placeholder={t.searchProduct} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] py-4 pl-14 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm text-sm sm:text-base" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowCustomerSearch(!showCustomerSearch)}
              className={`px-6 py-4 rounded-[1.5rem] font-black flex items-center gap-3 active:scale-95 transition-all shadow-sm border ${selectedCustomer ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 text-emerald-600' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}
            >
              {selectedCustomer ? <UserCheck size={18}/> : <UserPlus size={18}/>}
              <span className="text-[10px] uppercase tracking-widest">{selectedCustomer ? selectedCustomer.name.split(' ')[0] : 'Customer'}</span>
            </button>
            <button className="px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[1.5rem] font-black flex items-center gap-2 active:scale-95 transition-all shadow-xl"><ScanBarcode size={20}/><span className="hidden sm:inline text-[10px] uppercase tracking-widest">Scanner</span></button>
          </div>
        </div>

        {showCustomerSearch && (
          <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
             <div className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Identify Member</h4>
                  <button onClick={() => setShowCustomerSearch(false)} className="text-zinc-400 hover:text-red-500"><X size={16}/></button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                   <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search by name or phone..." 
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-11 pr-4 outline-none font-bold text-sm" 
                        value={customerSearchTerm} 
                        onChange={e => setCustomerSearchTerm(e.target.value)} 
                      />
                   </div>
                   <button onClick={() => setShowCustomerRegister(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10">
                     <Plus size={14}/> Enroll New
                   </button>
                </div>
                
                {customerSearchTerm && (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 max-h-48 overflow-y-auto custom-scrollbar">
                      {filteredCustomers.map(c => (
                        <button 
                          key={c.id} 
                          onClick={() => { setSelectedCustomer(c); setShowCustomerSearch(false); setCustomerSearchTerm(''); }}
                          className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:border-blue-500 transition-all text-left"
                        >
                           <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-black">{c.name.charAt(0)}</div>
                           <div className="min-w-0">
                              <p className="text-xs font-black truncate">{c.name}</p>
                              <p className="text-[9px] font-bold text-zinc-400">{c.phone}</p>
                           </div>
                        </button>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <div className="col-span-full py-4 text-center text-[10px] font-black uppercase text-zinc-400 tracking-widest">No members found</div>
                      )}
                   </div>
                )}
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-24">
          {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
            <button key={product.id} onClick={() => addToCart(product)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-5 text-left hover:border-blue-600 transition-all flex flex-col gap-4 shadow-sm group">
              <div className="h-44 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200 dark:border-zinc-700">
                <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                {isOfferActive(product) && <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">PROMO</div>}
              </div>
              <div className="px-2">
                <h3 className="font-bold text-sm truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                   <div className="flex flex-col">
                      {isOfferActive(product) && <span className="text-[10px] text-zinc-400 line-through font-bold">{formatCurrency(product.price)}</span>}
                      <span className="text-xl font-black text-blue-600">{formatCurrency(isOfferActive(product) ? product.offerPrice! : product.price)}</span>
                   </div>
                   <div className="text-[9px] font-black px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">{product.stock} Units</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className={`no-print fixed inset-x-0 bottom-0 z-[100] bg-zinc-50 dark:bg-zinc-900 border-t lg:static lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-500 lg:w-[450px] ${mobileCartOpen ? 'h-[85vh] rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]' : 'h-20 lg:h-full'}`}>
        <button onClick={() => setMobileCartOpen(!mobileCartOpen)} className="lg:hidden h-20 w-full flex items-center justify-between px-8 bg-blue-600 text-white rounded-t-[3rem] lg:rounded-none">
          <div className="flex items-center gap-4"><ShoppingCart size={22} /><span className="font-black uppercase text-xs tracking-widest">{cart.length} Items Selected</span></div>
          <div className="flex items-center gap-4"><span className="text-2xl font-black">{formatCurrency(total)}</span><ChevronUp className={`transition-transform ${mobileCartOpen ? 'rotate-180' : ''}`} /></div>
        </button>

        <div className={`flex-1 flex flex-col min-h-0 ${!mobileCartOpen ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center shrink-0">
             <h2 className="text-2xl font-black tracking-tightest flex items-center gap-3"><ShoppingCart className="text-blue-600"/> {t.activeCart}</h2>
             <button onClick={() => setCart([])} className="p-3 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
          </div>

          {selectedCustomer && (
            <div className="px-8 pt-6">
               <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white"><UserCircle size={24}/></div>
                     <div>
                        <p className="text-xs font-black tracking-tight text-emerald-700 dark:text-emerald-400 leading-tight truncate w-32">{selectedCustomer.name}</p>
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{selectedCustomer.loyaltyPoints} Points</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="p-2 text-emerald-500 hover:text-red-500 transition-colors"><X size={18}/></button>
               </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm animate-in zoom-in-95">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0"><img src={item.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs truncate uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-black text-blue-600 mt-1">{formatCurrency(item.price)} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i))} className="p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg"><Minus size={14}/></button>
                  <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg"><Plus size={14}/></button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shadow-xl">
             <div className="flex justify-between text-4xl font-black tracking-tightest mb-8"><span>TOTAL</span><span className="text-blue-600">{formatCurrency(total)}</span></div>
             <div className="grid grid-cols-3 gap-3">
               {(['CASH', 'CARD', 'WALLET'] as const).map(m => (
                 <button key={m} onClick={() => m === 'CASH' ? setShowCashCalc(true) : processSale(m)} disabled={cart.length === 0} className="flex flex-col items-center gap-2 py-5 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-30">
                    <div className="p-2 text-blue-600 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">{m === 'CASH' ? <Banknote size={20}/> : m === 'CARD' ? <CreditCard size={20}/> : <Wallet size={20}/>}</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{m}</span>
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>

      {showCashCalc && <CashCalculatorModal total={total} onClose={() => setShowCashCalc(false)} onComplete={(r) => processSale('CASH', r)} />}
      {showReceipt && lastSale && <ReceiptModal sale={lastSale} onClose={() => { setShowReceipt(false); setLastSale(null); }} />}
      {showCustomerRegister && <CustomerRegisterModal onClose={() => setShowCustomerRegister(false)} onSave={handleRegisterCustomer} />}
    </div>
  );
};

// --- Sub-Component: Receipt Modal (Optimized for Printing) ---
const ReceiptModal: React.FC<{ sale: any; onClose: () => void }> = ({ sale, onClose }) => {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in no-print-backdrop">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-print, .receipt-print * { visibility: visible; }
          .receipt-print { position: absolute; left: 0; top: 0; width: 100%; height: auto; padding: 0 !important; background: white !important; color: black !important; font-size: 10px; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh] receipt-print shadow-2xl">
        <div className="flex-1 overflow-y-auto p-10 space-y-6 font-mono text-[10px] text-black">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-black text-white rounded-xl mx-auto flex items-center justify-center font-black text-2xl">A</div>
            <h2 className="text-xl font-black uppercase tracking-tightest">Ayaat POS</h2>
            <p className="opacity-60">House #12, Banani, Dhaka<br/>VAT Reg: 002345678-0101</p>
          </div>
          <div className="border-y border-dashed py-3 space-y-1">
            <div className="flex justify-between"><span>INV: {sale.id}</span><span>{new Date(sale.timestamp).toLocaleString()}</span></div>
            <div className="flex justify-between uppercase font-black"><span>OPERATOR:</span><span>{sale.cashierName}</span></div>
            {sale.customerName && <div className="flex justify-between uppercase font-black"><span>MEMBER:</span><span>{sale.customerName}</span></div>}
          </div>
          <div className="space-y-3">
             <div className="flex justify-between border-b pb-1 font-black"><span>ITEM</span><span>QTY</span><span>TOTAL</span></div>
             {sale.items.map((i: any, idx: number) => (
               <div key={idx} className="flex justify-between"><span className="truncate w-32 uppercase">{i.name}</span><span>{i.quantity}</span><span>{formatCurrency(i.price * i.quantity)}</span></div>
             ))}
          </div>
          <div className="border-t pt-3 space-y-1">
             <div className="flex justify-between"><span>SUBTOTAL</span><span>{formatCurrency(sale.subtotal)}</span></div>
             <div className="flex justify-between"><span>TAX (8%)</span><span>{formatCurrency(sale.tax)}</span></div>
             <div className="flex justify-between text-lg font-black pt-2 border-t border-dashed"><span>TOTAL</span><span>{formatCurrency(sale.total)}</span></div>
             <div className="flex justify-between pt-2"><span>MODE:</span><span className="font-black uppercase">{sale.paymentMethod}</span></div>
          </div>
          <div className="text-center pt-6 space-y-4">
             <p className="font-black uppercase tracking-widest">*** Thank You ***</p>
             <div className="flex items-center justify-center gap-1 h-8">
               {[...Array(30)].map((_,i)=><div key={i} className="bg-black" style={{width:2, height: i%3===0 ? '100%' : '70%'}}/>)}
             </div>
          </div>
        </div>
        <div className="p-8 bg-zinc-50 border-t flex gap-3 no-print">
          <button onClick={onClose} className="flex-1 py-4 bg-white border rounded-2xl font-black uppercase text-[10px]">Dismiss</button>
          <button onClick={() => window.print()} className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"><Printer size={16}/> Print</button>
        </div>
      </div>
    </div>
  );
};

export default POSView;
