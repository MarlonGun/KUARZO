import CustomButton from '@/components/CustomButton';
import Header from '@/components/header';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const { cartItems, subtotal, updateQuantity, removeItem } = useCart();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className='flex-1 bg-white'>
                {/* Header global */}
                <Header />

                {/* Sub-navegacion Categorias (replicando diseño) */}
                <View className="border-b border-gray-200 py-3 mb-6 flex-row justify-center gap-6">
                    {['Categoria', 'Categoria', 'Categoria', 'Categoria', 'Categoria', 'Categoria'].map((cat, i) => (
                        <Text key={i} className="text-gray-500 hover:text-gray-900 border-r border-gray-300 pr-6 last:border-r-0">
                            {cat}
                        </Text>
                    ))}
                </View>

                {/* Contenido Principal */}
                <View className="px-10 max-w-7xl mx-auto w-full flex-row">
                    
                    {/* Lado izquierdo: Lista de Productos */}
                    <View className="flex-1 pr-10">
                        <Text className="text-3xl font-bold text-gray-800 mb-6">Carrito de compra</Text>
                        
                        <View className="flex-row items-center mb-6 pb-2 border-b border-gray-300">
                            <MaterialIcons name="check-box-outline-blank" size={24} color="#4B5563" />
                            <Text className="ml-2 text-gray-700 font-medium text-base">Seleccionar todos los productos</Text>
                        </View>

                        {cartItems.length === 0 ? (
                            <Text className="text-gray-500 text-lg">No hay productos en el carrito.</Text>
                        ) : (
                            cartItems.map((item) => (
                                <View key={item.id} className="flex-row items-center border-b border-gray-200 py-6">
                                    <MaterialIcons name="check-box-outline-blank" size={24} color="#4B5563" />
                                    
                                    <View className="border border-gray-300 p-2 ml-4 rounded-md">
                                        <Image
                                            source={{ uri: item.imagen }}
                                            className="w-24 h-24 bg-gray-100 rounded-sm"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    <View className="flex-1 ml-6 h-24 justify-between py-1">
                                        <Text className="text-xl font-bold text-gray-800">{item.nombre}</Text>
                                        
                                        <View className="flex-row items-center border border-gray-300 rounded-md w-28 mt-2">
                                            <Pressable 
                                                className="px-3 py-1 bg-white hover:bg-gray-100 flex-1 items-center"
                                                onPress={() => updateQuantity(item.id, item.cantidad - 1)}
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
                                            <Text className="text-red-500 font-medium">Eliminar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>

                    {/* Lado derecho: Resumen */}
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
                            className="py-4 items-center justify-center rounded-none shadow-sm"
                            onPress={() => console.log('Procesar Compra...')}
                        >
                            COMPRAR
                        </CustomButton>
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
