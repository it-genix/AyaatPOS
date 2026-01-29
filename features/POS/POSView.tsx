
import React, { useState, useMemo, useRef, useEffect } from 'react';
// Added Globe to lucide-react imports
import { Search, Plus, Minus, Trash2, CreditCard, Wallet, Banknote, UserPlus, ShoppingCart, Pencil, X, Check, ChevronUp, Sparkles, Timer, Power, UserCheck, Star, SearchX, Delete, ReceiptText, ScanBarcode, AlertTriangle, RefreshCw, Camera, Loader2, CloudUpload, ImagePlus, User, Mail, Phone, Hash, PhoneForwarded, Percent, Printer, Send, QrCode, Settings2, Save, Package, Delete as BackspaceIcon, Zap, Lock, ShieldCheck, UserPlus2, CheckCircle2, Tag, ArrowRight, MapPin, Info, Globe } from 'lucide-react';
import { Product, CartItem, Customer, UserRole, Language } from '../../types';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS, CURRENT_USER } from '../../mockData';
import { formatCurrency, calculateTax, generateId } from '../../utils/helpers';
import { translations } from '../../translations';

// Helper to determine if an offer is currently valid
const isOfferActive = (product: Product) => {
  if (!product.offerPrice || product.offerPrice <= 0) return false;
  if (product.isOfferManualActive === false) return false;
  if (product.offerExpiryDate) {
    const expiry = new Date(product.offerExpiryDate);
    if (expiry < new Date()) return false;
  }
  return true;
};

// Manager PIN for override (Mock)
const MANAGER_PIN = '8888';

const ManagerPINModal: React.FC<{ 
  onSuccess: () => void; 
  onClose: () => void; 
  title?: string 
}> = ({ onSuccess, onClose, title = "Manager Authorization" }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === MANAGER_PIN) {
      onSuccess();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-sm p-8 space-y-6 shadow-2xl border-2 transition-all ${error ? 'border-red-500 animate-shake' : 'border-blue-600/20'}`}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl mx-auto flex items-center justify-center text-blue-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-black text-xl tracking-tight">{title}</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Entry Restricted to Management</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] focus:ring-4 focus:ring-blue-600/20 outline-none"
            placeholder="••••"
            maxLength={4}
            value={pin}
            autoFocus
            onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
          />
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Cancel</button>
            <button type="submit" disabled={pin.length < 4} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Unlock</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Customer Registration Modal for POS ---
interface POSCustomerRegModalProps {
  onClose: () => void;
  onSave: (customer: Customer) => void;
  prefilledPhone?: string;
}

const POSCustomerRegModal: React.FC<POSCustomerRegModalProps> = ({ onClose, onSave, prefilledPhone = '' }) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    email: '',
    phone: prefilledPhone,
    membershipId: `MEM-${Math.floor(10000 + Math.random() * 90000)}`,
    loyaltyPoints: 0,
    totalSpent: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Name required';
    if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: generateId(),
        joinDate: new Date().toISOString()
      } as Customer);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
              <UserPlus2 size={22}/>
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Quick Register</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <input 
                className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                placeholder="Full Name"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
                autoFocus 
              />
              {errors.name && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  required 
                />
                {errors.phone && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.phone}</p>}
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email"
                  className={`w-full bg-zinc-50 dark:bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm`} 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
                {errors.email && <p className="text-[9px] font-black text-red-500 uppercase mt-1 ml-1">{errors.email}</p>}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300"><Tag size={14}/></div>
              <input 
                className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-5 font-mono text-xs text-zinc-500 outline-none cursor-not-allowed" 
                value={formData.membershipId} 
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">Discard</button>
            <button type="submit" className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
              Join & Apply
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface POSViewProps {
  onProcessSale: (sale: any) => void;
  language?: Language;
}

const POSView: React.FC<POSViewProps> = ({ onProcessSale, language = 'EN' }) => {
  const user = CURRENT_USER;
  const t = translations[language].pos;
  const isAdmin = user.role === UserRole.ADMIN;
  const isCashier = user.role === UserRole.CASHIER;

  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [isCustomerSearchOpen, setIsCustomerSearchOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [allCustomers, setAllCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [showCashCalc, setShowCashCalc] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCustomerRegModal, setShowCustomerRegModal] = useState(false);
  const [pendingSku, setPendingSku] = useState<string | null>(null);
  const [prefilledSku, setPrefilledSku] = useState<string | undefined>(undefined);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [membershipDiscountRate, setMembershipDiscountRate] = useState(5);
  const [lastSale, setLastSale] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  
  const customerSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customerSearchRef.current && !customerSearchRef.current.contains(event.target as Node)) {
        setIsCustomerSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const tax = calculateTax(subtotal);
  const discount = selectedCustomer ? subtotal * (membershipDiscountRate / 100) : 0;
  const total = subtotal + tax - discount;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      const sellingPrice = isOfferActive(product) ? product.offerPrice! : product.price;
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, price: sellingPrice, quantity: 1 }];
    });
  };

  const handleScanResult = (sku: string) => {
    const prod = products.find(p => p.sku === sku);
    if (prod) {
      addToCart(prod);
      setShowScanner(false);
    } else {
      if (isCashier && !isAdmin) {
        setPendingSku(sku);
        setShowScanner(false);
        setShowPinModal(true);
      } else {
        setPrefilledSku(sku);
        setShowScanner(false);
        setShowProductModal(true);
      }
    }
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    if (pendingSku) {
      setPrefilledSku(pendingSku);
      setShowProductModal(true);
      setPendingSku(null);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleQuickRegister = (newCustomer: Customer) => {
    setAllCustomers(prev => [...prev, newCustomer]);
    setSelectedCustomer(newCustomer);
    setShowCustomerRegModal(false);
    setIsCustomerSearchOpen(false);
    setCustomerSearch('');
  };

  const processSale = (method: string, received?: number) => {
    const sale = { 
      id: `SALE-${generateId()}`, 
      items: cart, 
      subtotal, 
      tax, 
      discount, 
      total, 
      paymentMethod: method, 
      timestamp: new Date().toISOString(), 
      customerId: selectedCustomer?.id,
      customerName: selectedCustomer?.name,
      cashReceived: received,
      cashierId: user.id,
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

  const filteredCustomers = useMemo(() => {
    return allCustomers.filter(c => 
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.phone.includes(customerSearch)
    );
  }, [allCustomers, customerSearch]);

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors">
      <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-10 min-w-0 overflow-y-auto custom-scrollbar">
        <div className="flex gap-2 mb-6 sm:mb-10 shrink-0">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500" size={20} />
            <input 
              type="text" 
              placeholder={t.searchProduct} 
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] py-4 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm text-sm" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <button 
            onClick={() => setShowScanner(true)} 
            className="px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[1.5rem] font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shrink-0"
          >
            <ScanBarcode size={22} />
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest">Scanner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 pb-24 lg:pb-10">
          {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())).map(product => {
            const hasOffer = isOfferActive(product);
            return (
              <button 
                key={product.id} 
                onClick={() => addToCart(product)} 
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-4 text-left hover:border-blue-600/50 hover:shadow-2xl transition-all flex flex-col gap-4 relative overflow-hidden group shadow-sm active:scale-[0.98]"
              >
                {hasOffer && (
                  <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg animate-bounce flex items-center gap-1.5">
                    <Zap size={10} fill="currentColor" /> Promo
                  </div>
                )}
                <div className="h-40 sm:h-48 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700 relative">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700"><ShoppingCart size={48} strokeWidth={1} /></div>
                  )}
                </div>
                <div className="min-w-0 px-2">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base truncate leading-tight tracking-tight">{product.name}</h3>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                      {hasOffer && <span className="text-[10px] text-zinc-400 line-through font-bold leading-none mb-1">{formatCurrency(product.price)}</span>}
                      <span className={`${hasOffer ? 'text-emerald-500' : 'text-blue-600 dark:text-blue-400'} font-black text-lg sm:text-xl leading-none`}>
                        {formatCurrency(hasOffer ? product.offerPrice! : product.price)}
                      </span>
                    </div>
                    <div className={`text-[9px] font-black px-2 py-1 rounded-lg border flex items-center gap-1 ${product.stock <= product.minStock ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-50/10 text-green-500 border-green-500/20'}`}>
                      {product.stock}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`fixed inset-x-0 bottom-0 z-40 bg-zinc-50 dark:bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:static lg:w-[400px] xl:w-[460px] lg:translate-y-0 ${mobileCartOpen ? 'h-[90vh] rounded-t-[3rem]' : 'h-20 lg:h-full'}`}>
        <button 
          onClick={() => setMobileCartOpen(!mobileCartOpen)} 
          className="lg:hidden h-20 w-full flex items-center justify-between px-6 bg-blue-600 text-white shadow-2xl z-10 shrink-0 rounded-t-[3rem] lg:rounded-none"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white/20 rounded-2xl relative">
              <ShoppingCart size={22} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-blue-600 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-blue-600">{cart.reduce((s, i) => s + i.quantity, 0)}</div>
            </div>
            <span className="font-black uppercase tracking-widest text-xs">{t.totalBill}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-black text-2xl tracking-tighter">{formatCurrency(total)}</span>
            <ChevronUp size={24} className={`transition-transform duration-500 ${mobileCartOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${!mobileCartOpen ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-6 sm:p-10 border-b border-zinc-200 dark:border-zinc-800 space-y-6 shrink-0">
            <div className="hidden lg:flex justify-between items-center mb-2">
              <h2 className="text-2xl font-black flex items-center gap-3 text-zinc-900 dark:text-zinc-100 tracking-tighter">
                <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20"><ShoppingCart size={22} /></div>
                {t.activeCart}
              </h2>
              <button onClick={() => setCart([])} className="text-zinc-400 hover:text-red-500 p-2.5 rounded-xl transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"><Trash2 size={22} /></button>
            </div>
            <div ref={customerSearchRef} className="relative">
              {selectedCustomer ? (
                <div className="bg-blue-600/5 dark:bg-blue-400/5 border border-blue-600/20 dark:border-blue-400/20 rounded-[1.5rem] p-4 flex items-center justify-between group animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-[1rem] bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20"><UserCheck size={20} /></div>
                    <div className="min-w-0">
                      <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate tracking-tight">{selectedCustomer.name}</div>
                      <div className="text-[9px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-2">
                        {selectedCustomer.membershipId} 
                        <span className="w-1 h-1 bg-blue-600 rounded-full" />
                        <span className="text-emerald-500">{selectedCustomer.loyaltyPoints} PTS</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="p-2 text-zinc-400 hover:text-red-500 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all"><X size={16} /></button>
                </div>
              ) : (
                <div className="relative group">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600" size={20} />
                  <input 
                    type="text" 
                    placeholder={t.searchCustomer} 
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[1.5rem] py-4 pl-12 pr-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm" 
                    value={customerSearch} 
                    onFocus={() => setIsCustomerSearchOpen(true)} 
                    onChange={(e) => { setCustomerSearch(e.target.value); setIsCustomerSearchOpen(true); }} 
                  />
                  {isCustomerSearchOpen && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 max-h-[400px] flex flex-col">
                      <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map(c => (
                            <button key={c.id} onClick={() => { setSelectedCustomer(c); setIsCustomerSearchOpen(false); setCustomerSearch(''); }} className="w-full p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-left flex items-center justify-between group/item">
                              <div className="min-w-0">
                                <div className="font-black text-sm group-hover/item:text-white">{c.name}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 group-hover/item:opacity-100 flex items-center gap-2">
                                  {c.membershipId} <span className="w-1 h-1 bg-current rounded-full" /> {c.phone}
                                </div>
                              </div>
                              <Star size={14} className="text-amber-500 group-hover/item:text-white" fill="currentColor" />
                            </button>
                          ))
                        ) : (
                          <div className="py-8 px-4 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">No records found</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-700">
                        <button 
                          onClick={() => setShowCustomerRegModal(true)}
                          className="w-full py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
                        >
                          <UserPlus2 size={16} /> {t.registerMember}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-800 py-10">
                <div className="w-20 h-20 rounded-full border-4 border-dashed border-current mb-4 flex items-center justify-center"><ShoppingCart size={32}/></div>
                <p className="text-xs font-black uppercase tracking-widest text-center">{t.emptyCart.split(' ').join('\n')}</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-zinc-950/50 p-4 rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm animate-in zoom-in-95 group relative">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 relative">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300"><Package size={20}/></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[13px] text-zinc-900 dark:text-zinc-100 truncate leading-tight tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-black text-blue-600 mt-1">{formatCurrency(item.price)} <span className="text-zinc-400">× {item.quantity}</span></p>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 rounded-[1.2rem] p-1.5 border border-zinc-100 dark:border-zinc-800 shadow-inner">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-red-500 transition-all shadow-sm active:scale-90"><Minus size={14}/></button>
                  <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-blue-500 transition-all shadow-sm active:scale-90"><Plus size={14}/></button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 lg:p-10 bg-white dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 space-y-4 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <div className="space-y-1.5">
              <div className="flex justify-between text-zinc-500 text-[11px] font-black uppercase tracking-widest"><span>{t.subtotal}</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-zinc-500 text-[11px] font-black uppercase tracking-widest"><span>{t.tax} (5%)</span><span>{formatCurrency(tax)}</span></div>
              {selectedCustomer && (
                <div className="flex justify-between text-emerald-600 text-[11px] font-black uppercase tracking-widest animate-in slide-in-from-right-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5">Loyalty Applied ({membershipDiscountRate}%)</span>
                    <button 
                      onClick={() => setShowDiscountModal(true)}
                      className="p-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 transition-all"
                    >
                      <Settings2 size={12} />
                    </button>
                  </div>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-zinc-900 dark:text-white font-black text-3xl pt-5 border-t border-zinc-100 dark:border-zinc-800 leading-none mt-2 tracking-tighter">
              <span>{t.total}</span>
              <span className="text-blue-600 dark:text-blue-400">{formatCurrency(total)}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 pb-2">
              {(['CASH', 'CARD', 'WALLET'] as const).map(method => (
                <button 
                  key={method} 
                  onClick={() => method === 'CASH' ? setShowCashCalc(true) : processSale(method)} 
                  disabled={cart.length === 0} 
                  className="flex flex-col items-center gap-2.5 py-4 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-[1.5rem] transition-all disabled:opacity-50 active:scale-95 shadow-sm group"
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    method === 'CASH' ? 'text-emerald-500 group-hover:bg-emerald-500/10' : 
                    method === 'CARD' ? 'text-blue-500 group-hover:bg-blue-500/10' : 
                    'text-purple-500 group-hover:bg-purple-500/10'
                  }`}>
                    {method === 'CASH' ? <Banknote size={22} /> : method === 'CARD' ? <CreditCard size={22} /> : <Wallet size={22} />}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{t[method.toLowerCase() as keyof typeof t]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {showCashCalc && <CashCalculatorModal total={total} onClose={() => setShowCashCalc(false)} onComplete={(received) => processSale('CASH', received)} />}
      {showScanner && <BarcodeScannerModal onClose={() => setShowScanner(false)} onScan={handleScanResult} />}
      {showCustomerRegModal && <POSCustomerRegModal prefilledPhone={customerSearch} onClose={() => setShowCustomerRegModal(false)} onSave={handleQuickRegister} />}
      {showProductModal && <ProductModal product={editingProduct} prefilledSku={prefilledSku} onClose={() => { setShowProductModal(false); setPrefilledSku(undefined); setEditingProduct(null); }} onSave={(p) => { 
        setProducts(prev => [p, ...prev.filter(x => x.id !== p.id)]); 
        setShowProductModal(false); 
      }} />}
      {showPinModal && <ManagerPINModal onClose={() => setShowPinModal(false)} onSuccess={handlePinSuccess} title="Quick Entry Restricted" />}
      {showDiscountModal && <DiscountRateModal currentRate={membershipDiscountRate} onClose={() => setShowDiscountModal(false)} onSave={(rate) => { setMembershipDiscountRate(rate); setShowDiscountModal(false); }} />}
      {showReceipt && lastSale && <ReceiptModal sale={lastSale} userRole={user.role} onClose={() => { setShowReceipt(false); setLastSale(null); }} />}
    </div>
  );
};

const ProductModal: React.FC<{ product?: Product | null; prefilledSku?: string; onClose: () => void; onSave: (p: Product) => void }> = ({ product, prefilledSku, onClose, onSave }) => {
  const user = CURRENT_USER;
  const isAdmin = user.role === UserRole.ADMIN;
  const canEditPricing = user.role === UserRole.ADMIN || user.role === UserRole.MANAGER;
  
  const [formData, setFormData] = useState<Partial<Product>>(product || { 
    name: '', 
    sku: prefilledSku || '', 
    price: 0, 
    offerPrice: 0,
    cost: 0, 
    stock: 0, 
    minStock: 5, 
    category: 'General' 
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-xl p-8 space-y-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xl">Quick Entry</h3>
          {!canEditPricing && !isAdmin && <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest"><Lock size={12}/> Locked Fields</div>}
        </div>
        <div className="space-y-4">
           <div className="space-y-1.5">
             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Item Name</label>
             <input placeholder="Ex: Smart Water" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black uppercase tracking-widest ${(canEditPricing || isAdmin) ? 'text-zinc-400' : 'text-amber-500'}`}>Price (৳) {(!canEditPricing && !isAdmin) && <Lock size={10} className="inline ml-1" />}</label>
                <input 
                  disabled={!canEditPricing && !isAdmin} 
                  type="number" 
                  placeholder="0" 
                  className={`w-full border rounded-2xl py-4 px-5 font-black outline-none ${(canEditPricing || isAdmin) ? 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 cursor-not-allowed opacity-50'}`} 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} 
                />
              </div>
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black uppercase tracking-widest ${(canEditPricing || isAdmin) ? 'text-emerald-500' : 'text-zinc-300'}`}>Promo Price (৳) {(!canEditPricing && !isAdmin) && <Lock size={10} className="inline ml-1" />}</label>
                <input 
                  disabled={!canEditPricing && !isAdmin} 
                  type="number" 
                  placeholder="0" 
                  className={`w-full border rounded-2xl py-4 px-5 font-black outline-none ${(canEditPricing || isAdmin) ? 'bg-zinc-50 dark:bg-zinc-800 border-emerald-200 dark:border-emerald-900/30' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 cursor-not-allowed opacity-50'}`} 
                  value={formData.offerPrice || ''} 
                  onChange={e => setFormData({...formData, offerPrice: parseFloat(e.target.value) || 0})} 
                />
              </div>
           </div>
           {(!canEditPricing && !isAdmin) && <p className="text-[8px] font-bold text-zinc-400 italic text-center">Financial fields require Manager approval for modification.</p>}
        </div>
        <button onClick={() => onSave({...formData, id: generateId()} as Product)} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest active:scale-95 shadow-xl shadow-blue-600/20 transition-all">Commit to Inventory</button>
      </div>
    </div>
  );
};

// --- Standard & Professional Cash Calculator Modal ---
const CashCalculatorModal: React.FC<{ total: number; onClose: () => void; onComplete: (received: number) => void }> = ({ total, onClose, onComplete }) => {
  const [receivedStr, setReceivedStr] = useState<string>('');
  const receivedNum = parseFloat(receivedStr) || 0;
  const change = receivedNum - total;
  const isSufficient = receivedNum >= total;

  const handleKeypad = (val: string) => {
    if (val === 'CLEAR') setReceivedStr('');
    else if (val === 'BACK') setReceivedStr(prev => prev.slice(0, -1));
    else if (val === '.') { if (!receivedStr.includes('.')) setReceivedStr(prev => + '.'); }
    else { if (receivedStr === '0') setReceivedStr(val); else setReceivedStr(prev => prev + val); }
  };

  const handleDenomination = (val: number) => {
    setReceivedStr(prev => {
        const current = parseFloat(prev) || 0;
        return (current + val).toString();
    });
  };

  const denominations = [10, 20, 50, 100, 200, 500, 1000];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[700px]">
        {/* Left Side: Display & Denominations */}
        <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950/30">
          <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Banknote size={14} className="text-emerald-500" /> Cash Payment Terminal
            </h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Payable Amount</p>
                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{formatCurrency(total)}</p>
              </div>
              <div className="text-right">
                <p className={`text-[10px] font-black uppercase tracking-widest ${isSufficient ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isSufficient ? 'Balance Change' : 'Remaining Due'}
                </p>
                <p className={`text-2xl font-black ${isSufficient ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(change))}
                </p>
              </div>
            </div>
            <div className="mt-6 p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border-2 border-blue-600 shadow-xl shadow-blue-600/5">
                <p className="text-[9px] font-black uppercase text-blue-600 mb-1">Cash Received</p>
                <div className="text-4xl font-black tracking-tight text-right flex items-center justify-between">
                   <span className="text-zinc-300 text-2xl font-medium">৳</span>
                   <span>{receivedStr || '0.00'}</span>
                </div>
            </div>
          </div>
          
          <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar flex-1">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">Quick Denominations</p>
             <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
                <button 
                    onClick={() => setReceivedStr(total.toString())}
                    className="col-span-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all mb-2"
                >
                    <CheckCircle2 size={16} /> Exact Amount
                </button>
                {denominations.map(val => (
                  <button 
                    key={val} 
                    onClick={() => handleDenomination(val)}
                    className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black text-xs hover:bg-emerald-500 hover:text-white hover:border-emerald-600 transition-all active:scale-95 shadow-sm"
                  >
                    ৳{val}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Right Side: Keypad & Action */}
        <div className="w-full md:w-[280px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
           <div className="flex-1 p-8 grid grid-cols-3 gap-2">
             {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'BACK'].map(k => (
               <button 
                 key={k} 
                 onClick={() => handleKeypad(k)} 
                 className={`h-full min-h-[60px] rounded-2xl font-black text-lg flex items-center justify-center transition-all active:scale-90 shadow-sm ${
                   k === 'BACK' ? 'bg-red-50 dark:bg-red-950/20 text-red-500' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                 }`}
               >
                 {k === 'BACK' ? <BackspaceIcon size={20}/> : k}
               </button>
             ))}
           </div>
           <div className="p-8 space-y-3 bg-zinc-50 dark:bg-zinc-950/20 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                onClick={onClose} 
                className="w-full py-4 bg-white dark:bg-zinc-800 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-zinc-200 dark:border-zinc-700 active:scale-95 transition-all"
              >
                Cancel Process
              </button>
              <button 
                disabled={!isSufficient} 
                onClick={() => onComplete(receivedNum)} 
                className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
              >
                Process Transaction <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const BarcodeScannerModal: React.FC<{ onClose: () => void; onScan: (sku: string) => void }> = ({ onClose, onScan }) => {
  const [sku, setSku] = useState('');
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50">
          <h3 className="font-black text-xl flex items-center gap-2"><ScanBarcode /> Scanner</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"><X size={20}/></button>
        </div>
        <div className="p-8 space-y-6 text-center">
          <div className="aspect-square bg-zinc-100 dark:bg-zinc-950 rounded-[2.5rem] border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-zinc-400 gap-4 relative overflow-hidden">
            <Camera size={48} />
            <p className="text-[10px] font-black uppercase tracking-widest text-center px-8">Point camera at SKU</p>
          </div>
          <div className="space-y-3">
            <input 
              type="text" 
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 outline-none font-mono text-center text-sm"
              placeholder="MANUAL SKU"
              value={sku}
              autoFocus
              onChange={(e) => setSku(e.target.value.toUpperCase())}
            />
            <button onClick={() => onScan(sku)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscountRateModal: React.FC<{ currentRate: number; onClose: () => void; onSave: (rate: number) => void }> = ({ currentRate, onClose, onSave }) => {
  const [rate, setRate] = useState(currentRate);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-sm p-8 space-y-6 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Percent size={80} className="text-emerald-500" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-1">
            <h3 className="font-black text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">Member Rewards</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Configure global membership discount</p>
          </div>
          
          <div className="flex flex-col items-center gap-4 py-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
             <div className="flex items-center gap-6">
                <button onClick={() => setRate(Math.max(0, rate - 1))} className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-700 text-zinc-400 hover:text-red-500 shadow-sm flex items-center justify-center transition-all active:scale-90"><Minus size={24}/></button>
                <div className="flex flex-col items-center min-w-[100px]">
                   <span className="text-6xl font-black text-blue-600 dark:text-blue-400">{rate}</span>
                   <span className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-1">Percent</span>
                </div>
                <button onClick={() => setRate(Math.min(100, rate + 1))} className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-700 text-zinc-400 hover:text-emerald-500 shadow-sm flex items-center justify-center transition-all active:scale-90"><Plus size={24}/></button>
             </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">Cancel</button>
            <button onClick={() => onSave(rate)} className="flex-[1.5] py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2">
              Commit Changes
              <CheckCircle2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Professional Receipt Modal Component ---
const ReceiptModal: React.FC<{ sale: any; userRole: UserRole; onClose: () => void }> = ({ sale, userRole, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-in fade-in no-print">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-full max-h-[90vh]">
        
        {/* Receipt Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-8 bg-white text-zinc-900 font-mono text-xs">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-blue-600/20">A</div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tightest uppercase leading-none">Ayaat Retail Ltd.</h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Enterprise POS Solutions</p>
            </div>
            <div className="pt-2 text-[10px] space-y-1 text-zinc-500">
               <div className="flex items-center justify-center gap-2"><MapPin size={10}/> House #12, Road #4, Banani, Dhaka</div>
               <div className="flex items-center justify-center gap-2"><Phone size={10}/> Support: +880 1711-223344</div>
               <div className="flex items-center justify-center gap-2"><Globe size={10}/> www.ayaatpos.com</div>
               <div className="pt-1 font-black">BIN: 002345678-0101</div>
            </div>
          </div>

          <div className="border-t border-b border-dashed border-zinc-300 py-4 flex flex-col gap-1 text-[10px]">
             <div className="flex justify-between"><span>INV NO:</span><span className="font-black">{sale.id}</span></div>
             <div className="flex justify-between"><span>DATE:</span><span>{new Date(sale.timestamp).toLocaleString()}</span></div>
             <div className="flex justify-between"><span>OPERATOR:</span><span className="uppercase">{sale.cashierName || 'CASHIER'}</span></div>
             {sale.customerName && <div className="flex justify-between"><span>CUSTOMER:</span><span className="uppercase">{sale.customerName}</span></div>}
          </div>

          {/* Item List */}
          <div className="space-y-4">
             <div className="flex justify-between font-black border-b border-zinc-200 pb-2 text-[10px]">
                <span className="w-1/2">DESCRIPTION</span>
                <span className="w-1/4 text-right">QTY</span>
                <span className="w-1/4 text-right">PRICE</span>
             </div>
             <div className="space-y-3">
                {sale.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between leading-tight">
                    <div className="w-1/2">
                      <p className="font-bold uppercase">{item.name}</p>
                      <p className="text-[9px] text-zinc-400">{item.sku}</p>
                    </div>
                    <span className="w-1/4 text-right">{item.quantity}</span>
                    <span className="w-1/4 text-right">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Financials */}
          <div className="border-t border-zinc-200 pt-4 space-y-1.5">
             <div className="flex justify-between"><span>SUBTOTAL</span><span>{formatCurrency(sale.subtotal)}</span></div>
             <div className="flex justify-between"><span>TAX (5%)</span><span>{formatCurrency(sale.tax)}</span></div>
             {sale.discount > 0 && (
               <div className="flex justify-between text-red-500"><span>DISCOUNT APPLIED</span><span>-{formatCurrency(sale.discount)}</span></div>
             )}
             <div className="flex justify-between font-black text-lg pt-3 border-t border-dashed border-zinc-300 mt-2">
                <span>TOTAL DUE</span>
                <span>{formatCurrency(sale.total)}</span>
             </div>
          </div>

          {/* Payment Detail */}
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 space-y-1.5">
             <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase">Payment Mode</span><span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest">{sale.paymentMethod}</span></div>
             {sale.paymentMethod === 'CASH' && (
               <>
                 <div className="flex justify-between"><span>Amount Received</span><span>{formatCurrency(sale.cashReceived || sale.total)}</span></div>
                 <div className="flex justify-between font-bold"><span>Change Returned</span><span>{formatCurrency((sale.cashReceived || sale.total) - sale.total)}</span></div>
               </>
             )}
          </div>

          {/* Footer & Barcode */}
          <div className="text-center space-y-6 pt-6">
             <div className="space-y-1">
               <p className="font-black text-[10px] uppercase">Thank you for your visit!</p>
               <p className="text-[9px] text-zinc-400 italic">Goods once sold are only exchangeable within 7 days with valid receipt and original packaging.</p>
             </div>
             
             {/* Simulated Barcode */}
             <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 h-12">
                   {[...Array(40)].map((_, i) => (
                     <div key={i} className="bg-black" style={{ width: `${Math.random() > 0.5 ? 2 : 1}px`, height: '100%', opacity: Math.random() > 0.1 ? 1 : 0.2 }} />
                   ))}
                </div>
                <span className="text-[9px] font-bold tracking-[0.4em]">{sale.id}</span>
             </div>

             <div className="text-[8px] text-zinc-300 uppercase tracking-widest">
                Ayaat Terminal Engine v8.4.2-ENT
             </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-8 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex gap-4">
          <button onClick={onClose} className="flex-1 py-5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-[2rem] font-black uppercase text-xs tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all active:scale-95">
             Dismiss
          </button>
          <button onClick={handlePrint} className="flex-[1.5] py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95">
             <Printer size={18} /> Print Receipt
          </button>
        </div>
      </div>

      {/* Printer-only hidden element for actual window.print() style */}
      <div className="print-only fixed inset-0 bg-white z-[1000] p-10 font-mono text-[12pt]">
        {/* Actual simplified print markup can go here if needed, but styling the modal is usually enough for modern browsers */}
      </div>
    </div>
  );
};

export default POSView;
