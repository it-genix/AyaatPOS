
import React, { useState, useMemo } from 'react';
import { 
  Globe, Layout, ShoppingBag, Eye, Settings, Share2, 
  Smartphone, Monitor, Zap, CheckCircle2, X, Plus,
  Palette, MousePointer2, ExternalLink, BarChart, Package,
  ChevronRight, RefreshCw, Layers, Sparkles, ShoppingCart,
  ArrowLeft, CreditCard, ShieldCheck, Heart, Search, Menu,
  Trash2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../mockData';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/helpers';

// --- Storefront Simulation Component ---
const Storefront: React.FC<{ 
  config: any; 
  products: Product[]; 
  onBack: () => void;
}> = ({ config, products, onBack }) => {
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const onlineProducts = products.filter(p => p.isVisibleOnline);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.offerPrice || item.product.price) * item.qty, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-zinc-950 z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> Exit Storefront
          </button>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">A</div>
            <span className="font-black text-sm tracking-tight">{config.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-blue-600">Categories</a>
            <a href="#" className="hover:text-blue-600">Deals</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-all">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <section className="relative h-[400px] md:h-[600px] flex items-center justify-center text-center px-6 overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 opacity-40">
             <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeede?q=80&w=2000" className="w-full h-full object-cover" alt="Hero" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tightest leading-none animate-in slide-in-from-bottom-8 duration-700">
              {config.heroTitle}
            </h1>
            <p className="text-sm md:text-xl text-zinc-300 font-medium max-w-xl mx-auto opacity-80 animate-in slide-in-from-bottom-12 duration-700">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in slide-in-from-bottom-16 duration-700">
              <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all">
                Shop The Collection
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tightest leading-none">Featured Collections</h2>
              <p className="text-zinc-500 font-medium text-sm mt-2 uppercase tracking-widest text-[10px]">Quality assets for your digital workspace</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400"><Layout size={18}/></button>
              <button className="p-2 bg-zinc-900 text-white rounded-lg"><Menu size={18}/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {onlineProducts.map(p => {
              const hasOffer = p.offerPrice && p.offerPrice > 0;
              return (
                <div key={p.id} className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-4 transition-all hover:shadow-2xl hover:border-blue-600/20">
                  <div 
                    onClick={() => setSelectedProduct(p)}
                    className="aspect-square rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-800 overflow-hidden mb-6 cursor-pointer relative"
                  >
                    {p.imageUrl ? (
                      <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300"><Package size={48} strokeWidth={1} /></div>
                    )}
                    <button className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                       <Heart size={18} />
                    </button>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-bold text-lg tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                      <div className="flex flex-col items-end">
                        {hasOffer && <span className="text-[10px] text-zinc-400 line-through font-bold">{formatCurrency(p.price)}</span>}
                        <span className={`text-lg font-black ${hasOffer ? 'text-emerald-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                          {formatCurrency(hasOffer ? p.offerPrice! : p.price)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">{p.category}</p>
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-full py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 text-white py-20 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                 <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm">A</div>
                 <p className="text-zinc-400 text-xs font-medium leading-relaxed">Redefining modern retail with seamless digital experiences. Powered by AyaatPOS Enterprise.</p>
              </div>
              <div>
                 <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Shop</h5>
                 <ul className="space-y-4 text-xs font-bold text-zinc-500">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Best Sellers</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Sale Event</a></li>
                 </ul>
              </div>
              <div>
                 <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Support</h5>
                 <ul className="space-y-4 text-xs font-bold text-zinc-500">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping Policy</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Returns & Refunds</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
                 </ul>
              </div>
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                 <h5 className="text-sm font-black text-white mb-2">Newsletter</h5>
                 <p className="text-[10px] text-zinc-500 font-bold mb-4 uppercase tracking-widest">Get 10% off your first digital order.</p>
                 <div className="flex gap-2">
                    <input className="flex-1 bg-zinc-800 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none" placeholder="Email" />
                    <button className="p-2 bg-blue-600 rounded-xl"><ArrowLeft className="rotate-180" size={16}/></button>
                 </div>
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
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3"><ShoppingBag /> Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"><X size={24}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-300">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <p className="text-xs font-black uppercase tracking-widest mt-6">Your bag is empty</p>
                  </div>
                ) : cart.map((item, idx) => (
                  <div key={idx} className="flex gap-6 animate-in slide-in-from-top-4">
                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-800">
                       <img src={item.product.imageUrl} className="w-full h-full object-cover" alt={item.product.name} />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                       <div className="flex justify-between gap-4">
                          <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                          <span className="text-sm font-black">{formatCurrency((item.product.offerPrice || item.product.price) * item.qty)}</span>
                       </div>
                       <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Qty: {item.qty}</p>
                       <button 
                        onClick={() => setCart(prev => prev.filter(p => p.product.id !== item.product.id))}
                        className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-4 flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                       >
                         <Trash2 size={12} /> Remove
                       </button>
                    </div>
                  </div>
                ))}
             </div>

             <div className="p-8 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500"><span>Subtotal</span><span>{formatCurrency(cartTotal)}</span></div>
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500"><span>Est. Shipping</span><span className="text-emerald-500">FREE</span></div>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-zinc-100 dark:border-zinc-800">
                   <span>Total</span><span>{formatCurrency(cartTotal)}</span>
                </div>
                <button className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3">
                   <CreditCard size={18} /> Checkout
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
           <div className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 animate-in zoom-in-95 duration-500">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-10 p-4 bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl hover:scale-110 transition-all">
                <X size={24}/>
              </button>
              
              <div className="h-[400px] lg:h-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                 {selectedProduct.imageUrl ? (
                   <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
                 ) : (
                   <Package size={120} className="text-zinc-200" strokeWidth={0.5} />
                 )}
              </div>
              
              <div className="p-10 sm:p-20 flex flex-col justify-center space-y-8">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{selectedProduct.category}</span>
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tightest leading-none">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4">
                       <span className="text-3xl font-black">{formatCurrency(selectedProduct.offerPrice || selectedProduct.price)}</span>
                       {selectedProduct.offerPrice && (
                         <span className="text-lg text-zinc-400 line-through font-bold">{formatCurrency(selectedProduct.price)}</span>
                       )}
                    </div>
                 </div>
                 
                 <p className="text-zinc-500 font-medium leading-relaxed">
                   {selectedProduct.description || `Experience the next generation of ${selectedProduct.category.toLowerCase()}. Designed with precision and crafted for reliability, the ${selectedProduct.name} offers unparalleled performance for the modern digital era.`}
                 </p>
                 
                 <div className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                          <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Stock Level</p>
                          <p className="text-sm font-black">{selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                       </div>
                       <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                          <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">SKU Identity</p>
                          <p className="text-sm font-black font-mono">{selectedProduct.sku}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                      className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all"
                    >
                      Add To Your Bag
                    </button>
                 </div>

                 <div className="pt-8 flex items-center gap-6">
                    <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase">
                       <ShieldCheck size={16} className="text-emerald-500" /> Secure Payment
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase">
                       <Globe size={16} className="text-blue-500" /> Global Delivery
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const EcommerceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'CATALOG' | 'BRANDING' | 'PREVIEW'>('DASHBOARD');
  const [isStorefrontOpen, setIsStorefrontOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.map(p => ({ ...p, isVisibleOnline: true })));
  
  const [storefrontConfig, setStorefrontConfig] = useState({
    name: 'Ayaat Digital Hub',
    domain: 'shop.ayaatpos.com',
    themeColor: '#2563eb',
    heroTitle: 'Future of Retail is Here.',
    heroSubtitle: 'Premium electronics delivered to your doorstep with nationwide fulfillment.',
    isOnline: true,
    socialLinks: {
      fb: true,
      ig: true,
      wa: true
    }
  });

  const stats = [
    { label: 'Web Visitors', value: '2,405', trend: '+12%', icon: MousePointer2, color: 'text-blue-600' },
    { label: 'Online Sales', value: formatCurrency(4250), trend: '+8.4%', icon: ShoppingBag, color: 'text-emerald-500' },
    { label: 'Conversion', value: '3.2%', trend: '+0.5%', icon: Zap, color: 'text-amber-500' },
    { label: 'Active Sessions', value: '42', trend: 'Live', icon: Globe, color: 'text-purple-500' }
  ];

  const toggleOnlineVisibility = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isVisibleOnline: !p.isVisibleOnline } : p));
  };

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto custom-scrollbar transition-colors relative">
      {isStorefrontOpen && (
        <Storefront 
          config={storefrontConfig} 
          products={products} 
          onBack={() => setIsStorefrontOpen(false)} 
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Digital Shop</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Manage your omnichannel storefront and online presence.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setIsStorefrontOpen(true)}
            className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-6 py-4 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-xs uppercase tracking-widest"
          >
            <Eye size={18} /> Preview Site
          </button>
          <button className="flex-1 sm:flex-none bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-widest">
            Publish Changes
          </button>
        </div>
      </div>

      {/* Control Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl w-fit shrink-0">
        {[
          { id: 'DASHBOARD', label: 'Overview', icon: BarChart },
          { id: 'CATALOG', label: 'Web Catalog', icon: Layers },
          { id: 'BRANDING', label: 'Branding', icon: Palette },
          { id: 'PREVIEW', label: 'Simulation', icon: Smartphone }
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
                    <div className={`p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black tracking-tight">Sync Status</h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase">
                       <RefreshCw size={10} className="animate-spin" /> Real-time Sync Active
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600"><Globe size={22}/></div>
                          <div>
                            <p className="text-sm font-black">Digital Shop Domain</p>
                            <p className="text-[10px] text-zinc-500 font-bold">{storefrontConfig.domain}</p>
                          </div>
                       </div>
                       <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-4 py-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">Configure DNS</button>
                    </div>
                  </div>
               </div>
               
               <div className="bg-blue-600 text-white rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
                  <Sparkles className="absolute top-[-10%] right-[-10%] w-40 h-40 opacity-10" />
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-lg font-black leading-tight">Omnichannel<br/>Intelligence</h4>
                    <p className="text-xs font-medium text-blue-100">Our AI has noticed higher traffic from Instagram users looking for "Mechanical Keyboards". Consider a flash sale.</p>
                  </div>
                  <button className="relative z-10 w-full py-4 mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Launch Web Ad Campaign</button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'CATALOG' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4">
             <div className="p-8 border-b border-zinc-50 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
                <div>
                   <h3 className="text-xl font-black tracking-tight">Sync Visibility</h3>
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Select items to display on your public website</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-500">Enable All</button>
                  <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-500">Disable All</button>
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 text-[10px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800">
                   <tr>
                     <th className="px-10 py-6">Identity</th>
                     <th className="px-10 py-6">Online Price</th>
                     <th className="px-10 py-6">Stock Buffer</th>
                     <th className="px-10 py-6 text-right">Visibility</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-all">
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                                 {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <Package className="m-auto h-full text-zinc-300" />}
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
                           <div className="flex items-center gap-2">
                             <input type="number" className="w-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-black" defaultValue={2} />
                             <span className="text-[10px] font-bold text-zinc-400">Reserved</span>
                           </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button 
                            onClick={() => toggleOnlineVisibility(p.id)}
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

        {activeTab === 'BRANDING' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
             <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600"><Palette size={22}/></div>
                   <h3 className="text-xl font-black tracking-tight">Identity Suite</h3>
                </div>
                <div className="space-y-6">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Digital Store Name</label>
                      <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={storefrontConfig.name} onChange={e => setStorefrontConfig({...storefrontConfig, name: e.target.value})} />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Hero Message</label>
                      <input className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none" value={storefrontConfig.heroTitle} onChange={e => setStorefrontConfig({...storefrontConfig, heroTitle: e.target.value})} />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Theme Accent</label>
                      <div className="flex items-center gap-4">
                         <input type="color" className="w-14 h-14 rounded-2xl bg-zinc-50 border-none outline-none cursor-pointer" value={storefrontConfig.themeColor} onChange={e => setStorefrontConfig({...storefrontConfig, themeColor: e.target.value})} />
                         <input className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-mono text-sm font-bold uppercase" value={storefrontConfig.themeColor} readOnly />
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600"><Share2 size={22}/></div>
                   <h3 className="text-xl font-black tracking-tight">Social Connect</h3>
                </div>
                <div className="space-y-4">
                   {[
                     { id: 'fb', label: 'Facebook Integration', desc: 'Sync catalog to Meta Shops' },
                     { id: 'ig', label: 'Instagram Shopping', desc: 'Enable product tagging in posts' },
                     { id: 'wa', label: 'WhatsApp Checkout', desc: 'Direct orders to business account' }
                   ].map(soc => (
                     <div key={soc.id} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                        <div>
                          <p className="text-sm font-black">{soc.label}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">{soc.desc}</p>
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

        {activeTab === 'PREVIEW' && (
          <div className="h-[700px] w-full flex flex-col items-center justify-center p-4 sm:p-10 animate-in zoom-in-95 duration-500">
             <div className="flex items-center gap-6 mb-10 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
               <button onClick={() => setIsStorefrontOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:scale-105 transition-all">Launch Full Preview</button>
               <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
               <div className="flex items-center gap-3 px-2 text-zinc-400">
                 <Smartphone size={18} />
                 <Monitor size={18} />
               </div>
             </div>
             
             {/* Mock Phone Preview */}
             <div className="w-full max-sm h-full bg-white dark:bg-zinc-900 rounded-[3.5rem] border-[10px] border-zinc-900 dark:border-zinc-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative group">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center z-20">
                   <div className="w-24 h-5 bg-black rounded-b-[1.2rem]" />
                </div>
                
                {/* Simulated Shop Header */}
                <div className="pt-10 pb-4 px-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center relative z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
                   <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">A</div>
                   <div className="flex gap-4 text-zinc-400">
                      <ShoppingBag size={18} />
                      <Menu size={18} />
                   </div>
                </div>
                
                {/* Simulated Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-50 dark:bg-zinc-950">
                   <div className="p-6">
                      <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white space-y-3 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={80} /></div>
                         <h4 className="text-2xl font-black leading-tight tracking-tight relative z-10">{storefrontConfig.heroTitle}</h4>
                         <button className="px-6 py-3 bg-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest relative z-10">Shop Now</button>
                      </div>
                      
                      <div className="mt-10 space-y-4">
                         <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Featured Assets</h5>
                         <div className="grid grid-cols-2 gap-4">
                            {products.filter(p => p.isVisibleOnline).slice(0, 4).map(p => (
                               <div key={p.id} className="bg-white dark:bg-zinc-900 p-3 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                                  <div className="aspect-square rounded-2xl bg-zinc-50 dark:bg-zinc-800 overflow-hidden">
                                     {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.name} />}
                                  </div>
                                  <p className="text-[10px] font-black truncate">{p.name}</p>
                                  <p className="text-[12px] font-black text-blue-600">{formatCurrency(p.offerPrice || p.price)}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceView;
