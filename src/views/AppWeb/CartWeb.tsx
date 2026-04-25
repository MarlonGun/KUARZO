import AppHeader from '@/components/AppHeader';
import CustomButton from '@/components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/src/store/useCartStore';

export default function CartWeb() {
    const { items: cartItems, updateQuantity, removeItem, getTotal } = useCartStore();
    const subtotal = getTotal();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className='flex-1 bg-white'>
                <AppHeader platform="web" />

                <View className="px-10 max-w-7xl mx-auto w-full pt-6">
                    <Pressable className="mb-4 flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">
                            Volver
                        </Text>
                    </Pressable>
                </View>

                <View className="px-10 max-w-7xl mx-auto w-full flex-row">
                    <View className="flex-1 pr-10">
                        <Text className="text-3xl font-bold text-gray-800 mb-6">Carrito de compra</Text>

                        {cartItems.length === 0 ? (
                            <Text className="text-gray-500 text-lg">No hay productos en el carrito.</Text>
                        ) : (
                            cartItems.map((item) => (
                                <View key={item.id} className="flex-row items-center border-b border-[#9ca3af] py-6">
                                    <View className="border border-[#9ca3af] p-2 ml-4 rounded-md">
                                        <Image
                                            source={{ uri: item.imagen }}
                                            className="w-24 h-24 bg-gray-100 rounded-sm"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    <View className="flex-1 ml-6 h-24 justify-between py-1">
                                        <Text className="text-xl font-bold text-gray-800">{item.nombre}</Text>

                                        <View className="flex-row items-center border border-[#9ca3af] rounded-md w-28 mt-2">
                                            <Pressable
                                                className="px-3 py-1 bg-white hover:bg-gray-100 flex-1 items-center"
                                                onPress={() => updateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                                            >
                                                <Text className="text-gray-600 text-xl font-bold">-</Text>
                                            </Pressable>
                                            <Text className="px-3 text-gray-900 font-medium text-lg">{item.cantidad}</Text>
                                            <Pressable
                                                className="px-3 py-1 bg-white hover:bg-gray-100 flex-1 items-center"
                                                onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                                            >
                                                <Text className="text-gray-600 text-xl font-bold">+</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                    <View className="h-24 justify-center items-end ml-4">
                                        <Text className="text-2xl font-bold text-gray-800">${item.precio.toLocaleString()}</Text>
                                        <Pressable className="mt-4" onPress={() => removeItem(item.id)}>
                                            <Text className="text-[#FF0000] font-medium">Eliminar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>

                    <View className="w-[380px] mt-16">
                        <Text className="text-xl font-bold text-gray-800 mb-6">Resumen de compra</Text>

                        <View className="mb-6">
                            <Text className="text-gray-800 font-bold mb-4 text-base">Productos ({cartItems.reduce((acc, curr) => acc + curr.cantidad, 0)})</Text>
                            {cartItems.map((item) => (
                                <View key={item.id} className="flex-row justify-between mb-2">
                                    <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>{item.nombre}</Text>
                                    <Text className="text-gray-800 text-sm font-bold ml-4">${(item.precio * item.cantidad).toLocaleString()}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="flex-row items-center justify-between border-t border-gray-300 pt-6 mb-8">
                            <Text className="text-xl font-bold text-gray-800">Total</Text>
                            <Text className="text-2xl font-bold text-gray-800">${subtotal.toLocaleString()}</Text>
                        </View>

                        <CustomButton
                            color="primary"
                            className="py-4 items-center justify-center rounded-md shadow-sm"
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
