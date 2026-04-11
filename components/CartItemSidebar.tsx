import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { CartItem, useCart } from '../context/CartContext';

interface Props {
  item: CartItem;
}

const CartItemSidebar = ({ item }: Props) => {
  const { updateQuantity } = useCart();

  return (
    <View className="flex-row items-center border-b border-gray-200 py-4 px-4 bg-white">
      {/* Imagen pequeña */}
      <Image
        source={{ uri: item.imagen }}
        className="w-16 h-16 rounded-md bg-gray-100"
        resizeMode="cover"
      />
      
      {/* Información */}
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-sm text-gray-800 font-medium" numberOfLines={1}>{item.nombre}</Text>
        <Text className="text-sm text-gray-600 font-bold mt-1">${item.precio.toLocaleString()}</Text>
      </View>

      {/* Controles de cantidad */}
      <View className="flex-row items-center border border-gray-300 rounded-md">
        <Pressable 
          className="px-2 py-1 bg-white hover:bg-gray-100"
          onPress={() => updateQuantity(item.id, item.cantidad - 1)}
        >
          <Text className="text-gray-600 text-lg font-bold leading-5">-</Text>
        </Pressable>
        <Text className="px-2 text-gray-800 font-medium">{item.cantidad}</Text>
        <Pressable 
          className="px-2 py-1 bg-white hover:bg-gray-100"
          onPress={() => updateQuantity(item.id, item.cantidad + 1)}
        >
          <Text className="text-gray-600 text-lg font-bold leading-5">+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItemSidebar;
