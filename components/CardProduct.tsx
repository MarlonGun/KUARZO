import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { useCart } from '../context/CartContext';
import { router } from "expo-router";

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCart();
    const { id, nombre, descripcion, precio, imagen, categoria } = producto;

    return (
        <View className="w-full overflow-hidden rounded-2xl border border-[#eef1f5] bg-white">
            <Pressable onPress={() => router.push({ pathname: '/detalleProd', params: { id: id || nombre, nombre, descripcion, precio, imagen, categoria } })}>
                {/* Sección superior con fondo gris */}
                <View className="h-44 w-full items-center justify-center bg-[#f8fafc] px-3">
                    <Image
                        source={{ uri: imagen }}
                        className="h-40 w-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Sección de textos */}
                <View className="h-28 justify-center px-4 pb-2 pt-4">
                    <Text className="text-center font-roboto-bold text-base text-black" numberOfLines={1}>
                        {nombre}
                    </Text>
                    <Text className="mt-2 text-center font-opensans-regular text-sm text-gray-800" numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </Pressable>

            {/* Barra inferior: Precio y Botón rojo */}
            <View className="flex-row border-t border-[#eef1f5]">
                <Pressable
                    className="min-h-14 flex-1 items-center justify-center bg-primary px-3 py-4"
                    onPress={() => addItem({
                        id: nombre, // Usamos el nombre como ID temporal
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen
                    })}
                >
                    <Text className="text-center text-sm font-roboto-bold uppercase text-black">
                        Comprar
                    </Text>
                </Pressable>

                <View className="min-h-14 flex-1 items-center justify-center bg-white px-3 py-4">
                    <Text className="text-center text-lg font-roboto-bold text-black">
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
