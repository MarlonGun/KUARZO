import AppHeader from '@/components/AppHeader';
import { useCartStore } from '@/src/store/useCartStore';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
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

const DetalleProdWeb = () => {
    const { addItem } = useCartStore();
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;

    const params = useLocalSearchParams();
    const { id, nombre, descripcion, precio, imagen, categoria, stock, imagenes } = params;

    const productNombre = nombre ? String(nombre) : 'Pulsera volcanica';
    const productDescripcion = descripcion
        ? String(descripcion)
        : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.';
    const productPrecio = precio ? Number(precio) : 45000;
    const productStock = stock ? Number(stock) : 0;
    // Resolve image source (handle local require numbers and remote URIs)
    const mainImage = useMemo(() => {
        if (!imagen) return 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80';
        const num = Number(imagen);
        return isNaN(num) ? String(imagen) : num;
    }, [imagen]);

    const productCategoria = categoria ? String(categoria) : 'Pulsera';

    // Helper for image source - More robust for Web/Expo
    const getImageSource = (img: any) => {
        if (!img) return { uri: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80' };
        
        // If it's a number (resource ID), return it as is
        if (typeof img === 'number') return img;
        
        // If it's a string that represents a number (Expo resource ID from params)
        const num = Number(img);
        if (!isNaN(num) && String(img).trim() !== "") return num;
        
        // Otherwise treat as a URI string
        return { uri: String(img) };
    };

    const localProductImages = useMemo(() => {
        let imgs = [mainImage];
        if (imagenes && typeof imagenes === 'string') {
            try {
                const parsed = JSON.parse(imagenes);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    imgs = parsed.map((img: any) => img.urlImagen || img.imagenUrl || String(img));
                }
            } catch (e) {
                // Ignore parse errors
            }
        }
        return imgs;
    }, [mainImage, imagenes]);

    const [selectedImage, setSelectedImage] = useState(localProductImages[0]);
    useEffect(() => {
        setSelectedImage(localProductImages[0]);
    }, [localProductImages]);


    const [quantity, setQuantity] = useState(1);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <AppHeader platform="web" />

                <View className="px-5 pt-6 bg-white w-full">
                    <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">
                            Volver
                        </Text>
                    </Pressable>
                </View>

                {/* Contenedor principal: row centrado */}
                <View style={{
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    maxWidth: 1200,
                    width: '100%',
                    alignSelf: 'center',
                    paddingHorizontal: isSmallScreen ? 20 : 64,
                    paddingVertical: isSmallScreen ? 20 : 40,
                }}>

                    {/* ── Columna izquierda: galería ── */}
                    <View style={{ width: isSmallScreen ? '100%' : 420 }}>
                        {/* Imagen principal */}
                        <View style={{ borderWidth: 1, borderColor: '#9ca3af', backgroundColor: '#fff', padding: 16 }}>
                                <Image
                                    source={getImageSource(selectedImage)}
                                    style={{ height: 320, width: '100%' }}
                                    resizeMode="contain"
                                />
                            </View>

                        {/* Miniaturas */}
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                            {localProductImages.map((image, index) => {
                                const active = image === selectedImage;
                                return (
                                    <Pressable
                                        key={`${image}-${index}`}
                                        onPress={() => setSelectedImage(image)}
                                        style={{
                                            flex: 1,
                                            borderWidth: active ? 2 : 1,
                                            borderColor: active ? '#FED20F' : '#9ca3af',
                                            padding: 6,
                                        }}
                                    >
                                        <Image
                                            source={getImageSource(image)}
                                            style={{ height: 90, width: '100%' }}
                                            resizeMode="contain"
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* ── Columna derecha: info del producto ── */}
                    <View style={{ flex: 1, paddingLeft: isSmallScreen ? 0 : 56, marginTop: isSmallScreen ? 32 : 0 }}>
                        {/* Nombre */}
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 30, color: '#000', lineHeight: 36 }} numberOfLines={2}>
                            {productNombre}
                        </Text>

                        {/* Descripción */}
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#6b7280', lineHeight: 18, marginTop: 12 }}>
                            {productDescripcion}
                        </Text>

                        {/* Precio + disponibles */}
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#9ca3af', marginTop: 20 }}>
                            <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 12, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 28, color: '#FF9309' }}>
                                    ${new Intl.NumberFormat("es-CO").format(productPrecio)}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'center', borderLeftWidth: 1, borderColor: '#9ca3af', paddingHorizontal: 16 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#000', lineHeight: 18 }}>
                                    {productStock} und{'\n'}disponibles
                                </Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ borderTopWidth: 1, borderColor: '#e5e7eb', marginTop: 20 }} />

                        {/* Categoría */}
                        <View style={{ marginTop: 16 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>Categoria:</Text>
                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#000', marginTop: 4 }}>
                                {productCategoria || 'General'}
                            </Text>
                        </View>

                        {/* Divider */}
                        <View style={{ borderTopWidth: 1, borderColor: '#e5e7eb', marginTop: 16 }} />

                        {/* Material */}
                        <View style={{ marginTop: 16 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>Material:</Text>
                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#000', marginTop: 4 }}>
                                Roca volcanica
                            </Text>
                        </View>

                        {/* Divider */}
                        <View style={{ borderTopWidth: 1, borderColor: '#e5e7eb', marginTop: 16 }} />

                        {/* Galería adicional o variaciones (opcional) */}
                        {localProductImages.length > 1 && (
                            <View style={{ marginTop: 16 }}>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>Variaciones disponibles:</Text>
                                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                                    {localProductImages.map((img, index) => {
                                        const active = img === selectedImage;
                                        return (
                                            <Pressable
                                                key={index}
                                                onPress={() => {
                                                    setSelectedImage(img);
                                                }}
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderWidth: active ? 2 : 1,
                                                    borderColor: active ? '#FED20F' : '#9ca3af',
                                                    backgroundColor: '#fff',
                                                    padding: 3,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Image
                                                    source={getImageSource(img)}
                                                    style={{ height: '100%', width: '100%' }}
                                                    resizeMode="contain"
                                                />
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                        )}

                        {/* Cantidad + Botón */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000', marginBottom: 12 }}>Cantidad</Text>
                                {/* Cantidad + Botón */}
                                <View style={{ 
                                    flexDirection: isSmallScreen ? 'column' : 'row', 
                                    alignItems: isSmallScreen ? 'flex-start' : 'center', 
                                    gap: 16 
                                }}>
                                    {/* Selector de cantidad */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#6b7280' }}>
                                        <Pressable
                                            style={{ paddingHorizontal: 14, paddingVertical: 10 }}
                                            onPress={() => setQuantity((c) => Math.max(1, c - 1))}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#000' }}>-</Text>
                                        </Pressable>
                                        <View style={{ paddingHorizontal: 16, justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: '#000' }}>{quantity}</Text>
                                        </View>
                                        <Pressable
                                            style={{ paddingHorizontal: 14, paddingVertical: 10 }}
                                            onPress={() => setQuantity((c) => c + 1)}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#000' }}>+</Text>
                                        </Pressable>
                                    </View>

                                    {/* Botón AGREGAR AL CARRITO */}
                                    <Pressable
                                        style={{
                                            backgroundColor: '#FFD700',
                                            paddingHorizontal: 32,
                                            paddingVertical: 12,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 5,
                                            width: isSmallScreen ? '100%' : 'auto'
                                        }}
                                        onPress={() => {
                                            addItem({
                                                id: String(id),
                                                nombre: productNombre,
                                                precio: productPrecio,
                                                imagen: selectedImage,
                                                cantidad: quantity
                                            });
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: '#000' }}>AGREGAR AL CARRITO</Text>
                                    </Pressable>
                                </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetalleProdWeb;
