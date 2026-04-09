import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

const Header = () => {
    return (
        <View className="flex-row items-center justify-between w-full px-6 py-4 bg-white">

            {/* Área del Logo */}
            <View className="flex-row items-center justify-center">
                <Image
                    source={require('../assets/images/logo_header.png')}
                    style={{ width: 140, height: 40, resizeMode: 'contain' }}
                />
            </View>

            {/* Área del Buscador Central */}
            <View className="flex-1 px-8 max-w-3xl">
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
            <View className="flex-row items-center gap-6">
                <Pressable>
                    <Text className="text-base font-medium text-gray-700 hover:text-gray-900">
                        Login
                    </Text>
                </Pressable>

                <Pressable>
                    <Text className="text-base font-medium text-gray-700 hover:text-gray-900">
                        Sign Up
                    </Text>
                </Pressable>

                <Pressable className="ml-2">
                    <MaterialIcons name="shopping-cart" size={24} color="#4B5563" />
                </Pressable>
            </View>

        </View>
    );
};

export default Header;