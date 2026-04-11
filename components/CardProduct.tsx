import React from 'react';
import { Image, Text, View } from "react-native";
import { useCart } from '../context/CartContext';
import CustomButton from "./CustomButton";

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCart();
    const { nombre, descripcion, precio, imagen } = producto;

    return (
        <View className="w-full bg-transparent p-3">

            <View className="flex justify-center items-center">
                <Image
                    source={{ uri: imagen }}
                    className="w-full h-[120px]"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-sm font-roboto-semibold text-gray-800 mt-3" numberOfLines={1}>
                {nombre}
            </Text>
            <Text className="text-xs text-gray-500 mt-1 mb-3" numberOfLines={2}>
                {descripcion}
            </Text>

            <View className="flex-col mt-auto items-center">
                <CustomButton className="w-auto bg-color-primary font-roboto-bold text-2xl">Comprar</CustomButton>
                <Text className="text-base font-roboto-bold text-gray-800 mb-2">
                    ${new Intl.NumberFormat("es-CO").format(precio)}
                </Text>
                <CustomButton 
                    className="w-auto"
                    onPress={() => addItem({
                        id: nombre, // Usamos el nombre como ID temporal
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen
                    })}
                >
                    Comprar
                </CustomButton>
            </View>

        </View>
    );
};