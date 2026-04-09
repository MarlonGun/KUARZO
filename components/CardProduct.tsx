import React from 'react';
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

export const CardProduct = ({ producto, width }: { producto: any, width?: number }) => {
    const { nombre, descripcion, precio, imagen } = producto;

    return (
        <View className="w-full bg-white rounded-2xl p-3 shadow-md">

            <View className="flex justify-center items-center">
                <Image
                    source={{ uri: imagen }}
                    className="w-full h-[120px]"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-sm font-semibold text-gray-800 mt-3" numberOfLines={1}>
                {nombre}
            </Text>
            <Text className="text-xs text-gray-500 mt-1 mb-3" numberOfLines={2}>
                {descripcion}
            </Text>

            <View className="flex-col mt-auto items-center">
                <Text className="text-base font-bold text-gray-800 mb-2">
                    ${new Intl.NumberFormat("es-CO").format(precio)}
                </Text>
                <CustomButton className="w-full">Comprar</CustomButton>
            </View>

        </View>
    );
};