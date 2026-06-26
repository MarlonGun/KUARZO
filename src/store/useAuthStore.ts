import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  primerNombre: string;
  primerApellido: string;
  correo: string;
  rol: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => {
    AsyncStorage.setItem('user_info', JSON.stringify(user)).catch((e) => {
      console.error('Error al guardar el usuario en AsyncStorage:', e);
    });
    set({ user, isAuthenticated: true });
    // Fetch cart immediately after login
    const { useCartStore } = require('./useCartStore');
    useCartStore.getState().fetchCart();
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem('user_token');
      await AsyncStorage.removeItem('user_info');
    } catch (e) {
      console.error('Error al remover la sesión en logout:', e);
    }
    set({ user: null, isAuthenticated: false });
    // Clear local cart on logout
    const { useCartStore } = require('./useCartStore');
    useCartStore.getState().clearCart();
  },
  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      const userInfoStr = await AsyncStorage.getItem('user_info');
      if (token && userInfoStr) {
        const user = JSON.parse(userInfoStr);
        set({ user, isAuthenticated: true });
        // Fetch cart when app initializes with active session
        const { useCartStore } = require('./useCartStore');
        useCartStore.getState().fetchCart();
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (e) {
      console.error('Error al inicializar la autenticación:', e);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
