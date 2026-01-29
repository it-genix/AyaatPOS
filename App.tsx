
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import POSView from './features/POS/POSView';
import InventoryView from './features/Inventory/InventoryView';
import CRMView from './features/CRM/CRMView';
import AnalyticsView from './features/Analytics/AnalyticsView';
import EmployeeManagementView from './features/Employees/EmployeeManagementView';
import SettingsView from './features/Settings/SettingsView';
import EcommerceView from './features/Ecommerce/EcommerceView';
import LoginView from './features/Auth/LoginView';
import { ViewType, User, Language } from './types';
import { translations } from './translations';
import { Bell, User as UserIcon, Sun, Moon, Maximize, Minimize, Menu, LogOut, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('POS');
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'EN';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const t = translations[language];

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'BN' : 'EN';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-zinc-950 text-zinc-100 overflow-hidden transition-colors duration-300';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-white text-zinc-900 overflow-hidden transition-colors duration-300';
    }
  }, [theme]);

  const handleLogout = () => {
    setUser(null);
    setCurrentView('POS');
  };

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'POS': return <POSView language={language} onProcessSale={(sale) => console.log('Sale saved:', sale)} />;
      case 'INVENTORY': return <InventoryView />;
      case 'CRM': return <CRMView />;
      case 'ANALYTICS': return <AnalyticsView />;
      case 'EMPLOYEES': return <EmployeeManagementView />;
      case 'SETTINGS': return <SettingsView />;
      case 'ECOMMERCE': return <EcommerceView />;
      default: return (
        <div className="h-full flex items-center justify-center p-8 text-zinc-500">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p>The {currentView} module is currently under development.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden select-none transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        theme={theme} 
        isOpen={sidebarOpen}
        userRole={user.role}
        language={language}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <header className={`h-16 lg:h-20 border-b flex items-center justify-between px-3 sm:px-4 lg:px-8 shrink-0 transition-colors duration-300 z-30 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 shrink-0"
            >
              <Menu size={22} />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              {isOffline && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[9px] font-bold rounded-full border border-amber-500/20 shrink-0">
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></span>
                  {t.header.offline}
                </div>
              )}
              <div className={`text-[10px] sm:text-xs lg:text-sm font-medium truncate ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t.header.terminal} #01 <span className={`hidden xs:inline mx-1 sm:mx-2 ${theme === 'dark' ? 'text-zinc-700' : 'text-zinc-200'}`}>|</span> <span className={`hidden md:inline ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{new Date().toLocaleDateString(language === 'EN' ? 'en-US' : 'bn-BD', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-6 shrink-0">
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 font-bold text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'bg-zinc-900 text-blue-400 hover:bg-zinc-800' : 'bg-zinc-100 text-blue-600 hover:bg-zinc-200'}`}
              title="Toggle Language"
            >
              <Languages size={18} />
              <span className="hidden sm:inline">{language === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>

            <button 
              onClick={toggleFullscreen}
              className={`hidden sm:flex p-2 rounded-full transition-all duration-300 items-center justify-center ${theme === 'dark' ? 'text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-white' : 'text-zinc-500 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900'}`}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>

            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${theme === 'dark' ? 'text-amber-400 bg-zinc-900 hover:bg-zinc-800' : 'text-indigo-600 bg-zinc-100 hover:bg-zinc-200'}`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className={`flex items-center gap-2 sm:gap-3 lg:pl-6 lg:border-l transition-colors ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="hidden sm:block text-right">
                <div className={`text-xs font-bold truncate max-w-[100px] ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>{user.name}</div>
                <div className="text-[9px] font-bold tracking-widest text-blue-500 uppercase">{user.role}</div>
              </div>
              <button 
                onClick={handleLogout}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-colors group relative shrink-0 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-950/20' : 'bg-zinc-100 text-zinc-500 hover:text-red-600 hover:bg-red-50'}`}
                title="Sign Out"
              >
                <LogOut size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-hidden h-full relative">
          {renderView()}
        </section>
      </main>
    </div>
  );
};

export default App;
