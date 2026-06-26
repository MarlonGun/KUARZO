import { create } from 'zustand';
import api from '../services/api';
import { useAuthStore } from './useAuthStore';

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
  fetchCart: () => Promise<void>;
  syncCartWithBackend: () => Promise<void>;
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
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isSidebarOpen: false,

  fetchCart: async () => {
    try {
      if (!useAuthStore.getState().isAuthenticated) return;
      const response = await api.get('/carrito');
      if (response.data && Array.isArray(response.data)) {
        // Combinar el carrito local con el del backend o reemplazarlo
        // Como el plan decía fusionarlo o reemplazarlo, vamos a reemplazar el local si el backend tiene datos
        if (response.data.length > 0) {
            set({ items: response.data });
        } else {
            // Si el backend no tiene, sincronizamos el local hacia el backend
            get().syncCartWithBackend();
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },

  syncCartWithBackend: async () => {
    try {
      if (!useAuthStore.getState().isAuthenticated) return;
      const items = get().items;
      await api.post('/carrito/sync', { items });
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  },

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(i => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad, selected: true } : i);
      } else {
        newItems = [...state.items, { ...item, selected: true }];
      }
      return { items: newItems, isSidebarOpen: true };
    });
    get().syncCartWithBackend();
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter(i => i.id !== id) }));
    get().syncCartWithBackend();
  },

  updateQuantity: (id, cantidad) => {
    set((state) => {
      if (cantidad <= 0) {
        return { items: state.items.filter(i => i.id !== id) };
      }
      return { items: state.items.map(i => i.id === id ? { ...i, cantidad } : i) };
    });
    get().syncCartWithBackend();
  },

  clearCart: () => {
    set({ items: [] });
    get().syncCartWithBackend();
  },

  getTotal: () => get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
  getSelectedTotal: () => get().items.filter(item => item.selected !== false).reduce((total, item) => total + (item.precio * item.cantidad), 0),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSelectItem: (id) => set((state) => ({ items: state.items.map(i => i.id === id ? { ...i, selected: i.selected === false } : i) })),
  toggleAllItems: (selected) => set((state) => ({ items: state.items.map(i => ({ ...i, selected })) })),
  clearSelectedItems: () => {
    set((state) => ({ items: state.items.filter(i => i.selected === false) }));
    get().syncCartWithBackend();
  }
}));
