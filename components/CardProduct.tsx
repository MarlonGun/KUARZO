import { usePlatform } from '@/hooks/usePlatform';
import { useCartStore } from '@/src/store/useCartStore';
import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCartStore();
    const platform = usePlatform();
    const { width } = useWindowDimensions();
    const isMobile = platform === 'movil' || width < 760;

    const { id, nombre, descripcion, precio, imagen, categoria, stock } = producto;

    return (
        <View className="w-full overflow-hidden bg-transparent">
            <Pressable onPress={() => router.push({ pathname: '/detalleProd', params: { id: id || nombre, nombre, descripcion, precio, imagen, categoria, stock } })}>
                {/* Sección superior con contenedor de imagen fijo */}
                <View className="bg-[#f9f9f9] w-full h-48 justify-center items-center overflow-hidden">
                    <Image
                        source={{ uri: producto.imagen }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>

                {/* Sección de textos */}
                <View className={`${isMobile ? 'p-3 pb-2' : 'p-4 pb-2 h-24'} justify-center`}>
                    <Text className={`${isMobile ? 'text-sm' : 'text-lg'} font-roboto-bold text-black text-center`} numberOfLines={2}>
                        {nombre}
                    </Text>
                    <Text className={`${isMobile ? 'text-xs' : 'text-sm'} font-opensans-regular text-gray-800 mt-1 text-center`} numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </Pressable>

            {/* Barra inferior: Precio y Botón amarillo */}
            <View className={`${isMobile ? 'flex-col gap-3 w-full' : 'flex-row items-stretch'} mt-4`}>

                <Pressable
                    className={`${isMobile ? 'w-full py-4 px-4' : 'flex-1 py-3'} bg-primary justify-center items-center rounded-sm`}
                    style={isMobile ? { minWidth: 0, width: '100%' } : undefined}
                    onPress={() => addItem({
                        id: String(id),
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen,
                        cantidad: 1
                    })}

                >
                    <Text
                        className={`${isMobile ? 'text-lg' : 'text-lg'} font-roboto-medium text-black text-center leading-5`}
                    >
                        Comprar
                    </Text>
                </Pressable>

                <View
                    className={`${isMobile ? 'w-full' : 'flex-1'} justify-center items-center py-4 px-4 bg-white rounded-md`}
                    style={isMobile ? { minWidth: 0, width: '100%' } : undefined}
                >
                    <Text
                        className={`${isMobile ? 'text-sm' : 'text-xl'} font-roboto-bold text-black text-center leading-5`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

