import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { useCart } from '../context/CartContext';

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCart();
    const { nombre, descripcion, precio, imagen } = producto;

    return (
        <View className="w-full bg-transparent">
            {/* Sección superior con fondo gris */}
            <View className="bg-transparent w-full h-44 flex justify-center items-center">
                <Image
                    source={{ uri: imagen }}
                    className="w-full h-44"
                    resizeMode="contain"
                />
            </View>

            {/* Sección de textos */}
            <View className="p-4 pb-2 h-24 justify-center">
                <Text className="text-lg font-roboto-bold text-black text-center" numberOfLines={1}>
                    {nombre}
                </Text>
                <Text className="text-sm font-opensans-regular text-gray-800 mt-2 text-center" numberOfLines={2}>
                    {descripcion}
                </Text>
            </View>

            {/* Barra inferior: Precio y Botón rojo */}
            <View className="flex-row items-stretch mt-4">

                {/* Este es el botón rojo de la imagen que toca los bordes */}
                <Pressable
                    className="flex-1 bg-primary justify-center items-center py-4 rounded-md w-1/2 h-10"
                    onPress={() => addItem({
                        id: nombre, // Usamos el nombre como ID temporal
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen
                    })}
                >
                    <Text className="text-base font-roboto-bold text-black uppercase">
                        Comprar
                    </Text>
                </Pressable>

                <View className="flex-1 justify-center items-center py-4 bg-white">
                    <Text className="text-xl font-roboto-bold text-black">
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
