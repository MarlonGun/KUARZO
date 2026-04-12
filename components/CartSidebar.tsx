import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItemSidebar from './CartItemSidebar';
import CustomButton from './CustomButton';


const { height } = Dimensions.get('window');

const CartSidebar = () => {
    const { isSidebarOpen, toggleSidebar, cartItems, subtotal } = useCart();
    const router = useRouter();

    if (!isSidebarOpen) return null;

    const handleCheckout = () => {
        toggleSidebar(); // Cerramos sidebar
        router.push('/cart'); // Vamos al checkout grande
    };

    return (
        <View className="absolute top-0 right-0 bottom-0 left-0 z-50 flex-row justify-end" pointerEvents="box-none">
            {/* Overlay background para cerrar al hacer clic afuera (HERMANO DEL SIDEBAR) */}
            <Pressable
                className="absolute top-0 right-0 bottom-0 left-0"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                onPress={toggleSidebar}
            />

            {/* Panel lateral propiamente dicho */}
            <View className="w-[85%] md:w-[400px] h-full z-10" style={{ backgroundColor: '#ffffff', opacity: 1, elevation: 5 }}>
                {/* Header del Sidebar */}
                <View className="flex-row items-center justify-between px-6 py-5 border-b border-gray-200">
                    <Text className="text-xl font-bold text-gray-800">Carrito</Text>
                    <Pressable onPress={toggleSidebar}>
                        <MaterialIcons name="close" size={24} color="#4B5563" />
                    </Pressable>
                </View>

                {/* Lista de Productos */}
                <ScrollView className="flex-1">
                    {cartItems.length === 0 ? (
                        <View className="items-center justify-center p-10">
                            <MaterialIcons name="remove-shopping-cart" size={48} color="#D1D5DB" />
                            <Text className="text-gray-500 mt-4 text-center">Tu carrito está vacío</Text>
                        </View>
                    ) : (
                        cartItems.map((item) => (
                            <CartItemSidebar key={item.id} item={item} />
                        ))
                    )}
                </ScrollView>

                {/* Footer del Sidebar */}
                {cartItems.length > 0 && (
                    <View className="border-t border-gray-200 p-6 bg-white">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-base text-gray-600 font-medium">Subtotal:</Text>
                            <Text className="text-xl text-gray-900 font-bold">${subtotal.toLocaleString()}</Text>
                        </View>

                        <CustomButton
                            color="primary"
                            className="py-3 items-center justify-center rounded"
                            onPress={handleCheckout}
                        >
                            Ir al Carrito
                        </CustomButton>
                    </View>
                )}
            </View>
        </View>
    );
};

export default CartSidebar;

