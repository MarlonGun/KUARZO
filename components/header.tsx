import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { toggleSidebar, totalItems } = useCart();
    return (
        <View className="flex-row items-center justify-between w-full px-4 sm:px-6 py-4 bg-white shadow-sm">

            {/* Área del Logo */}
            <View className="flex-row items-center justify-center">
                <Image
                    source={require('../assets/images/logo_header.png')}
                    className="w-20 sm:w-36 h-8 sm:h-10"
                    resizeMode='contain'
                />
            </View>

            {/* Área del Buscador Central - Hidden on mobile, shown on sm and up */}
            <View className="hidden sm:flex flex-1 px-8 max-w-3xl">
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

            {/* Área de Acciones */}
            <View className="flex-row items-center gap-2 sm:gap-6">
                <Pressable onPress={() => router.push('/login')} className="hidden sm:flex">
                    <Text className="text-base font-roboto-medium text-gray-700 hover:text-gray-900">
                        Login
                    </Text>
                </Pressable>

                <Pressable onPress={() => router.push('/register')} className="hidden sm:flex">
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

        </View>
    );
};

export default Header;