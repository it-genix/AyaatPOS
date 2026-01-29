
import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  UserSquare2, 
  Settings,
  LogOut,
  X,
  Globe
} from 'lucide-react';
import { ViewType, UserRole, Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  theme?: 'light' | 'dark';
  isOpen: boolean;
  userRole: UserRole;
  language: Language;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, theme = 'dark', isOpen, userRole, language, onClose }) => {
  const t = translations[language];
  
  const menuItems = [
    { id: 'POS', label: t.sidebar.POS, icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER] },
    { id: 'INVENTORY', label: t.sidebar.INVENTORY, icon: Package, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER] },
    { id: 'ECOMMERCE', label: t.sidebar.ECOMMERCE, icon: Globe, roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'CRM', label: t.sidebar.CRM, icon: Users, roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'ANALYTICS', label: t.sidebar.ANALYTICS, icon: BarChart3, roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'EMPLOYEES', label: t.sidebar.EMPLOYEES, icon: UserSquare2, roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'SETTINGS', label: t.sidebar.SETTINGS, icon: Settings, roles: [UserRole.ADMIN] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleNavClick = (view: ViewType) => {
    onViewChange(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 lg:static lg:w-64 border-r flex flex-col h-full transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}
      `}>
        <div className={`p-6 border-b flex items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">A</div>
            <h1 className={`text-xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>AyaatPOS</h1>
          </div>
          <button onClick={onClose} className="p-2 lg:hidden text-zinc-400 hover:text-zinc-100 transition-colors"><X size={20}/></button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-4 lg:py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg lg:bg-blue-600/10 lg:text-blue-500 lg:border lg:border-blue-600/20' 
                  : theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
