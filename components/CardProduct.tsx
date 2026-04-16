import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { useCart } from '../context/CartContext';

export const CardProduct = ({ producto, variant = 'default' }: { producto: any, variant?: 'mobile' | 'default' }) => {
    const { addItem } = useCart();
    const { id, nombre, descripcion, precio, imagen, categoria } = producto;

    const isMobile = variant === 'mobile';

    return (
        <View className={`w-full bg-transparent ${isMobile ? 'mb-4' : ''}`}>
            <Pressable onPress={() => router.push({ pathname: '/detalleProd', params: { id: id || nombre, nombre, descripcion, precio, imagen, categoria } })}>
                {/* Sección superior con fondo gris */}
                <View className={`bg-transparent w-full flex justify-center items-center ${isMobile ? 'h-32' : 'h-44'}`}>
                    <Image
                        source={{ uri: imagen }}
                        className={`w-full ${isMobile ? 'h-32' : 'h-44'}`}
                        resizeMode="contain"
                    />
                </View>

                {/* Sección de textos */}
                <View className={`p-2 sm:p-4 pb-2 ${isMobile ? 'h-16' : 'h-24'} justify-center`}>
                    <Text className={`font-roboto-bold text-black text-center ${isMobile ? 'text-sm' : 'text-lg'}`} numberOfLines={1}>
                        {nombre}
                    </Text>
                    <Text className={`font-opensans-regular text-gray-800 mt-1 sm:mt-2 text-center ${isMobile ? 'text-xs' : 'text-sm'}`} numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </Pressable>

            {/* Barra inferior: Precio y Botón rojo */}
            <View className="flex-row items-stretch mt-2 sm:mt-4">

                {/* Este es el botón rojo de la imagen que toca los bordes */}
                <Pressable
                    className={`bg-primary justify-center items-center py-2 sm:py-4 rounded-md ${isMobile ? 'flex-1 h-8' : 'flex-1 w-1/2 h-10'}`}
                    onPress={() => addItem({
                        id: nombre, // Usamos el nombre como ID temporal
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen
                    })}
                >
                    <Text className={`font-roboto-bold text-black uppercase ${isMobile ? 'text-sm' : 'text-base'}`}>
                        Comprar
                    </Text>
                </Pressable>

                <View className={`justify-center items-center py-2 sm:py-4 bg-white ${isMobile ? 'flex-1' : 'flex-1'}`}>
                    <Text className={`font-roboto-bold text-black ${isMobile ? 'text-lg' : 'text-xl'}`}>
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
