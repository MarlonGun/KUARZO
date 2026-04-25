import AppHeader from '@/components/AppHeader';
import CustomButton from '@/components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/src/store/useCartStore';

export default function CartMovil() {
    const { items: cartItems, updateQuantity, removeItem, getTotal } = useCartStore();
    const subtotal = getTotal();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className='flex-1 bg-white'>
                <AppHeader platform="movil" />

                <View className="px-5 w-full pt-4">
                    <Pressable className="mb-4 flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">
                            Volver
                        </Text>
                    </Pressable>
                </View>

                <View className="px-5 w-full flex-col">
                    <View className="flex-1 pb-6">
                        <Text className="text-2xl font-bold text-gray-800 mb-4">Carrito de compra</Text>

                        {cartItems.length === 0 ? (
                            <Text className="text-gray-500 text-base">No hay productos en el carrito.</Text>
                        ) : (
                            cartItems.map((item) => (
                                <View key={item.id} className="flex-row items-center border-b border-[#9ca3af] py-4">
                                    <View className="border border-[#9ca3af] p-1 rounded-md">
                                        <Image
                                            source={{ uri: item.imagen }}
                                            className="w-16 h-16 bg-gray-100 rounded-sm"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    <View className="flex-1 ml-4 justify-between">
                                        <Text className="text-base font-bold text-gray-800">{item.nombre}</Text>

                                        <View className="flex-row items-center border border-[#9ca3af] rounded-md w-24 mt-2">
                                            <Pressable
                                                className="px-2 py-1 bg-white flex-1 items-center"
                                                onPress={() => updateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                                            >
                                                <Text className="text-gray-600 text-lg font-bold">-</Text>
                                            </Pressable>
                                            <Text className="px-2 text-gray-900 font-medium text-base">{item.cantidad}</Text>
                                            <Pressable
                                                className="px-2 py-1 bg-white flex-1 items-center"
                                                onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                                            >
                                                <Text className="text-gray-600 text-lg font-bold">+</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                    <View className="justify-center items-end ml-2">
                                        <Text className="text-lg font-bold text-gray-800">${item.precio.toLocaleString()}</Text>
                                        <Pressable className="mt-2" onPress={() => removeItem(item.id)}>
                                            <Text className="text-[#FF0000] text-sm font-medium">Eliminar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>

                    <View className="w-full mt-4 pb-10">
                        <Text className="text-lg font-bold text-gray-800 mb-4">Resumen</Text>
                        <View className="flex-row items-center justify-between border-t border-gray-300 pt-4 mb-6">
                            <Text className="text-lg font-bold text-gray-800">Total</Text>
                            <Text className="text-xl font-bold text-gray-800">${subtotal.toLocaleString()}</Text>
                        </View>

                        <CustomButton
                            color="primary"
                            className="py-3 items-center justify-center rounded-md shadow-sm"
                            onPress={() => router.push('/checkout')}
                        >
                            Finalizar Compra
                        </CustomButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
