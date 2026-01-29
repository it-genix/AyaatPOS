
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  X, 
  Mail, 
  Phone, 
  UserSquare2, 
  BadgeCheck, 
  History,
  Calendar,
  MoreVertical,
  Filter,
  Lock,
  ChevronRight,
  UserCircle,
  Settings2,
  ShieldAlert,
  EyeOff,
  BellRing,
  Save,
  Info
} from 'lucide-react';
import { MOCK_USERS, MOCK_SHIFTS, CURRENT_USER } from '../../mockData';
import { User, UserRole, Shift } from '../../types';
import { generateId } from '../../utils/helpers';

interface EmployeeModalProps {
  employee?: User;
  onClose: () => void;
  onSave: (employee: User) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose, onSave }) => {
  const isEdit = !!employee;
  const currentUser = CURRENT_USER;
  const [formData, setFormData] = useState<Partial<User>>(employee || {
    name: '',
    email: '',
    phone: '',
    role: UserRole.CASHIER,
    status: 'ACTIVE'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || generateId(),
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0]
    } as User);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
              <UserSquare2 size={22}/>
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {isEdit ? 'Update Team Member' : 'Hire New Staff'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
              <input 
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email</label>
                <input 
                  type="email"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="staff@ayaatpos.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Phone</label>
                <input 
                  type="tel"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-sm"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="555-0101"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Security Role</label>
                <select 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none appearance-none"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                >
                  {currentUser.role === UserRole.ADMIN && <option value={UserRole.ADMIN}>Administrator</option>}
                  <option value={UserRole.MANAGER}>Manager</option>
                  <option value={UserRole.CASHIER}>Cashier</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Account Status</label>
                <select 
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 px-5 font-bold outline-none appearance-none"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="ON_BREAK">On Break</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95">Discard</button>
            <button type="submit" className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
              {isEdit ? 'Update Identity' : 'Authorize Hire'}
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeeManagementView: React.FC = () => {
  const currentUser = CURRENT_USER;
  const [employees, setEmployees] = useState<User[]>(MOCK_USERS);
  const [shifts] = useState<Shift[]>(MOCK_SHIFTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<User | undefined>(undefined);
  const [tab, setTab] = useState<'STAFF' | 'SHIFTS' | 'SETTINGS'>('STAFF');

  // Module Settings State
  const [settings, setSettings] = useState({
    managerIsolation: true,
    maskIdentity: false,
    maxShiftHours: 8,
    autoBreakDeduction: true,
    autoBreakMinutes: 30,
    strictPINS: true
  });

  // Logic: Respect settings for Manager Visibility
  const visibleEmployees = useMemo(() => {
    return employees.filter(e => {
      if (currentUser.role === UserRole.MANAGER && settings.managerIsolation) {
        return e.role !== UserRole.ADMIN;
      }
      return true;
    });
  }, [employees, currentUser.role, settings.managerIsolation]);

  const filteredEmployees = useMemo(() => {
    return visibleEmployees.filter(e => 
      e.name.toLowerCase().includes(search.toLowerCase()) || 
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [visibleEmployees, search]);

  const stats = useMemo(() => ({
    total: visibleEmployees.length,
    active: visibleEmployees.filter(e => e.status === 'ACTIVE').length,
    admins: visibleEmployees.filter(e => e.role === UserRole.ADMIN).length,
    managers: visibleEmployees.filter(e => e.role === UserRole.MANAGER).length,
    cashiers: visibleEmployees.filter(e => e.role === UserRole.CASHIER).length
  }), [visibleEmployees]);

  const handleSave = (employee: User) => {
    setEmployees(prev => {
      const exists = prev.find(e => e.id === employee.id);
      if (exists) return prev.map(e => e.id === employee.id ? employee : e);
      return [employee, ...prev];
    });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to terminate this access?')) {
      setEmployees(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-10 h-full flex flex-col gap-6 sm:gap-10 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto relative transition-colors custom-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="min-w-0">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tightest leading-none uppercase">Staff Control</h2>
          <p className="text-zinc-500 font-medium text-xs sm:text-base mt-2">Enterprise identity governance and shift surveillance.</p>
        </div>
        <button 
          onClick={() => { setSelectedEmployee(undefined); setShowModal(true); }} 
          className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
        >
          <UserPlus size={18} strokeWidth={3} /> Authorize Hire
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 shrink-0">
        {[
          { label: 'Total Force', value: stats.total, icon: Users, color: 'text-zinc-900 dark:text-zinc-100' },
          { label: 'Active Sessions', value: stats.active, icon: CheckCircle2, color: 'text-emerald-500' },
          { 
            label: (currentUser.role === UserRole.ADMIN && !settings.managerIsolation) ? 'Privileged Users' : 'Management Team', 
            value: (currentUser.role === UserRole.ADMIN && !settings.managerIsolation) ? stats.admins : stats.managers, 
            icon: ShieldCheck, 
            color: 'text-blue-600 dark:text-blue-400' 
          },
          { label: 'Terminal Operators', value: stats.cashiers, icon: UserSquare2, color: 'text-purple-600 dark:text-purple-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900/50 p-6 sm:p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <stat.icon size={16} className={stat.color} />
            </div>
            <h3 className={`text-xl sm:text-4xl font-black tracking-tighter truncate ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-fit">
          <button 
            onClick={() => setTab('STAFF')} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'STAFF' ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            Staff Directory
          </button>
          <button 
            onClick={() => setTab('SHIFTS')} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'SHIFTS' ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            Shift Surveillance
          </button>
          <button 
            onClick={() => setTab('SETTINGS')} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'SETTINGS' ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            Governance
          </button>
        </div>

        {tab === 'STAFF' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="relative w-full max-w-2xl group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, role, or identity..." 
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl py-4 sm:py-5 pl-14 pr-6 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm shadow-sm" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-10">
              {filteredEmployees.map(emp => (
                <div key={emp.id} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 hover:border-blue-600/30 transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-blue-600 transition-colors">
                        <UserCircle size={32} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight truncate leading-tight">{emp.name}</h4>
                        <div className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest mt-1 inline-block ${
                          emp.role === UserRole.ADMIN ? 'bg-blue-600 text-white' : 
                          emp.role === UserRole.MANAGER ? 'bg-emerald-600 text-white' : 
                          'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          {emp.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setSelectedEmployee(emp); setShowModal(true); }}
                        className="p-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl text-zinc-400 hover:text-blue-600"
                      >
                        <Edit size={14}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(emp.id)}
                        className="p-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-zinc-500">
                      <Mail size={14} className="shrink-0" />
                      <span className="text-xs font-bold truncate">
                        {settings.maskIdentity && currentUser.role !== UserRole.ADMIN ? '•••••••••••' : emp.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-500">
                      <Phone size={14} className="shrink-0" />
                      <span className="text-xs font-bold truncate">
                        {settings.maskIdentity && currentUser.role !== UserRole.ADMIN ? '•••••••••••' : (emp.phone || 'N/A')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        emp.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 
                        emp.status === 'ON_BREAK' ? 'bg-amber-500' : 'bg-zinc-400'
                      }`} />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{emp.status?.replace('_', ' ')}</span>
                    </div>
                    <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                      Joined {emp.joinDate || '2023'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'SHIFTS' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 text-[10px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800">
                  <tr>
                    <th className="px-10 py-6">Staff Member</th>
                    <th className="px-10 py-6">Identity Check-In</th>
                    <th className="px-10 py-6">Check-Out</th>
                    <th className="px-10 py-6">Duration</th>
                    <th className="px-10 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  {shifts.map(shift => {
                    const isUserVisible = visibleEmployees.some(e => e.id === shift.userId);
                    if (!isUserVisible) return null;

                    return (
                      <tr key={shift.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-all">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/5 flex items-center justify-center text-blue-600 font-black">
                              {shift.userName.charAt(0)}
                            </div>
                            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">{shift.userName}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                            <Clock size={14} className="text-zinc-400"/>
                            {new Date(shift.startTime).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                            {shift.endTime ? (
                              <>
                                <Clock size={14} className="text-zinc-400"/>
                                {new Date(shift.endTime).toLocaleString()}
                              </>
                            ) : '—'}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-black text-zinc-400">
                            {shift.duration ? `${Math.floor(shift.duration / 60)}h ${shift.duration % 60}m` : 'Active Session'}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            shift.status === 'ONGOING' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'
                          }`}>
                            {shift.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'SETTINGS' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 pb-10">
            {/* Shift Operations Panel */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-blue-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Shift Operations</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Operational constraints and rules</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Auto-Break Deduction</p>
                    <p className="text-xs text-zinc-500">Deduct breaks automatically from shift totals</p>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, autoBreakDeduction: !s.autoBreakDeduction }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.autoBreakDeduction ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoBreakDeduction ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {settings.autoBreakDeduction && (
                  <div className="pl-6 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-3 animate-in slide-in-from-left-2">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Deduction Duration (Min)</p>
                    <input 
                      type="number" 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm font-black outline-none focus:ring-2 focus:ring-blue-600/20"
                      value={settings.autoBreakMinutes}
                      onChange={e => setSettings(s => ({ ...s, autoBreakMinutes: parseInt(e.target.value) }))}
                    />
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Max Shift Threshold</p>
                    <div className="flex items-center gap-2">
                       <input 
                        type="number" 
                        className="w-20 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-center text-sm font-black outline-none"
                        value={settings.maxShiftHours}
                        onChange={e => setSettings(s => ({ ...s, maxShiftHours: parseInt(e.target.value) }))}
                      />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">HRS</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed italic">Triggers a high-priority alert on the dashboard if an employee exceeds this session duration.</p>
                </div>
              </div>
            </div>

            {/* Security & Isolation Panel */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-red-600">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Identity Governance</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Visibility and access protection</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Manager Isolation</p>
                    <p className="text-xs text-zinc-500">Hide Admin accounts from Manager level</p>
                  </div>
                  <button 
                    disabled={currentUser.role !== UserRole.ADMIN}
                    onClick={() => setSettings(s => ({ ...s, managerIsolation: !s.managerIsolation }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.managerIsolation ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'} ${currentUser.role !== UserRole.ADMIN ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.managerIsolation ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Identity Masking</p>
                      <EyeOff size={14} className="text-zinc-400" />
                    </div>
                    <p className="text-xs text-zinc-500">Conceal private contact info from generic views</p>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, maskIdentity: !s.maskIdentity }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.maskIdentity ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maskIdentity ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">Strict PIN Policy</p>
                    <p className="text-xs text-zinc-500">Require terminal unlock for every shift check-in</p>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, strictPINS: !s.strictPINS }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.strictPINS ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.strictPINS ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-4">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-widest">Identity changes are logged to the Enterprise Audit ledger. Global Admins can override these settings via the Terminal Console.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <EmployeeModal 
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeManagementView;
