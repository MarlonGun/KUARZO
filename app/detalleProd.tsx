import CustomButton from '@/components/CustomButton';
import BarrNaveg from '@/components/BarrNaveg';
import BarraBusquedaMovil from '@/components/BarraBusquedaMovil';
import Header from '@/components/header';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

// Categorias mostradas en la barra horizontal debajo del header.
const categories = ['Cadenas y Collares', 'Aretes y Pendientes', 'Anillos', 'Pulseras', 'Broches', 'Accesorios'];

const DetalleProdLayout = () => {
    // Lee el ancho disponible para cambiar la distribucion entre modo escritorio y compacto.
    const { width } = useWindowDimensions();
    const isCompact = width < 1100;
    const esMobile = width < 768;
    const { addItem } = useCart();

    const params = useLocalSearchParams();
    const { id, nombre, descripcion, precio, imagen, categoria } = params;

    const productNombre = nombre ? String(nombre) : 'Pulsera volcanica';
    const productDescripcion = descripcion ? String(descripcion) : 'Pulseras realizadas en piedra volcanica natural, ideales para favorecer el equilibrio emocional.';
    const productPrecio = precio ? Number(precio) : 45000;
    const mainImage = imagen ? String(imagen) : 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80';
    const productCategoria = categoria ? String(categoria) : 'Pulsera';

    const localProductImages = useMemo(() => [
        mainImage,
        'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    ], [mainImage]);

    const localColorOptions = useMemo(() => [
        { id: 'gold', label: 'Dorado', image: localProductImages[0] },
        { id: 'black', label: 'Negro', image: localProductImages[1] },
        { id: 'mix', label: 'Mixto', image: localProductImages[2] },
    ], [localProductImages]);

    // Guarda la imagen actualmente seleccionada en la galeria.
    const [selectedImage, setSelectedImage] = useState(localProductImages[0]);

    // Sincroniza imagen seleccionada si cambian los parametros
    useEffect(() => {
        setSelectedImage(localProductImages[0]);
    }, [localProductImages]);

    // Guarda el color activo para resaltar la miniatura correspondiente.
    const [selectedColor, setSelectedColor] = useState(localColorOptions[0].id);

    // Guarda la cantidad de unidades elegidas por el usuario.
    const [quantity, setQuantity] = useState(1);

    // Genera las clases del contenedor principal segun el tamano de pantalla.
    const detailContainerClass = useMemo(
        () =>
            isCompact
                ? 'w-full flex-col gap-10 px-5 py-8'
                : 'w-full max-w-6xl flex-row gap-14 px-8 py-14',
        [isCompact]
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false} contentContainerStyle={esMobile ? { paddingBottom: 110 } : undefined}>
                {esMobile ? (
                    <View style={{ backgroundColor: '#FED20F' }}>
                        <BarraBusquedaMovil />
                    </View>
                ) : (
                    <Header />
                )}

                <View className="px-8 pt-6 bg-white w-full max-w-6xl mx-auto">
                    <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">
                            Volver
                        </Text>
                    </Pressable>
                </View>

                {/* Contenedor general del detalle del producto. */}
                <View className="items-center">
                    <View className={detailContainerClass}>
                        {/* Columna izquierda: imagen principal y galeria de miniaturas. */}
                        <View className={isCompact ? 'w-full' : 'max-w-[470px] flex-1'}>
                            <View className="border border-[#9ca3af] bg-transparent p-4">
                                <Image
                                    source={{ uri: selectedImage }}
                                    className="h-[320px] w-full"
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Miniaturas que permiten cambiar la imagen principal del producto. */}
                            <View className="mt-2 flex-row gap-2">
                                {localProductImages.map((image, index) => {
                                    const active = image === selectedImage;
                                    return (
                                        <Pressable
                                            key={`${image}-${index}`}
                                            onPress={() => setSelectedImage(image)}
                                            className={`flex-1 border p-2 ${active ? 'border-secondary' : 'border-[#9ca3af]'}`}
                                        >
                                            {/* Muestra una version reducida de cada imagen disponible. */}
                                            <Image
                                                source={{ uri: image }}
                                                className="h-24 w-full"
                                                resizeMode="contain"
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Columna derecha: datos del producto y acciones de compra. */}
                        <View className={isCompact ? 'w-full' : 'max-w-[520px] flex-1'}>
                            {/* Titulo del producto. */}
                            <Text className="font-roboto-bold text-4xl text-tertiary" numberOfLines={2}>
                                {productNombre}
                            </Text>

                            {/* Descripcion del producto. */}
                            <Text className="mt-3 max-w-[500px] font-opensans-light text-sm leading-6 text-[#000000]">
                                {productDescripcion}
                            </Text>

                            {/* Bloque que muestra el precio y el inventario disponible. */}
                            <View className="mt-6 flex-row items-stretch border border-[#9ca3af] self-start">
                                <View className="justify-center px-5 py-4">
                                    <Text className="font-roboto-bold text-5xl text-secondary">${new Intl.NumberFormat("es-CO").format(productPrecio)}</Text>
                                </View>
                                <View className="justify-center border-l border-[#9ca3af] px-4">
                                    <Text className="font-opensans-regular text-sm leading-5 text-[#000000]">
                                        20 und{'\n'}disponibles
                                    </Text>
                                </View>
                            </View>

                            {/* Seccion informativa de categoria. */}
                            <View className="mt-8 border-t border-[#9ca3af] pt-5">
                                <Text className="font-roboto-medium text-xl text-tertiary">Categoria:</Text>
                                <Text className="mt-1 font-opensans-regular text-base text-[#000000]">{productCategoria || 'General'}</Text>
                            </View>

                            {/* Seccion informativa de material. */}
                            <View className="mt-7 border-t border-[#9ca3af] pt-5">
                                <Text className="font-roboto-medium text-xl text-tertiary">Material:</Text>
                                <Text className="mt-1 font-opensans-regular text-base text-[#000000]">
                                    Roca volcanica
                                </Text>
                            </View>

                            {/* Selector de color basado en miniaturas; tambien cambia la imagen principal. */}
                            <View className="mt-7 border-t border-[#9ca3af] pt-5">
                                <Text className="font-roboto-medium text-xl text-tertiary">Color:</Text>
                                <View className="mt-3 flex-row gap-2">
                                    {localColorOptions.map((option) => {
                                        const active = option.id === selectedColor;
                                        return (
                                            <Pressable
                                                key={option.id}
                                                onPress={() => {
                                                    // Sincroniza el color activo con la imagen mostrada.
                                                    setSelectedColor(option.id);
                                                    setSelectedImage(option.image);
                                                }}
                                                className={`h-16 w-16 items-center justify-center border bg-white p-1 ${active ? 'border-secondary' : 'border-[#9ca3af]'
                                                    }`}
                                            >
                                                <Image
                                                    source={{ uri: option.image }}
                                                    className="h-full w-full"
                                                    resizeMode="contain"
                                                />
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Controles de cantidad y boton principal de agregar al carrito. */}
                            <View className="mt-7">
                                <Text className="font-roboto-medium text-xl text-tertiary">Cantidad</Text>
                                <View className={`mt-3 ${isCompact ? 'flex-col gap-4' : 'flex-row items-center gap-4'}`}>
                                    <View className="flex-row self-start border border-[#9ca3af]">
                                        <Pressable
                                            className="px-4 py-3"
                                            // Resta una unidad, pero nunca permite bajar de 1.
                                            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
                                        >
                                            <Text className="font-roboto-medium text-xl text-[#000000]">-</Text>
                                        </Pressable>
                                        <View className="justify-center px-3">
                                            <Text className="font-opensans-regular text-lg text-[#000000]">
                                                {quantity}
                                            </Text>
                                        </View>
                                        <Pressable
                                            className="px-4 py-3"
                                            // Suma una unidad cada vez que el usuario presiona "+".
                                            onPress={() => setQuantity((current) => current + 1)}
                                        >
                                            <Text className="font-roboto-medium text-xl text-[#000000]">+</Text>
                                        </Pressable>
                                    </View>

                                    {/* Boton reutilizable del proyecto para la accion principal de compra. */}
                                    <CustomButton
                                        color="primary"
                                        className="min-w-[220px] rounded-md px-6 py-4 font-roboto-bold text-base"
                                        onPress={() => {
                                            for (let i = 0; i < quantity; i++) {
                                                addItem({
                                                    id: id ? String(id) : productNombre,
                                                    nombre: productNombre,
                                                    precio: productPrecio,
                                                    imagen: selectedImage
                                                });
                                            }
                                        }}
                                    >
                                        AGREGAR AL CARRITO
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {esMobile ? <BarrNaveg /> : null}
        </SafeAreaView>
    );
};

export default DetalleProdLayout;
