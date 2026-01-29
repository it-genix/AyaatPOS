
import { Language } from './types';

export const translations = {
  EN: {
    sidebar: {
      POS: 'Sale Terminal',
      INVENTORY: 'Inventory',
      ECOMMERCE: 'Digital Shop',
      CRM: 'Customers',
      ANALYTICS: 'Analytics',
      EMPLOYEES: 'Team',
      SETTINGS: 'Settings',
    },
    pos: {
      totalBill: 'Total Bill',
      activeCart: 'Active Cart',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
      cash: 'CASH',
      card: 'CARD',
      wallet: 'WALLET',
      searchProduct: 'Search product or scan barcode...',
      searchCustomer: 'Search by name or phone...',
      registerMember: 'Register New Member',
      emptyCart: 'Baskets Awaiting Transaction',
    },
    receipt: {
      invNo: 'INV NO',
      operator: 'OPERATOR',
      date: 'DATE',
      description: 'DESCRIPTION',
      qty: 'QTY',
      price: 'PRICE',
      totalDue: 'TOTAL DUE',
      thankYou: 'Thank you for your visit!',
    },
    header: {
      terminal: 'Terminal',
      offline: 'OFFLINE',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      publish: 'Publish Changes',
    }
  },
  BN: {
    sidebar: {
      POS: 'বিক্রয় টার্মিনাল',
      INVENTORY: 'ইনভেন্টরি',
      ECOMMERCE: 'ডিজিটাল শপ',
      CRM: 'কাস্টমার',
      ANALYTICS: 'অ্যানালিটিক্স',
      EMPLOYEES: 'টিম',
      SETTINGS: 'সেটিংস',
    },
    pos: {
      totalBill: 'মোট বিল',
      activeCart: 'সক্রিয় কার্ট',
      subtotal: 'সাবটোটাল',
      tax: 'ট্যাক্স',
      total: 'মোট',
      cash: 'নগদ',
      card: 'কার্ড',
      wallet: 'ওয়ালেট',
      searchProduct: 'পণ্য খুঁজুন বা বারকোড স্ক্যান করুন...',
      searchCustomer: 'নাম বা ফোন দিয়ে খুঁজুন...',
      registerMember: 'নতুন সদস্য নিবন্ধন',
      emptyCart: 'লেনদেনের অপেক্ষায় ঝুড়ি',
    },
    receipt: {
      invNo: 'চালান নং',
      operator: 'অপারেটর',
      date: 'তারিখ',
      description: 'বিবরণ',
      qty: 'পরিমাণ',
      price: 'মূল্য',
      totalDue: 'মোট প্রদেয়',
      thankYou: 'আপনার ভিজিটের জন্য ধন্যবাদ!',
    },
    header: {
      terminal: 'টার্মিনাল',
      offline: 'অফলাইন',
    },
    common: {
      save: 'সংরক্ষণ করুন',
      cancel: 'বাতিল',
      close: 'বন্ধ করুন',
      publish: 'পরিবর্তন প্রকাশ করুন',
    }
  }
};

export type TranslationType = typeof translations.EN;
