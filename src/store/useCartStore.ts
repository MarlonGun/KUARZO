import { create } from 'zustand';

export interface CartItem {
  id: number | string;
  nombre: string;
  precio: number;
  imagen: string | number;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  isSidebarOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isSidebarOpen: false,
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i),
          isSidebarOpen: true
        };
      }
      return { 
        items: [...state.items, item],
        isSidebarOpen: true
      };
    });
  },
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  updateQuantity: (id, cantidad) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, cantidad } : i)
  })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  },
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open })
}));
