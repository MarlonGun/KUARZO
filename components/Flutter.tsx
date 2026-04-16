import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function FlutterComponent() {
  const currentYear = new Date().getFullYear();
  {/*Coment*/ }
  return (
    <View className="bg-quaternary-950 pt-8 sm:pt-12 pb-8 mt-4">
      <View className="px-4 sm:px-6 flex flex-col sm:flex-row">
        {/* LOGO */}
        <View className="flex-row items-left mb-6 flex flex-col">
          <Text className="text-quaternary-500 text-2xl sm:text-3xl font-extrabold tracking-widest">KUARZO</Text>
          <Text className="text-quaternary-500 text-sm mb-4 sm:mb-8">
            Joyería exclusiva, piezas de lujo únicas y accesorios para tu estilo diario.
          </Text>
        </View>



        {/* POLITICAS */}
        <View className="mb-6 sm:mb-8 flex flex-col sm:mx-20">
          <Text className="text-quaternary-500 text-xs font-bold uppercase tracking-widest mb-4">Información y Ayuda</Text>
          <View>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Políticas de Privacidad</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Términos y Condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Políticas de Envío</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Políticas de Devolución</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REDES SOCIALES */}
        <View className="mb-6 sm:mb-8 flex flex-col">
          <Text className="text-quaternary-500 text-xs font-bold uppercase tracking-widest mb-4">Nuestras Redes</Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-gray-800 p-2 sm:p-3 rounded-full mr-2 sm:mr-4 justify-center items-center">
              <Ionicons name="logo-instagram" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-2 sm:p-3 rounded-full mr-2 sm:mr-4 justify-center items-center">
              <Ionicons name="logo-facebook" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-2 sm:p-3 rounded-full mr-2 sm:mr-4 justify-center items-center">
              <Ionicons name="logo-tiktok" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-2 sm:p-3 rounded-full justify-center items-center">
              <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>


      </View>
      {/* COPYRIGHT */}
      <View className="border-t border-gray-800 pt-4 sm:pt-6 mt-2 flex-row justify-center items-center">
        <Text className="text-quaternary-500 text-xs text-center">
          © {currentYear} Kuarzo. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}