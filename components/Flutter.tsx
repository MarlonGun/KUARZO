import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function FlutterComponent() {
  const currentYear = new Date().getFullYear();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  return (
    <View className="bg-quaternary-950 pt-6 pb-4 mt-24 [40px]">
      <View className={`px-6 ${isMobile ? 'flex flex-col gap-6' : 'flex flex-row items-center justify-center'}`}>
        {/* LOGO */}
        <View className={`mb-6 ${isMobile ? 'w-full items-start' : 'w-1/3 items-start'}`}>
          <Image
            source={require('@/assets/images/logopie.png')}
            className="w-48 h-48"
            resizeMode="contain"
          />
          <Text className="text-quaternary-500 text-sm">
            Joyería exclusiva, piezas de lujo únicas y accesorios para tu estilo diario.
          </Text>
        </View>

        {/* POLITICAS */}
        <View className={`mb-8 ${isMobile ? 'w-full items-start' : 'w-1/3 items-center'}`}>
          <Text className="text-quaternary-500 text-xs font-bold uppercase tracking-widest mb-4">Información y Ayuda</Text>
          <View>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Políticas de Privacidad</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-3">
              <Text className="text-quaternary-500 text-sm">Términos y Condiciones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* COPYRIGHT */}
      <View className="border-t border-gray-800 pt-6 mt-2 flex-row justify-center items-center">
        <Text className="text-quaternary-500 text-xs text-center">
          © {currentYear} Kuarzo. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}