import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { useCart } from '../context/CartContext';

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCart();
    const { nombre, descripcion, precio, imagen } = producto;

    return (
        <View className="w-full bg-white rounded-xl border border-gray-800 overflow-hidden m-2 shadow-sm">
            {/* Sección superior con fondo gris */}
            <View className="bg-[#E0E0E0] w-full h-[160px] flex justify-center items-center">
                <Image
                    source={{ uri: imagen }}
                    className="w-[80%] h-[80%]"
                    resizeMode="contain"
                />
            </View>

            {/* Sección de textos */}
            <View className="p-4 pb-2">
                <Text className="text-lg font-roboto-bold text-black" numberOfLines={1}>
                    {nombre}
                </Text>
                <Text className="text-sm font-opensans-regular text-gray-800 mt-2" numberOfLines={2}>
                    {descripcion}
                </Text>
            </View>

            {/* Barra inferior: Precio y Botón rojo */}
            <View className="flex-row items-stretch mt-4">
                <View className="flex-1 justify-center items-center py-4 bg-white">
                    <Text className="text-lg font-roboto-bold text-black">
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>

                {/* Este es el botón rojo de la imagen que toca los bordes */}
                <Pressable
                    className="flex-1 bg-[#C4183C] justify-center items-center py-4"
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
            </View>
        </View>
    );
};