import React, { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { CardProduct } from './CardProduct';

type CarruselProps = {
  title?: string;
  products?: any[];
  // Para variantes, define cuántas tarjetas se muestran en vista desktop
  itemsPerPage?: number;
};

const BASE_SPACING = 10;

const Carrusel: React.FC<CarruselProps> = ({ title = 'RECOMENDACIONES', products = [], itemsPerPage }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = React.useRef<number>(0);
  const { width: screenWidth } = useWindowDimensions();

  // Variante: si se pasa itemsPerPage como prop, usa eso (ej: 2 para pantalla grande con flechas)
  const defaultVisibleCards = screenWidth >= 1200 ? 4 : screenWidth >= 900 ? 3 : screenWidth >= 640 ? 2 : 1;
  const visibleCards = itemsPerPage ?? defaultVisibleCards;
  const CARD_SPACING = 12;
  const horizontalPadding = 16;
  
  // Calcular el ancho de cada producto basado en el espacio disponible
  // Dividir el ancho disponible entre los productos a mostrar
  const CARD_WIDTH = Math.floor((screenWidth - horizontalPadding * 2 - CARD_SPACING * Math.max(0, visibleCards - 1)) / visibleCards);

  // Duplicar productos para carrusel infinito
  const duplicatedProducts = [...products, ...products];

  const normalizeIndex = (index: number) => {
    if (products.length === 0) return 0;
    const wrap = ((index % products.length) + products.length) % products.length;
    return wrap;
  };

  const scrollToIndex = (index: number) => {
    if (products.length === 0) return;
    const nextIndex = normalizeIndex(index);
    currentIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const rawIndex = Math.round(x / (CARD_WIDTH + CARD_SPACING));

    // Si estamos en la segunda copia, saltar a la primera sin animación
    if (rawIndex >= products.length) {
      flatListRef.current?.scrollToIndex({ index: rawIndex - products.length, animated: false });
      currentIndexRef.current = rawIndex - products.length;
      setActiveIndex(rawIndex - products.length);
    } else {
      currentIndexRef.current = rawIndex;
      setActiveIndex(rawIndex);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View
      style={{
        marginRight: index !== duplicatedProducts.length - 1 ? CARD_SPACING : 0,
        alignSelf: 'center',
      }}
    >
      <CardProduct producto={item} width={CARD_WIDTH} />
    </View>
  );

  return (
    <View className="w-full">
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </Text>
      <View className="relative w-full py-4">
        <FlatList
          ref={flatListRef}
          data={duplicatedProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: horizontalPadding, alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          snapToAlignment="center"
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_SPACING,
            offset: (CARD_WIDTH + CARD_SPACING) * index,
            index,
          })}
        />

        <TouchableOpacity
          onPress={() => scrollToIndex(currentIndexRef.current - 1)}
          style={{
            position: 'absolute',
            top: '40%',
            left: 16,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3,
            zIndex: 10,
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 20 }}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => scrollToIndex(currentIndexRef.current + 1)}
          style={{
            position: 'absolute',
            top: '40%',
            right: 16,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3,
            zIndex: 10,
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 20 }}>›</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-4 flex-row items-center justify-center gap-2">
        {products.map((_, idx) => (
          <View
            key={`dot-${idx}`}
            className={`h-2 rounded-full ${idx === activeIndex ? 'w-6 bg-yellow-500' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </View>
    </View>
  );
};

export default Carrusel;
