import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function FlutterComponent() {
  const currentYear = new Date().getFullYear();
  const { width } = useWindowDimensions();
  const esDesktop = width >= 980;

  return (
    <View className="mt-4 bg-quaternary-950 px-4 pb-8 pt-12">
      <View className={`mx-auto w-full max-w-6xl ${esDesktop ? 'flex-row justify-between gap-12 px-2' : 'gap-10'}`}>
        {/* LOGO */}
        <View className={esDesktop ? 'max-w-sm' : ''}>
          <Text className="text-quaternary-500 text-3xl font-extrabold tracking-widest">KUARZO</Text>
          <Text className="mb-8 mt-3 text-quaternary-500 text-sm">
            Joyería exclusiva, piezas de lujo únicas y accesorios para tu estilo diario.
          </Text>
        </View>

        {/* POLITICAS */}
        <View className={esDesktop ? 'min-w-[220px]' : ''}>
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
        <View>
          <Text className="text-quaternary-500 text-xs font-bold uppercase tracking-widest mb-4">Nuestras Redes</Text>
          <View className="flex-row flex-wrap">
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
      </View>
      {/* COPYRIGHT */}
      <View className="mx-auto mt-2 flex-row items-center justify-center border-t border-gray-800 pt-6 w-full max-w-6xl">
        <Text className="text-quaternary-500 text-xs text-center">
          © {currentYear} Kuarzo. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}
