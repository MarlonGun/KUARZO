import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-black pt-12 pb-8 mt-4 rounded-t-[40px]">
      <View className="px-6">
        {/* LOGO */}
        <View className="flex-row items-center mb-6">
          <Text className="text-white text-3xl font-extrabold tracking-widest">KUARZO</Text>
          <View className="w-2 h-2 bg-yellow-500 rounded-full mt-2 ml-1" />
        </View>

        <Text className="text-gray-400 text-sm mb-8">
          Joyería exclusiva, piezas de lujo únicas y accesorios para tu estilo diario.
        </Text>

        {/* POLITICAS */}
        <View className="mb-8">
          <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Información y Ayuda</Text>
          <View>
            <TouchableOpacity className="mb-3">
              <Text className="text-gray-300 text-sm">Políticas de Privacidad</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-gray-300 text-sm">Términos y Condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-gray-300 text-sm">Políticas de Envío</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-gray-300 text-sm">Políticas de Devolución</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REDES SOCIALES */}
        <View className="mb-8">
          <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Nuestras Redes</Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-gray-800 p-3 rounded-full mr-4 justify-center items-center">
              <Ionicons name="logo-instagram" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-3 rounded-full mr-4 justify-center items-center">
              <Ionicons name="logo-facebook" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-3 rounded-full mr-4 justify-center items-center">
              <Ionicons name="logo-tiktok" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-3 rounded-full justify-center items-center">
              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* COPYRIGHT */}
        <View className="border-t border-gray-800 pt-6 mt-2 flex-row justify-center items-center">
          <Text className="text-gray-500 text-xs text-center">
            © {currentYear} Kuarzo. Todos los derechos reservados.
          </Text>
        </View>
      </View>
    </View>
  );
}