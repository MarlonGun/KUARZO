import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useCartStore } from '@/src/store/useCartStore';

const Header = () => {
    const { toggleSidebar, items } = useCartStore();
    const totalItems = items.reduce((acc, curr) => acc + curr.cantidad, 0);

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View 
            style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingHorizontal: isMobile ? 12 : 24,
                paddingVertical: 16,
                backgroundColor: '#fff',
                gap: 12
            }}
            className="w-full shadow-sm"
        >
            {/* Lado Izquierdo: Logo */}
            <Pressable 
                onPress={() => router.push('/')}
                style={{ cursor: 'pointer' }}
                className="flex-row items-center justify-center"
            >
                <Image
                    source={require('../assets/images/logo_header.png')}
                    style={{ width: 140, height: 40, resizeMode: 'contain' }}
                />
            </Pressable>

            {/* Si es móvil, mostramos las acciones aquí para que queden al lado del logo */}
            {isMobile && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-base font-roboto-medium text-gray-700">Login</Text>
                    </Pressable>
                    <Pressable className="ml-2 relative" onPress={toggleSidebar}>
                        <MaterialIcons name="shopping-cart" size={24} color="#4B5563" />
                        {totalItems > 0 && (
                            <View className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                <Text className="text-white text-xs font-bold">{totalItems}</Text>
                            </View>
                        )}
                    </Pressable>
                </View>
            )}

            {/* Área del Buscador - En móvil ocupará el 100% abajo, en desktop estará al centro */}
            <View style={{ flex: 1, minWidth: isMobile ? '100%' : 200 }} className="px-2 max-w-3xl">
                <View className="flex-row items-center w-full h-11 px-4 bg-white border border-gray-300 rounded-full">
                    <TextInput
                        placeholder="Buscar..."
                        className="flex-1 h-full text-base text-gray-800 font-normal outline-none"
                        placeholderTextColor='quaternary-950'
                    />
                    <Pressable className="ml-2">
                        <MaterialIcons name="search" size={20} color='quaternary-500' />
                    </Pressable>
                </View>
            </View>

            {/* Área de Acciones - Solo se muestra aquí en Desktop */}
            {!isMobile && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-base font-roboto-medium text-gray-700 hover:text-gray-900">
                            Login
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => router.push('/register')}>
                        <Text className="text-base font-roboto-medium text-gray-700 hover:text-gray-900">
                            Sign Up
                        </Text>
                    </Pressable>
                    <Pressable className="ml-2 relative" onPress={toggleSidebar}>
                        <MaterialIcons name="shopping-cart" size={24} color="#4B5563" />
                        {totalItems > 0 && (
                            <View className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                <Text className="text-white text-xs font-bold">{totalItems}</Text>
                            </View>
                        )}
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Header;