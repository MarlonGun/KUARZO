import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView, Text, TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useCart } from '../context/CartContext';

export type ProductData = {
  id?: string | number;
  cod?: string;
  imagen: string;
  nombre: string;
  descripcion?: string;
  precio: string | number;
  [key: string]: any;
};

export interface CarruselProps {
  type?: 'products' | 'images';
  loading?: boolean;
  platform?: 'movil' | 'web';

  // Para configuración de productos (artesanías)
  products?: ProductData[];
  onProductPress?: (item: ProductData) => void;

  // Para configuración de imágenes (banners)
  images?: string[];
  onImagePress?: (url: string) => void;
  showDots?: boolean;
  autoPlay?: boolean;
}

export default function Carrusel({
  type = 'products',
  loading = false,
  platform = 'web',
  products = [],
  onProductPress,

  images = [],
  onImagePress,
  showDots = true,
  autoPlay = true
}: CarruselProps) {

  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayInterval = 3500;
  const { addItem } = useCart();

  // Autoplay para el modo slide de imágenes (Banners promocionales)
  useEffect(() => {
    if (type !== 'images' || !autoPlay || images.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev + 1 >= images.length ? 0 : prev + 1;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => clearInterval(intervalId);
  }, [type, autoPlay, images.length]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / screenWidth);
    setActiveIndex(newIndex);
  }, [screenWidth]);

  if (loading) {
    return (
      <View className="pb-8">
        <View className="py-10 justify-center items-center">
          <ActivityIndicator size="large" color='#FED20F' />
          <Text className="mt-4 text-gray-400 font-roboto-medium">Cargando...</Text>
        </View>
      </View>
    );
  }

  // ==== MODO IMAGENES (BANNERS) ====
  if (type === 'images') {
    if (images.length === 0) {
      return (
        <View className="px-5 py-6">
          <Text className="text-gray-500 font-roboto-medium">No hay imágenes destacadas.</Text>
        </View>
      );
    }

    return (
      <View className="w-full relative pb-8">
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item, index) => `img-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(_data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onImagePress && onImagePress(item)}
              style={{ width: screenWidth }}
            >
              <Image
                source={{ uri: item }}
                className="w-full h-[500px] bg-gray-200"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
        {/* Paginador */}
        {showDots && images.length > 1 && (
          <View className="px-4 mt-3 flex-row items-center justify-center gap-2">
            {images.map((_, idx) => (
              <View
                key={`dot-${idx}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-[#FED20F]' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </View>
        )}
      </View>
    );
  }

  // ==== MODO PRODUCTOS (ARTESANÍAS) ====
  if (products.length === 0) {
    return (
      <View className="px-5 py-6 pb-8">
        <Text className="text-gray-500 font-roboto-medium">No hay productos disponibles por el momento.</Text>
      </View>
    );
  }

  return (
    <View className="pb-8">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        snapToInterval={280 + 16} // ancho de tarjeta (280) + margen derecho (16)
        decelerationRate="fast"
      >
        {products.map((item) => (
          <TouchableOpacity
            key={item.id || item.cod || Math.random().toString()}
            activeOpacity={0.9}
            onPress={() => onProductPress && onProductPress(item)}
            className="bg-white mr-4"
            style={{ width: 280, elevation: 3 }}
          >
            <View className="overflow-hidden flex-1 bg-transparent">
              <Image
                source={{ uri: item.imagen }}
                className="w-full h-44 bg-gray-100"
                resizeMode="cover"
              />
              <View className="p-4 flex-1">
                <Text className="text-lg font-bold text-quaternary-950 mb-1 text-center" numberOfLines={1}>
                  {item.nombre}
                </Text>
                {item.descripcion ? (
                  <Text className="text-sm text-quaternary-950 mb-2 leading-tight text-center" numberOfLines={2}>
                    {item.descripcion}
                  </Text>
                ) : null}
              </View>

              <View className="flex-row">
                <TouchableOpacity
                  className="bg-[#FED20F] px-3 py-3 flex-1 justify-center items-center rounded-md"
                  onPress={() => addItem({
                    id: String(item.id || item.cod || item.nombre),
                    nombre: item.nombre,
                    precio: Number(item.precio) || 0,
                    imagen: item.imagen
                  })}
                >
                  <Text className="text-xl font-roboto-bold text-quaternary-950 ">Comprar</Text>
                </TouchableOpacity>
                <View className="bg-transparent px-3 py-3 flex-1 justify-center items-center">
                  <Text className="text-quaternary-950 font-roboto-bold text-xl">
                    {'$' + new Intl.NumberFormat("es-CO").format(Number(item.precio) || 0)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
