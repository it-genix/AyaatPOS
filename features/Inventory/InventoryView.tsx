
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Package, Search, Plus, Filter, Edit, Trash2, Check, X, Calendar, Hash, 
  Tag, ImagePlus, Upload, Camera, Loader2, CloudUpload, Sparkles, Timer, 
  Power, AlertTriangle, ScanBarcode, Zap, RefreshCw, AlertCircle, ImageIcon, 
  Percent, ToggleLeft, ToggleRight, Clock, Lock, ShieldCheck, Printer, 
  Download, QrCode, ChevronUp, ChevronDown, Layers, MoreVertical, SortAsc, SortDesc,
  LayoutGrid
} from 'lucide-react';
import JsBarcode from 'jsbarcode';
import { MOCK_PRODUCTS, CURRENT_USER } from '../../mockData';
import { formatCurrency, generateId } from '../../utils/helpers';
import { Product, UserRole, User } from '../../types';

// Manager PIN for override (Mock)
const MANAGER_PIN = '8888';

const BarcodeLabelModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current && product.sku) {
      JsBarcode(barcodeRef.current, product.sku, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        font: "monospace"
      });
    }
  }, [product.sku]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 no-print">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-black text-xl flex items-center gap-2 tracking-tight">
            <Printer size={20} className="text-blue-600" /> Label Preview
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"><X size={20}/></button>
        </div>
        
        <div className="p-10 flex flex-col items-center justify-center text-black">
          <div className="bg-white p-8 rounded-xl border-2 border-dashed border-zinc-200 shadow-sm w-full flex flex-col items-center gap-4">
             <div className="w-full text-center space-y-1">
                <h4 className="text-sm font-black uppercase tracking-tight">{product.name}</h4>
                <p className="text-[10px] text-zinc-500 font-bold">{product.category} | {product.sku}</p>
             </div>
             <div className="bg-white p-2">
               <svg ref={barcodeRef}></svg>
             </div>
             <div className="text-xl font-black mt-2">
               {formatCurrency(product.offerPrice && product.offerPrice > 0 ? product.offerPrice : product.price)}
             </div>
          </div>
          <p className="mt-6 text-[10px] text-zinc-400 font-black uppercase tracking-widest text-center">
            Standard Retail Tag (38mm x 25mm)<br/>Thermal Optimization Active
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">Close</button>
           <button onClick={handlePrint} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
             <Printer size={16} /> Print Label
           </button>
        </div>
      </div>
    </div>
  );
};

const ManagerPINModal: React.FC<{ 
  onSuccess: () => void; 
  onClose: () => void; 
  title?: string 
}> = ({ onSuccess, onClose, title = "Manager Approval Required" }) => {
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className={`bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-sm p-8 space-y-6 shadow-2xl border-2 transition-all ${error ? 'border-red-500 animate-shake' : 'border-blue-600/20'}`}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl mx-auto flex items-center justify-center text-blue-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-black text-xl tracking-tight">{title}</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Enter authorization code to proceed</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="password" 
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] focus:ring-4 focus:ring-blue-600/20 outline-none"
              placeholder="••••"
              maxLength={4}
              value={pin}
              autoFocus
              onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
            />
            {error && <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-black text-red-500 uppercase tracking-widest animate-in slide-in-from-top-1">Invalid Access Code</p>}
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Cancel</button>
            <button type="submit" disabled={pin.length < 4} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">Approve</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ProductModalProps {
  product?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
  prefilledSku?: string;
  isManagerApproved?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave, prefilledSku, isManagerApproved = false }) => {
  const isEdit = !!product;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const barcodePreviewRef = useRef<SVGSVGElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const user = CURRENT_USER;
  
  const canEditBaseInfo = user.role === UserRole.ADMIN || user.role === UserRole.MANAGER || isManagerApproved;
  const canEditPricing = user.role === UserRole.ADMIN || user.role === UserRole.MANAGER;
  
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    name: '', sku: prefilledSku || '', category: 'General', price: 0, offerPrice: 0, 
    isOfferManualActive: true, offerExpiryDate: '', cost: 0, stock: 0, minStock: 5, imageUrl: '',
    batchNumber: '', expiryDate: ''
  });

  useEffect(() => {
    if (barcodePreviewRef.current && formData.sku) {
      try {
        JsBarcode(barcodePreviewRef.current, formData.sku, {
          format: "CODE128",
          width: 1.5,
          height: 40,
          displayValue: false,
          margin: 0
        });
      } catch(e) { /* Invalid SKU */ }
    }
  }, [formData.sku]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEditBaseInfo) return;
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (canEditBaseInfo) fileInputRef.current?.click();
  };

  const generateNewSku = () => {
    setFormData(prev => ({ ...prev, sku: `SKU-${generateId().slice(0, 6).toUpperCase()}` }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditBaseInfo) return;
    onSave({ ...formData, id: formData.id || generateId(), sku: formData.sku || `SKU-${generateId().slice(0, 4)}` } as Product);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300 no-print">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl h-full sm:h-auto sm:max-h-[95vh] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95">
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">
            {isEdit ? <Edit size={20}/> : <Plus size={20}/>} 
            {isEdit ? 'Asset Management' : 'Global Catalog Entry'}
            {!canEditPricing && <Lock size={16} className="text-amber-500" />}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div 
              onClick={triggerFileInput}
              className={`relative group cursor-pointer w-full max-w-[160px] aspect-square rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center gap-3 text-zinc-400 shrink-0 ${canEditBaseInfo ? 'border-zinc-200 dark:border-zinc-700 hover:border-blue-500' : 'border-zinc-100 dark:border-zinc-800 cursor-not-allowed opacity-50'}`}
            >
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                  {canEditBaseInfo && <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><CloudUpload size={24} className="text-blue-600" /></div>}
                </>
              ) : isUploading ? (
                <Loader2 size={24} className="animate-spin text-blue-600" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <ImageIcon size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Upload</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div className="flex-1 space-y-4 w-full">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Barcode Identity</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input 
                      disabled={!canEditBaseInfo} 
                      type="text" 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 outline-none font-mono text-xs font-bold focus:ring-4 focus:ring-blue-600/10" 
                      placeholder="SKU-8888"
                      value={formData.sku} 
                      onChange={e => setFormData({...formData, sku: e.target.value})} 
                    />
                  </div>
                  <button type="button" onClick={generateNewSku} disabled={!canEditBaseInfo} className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 hover:text-blue-600 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Display Name</label>
                <input disabled={!canEditBaseInfo} type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-5 outline-none font-bold focus:ring-4 focus:ring-blue-600/10 disabled:opacity-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2"><Layers size={12} /> Batch Identifier</label>
                  <input disabled={!canEditBaseInfo} type="text" placeholder="Ex: BT-2024-X" className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3 px-5 font-bold outline-none text-xs" value={formData.batchNumber} onChange={e => setFormData({...formData, batchNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2"><Calendar size={12} /> Product Expiry</label>
                  <input disabled={!canEditBaseInfo} type="date" className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3 px-5 font-bold outline-none text-xs" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Inventory</label>
                  <input disabled={!canEditBaseInfo} type="number" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-5 outline-none font-bold" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Min. Alert</label>
                  <input disabled={!canEditBaseInfo} type="number" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-5 outline-none font-bold" value={formData.minStock} onChange={e => setFormData({...formData, minStock: parseInt(e.target.value)})} required />
                </div>
              </div>
              
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Price (৳)</label>
                    <input disabled={!canEditPricing} type="number" step="1" className="w-full border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-5 outline-none font-black" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Offer (৳)</label>
                    <input disabled={!canEditPricing} type="number" step="1" className="w-full border bg-white dark:bg-zinc-800 border-emerald-200 dark:border-emerald-900 rounded-2xl py-3.5 px-5 outline-none font-black" value={formData.offerPrice || ''} onChange={e => setFormData({...formData, offerPrice: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onClick={onClose} className="flex-1 py-5 border border-zinc-200 dark:border-zinc-700 rounded-[2rem] font-black text-xs uppercase tracking-widest text-zinc-500">Cancel</button>
            <button type="submit" className="flex-[1.5] py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20">Commit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InventoryView: React.FC = () => {
  const user = CURRENT_USER;
  const isAdmin = user.role === UserRole.ADMIN;
  const isCashier = user.role === UserRole.CASHIER;
  const isManager = user.role === UserRole.MANAGER || user.role === UserRole.ADMIN;

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');
  const [showModal, setShowModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showBarcodeLabel, setShowBarcodeLabel] = useState<Product | null>(null);
  const [pendingAction, setPendingAction] = useState<{ type: 'ADD' | 'EDIT', product?: Product } | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });

  const categories = useMemo(() => {
    const cats = ['ALL', ...new Set(products.map(p => p.category))];
    return cats.sort();
  }, [products]);

  const requestSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setIsSortMenuOpen(false);
  };

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key] ?? '';
        const valB = b[sortConfig.key] ?? '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [products, search, sortConfig, selectedCategory]);

  const handleExport = () => {
    const headers = ['SKU', 'Name', 'Category', 'Price', 'Offer Price', 'Cost', 'Stock', 'Min Stock', 'Batch Number', 'Expiry Date'];
    const rows = sortedAndFilteredProducts.map(p => [
      p.sku,
      p.name,
      p.category,
      p.price,
      p.offerPrice || 0,
      p.cost,
      p.stock,
      p.minStock,
      p.batchNumber || '',
      p.expiryDate || ''
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ayaat_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter(l => l.trim());
      if (lines.length < 2) return;

      const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
      const updatedProducts = [...products];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim());
        const data: any = {};
        headers.forEach((h, idx) => {
          data[h] = values[idx];
        });

        const sku = data.sku || '';
        if (!sku) continue;

        const newProduct: Product = {
          id: generateId(),
          sku: sku,
          name: data.name || 'Imported Product',
          category: data.category || 'General',
          price: parseFloat(data.price) || 0,
          offerPrice: parseFloat(data['offer price']) || 0,
          cost: parseFloat(data.cost) || 0,
          stock: parseInt(data.stock) || 0,
          minStock: parseInt(data['min stock']) || 5,
          batchNumber: data['batch number'] || '',
          expiryDate: data['expiry date'] || ''
        };

        const existingIdx = updatedProducts.findIndex(p => p.sku === sku);
        if (existingIdx > -1) {
          updatedProducts[existingIdx] = { ...updatedProducts[existingIdx], ...newProduct, id: updatedProducts[existingIdx].id };
        } else {
          updatedProducts.push(newProduct);
        }
      }
      setProducts(updatedProducts);
      alert(`Sync Complete: Processed ${lines.length - 1} catalog entries.`);
    };
    reader.readAsText(file);
    // Reset input so same file can be imported twice if needed
    e.target.value = '';
  };

  const handleRestrictedAction = (type: 'ADD' | 'EDIT', product?: Product) => {
    // Admin bypasses all checks
    if (isAdmin || !isCashier || isApproved) {
      if (type === 'ADD') { setSelectedProduct(undefined); setShowModal(true); }
      else { setSelectedProduct(product); setShowModal(true); }
    } else {
      setPendingAction({ type, product });
      setShowPinModal(true);
    }
  };

  const isPromotionActive = (product: Product) => {
    if (!product.offerPrice || product.offerPrice <= 0) return false;
    if (product.isOfferManualActive) return true;
    if (product.offerExpiryDate) return new Date(product.offerExpiryDate) > new Date();
    return false;
  };

  const SortIcon = ({ column }: { column: keyof Product }) => {
    if (!sortConfig || sortConfig.key !== column) return <div className="flex flex-col opacity-20"><ChevronUp size={8}/><ChevronDown size={8}/></div>;
    return sortConfig.direction === 'asc' ? <ChevronUp size={12} className="text-blue-600"/> : <ChevronDown size={12} className="text-blue-600"/>;
  };

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-6 sm:gap-10 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto custom-scrollbar transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="min-w-0">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Inventory</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Scale your catalog with advanced tracking.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button 
            onClick={handleExport}
            className="flex-1 sm:flex-none bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-6 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 active:scale-95 transition-all text-xs uppercase tracking-widest no-print border border-zinc-200 dark:border-zinc-700"
          >
            <Download size={18} /> Export
          </button>
          <label className="flex-1 sm:flex-none bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-6 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 active:scale-95 transition-all text-xs uppercase tracking-widest no-print border border-zinc-200 dark:border-zinc-700 cursor-pointer">
            <Upload size={18} /> Import
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>
          <button 
            onClick={() => handleRestrictedAction('ADD')} 
            className="flex-1 sm:flex-none bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-widest no-print"
          >
            {isCashier && !isApproved && !isAdmin ? <Lock size={16} strokeWidth={4} /> : <Plus size={18} strokeWidth={4} />}
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 shrink-0 no-print">
        {[
          { label: 'Global SKUs', value: products.length, color: 'text-zinc-900 dark:text-zinc-100' },
          { label: 'Low Assets', value: products.filter(p => p.stock <= p.minStock).length, color: 'text-orange-500' },
          { label: 'Stock-out', value: products.filter(p => p.stock === 0).length, color: 'text-red-500' },
          { label: 'Net Asset Value', value: formatCurrency(products.reduce((s, p) => s + (p.stock * p.cost), 0)), color: 'text-blue-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900/50 p-5 sm:p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-zinc-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1.5">{stat.label}</p>
            <h3 className={`text-sm sm:text-3xl font-black tracking-tighter truncate ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col no-print">
        <div className="p-6 sm:p-10 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="flex items-center gap-2 w-full max-w-xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600" size={20} />
                <input 
                  type="text" 
                  placeholder="Search catalog..." 
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] py-4 pl-14 pr-6 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-blue-600/10 text-sm font-bold shadow-sm" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
              
              {/* Mobile Sorting Menu */}
              <div className="lg:hidden relative">
                <button 
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 active:scale-95 transition-all"
                >
                  <SortAsc size={20} />
                </button>
                {isSortMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-[100] p-2 flex flex-col gap-1">
                     {[
                       { key: 'name', label: 'Name' },
                       { key: 'category', label: 'Category' },
                       { key: 'stock', label: 'Stock Level' },
                       { key: 'expiryDate', label: 'Expiry' },
                       { key: 'price', label: 'Price' }
                     ].map(option => (
                       <button 
                         key={option.key} 
                         onClick={() => requestSort(option.key as keyof Product)}
                         className={`w-full text-left px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl ${sortConfig?.key === option.key ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500'}`}
                       >
                         {option.label}
                       </button>
                     ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {(isApproved || isAdmin) && <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20"><ShieldCheck size={14} /> Authorized</div>}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500"><QrCode size={14} /> Auto-Barcoding Active</div>
            </div>
          </div>

          {/* Category Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar scroll-smooth">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-blue-600/50'
                }`}
              >
                {cat === 'ALL' ? <LayoutGrid size={14} /> : <Tag size={14} />}
                {cat === 'ALL' ? 'All Assets' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View: Sortable Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 text-[10px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800">
              <tr>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('name')}><div className="flex items-center gap-2">Product & Identity <SortIcon column="name" /></div></th>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('category')}><div className="flex items-center gap-2">Category <SortIcon column="category" /></div></th>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('batchNumber')}><div className="flex items-center gap-2">Batch <SortIcon column="batchNumber" /></div></th>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('expiryDate')}><div className="flex items-center gap-2">Expiry <SortIcon column="expiryDate" /></div></th>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('price')}><div className="flex items-center gap-2">Price Matrix <SortIcon column="price" /></div></th>
                <th className="px-10 py-6 cursor-pointer hover:text-blue-600" onClick={() => requestSort('stock')}><div className="flex items-center gap-2">Stock Level <SortIcon column="stock" /></div></th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
              {sortedAndFilteredProducts.map(product => {
                const isLowStock = product.stock <= product.minStock;
                const hasOffer = isPromotionActive(product);
                return (
                  <tr key={product.id} className={`transition-all group ${isLowStock ? 'bg-amber-50/20 dark:bg-amber-900/5' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/20'}`}>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-950 overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-800 shadow-sm relative">
                          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" /> : <Package size={20} className="m-auto h-full text-zinc-400" />}
                          {hasOffer && <div className="absolute top-1 right-1 bg-emerald-500 text-white p-1 rounded-lg shadow-lg"><Zap size={10} fill="white" /></div>}
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-zinc-900 dark:text-zinc-100 text-sm truncate tracking-tight">{product.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="text-[9px] text-blue-600 font-black uppercase tracking-widest">{product.sku}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">{product.category}</span></td>
                    <td className="px-10 py-8"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">{product.batchNumber || 'N/A'}</span></td>
                    <td className="px-10 py-8"><div className="flex items-center gap-2 text-xs font-bold text-zinc-500"><Calendar size={14} className="text-zinc-400" /> {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : '—'}</div></td>
                    <td className="px-10 py-8">
                      <div className="space-y-1">
                        <div className={`text-sm font-black ${hasOffer ? 'text-zinc-400 line-through text-xs' : 'text-zinc-900 dark:text-zinc-100'}`}>{formatCurrency(product.price)}</div>
                        {hasOffer && <div className="text-emerald-500 font-black text-sm flex items-center gap-1.5">{formatCurrency(product.offerPrice!)} <Zap size={12} fill="currentColor" /></div>}
                      </div>
                    </td>
                    <td className="px-10 py-8"><div className={`px-4 py-2 rounded-xl text-[10px] font-black border inline-flex items-center gap-2 ${isLowStock ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-50 text-green-600 border-green-200'}`}>{product.stock} Units</div></td>
                    <td className="px-10 py-8 text-right space-x-2">
                       {isManager && <button onClick={() => setShowBarcodeLabel(product)} className="p-3 rounded-xl transition-all border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-blue-600 hover:bg-blue-50" title="Print Barcode"><Printer size={18} /></button>}
                       <button onClick={() => handleRestrictedAction('EDIT', product)} className={`p-3 rounded-xl transition-all border border-transparent ${isCashier && !isApproved && !isAdmin ? 'text-zinc-300' : 'text-zinc-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100'}`} title="Edit Asset">{(isCashier && !isApproved && !isAdmin) ? <Lock size={18} /> : <Edit size={18} />}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet View: Responsive Cards */}
        <div className="lg:hidden p-6 space-y-4">
          {sortedAndFilteredProducts.map(product => {
             const isLowStock = product.stock <= product.minStock;
             const hasOffer = isPromotionActive(product);
             return (
               <div key={product.id} className={`bg-white dark:bg-zinc-950/50 p-6 rounded-[2.5rem] border transition-all ${isLowStock ? 'border-amber-500/30' : 'border-zinc-200 dark:border-zinc-800'}`}>
                 <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden relative">
                         {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : <Package size={24} className="text-zinc-400" />}
                         {hasOffer && <div className="absolute top-1 right-1 bg-emerald-500 text-white p-1 rounded-lg"><Zap size={10} fill="currentColor" /></div>}
                      </div>
                      <div className="min-w-0">
                         <h4 className="font-black text-zinc-900 dark:text-zinc-100 leading-tight mb-1 truncate">{product.name}</h4>
                         <div className="flex flex-wrap items-center gap-1.5">
                           <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{product.sku}</span>
                           <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">{product.category}</span>
                         </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       {isManager && <button onClick={() => setShowBarcodeLabel(product)} className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-blue-600"><Printer size={16}/></button>}
                       <button onClick={() => handleRestrictedAction('EDIT', product)} className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-blue-600"><Edit size={16}/></button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-50 dark:border-zinc-800 mb-6">
                    <div>
                       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Stock Status</p>
                       <div className={`text-xs font-black inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isLowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'}`}>
                          {product.stock} Units
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">MSRP / Price</p>
                       <div className="flex flex-col items-end">
                          <span className={`text-sm font-black ${hasOffer ? 'text-zinc-400 line-through text-[10px]' : 'text-blue-600'}`}>{formatCurrency(product.price)}</span>
                          {hasOffer && <span className="text-emerald-500 font-black flex items-center gap-1">{formatCurrency(product.offerPrice!)} <Zap size={10} fill="currentColor"/></span>}
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <Layers size={12} className="text-zinc-400" />
                          <span className="text-[10px] font-black uppercase text-zinc-500">{product.batchNumber || 'NO BATCH'}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-zinc-400" />
                          <span className="text-[10px] font-black uppercase text-zinc-500">{product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'NO EXPIRY'}</span>
                       </div>
                    </div>
                    {isLowStock && (
                      <div className="flex items-center gap-2 text-amber-600 animate-pulse">
                         <AlertTriangle size={12} />
                         <span className="text-[9px] font-black uppercase tracking-widest">Restock Required</span>
                      </div>
                    )}
                 </div>
               </div>
             );
          })}
        </div>
      </div>

      {showModal && <ProductModal product={selectedProduct} isManagerApproved={isApproved} onClose={() => setShowModal(false)} onSave={p => { setProducts(prev => [p, ...prev.filter(x => x.id !== p.id)]); setShowModal(false); }} />}
      {showPinModal && <ManagerPINModal onClose={() => setShowPinModal(false)} onSuccess={() => { setIsApproved(true); setShowPinModal(false); if(pendingAction?.type === 'ADD') { setSelectedProduct(undefined); setShowModal(true); } else if(pendingAction?.type === 'EDIT') { setSelectedProduct(pendingAction.product); setShowModal(true); } setPendingAction(null); }} />}
      {showBarcodeLabel && <BarcodeLabelModal product={showBarcodeLabel} onClose={() => setShowBarcodeLabel(null)} />}
    </div>
  );
};

export default InventoryView;
