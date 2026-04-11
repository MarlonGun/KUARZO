import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string; // Puede ser el nombre si no hay ID por ahora
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar estado inicial
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('@kuarzo_cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (e) {
        console.error('Error cargando carrito:', e);
      } finally {
        setIsInitialized(true);
      }
    };
    loadCart();
  }, []);

  // Guardar cuando hay cambios
  useEffect(() => {
    if (isInitialized) {
      AsyncStorage.setItem('@kuarzo_cart', JSON.stringify(cartItems)).catch((e) =>
        console.error('Error guardando carrito:', e)
      );
    }
  }, [cartItems, isInitialized]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, 'cantidad'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
    setIsSidebarOpen(true); // Abre el sidebar al agregar
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad: quantity } : i))
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isSidebarOpen,
        toggleSidebar,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
