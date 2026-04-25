import AppHeader from '@/components/AppHeader';
import CustomButton from '@/components/CustomButton';
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/src/store/useCartStore';

const DetalleProdWeb = () => {
    const { addItem } = useCartStore();

    const params = useLocalSearchParams();
    const { id, nombre, descripcion, precio, imagen, categoria } = params;

    const productNombre = nombre ? String(nombre) : 'Pulsera volcanica';
    const productDescripcion = descripcion ? String(descripcion) : 'Pulseras realizadas en piedra volcanica natural.';
    const productPrecio = precio ? Number(precio) : 45000;
    const mainImage = imagen ? String(imagen) : 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80';
    const productCategoria = categoria ? String(categoria) : 'Pulsera';

    const localProductImages = useMemo(() => [
        mainImage,
        'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    ], [mainImage]);

    const localColorOptions = useMemo(() => [
        { id: 'gold', label: 'Dorado', image: localProductImages[0] },
        { id: 'black', label: 'Negro', image: localProductImages[1] },
        { id: 'mix', label: 'Mixto', image: localProductImages[2] },
    ], [localProductImages]);

    const [selectedImage, setSelectedImage] = useState(localProductImages[0]);
    useEffect(() => {
        setSelectedImage(localProductImages[0]);
    }, [localProductImages]);

    const [selectedColor, setSelectedColor] = useState(localColorOptions[0].id);
    const [quantity, setQuantity] = useState(1);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                <AppHeader platform="web" />

                <View className="px-8 pt-6 bg-white w-full max-w-6xl mx-auto">
                    <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">Volver</Text>
                    </Pressable>
                </View>

                <View className="items-center">
                    <View className="w-full max-w-6xl flex-row gap-14 px-8 py-14">
                        {/* Izquierda */}
                        <View className="max-w-[470px] flex-1">
                            <View className="border border-[#9ca3af] bg-transparent p-4">
                                <Image source={{ uri: selectedImage }} className="h-[320px] w-full" resizeMode="contain" />
                            </View>

                            <View className="mt-2 flex-row gap-2">
                                {localProductImages.map((image, index) => {
                                    const active = image === selectedImage;
                                    return (
                                        <Pressable
                                            key={`${image}-${index}`}
                                            onPress={() => setSelectedImage(image)}
                                            className={`flex-1 border p-2 ${active ? 'border-secondary' : 'border-[#9ca3af]'}`}
                                        >
                                            <Image source={{ uri: image }} className="h-24 w-full" resizeMode="contain" />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Derecha */}
                        <View className="max-w-[520px] flex-1">
                            <Text className="font-roboto-bold text-4xl text-tertiary" numberOfLines={2}>{productNombre}</Text>
                            <Text className="mt-3 max-w-[500px] font-opensans-light text-sm leading-6 text-[#000000]">
                                {productDescripcion}
                            </Text>

                            <View className="mt-6 flex-row items-stretch border border-[#9ca3af] self-start">
                                <View className="justify-center px-5 py-4">
                                    <Text className="font-roboto-bold text-5xl text-secondary">${new Intl.NumberFormat("es-CO").format(productPrecio)}</Text>
                                </View>
                                <View className="justify-center border-l border-[#9ca3af] px-4">
                                    <Text className="font-opensans-regular text-sm leading-5 text-[#000000]">20 und{'\n'}disponibles</Text>
                                </View>
                            </View>

                            <View className="mt-8 border-t border-[#9ca3af] pt-5">
                                <Text className="font-roboto-medium text-xl text-tertiary">Categoria:</Text>
                                <Text className="mt-1 font-opensans-regular text-base text-[#000000]">{productCategoria || 'General'}</Text>
                            </View>

                            <View className="mt-7 border-t border-[#9ca3af] pt-5">
                                <Text className="font-roboto-medium text-xl text-tertiary">Color:</Text>
                                <View className="mt-3 flex-row gap-2">
                                    {localColorOptions.map((option) => {
                                        const active = option.id === selectedColor;
                                        return (
                                            <Pressable
                                                key={option.id}
                                                onPress={() => {
                                                    setSelectedColor(option.id);
                                                    setSelectedImage(option.image);
                                                }}
                                                className={`h-16 w-16 items-center justify-center border bg-white p-1 ${active ? 'border-secondary' : 'border-[#9ca3af]'}`}
                                            >
                                                <Image source={{ uri: option.image }} className="h-full w-full" resizeMode="contain" />
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>

                            <View className="mt-7">
                                <Text className="font-roboto-medium text-xl text-tertiary">Cantidad</Text>
                                <View className="mt-3 flex-row items-center gap-4">
                                    <View className="flex-row self-start border border-[#9ca3af]">
                                        <Pressable className="px-4 py-3" onPress={() => setQuantity((current) => Math.max(1, current - 1))}>
                                            <Text className="font-roboto-medium text-xl text-[#000000]">-</Text>
                                        </Pressable>
                                        <View className="justify-center px-3">
                                            <Text className="font-opensans-regular text-lg text-[#000000]">{quantity}</Text>
                                        </View>
                                        <Pressable className="px-4 py-3" onPress={() => setQuantity((current) => current + 1)}>
                                            <Text className="font-roboto-medium text-xl text-[#000000]">+</Text>
                                        </Pressable>
                                    </View>

                                    <CustomButton
                                        color="primary"
                                        className="min-w-[220px] rounded-md px-6 py-4 font-roboto-bold text-base"
                                        onPress={() => {
                                            addItem({
                                                id: id ? String(id) : productNombre,
                                                nombre: productNombre,
                                                precio: productPrecio,
                                                imagen: selectedImage,
                                                cantidad: quantity
                                            });
                                        }}
                                    >
                                        AGREGAR AL CARRITO
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetalleProdWeb;
