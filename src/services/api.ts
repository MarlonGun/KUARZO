import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * URL base de tu backend Express.
 * - Detecta automáticamente si está en web (localhost).
 * - En celular físico o simuladores, obtiene la IP local de la computadora de desarrollo de forma automática.
 */
const getBaseUrl = (): string => {
  return 'https://kuarzo-backend-production.up.railway.app/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor de petición para agregar el token JWT de manera automática
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al recuperar el token desde AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores globales (ej: token expirado)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Acceso no autorizado o token expirado. Limpiando sesión...');
      await AsyncStorage.removeItem('user_token');
    }
    return Promise.reject(error);
  }
);

export default api;
