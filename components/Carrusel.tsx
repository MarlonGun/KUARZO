import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, View, ViewStyle, useWindowDimensions } from 'react-native';

export type CarruselProps<T> = {
    data: T[];
    renderItem: (item: T) => React.ReactElement;
    showDots?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
};

export default function Carrusel<T>({ 
    data = [], 
    renderItem, 
    showDots = true,
    containerStyle,
}: CarruselProps<T>) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);
    const { width: screenWidth } = useWindowDimensions();

    const maxIndex = Math.max(0, data.length - 1);
    const autoPlayInterval = 3500;

    // Reproducción automática
    useEffect(() => {
        if (data.length === 0) return;
        
        const intervalId = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = prev + 1 > maxIndex ? 0 : prev + 1;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, autoPlayInterval);

        return () => clearInterval(intervalId);
    }, [maxIndex, data.length]);

    // Actualizar el índice mientras el usuario hace scroll manualmente
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(x / screenWidth);
        setActiveIndex(newIndex);
    }, [screenWidth]);

    const renderFlatListItem = useCallback(({ item }: { item: T }) => {
        return (
            <View style={{ width: screenWidth }}>
                {renderItem(item)}
            </View>
        );
    }, [renderItem, screenWidth]);

    return (
        <View style={[{ width: '100%' }, containerStyle]}>
            <View className="w-full relative">
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderFlatListItem}
                    keyExtractor={(_item: T, index: number) => `carrusel-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    getItemLayout={(_data: any, index: number) => ({
                        length: screenWidth,
                        offset: screenWidth * index,
                        index,
                    })}
                />
            </View>

            {/* Paginador (Puntitos) */}
            {showDots && data.length > 1 ? (
                <View className="px-4 mt-3 flex-row items-center justify-center gap-2">
                    {data.map((_, idx) => (
                        <View
                            key={`dot-${idx}`}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-yellow-500' : 'w-2 bg-gray-300'}`}
                        />
                    ))}
                </View>
            ) : null}
        </View>
    );
}
