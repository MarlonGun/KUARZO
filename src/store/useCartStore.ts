import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number | string;
  nombre: string;
  precio: number;
  imagen: string | number;
  cantidad: number;
  selected?: boolean;
}

interface CartState {
  items: CartItem[];
  isSidebarOpen: boolean;
  lastUpdated: number | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSelectedTotal: () => number;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSelectItem: (id: number | string) => void;
  toggleAllItems: (selected: boolean) => void;
  clearSelectedItems: () => void;
  checkExpiration: () => void;
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in ms

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isSidebarOpen: false,
      lastUpdated: null,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad, selected: true } : i),
              isSidebarOpen: true,
              lastUpdated: Date.now()
            };
          }
          return { 
            items: [...state.items, { ...item, selected: true }],
            isSidebarOpen: true,
            lastUpdated: Date.now()
          };
        });
      },
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id),
        lastUpdated: Date.now()
      })),
      updateQuantity: (id, cantidad) => set((state) => {
        if (cantidad <= 0) {
          return {
            items: state.items.filter(i => i.id !== id),
            lastUpdated: Date.now()
          };
        }
        return {
          items: state.items.map(i => i.id === id ? { ...i, cantidad } : i),
          lastUpdated: Date.now()
        };
      }),
      clearCart: () => set({ items: [], lastUpdated: null }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
      },
      getSelectedTotal: () => {
        return get().items
          .filter(item => item.selected !== false)
          .reduce((total, item) => total + (item.precio * item.cantidad), 0);
      },
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      toggleSelectItem: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, selected: i.selected === false } : i),
        lastUpdated: Date.now()
      })),
      toggleAllItems: (selected) => set((state) => ({
        items: state.items.map(i => ({ ...i, selected })),
        lastUpdated: Date.now()
      })),
      clearSelectedItems: () => set((state) => ({
        items: state.items.filter(i => i.selected === false),
        lastUpdated: Date.now()
      })),
      checkExpiration: () => {
        const { lastUpdated } = get();
        if (lastUpdated && (Date.now() - lastUpdated > EXPIRATION_TIME)) {
          get().clearCart();
        }
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items, lastUpdated: state.lastUpdated }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkExpiration();
        }
      }
    }
  )
);
