import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, TextInput, View, ViewStyle } from 'react-native';

const BarraBusquedaMovil = ({ className = "", style }: { className?: string, style?: StyleProp<ViewStyle> }) => {
    return (
        <View className={`w-full px-4 py-3 ${className}`} style={style}>
            <View className="flex-row items-center w-full h-11 px-4 bg-white border border-gray-300 rounded-full">
                <TextInput
                    placeholder="Buscar..."
                    className="flex-1 h-full text-base text-gray-800 font-normal outline-none"
                    placeholderTextColor="quaternary-950"
                />
                <Pressable className="ml-2">
                    <MaterialIcons name="search" size={20} color="quaternary-500" />
                </Pressable>
            </View>
        </View>
    );
};

export default BarraBusquedaMovil;
