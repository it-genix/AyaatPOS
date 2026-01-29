
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER'
}

export type Language = 'EN' | 'BN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'ON_BREAK';
  joinDate?: string;
}

export interface Store {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  status: 'OPEN' | 'CLOSED' | 'MAINTENANCE';
  terminalCount: number;
}

export interface Shift {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  status: 'COMPLETED' | 'ONGOING';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  offerPrice?: number;
  isOfferManualActive?: boolean;
  offerExpiryDate?: string;
  cost: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  batchNumber?: string;
  expiryDate?: string;
  isVisibleOnline?: boolean;
}

export interface Customer {
  id: string;
  membershipId: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalSpent: number;
  joinDate: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'CASH' | 'CARD' | 'WALLET';
  customerId?: string;
  cashierId: string;
}

export type ViewType = 'POS' | 'INVENTORY' | 'CRM' | 'ANALYTICS' | 'EMPLOYEES' | 'SETTINGS' | 'ECOMMERCE';
