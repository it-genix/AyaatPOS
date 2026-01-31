
import { Product, Customer, User, UserRole, Shift, Store } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Admin', role: UserRole.ADMIN, email: 'admin@ayaatpos.com', phone: '555-0101', status: 'ACTIVE', joinDate: '2023-01-10' },
  { id: 'u2', name: 'Sarah Manager', role: UserRole.MANAGER, email: 'sarah@ayaatpos.com', phone: '555-0102', status: 'ACTIVE', joinDate: '2023-03-15' },
  { id: 'u3', name: 'Sam Cashier', role: UserRole.CASHIER, email: 'sam@ayaatpos.com', phone: '555-0103', status: 'ACTIVE', joinDate: '2023-06-20' },
  { id: 'u4', name: 'Jordan Cashier', role: UserRole.CASHIER, email: 'jordan@ayaatpos.com', phone: '555-0104', status: 'ON_BREAK', joinDate: '2023-08-05' },
  { id: 'u5', name: 'Chris Cashier', role: UserRole.CASHIER, email: 'chris@ayaatpos.com', phone: '555-0105', status: 'INACTIVE', joinDate: '2024-01-12' },
];

export const MOCK_STORES: Store[] = [
  { id: 'st1', name: 'Dhaka Main Branch', code: 'DHK-01', address: 'Banani, Dhaka', phone: '01711223344', status: 'OPEN', terminalCount: 4 },
  { id: 'st2', name: 'Chittagong Hub', code: 'CTG-01', address: 'GEC Circle, Chittagong', phone: '01811223344', status: 'OPEN', terminalCount: 2 },
];

export const MOCK_SHIFTS: Shift[] = [
  { id: 's1', userId: 'u3', userName: 'Sam Cashier', startTime: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), status: 'ONGOING' },
  { id: 's2', userId: 'u4', userName: 'Jordan Cashier', startTime: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), status: 'ONGOING' },
  { id: 's3', userId: 'u2', userName: 'Sarah Manager', startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), endTime: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(), duration: 480, status: 'COMPLETED' },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    sku: 'ELEC-001', 
    name: 'Ultra Wireless Mouse', 
    description: 'A high-precision wireless mouse with ergonomic design, featuring a 16,000 DPI sensor and up to 50 hours of battery life on a single charge.',
    category: 'Electronics', 
    price: 45.99, 
    offerPrice: 39.99,
    cost: 20.00, 
    stock: 15, 
    minStock: 5, 
    imageUrl: 'https://picsum.photos/seed/mouse/200',
    batchNumber: 'BT-2024-X1',
    expiryDate: '2025-12-31'
  },
  { 
    id: '2', 
    sku: 'ELEC-002', 
    name: 'Mechanical Keyboard RGB', 
    description: 'Tenkeyless mechanical gaming keyboard with customizable RGB backlighting and tactile Blue switches for satisfying typing feedback.',
    category: 'Electronics', 
    price: 129.99, 
    cost: 65.00, 
    stock: 8, 
    minStock: 3, 
    imageUrl: 'https://picsum.photos/seed/keyboard/200',
    batchNumber: 'BT-2024-K2',
    expiryDate: '2026-06-15'
  },
  { 
    id: '3', 
    sku: 'ACC-001', 
    name: 'USB-C Fast Charger', 
    description: 'Universal 65W USB-C power delivery charger, compact GaN technology for fast charging laptops, tablets, and smartphones.',
    category: 'Accessories', 
    price: 24.50, 
    offerPrice: 19.99,
    cost: 10.00, 
    stock: 50, 
    minStock: 10, 
    imageUrl: 'https://picsum.photos/seed/charger/200',
    batchNumber: 'BT-2023-C9',
    expiryDate: '2025-09-01'
  },
  { 
    id: '4', 
    sku: 'AUDIO-001', 
    name: 'Noise Cancelling Headphones', 
    description: 'Premium over-ear headphones with industry-leading active noise cancellation, high-fidelity audio, and comfortable memory foam ear cushions.',
    category: 'Audio', 
    price: 299.00, 
    offerPrice: 249.00,
    cost: 150.00, 
    stock: 12, 
    minStock: 4, 
    imageUrl: 'https://picsum.photos/seed/headphones/200',
    batchNumber: 'BT-2024-A5',
    expiryDate: '2027-01-20'
  },
  { 
    id: '5', 
    sku: 'STORAGE-001', 
    name: '1TB External SSD', 
    description: 'Portable high-speed SSD with read speeds up to 1050MB/s. Rugged design with IP55 water and dust resistance for reliable data storage on the go.',
    category: 'Storage', 
    price: 89.99, 
    cost: 45.00, 
    stock: 2, 
    minStock: 5, 
    imageUrl: 'https://picsum.photos/seed/ssd/200',
    batchNumber: 'BT-2024-S3',
    expiryDate: '2026-11-10'
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', membershipId: 'MEM-7742', name: 'John Doe', email: 'john@example.com', phone: '555-0101', loyaltyPoints: 450, totalSpent: 1240.50, joinDate: '2023-01-15', discountLevel: 5 },
  { id: 'c2', membershipId: 'MEM-9103', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', loyaltyPoints: 120, totalSpent: 340.20, joinDate: '2023-05-20', discountLevel: 0 },
];

export const CURRENT_USER: User = MOCK_USERS[0];
