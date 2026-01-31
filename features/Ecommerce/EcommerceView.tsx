
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Globe, Layout, ShoppingBag, Eye, Settings, Share2, 
  Smartphone, Monitor, Zap, CheckCircle2, X, Plus,
  Palette, MousePointer2, ExternalLink, BarChart, Package,
  ChevronRight, RefreshCw, Layers, Sparkles, ShoppingCart,
  ArrowLeft, CreditCard, ShieldCheck, Heart, Search, Menu,
  Trash2, Type, ImageIcon, ListTodo, Info, AlignLeft,
  Facebook, Instagram, MessageCircle, User, LogIn, Upload,
  ChevronLeft, Twitter, Youtube, UserCircle, LogOut, Mail, Lock, Phone,
  Speaker, Camera, Cpu, Mouse, Headphones, Watch, Tablet, Send, Bot,
  Link, Shield, ChevronDown, Minus, Star, Truck, RotateCcw, Image as ImageIconLucide
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../mockData';
import { Product } from '../../types';
import { formatCurrency, generateId } from '../../utils/helpers';

// Helper to map icon names to components for dynamic rendering
const IconMap: Record<string, any> = {
  Monitor, Smartphone, Speaker, Zap, Globe, Package, Cpu, Mouse, Headphones, Watch, Tablet, Layers, Camera
};

// --- Sub-Component: Domain Settings Modal ---
const DomainModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  currentDomain: string;
  onSave: (newDomain: string) => void;
}> = ({ isOpen, onClose, currentDomain, onSave }) => {
  const [domain, setDomain] = useState(currentDomain);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <Link size={22}/>
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Domain Setup</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Configure public access point</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <div className="p-10 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Storefront Address</label>
              <div className="relative">
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" 
                  value={domain} 
                  onChange={e => setDomain(e.target.value.toLowerCase())} 
                  placeholder="shop.yourdomain.com"
                />
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 flex gap-4">
              <Shield size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-widest">
                Changes may take up to 24 hours to propagate across the global CDN network. SSL certificates are auto-provisioned.
              </p>
            </div>
          </div>

          <button 
            onClick={() => { onSave(domain); onClose(); }}
            className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            Update Domain Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Customer Auth Modal ---
const CustomerAuthModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  initialMode: 'LOGIN' | 'REGISTER';
  onAuthSuccess: (customer: any) => void;
}> = ({ isOpen, onClose, initialMode, onAuthSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockCustomer = {
      name: mode === 'REGISTER' ? formData.name : formData.email.split('@')[0],
      email: formData.email,
      points: 150
    };
    onAuthSuccess(mockCustomer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              {mode === 'LOGIN' ? <LogIn size={22}/> : <UserCircle size={22}/>}
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                {mode === 'LOGIN' ? 'Access your digital hub' : 'Join the digital ecosystem'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            {mode === 'REGISTER' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="email" required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            {mode === 'REGISTER' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="tel" required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="password" required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
            {mode === 'LOGIN' ? 'Sign In' : 'Join Membership'}
          </button>

          <div className="pt-4 text-center">
            <button 
              type="button"
              onClick={() => setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors"
            >
              {mode === 'LOGIN' ? "Don't have an account? Join Now" : "Already a member? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Sub-Component: Live Chat Interface ---
const LiveChatOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to Ayaat Digital! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: `Thanks for reaching out! A specialist will be with you shortly regarding "${userMsg}".` }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[400] w-full max-w-[380px] h-[550px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
      <div className="p-6 bg-blue-600 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl"><Bot size={20}/></div>
          <div>
            <p className="font-black text-xs uppercase tracking-widest leading-none">Live Agent</p>
            <p className="text-[10px] opacity-70 font-bold mt-1">Ready to help you</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={20}/></button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-zinc-50 dark:bg-zinc-950/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-xs font-bold leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-3 shrink-0">
        <input 
          className="flex-1 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl px-5 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-600/5 transition-all" 
          placeholder="Message..." 
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all"><Send size={18}/></button>
      </form>
    </div>
  );
};

// --- Sub-Component: Product Detail Page ---
const ProductDetailPage: React.FC<{ 
  product: Product; 
  onBack: () => void; 
  onAddToCart: (p: Product) => void;
}> = ({ product, onBack, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const finalPrice = product.offerPrice && product.offerPrice > 0 ? product.offerPrice : product.price;

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950 overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-8">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
          <ChevronRight size={10} />
          <span>{product.category}</span>
          <ChevronRight size={10} />
          <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-2xl relative group">
              <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
              {product.offerPrice && product.offerPrice > 0 && (
                <div className="absolute top-8 left-8 bg-blue-600 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">PROMOTIONAL OFFER</div>
              )}
            </div>
            {/* Mock thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className={`aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 ${i === 1 ? 'border-blue-600' : 'border-transparent'} overflow-hidden cursor-pointer`}>
                   <img src={product.imageUrl} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
               <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 block">{product.category}</span>
               <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-tight mb-4">{product.name}</h1>
               <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-zinc-200"} />)}
                  </div>
                  <span>4.2 (124 reviews)</span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={14} /> In Stock</span>
               </div>
            </div>

            <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 mb-10">
               <div className="flex items-end gap-3 mb-6">
                 <span className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">{formatCurrency(finalPrice)}</span>
                 {product.offerPrice && (
                   <span className="text-xl text-zinc-400 line-through font-bold pb-1">{formatCurrency(product.price)}</span>
                 )}
               </div>
               
               <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8">
                 {product.description || "The ultimate performance asset for your digital workspace. Engineered for precision and built to withstand the rigorous demands of professional use."}
               </p>

               <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center p-2 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Minus size={18}/></button>
                    <span className="w-12 text-center font-black text-lg">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="p-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Plus size={18}/></button>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="flex-1 w-full sm:w-auto py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={18} /> Add to Basket
                  </button>
                  <button className="p-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-400 hover:text-red-500 transition-all shadow-sm">
                    <Heart size={20} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-blue-600"><Truck size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Global Logistics</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase">Express 24h Shipping</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-blue-600"><RotateCcw size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Buyer Protection</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase">30-Day Managed Returns</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Storefront Simulation Component ---
const Storefront: React.FC<{ 
  config: any; 
  products: Product[]; 
  onBack: () => void;
}> = ({ config, products, onBack }) => {
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeProductFilter, setActiveProductFilter] = useState<'ALL' | 'NEW' | 'BEST'>('ALL');
  
  // View State
  const [viewMode, setViewMode] = useState<'HOME' | 'DETAIL'>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Auth State
  const [loggedInCustomer, setLoggedInCustomer] = useState<any>(null);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: 'LOGIN' | 'REGISTER'}>({ isOpen: false, mode: 'LOGIN' });

  const onlineProducts = useMemo(() => {
    let list = products.filter(p => p.isVisibleOnline);
    if (activeProductFilter === 'NEW') return list.slice(0, 4);
    if (activeProductFilter === 'BEST') return list.sort((a,b) => b.price - a.price).slice(0, 4);
    return list;
  }, [products, activeProductFilter]);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.offerPrice || item.product.price) * item.qty, 0);

  // Banner Slider Logic
  useEffect(() => {
    if (config.heroBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % config.heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [config.heroBanners.length]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
  };

  const handleLogout = () => {
    setLoggedInCustomer(null);
  };

  const navigateToDetail = (product: Product) => {
    setSelectedProduct(product);
    setViewMode('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setViewMode('HOME');
    setSelectedProduct(null);
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-zinc-950 z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-300">
      <CustomerAuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal({...authModal, isOpen: false})} 
        initialMode={authModal.mode}
        onAuthSuccess={setLoggedInCustomer}
      />

      <LiveChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Utility Bar */}
      <div className="bg-zinc-900 text-white px-6 py-2 flex justify-between items-center text-[9px] font-black uppercase tracking-widest z-[60]">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-1.5 text-blue-400"><Globe size={10}/> Storefront Live Preview</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <ArrowLeft size={12} /> Exit Preview
        </button>
      </div>

      {/* Main Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center shadow-sm cursor-pointer" onClick={navigateHome}>
            {config.headerLogo ? (
              <img src={config.headerLogo} className="w-full h-full object-contain" alt="Logo" />
            ) : (
              <span className="font-black text-blue-600 text-xs md:text-sm">LOGO</span>
            )}
          </div>
          <div className="hidden md:block">
            <span className="font-black text-base tracking-tightest leading-none block uppercase cursor-pointer" onClick={navigateHome}>{config.name}</span>
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Official Storefront</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-xl hidden lg:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder={config.headerSearchPlaceholder}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-2.5 pl-12 pr-6 text-sm outline-none"
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex gap-2">
            {loggedInCustomer ? (
              <div className="flex items-center gap-4 pr-2">
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Hi, {loggedInCustomer.name}</p>
                    <button onClick={handleLogout} className="text-[8px] font-black uppercase text-zinc-400 hover:text-red-500 transition-colors">Log Out</button>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-blue-600">
                    <User size={18} />
                 </div>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'LOGIN' })} 
                className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg shadow-blue-600/20 active:scale-105 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl hover:scale-105 transition-transform">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button - On the Right */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-zinc-500 hover:text-blue-600 transition-all"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer - Top to Bottom Mode */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden no-print animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-full h-[70vh] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-top duration-500 rounded-b-[3rem]">
             <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black">A</div>
                  <span className="font-black uppercase tracking-tighter text-base">Store Navigation</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-2xl text-zinc-400"><X size={24}/></button>
             </div>
             
             <div className="flex-1 py-10 px-8 space-y-10 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {['Home', 'New Arrivals', 'Promotions', 'Collections', 'About Us', 'Contact'].map(item => (
                    <button key={item} onClick={() => { navigateHome(); setIsMobileMenuOpen(false); }} className="text-left px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white transition-all">
                      {item}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Your Account</p>
                  {loggedInCustomer ? (
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-3xl">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">{loggedInCustomer.name.charAt(0)}</div>
                          <div className="min-w-0">
                             <p className="text-xs font-black uppercase text-zinc-900 dark:text-zinc-100 truncate">{loggedInCustomer.name}</p>
                             <p className="text-[9px] font-bold text-zinc-400 uppercase">{loggedInCustomer.points} Points Available</p>
                          </div>
                       </div>
                       <button onClick={handleLogout} className="p-3 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl"><LogOut size={20}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); setAuthModal({ isOpen: true, mode: 'LOGIN' }); }}
                      className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20"
                    >
                      Authenticate Access
                    </button>
                  )}
                </div>
             </div>
             
             <div className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest text-center leading-relaxed">Powered by AyaatPOS Enterprise Cloud Node</p>
             </div>
          </div>
        </div>
      )}

      {/* Floating Chat FAB */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-[150] w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-blue-600/40 group"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Need Help?</span>
        </button>
      )}

      {/* Content Area Switcher */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {viewMode === 'DETAIL' && selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={navigateHome} 
            onAddToCart={addToCart} 
          />
        ) : (
          <>
            {/* Hero Slider Section */}
            <section className="px-4 py-6 md:py-10 bg-zinc-50 dark:bg-zinc-900/30">
              <div className="max-w-[1200px] mx-auto h-[350px] md:h-[500px] bg-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden relative shadow-2xl group/banner">
                {config.heroBanners.map((banner: string, idx: number) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  >
                    <img src={banner} className="w-full h-full object-cover opacity-60 transition-transform duration-[5000ms]" style={{ transform: idx === currentBanner ? 'scale(1.1)' : 'scale(1.0)' }} alt={`Banner ${idx + 1}`} />
                  </div>
                ))}
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
                  <div className="max-w-3xl space-y-4 md:space-y-6">
                    <h1 className="text-3xl md:text-6xl font-black text-white tracking-tightest leading-none animate-in slide-in-from-bottom-6 duration-700">
                      {config.heroTitle}
                    </h1>
                    <p className="text-xs md:text-lg text-zinc-200 font-medium max-w-xl mx-auto opacity-90 animate-in slide-in-from-bottom-4 duration-1000 delay-100">
                      {config.heroSubtitle}
                    </p>
                    <div className="flex gap-4 justify-center pt-4 pointer-events-auto">
                      <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-zinc-900 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 hover:bg-blue-600 hover:text-white transition-all shadow-xl">Shop Now</button>
                      <button className="hidden sm:block px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Collections</button>
                    </div>
                  </div>
                </div>

                {config.heroBanners.length > 1 && (
                  <div className="absolute bottom-6 md:bottom-10 inset-x-0 flex justify-center gap-2.5 z-20">
                    {config.heroBanners.map((_: any, i: number) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentBanner(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentBanner ? 'w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-4 bg-white/20 hover:bg-white/40'}`} 
                      />
                    ))}
                  </div>
                )}
                
                {config.heroBanners.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentBanner(prev => (prev - 1 + config.heroBanners.length) % config.heroBanners.length)}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover/banner:opacity-100 transition-all hover:scale-110 z-20 hidden md:flex"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => setCurrentBanner(prev => (prev + 1) % config.heroBanners.length)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover/banner:opacity-100 transition-all hover:scale-110 z-20 hidden md:flex"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </section>

            {/* Collections Section - Dynamic Categories */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-b border-zinc-100 dark:border-zinc-900">
              <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tightest leading-none uppercase">{config.catSectionTitle}</h2>
                  <p className="text-zinc-500 font-medium text-sm md:text-lg">{config.catSectionDesc}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                  {config.categories.map((cat: any) => {
                    const CatIcon = IconMap[cat.icon] || Layers;
                    return (
                      <div key={cat.id} className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 text-center border border-zinc-100 dark:border-zinc-800 hover:border-blue-600/20 hover:shadow-2xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-3xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                            <CatIcon className="text-blue-600" />
                        </div>
                        <h4 className="font-black text-[10px] md:text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-100">{cat.name}</h4>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* Product Grid Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tightest leading-none uppercase">{config.prodSectionTitle}</h2>
                  <p className="text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2">{config.prodSectionDesc}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveProductFilter('NEW')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeProductFilter === 'NEW' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
                  >
                    New Arrivals
                  </button>
                  <button 
                    onClick={() => setActiveProductFilter('BEST')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeProductFilter === 'BEST' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
                  >
                    Best Sellers
                  </button>
                  <button 
                    onClick={() => setActiveProductFilter('ALL')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeProductFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
                  >
                    All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {onlineProducts.map(p => (
                  <div key={p.id} onClick={() => navigateToDetail(p)} className="group cursor-pointer bg-white dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-4 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-blue-600/20">
                    <div className="aspect-square rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-900 overflow-hidden mb-6 relative">
                      {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" /> : <Package className="m-auto h-full text-zinc-300" />}
                      <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-4 right-4 p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <Heart size={16} />
                      </button>
                    </div>
                    <div className="px-2">
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">{p.category}</p>
                      <h3 className="font-black text-base mb-4 leading-tight truncate">{p.name}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">{formatCurrency(p.offerPrice || p.price)}</span>
                          {p.offerPrice && <span className="text-[10px] text-zinc-400 line-through font-bold">{formatCurrency(p.price)}</span>}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="p-3.5 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl active:scale-95 transition-all shadow-lg hover:bg-blue-600"><Plus size={18}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="bg-zinc-950 text-white py-24 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
              <div className="space-y-8">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3">
                    {config.footerLogo ? (
                      <img src={config.footerLogo} className="w-full h-full object-contain" alt="Footer Logo" />
                    ) : (
                      <span className="font-black text-blue-500 text-xl">A</span>
                    )}
                 </div>
                 <p className="text-zinc-500 text-xs font-medium leading-relaxed">{config.footerAbout}</p>
                 <div className="flex gap-4">
                    {config.socialLinks.fb && <div className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"><Facebook size={18}/></div>}
                    {config.socialLinks.ig && <div className="p-2 bg-white/5 rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"><Instagram size={18}/></div>}
                    {config.socialLinks.tw && <div className="p-2 bg-white/5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"><Twitter size={18}/></div>}
                    {config.socialLinks.yt && <div className="p-2 bg-white/5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"><Youtube size={18}/></div>}
                 </div>
              </div>
              <div>
                 <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">{config.footerCol1Title}</h5>
                 <ul className="space-y-4 text-xs font-bold text-zinc-500">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Track Order</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Returns</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Support</a></li>
                 </ul>
              </div>
              <div>
                 <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">{config.footerCol2Title}</h5>
                 <ul className="space-y-4 text-xs font-bold text-zinc-500">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Corporate</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Sustainability</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Terms</a></li>
                 </ul>
              </div>
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                 <h5 className="text-lg font-black mb-4">Ayaat Insights</h5>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">Join our newsletter for exclusive digital access.</p>
                 <div className="space-y-3">
                    <input className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-blue-600 transition-all" placeholder="Enter email" />
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Enroll</button>
                 </div>
              </div>
           </div>
           <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
              <p>© 2024 {config.name}</p>
              <div className="flex gap-6">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Cookies</span>
              </div>
           </div>
        </footer>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end no-print animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
             <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3"><ShoppingBag /> Basket</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"><X size={24}/></button>
             </div>
             <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-300">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <p className="text-xs font-black uppercase tracking-widest mt-6">Basket is empty</p>
                  </div>
                ) : cart.map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-16 h-16 rounded-xl bg-zinc-50 dark:bg-zinc-800 overflow-hidden border border-zinc-100 dark:border-zinc-800">
                       <img src={item.product.imageUrl} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between">
                          <h4 className="font-bold text-sm">{item.product.name}</h4>
                          <span className="text-sm font-black">{formatCurrency((item.product.offerPrice || item.product.price) * item.qty)}</span>
                       </div>
                       <p className="text-[10px] font-black text-zinc-400 mt-1">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
                <div className="flex justify-between text-2xl font-black">
                   <span>Total</span><span>{formatCurrency(cartTotal)}</span>
                </div>
                <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Proceed to Pay</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EcommerceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'CATALOG' | 'CMS' | 'PREVIEW'>('DASHBOARD');
  const [cmsTab, setCmsTab] = useState<'IDENTITY' | 'HERO' | 'CAT' | 'PROD' | 'FOOTER'>('IDENTITY');
  const [isStorefrontOpen, setIsStorefrontOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.map(p => ({ ...p, isVisibleOnline: true })));
  
  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const footerLogoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const replaceBannerInputRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const [storefrontConfig, setStorefrontConfig] = useState({
    name: 'Ayaat Digital',
    domain: 'shop.ayaatpos.com',
    themeColor: '#2563eb',
    headerLogo: '',
    footerLogo: '',
    headerSearchPlaceholder: 'Search for gadgets...',
    
    heroTitle: 'Innovate Your Workspace.',
    heroSubtitle: 'Professional gear curated for performance, reliability, and precision.',
    heroBanners: [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeede?q=80&w=2000',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000'
    ],
    
    // Dynamic Categories Configuration
    categories: [
      { id: '1', name: 'Laptops', icon: 'Monitor' },
      { id: '2', name: 'Audio', icon: 'Speaker' },
      { id: '3', name: 'Accessories', icon: 'Zap' },
      { id: '4', name: 'Drones', icon: 'Globe' }
    ],

    catSectionTitle: 'Curated Categories',
    catSectionDesc: 'High-performance assets for modern professionals.',
    prodSectionTitle: 'Featured Arrivals',
    prodSectionDesc: 'Latest innovations in the digital ecosystem.',
    footerAbout: 'Redefining retail with seamless digital-first experiences powered by AyaatPOS.',
    footerCol1Title: 'Customer Care',
    footerCol2Title: 'Corporate',

    socialLinks: {
      fb: true,
      ig: true,
      tw: false,
      yt: true
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'HEADER' | 'FOOTER' | 'BANNER', idx?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'HEADER') setStorefrontConfig(prev => ({ ...prev, headerLogo: result }));
      else if (target === 'FOOTER') setStorefrontConfig(prev => ({ ...prev, footerLogo: result }));
      else if (target === 'BANNER') {
        if (idx !== undefined && idx !== null) {
          setStorefrontConfig(prev => {
            const newBanners = [...prev.heroBanners];
            newBanners[idx] = result;
            return { ...prev, heroBanners: newBanners };
          });
          setReplaceIndex(null);
        } else {
          setStorefrontConfig(prev => {
            if (prev.heroBanners.length >= 5) {
              alert('Maximum 5 banners allowed.');
              return prev;
            }
            return { ...prev, heroBanners: [...prev.heroBanners, result] };
          });
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removeBanner = (idx: number) => {
    setStorefrontConfig(prev => ({ ...prev, heroBanners: prev.heroBanners.filter((_, i) => i !== idx) }));
  };

  // Categories CMS Handlers
  const addCategory = () => {
    const newCat = { id: generateId(), name: 'New Category', icon: 'Layers' };
    setStorefrontConfig(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
  };

  const removeCategory = (id: string) => {
    setStorefrontConfig(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
  };

  const updateCategory = (id: string, field: 'name' | 'icon', value: string) => {
    setStorefrontConfig(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const stats = [
    { label: 'Web Traffic', value: '2,405', trend: '+12%', icon: MousePointer2, color: 'text-blue-600' },
    { label: 'Online Revenue', value: formatCurrency(4250), trend: '+8.4%', icon: ShoppingBag, color: 'text-emerald-500' },
    { label: 'Cart Success', value: '3.2%', trend: '+0.5%', icon: Zap, color: 'text-amber-500' },
    { label: 'Active Web Users', value: '42', trend: 'Live', icon: Globe, color: 'text-purple-500' }
  ];

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto custom-scrollbar relative transition-colors">
      {isStorefrontOpen && <Storefront config={storefrontConfig} products={products} onBack={() => setIsStorefrontOpen(false)} />}
      
      <DomainModal 
        isOpen={isDomainModalOpen} 
        onClose={() => setIsDomainModalOpen(false)} 
        currentDomain={storefrontConfig.domain} 
        onSave={(d) => setStorefrontConfig({...storefrontConfig, domain: d})} 
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Digital Control</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Design and deploy your professional public storefront.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setIsStorefrontOpen(true)} className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-xs uppercase tracking-widest"><Eye size={18} /> Storefront</button>
          <button className="flex-1 sm:flex-none bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-widest">Publish Changes</button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-fit shrink-0">
        {[
          { id: 'DASHBOARD', label: 'Dashboard', icon: BarChart },
          { id: 'CMS', label: 'Design Editor', icon: Palette },
          { id: 'CATALOG', label: 'Online Catalog', icon: Layers }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 ${stat.color}`}><stat.icon size={20} /></div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
               <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
                  <h3 className="text-xl font-black tracking-tight">Active Domain</h3>
                  <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600"><Globe size={22}/></div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight">{storefrontConfig.domain}</p>
                          <p className="text-[10px] text-emerald-500 font-bold uppercase">SSL Secured & Online</p>
                        </div>
                     </div>
                     <button 
                        onClick={() => setIsDomainModalOpen(true)}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-5 py-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                     >
                       Settings
                     </button>
                  </div>
               </div>
               
               <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
                  <h3 className="text-xl font-black tracking-tight">Promotion Hub</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => { setActiveTab('CMS'); setCmsTab('HERO'); }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-all border border-blue-100 dark:border-blue-900/30 group"
                    >
                      <ImageIconLucide size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Update Banners</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('CATALOG'); }}
                      className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-emerald-100 transition-all border border-emerald-100 dark:border-emerald-900/30 group"
                    >
                      <Plus size={20} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Add Assets</span>
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'CMS' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col lg:flex-row overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4 min-h-[700px]">
             <div className="w-full lg:w-72 border-r border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/20 p-6 space-y-2">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2 mb-4">Edit Sections</p>
                {[
                  { id: 'IDENTITY', label: 'Logo & Identity', icon: Globe },
                  { id: 'HERO', label: 'Banner Slider', icon: ImageIcon },
                  { id: 'CAT', label: 'Collections', icon: ListTodo },
                  { id: 'PROD', label: 'Product Display', icon: Package },
                  { id: 'FOOTER', label: 'Footer & Social', icon: AlignLeft }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setCmsTab(s.id as any)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all w-full text-left ${cmsTab === s.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                  >
                    <s.icon size={16} /> {s.label}
                  </button>
                ))}
             </div>

             <div className="flex-1 p-10 overflow-y-auto custom-scrollbar h-full">
                {cmsTab === 'IDENTITY' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tightest leading-none">Identity CMS</h3>
                        <p className="text-zinc-500 font-medium">Manage your brand assets and global storefront identity.</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Header Branding Logo</label>
                           <div 
                              onClick={() => headerLogoInputRef.current?.click()}
                              className="aspect-video rounded-[2rem] bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 group transition-all"
                           >
                              {storefrontConfig.headerLogo ? (
                                <img src={storefrontConfig.headerLogo} className="max-h-24 object-contain" />
                              ) : (
                                <div className="text-center p-6">
                                   <Upload size={32} className="mx-auto text-zinc-300 group-hover:text-blue-500 transition-colors mb-2" />
                                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Upload Header Logo</p>
                                </div>
                              )}
                              <input type="file" ref={headerLogoInputRef} className="hidden" onChange={e => handleFileUpload(e, 'HEADER')} accept="image/*" />
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Store Display Name</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-bold outline-none uppercase" value={storefrontConfig.name} onChange={e => setStorefrontConfig({...storefrontConfig, name: e.target.value})} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Search Prompt Text</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-bold outline-none" value={storefrontConfig.headerSearchPlaceholder} onChange={e => setStorefrontConfig({...storefrontConfig, headerSearchPlaceholder: e.target.value})} />
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {cmsTab === 'HERO' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tightest leading-none">Hero Slider CMS</h3>
                        <p className="text-zinc-500 font-medium">Add up to 5 cinematic banners for your main slider. Landscape images (16:9) recommended.</p>
                     </div>
                     
                     <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {storefrontConfig.heroBanners.map((banner, i) => (
                             <div key={i} className="relative group aspect-video rounded-[2rem] overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-lg">
                                <img src={banner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Banner ${i+1}`} />
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                   <button 
                                      onClick={() => { setReplaceIndex(i); setTimeout(() => replaceBannerInputRef.current?.click(), 10); }}
                                      className="p-3 bg-white text-zinc-900 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                                   >
                                      <RefreshCw size={14}/> Replace
                                   </button>
                                   <button 
                                      onClick={() => removeBanner(i)}
                                      className="p-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all shadow-xl"
                                   >
                                      <Trash2 size={14}/> Remove
                                   </button>
                                </div>
                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest border border-white/10">Banner {i+1}</div>
                             </div>
                           ))}

                           {storefrontConfig.heroBanners.length < 5 && (
                             <button 
                                onClick={() => bannerInputRef.current?.click()}
                                className="aspect-video rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-3 text-zinc-300 hover:text-blue-500 hover:border-blue-500 transition-all bg-zinc-50/50 dark:bg-zinc-800/20 group"
                             >
                                <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                  <Plus size={32} />
                                </div>
                                <div className="text-center">
                                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Add New Banner</p>
                                   <p className="text-[8px] font-bold text-zinc-300 uppercase mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                </div>
                             </button>
                           )}

                           {/* Hidden Inputs moved outside to prevent bubble issues */}
                           <input type="file" ref={bannerInputRef} className="hidden" onChange={e => handleFileUpload(e, 'BANNER')} accept="image/*" />
                           <input 
                             type="file" 
                             ref={replaceBannerInputRef} 
                             className="hidden" 
                             onChange={e => replaceIndex !== null && handleFileUpload(e, 'BANNER', replaceIndex)} 
                             accept="image/*" 
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Hero Heading Title</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-black text-2xl outline-none" value={storefrontConfig.heroTitle} onChange={e => setStorefrontConfig({...storefrontConfig, heroTitle: e.target.value})} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Sub-heading Story</label>
                              <textarea rows={3} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-medium outline-none resize-none" value={storefrontConfig.heroSubtitle} onChange={e => setStorefrontConfig({...storefrontConfig, heroSubtitle: e.target.value})} />
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {cmsTab === 'CAT' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 pb-20">
                     <div className="flex justify-between items-end">
                        <div className="space-y-2">
                          <h3 className="text-3xl font-black tracking-tightest leading-none">Collections CMS</h3>
                          <p className="text-zinc-500 font-medium">Define your curated asset groupings and their visual identity.</p>
                        </div>
                        <button 
                          onClick={addCategory}
                          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                        >
                           <Plus size={16}/> Add Category
                        </button>
                     </div>

                     <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Section Heading</label>
                           <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-black outline-none" value={storefrontConfig.catSectionTitle} onChange={e => setStorefrontConfig({...storefrontConfig, catSectionTitle: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Section Description</label>
                           <textarea rows={2} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-bold outline-none resize-none" value={storefrontConfig.catSectionDesc} onChange={e => setStorefrontConfig({...storefrontConfig, catSectionDesc: e.target.value})} />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {storefrontConfig.categories.map((cat: any) => (
                           <div key={cat.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 space-y-6 group">
                              <div className="flex justify-between items-start">
                                 <div className="p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm text-blue-600">
                                    {React.createElement(IconMap[cat.icon] || Layers, { size: 24 })}
                                 </div>
                                 <button 
                                   onClick={() => removeCategory(cat.id)}
                                   className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                                 >
                                    <Trash2 size={18}/>
                                 </button>
                              </div>
                              <div className="space-y-4">
                                 <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Category Label</label>
                                    <input 
                                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3 px-4 font-bold text-sm outline-none" 
                                      value={cat.name} 
                                      onChange={e => updateCategory(cat.id, 'name', e.target.value)} 
                                    />
                                 </div>
                                 <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Visual Icon Component</label>
                                    <select 
                                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3 px-4 font-bold text-sm outline-none appearance-none" 
                                      value={cat.icon}
                                      onChange={e => updateCategory(cat.id, 'icon', e.target.value)}
                                    >
                                       {Object.keys(IconMap).map(iconName => (
                                          <option key={iconName} value={iconName}>{iconName}</option>
                                       ))}
                                    </select>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
                
                {cmsTab === 'PROD' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tightest leading-none">Product Grid CMS</h3>
                        <p className="text-zinc-500 font-medium">Control the storefront's marketplace labels.</p>
                     </div>
                     <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Main Store Title</label>
                           <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-black outline-none" value={storefrontConfig.prodSectionTitle} onChange={e => setStorefrontConfig({...storefrontConfig, prodSectionTitle: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Sub-Tagline Message</label>
                           <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-bold outline-none" value={storefrontConfig.prodSectionDesc} onChange={e => setStorefrontConfig({...storefrontConfig, prodSectionDesc: e.target.value})} />
                        </div>
                     </div>
                  </div>
                )}

                {cmsTab === 'FOOTER' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 pb-20">
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tightest leading-none">Footer & Social CMS</h3>
                        <p className="text-zinc-500 font-medium">Control the bottom sections and social connectivity.</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Footer Branding Logo</label>
                           <div 
                              onClick={() => footerLogoInputRef.current?.click()}
                              className="aspect-video rounded-[2rem] bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 group transition-all"
                           >
                              {storefrontConfig.footerLogo ? (
                                <img src={storefrontConfig.footerLogo} className="max-h-24 object-contain" />
                              ) : (
                                <div className="text-center p-6">
                                   <Upload size={32} className="mx-auto text-zinc-300 group-hover:text-blue-500 transition-colors mb-2" />
                                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Upload Footer Logo</p>
                                </div>
                              )}
                              <input type="file" ref={footerLogoInputRef} className="hidden" onChange={e => handleFileUpload(e, 'FOOTER')} accept="image/*" />
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">About Us Statement</label>
                              <textarea rows={4} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-6 font-medium outline-none resize-none" value={storefrontConfig.footerAbout} onChange={e => setStorefrontConfig({...storefrontConfig, footerAbout: e.target.value})} />
                           </div>
                        </div>
                     </div>

                     <div className="p-10 bg-zinc-50 dark:bg-zinc-950 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 space-y-8">
                        <h4 className="text-xl font-black tracking-tight flex items-center gap-3"><Share2 className="text-blue-600"/> Social Ecosystem</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {[
                             { id: 'fb', label: 'Facebook Connectivity', icon: Facebook, color: 'text-blue-600' },
                             { id: 'ig', label: 'Instagram Integration', icon: Instagram, color: 'text-pink-600' },
                             { id: 'tw', label: 'Twitter / X Presence', icon: Twitter, color: 'text-zinc-900 dark:text-white' },
                             { id: 'yt', label: 'YouTube Commerce', icon: Youtube, color: 'text-red-600' }
                           ].map(soc => (
                             <div key={soc.id} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-4">
                                   <div className={`p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl ${soc.color}`}><soc.icon size={20}/></div>
                                   <span className="text-xs font-black uppercase tracking-widest">{soc.label}</span>
                                </div>
                                <button 
                                  onClick={() => setStorefrontConfig({...storefrontConfig, socialLinks: {...storefrontConfig.socialLinks, [soc.id]: !(storefrontConfig.socialLinks as any)[soc.id]}})}
                                  className={`w-12 h-6 rounded-full transition-all relative ${(storefrontConfig.socialLinks as any)[soc.id] ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(storefrontConfig.socialLinks as any)[soc.id] ? 'left-7' : 'left-1'}`} />
                                </button>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}

        {activeTab === 'CATALOG' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4 pb-10">
             <div className="p-8 border-b border-zinc-50 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
                <div>
                   <h3 className="text-xl font-black tracking-tight">Sync Status</h3>
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Select assets to display on your public storefront</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-[10px] font-black uppercase text-zinc-500 hover:text-blue-600 transition-colors">Enable All</button>
                  <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-[10px] font-black uppercase text-zinc-500 hover:text-red-500 transition-colors">Disable All</button>
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 text-[10px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800">
                   <tr>
                     <th className="px-10 py-6">Product</th>
                     <th className="px-10 py-6">Web Price</th>
                     <th className="px-10 py-6">Reserve Stock</th>
                     <th className="px-10 py-6 text-right">Visibility</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-all">
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                                 {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" alt="" /> : <Package className="m-auto h-full text-zinc-300" />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate">{p.name}</p>
                                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{p.sku}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">{formatCurrency(p.offerPrice || p.price)}</span>
                        </td>
                        <td className="px-10 py-6">
                           <input type="number" className="w-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-black outline-none focus:ring-2 focus:ring-blue-600/10" defaultValue={0} />
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button 
                            onClick={() => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, isVisibleOnline: !x.isVisibleOnline } : x))}
                            className={`w-12 h-6 rounded-full transition-all relative ${p.isVisibleOnline ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${p.isVisibleOnline ? 'left-7' : 'left-1'}`} />
                          </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceView;
