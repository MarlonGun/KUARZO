import { useCartStore } from '@/src/store/useCartStore';
import { MaterialIcons } from '@expo/vector-icons';
import BarrNaveg from '@/components/BarrNaveg';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetalleProdMovil = () => {
    const { addItem } = useCartStore();

    const params = useLocalSearchParams();
    const { id, nombre, descripcion, precio, imagen, categoria, stock, imagenes } = params;

    const productNombre = nombre ? String(nombre) : 'Pulsera volcanica';
    const productDescripcion = descripcion
        ? String(descripcion)
        : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.';
    const productPrecio = precio ? Number(precio) : 45000;
    const productStock = stock ? Number(stock) : 0;

    // Resolve image source (handle local require numbers and remote URIs)
    const mainImage = useMemo(() => {
        if (!imagen) return 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80';
        const num = Number(imagen);
        return isNaN(num) ? String(imagen) : num;
    }, [imagen]);

    const productCategoria = categoria ? String(categoria) : 'Pulsera';

    // Helper for image source
    const getImageSource = (img: any) => {
        if (!img) return { uri: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80' };
        if (typeof img === 'number') return img;
        const num = Number(img);
        if (!isNaN(num) && String(img).trim() !== "") return num;
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
            <ScrollView
                style={{ flex: 1, backgroundColor: '#fff' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Header con botón Volver */}
                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 16,
                    paddingBottom: 12,
                    backgroundColor: '#fff',
                }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}
                    >
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#111827' }}>
                            Volver
                        </Text>
                    </Pressable>
                </View>

                {/* Imagen principal */}
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                        borderRadius: 12,
                        backgroundColor: '#fff',
                        padding: 16,
                        overflow: 'hidden',
                    }}>
                        <Image
                            source={getImageSource(selectedImage)}
                            style={{ height: 300, width: '100%' }}
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
                                        borderColor: active ? '#FFD700' : '#e5e7eb',
                                        borderRadius: 8,
                                        padding: 6,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Image
                                        source={getImageSource(image)}
                                        style={{ height: 80, width: '100%' }}
                                        resizeMode="contain"
                                    />
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                {/* Info del producto */}
                <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
                    {/* Nombre */}
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 28,
                        color: '#111827',
                        lineHeight: 34,
                    }} numberOfLines={2}>
                        {productNombre}
                    </Text>

                    {/* Descripción */}
                    <Text style={{
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 14,
                        color: '#6b7280',
                        lineHeight: 22,
                        marginTop: 10,
                    }}>
                        {productDescripcion}
                    </Text>

                    {/* Precio + disponibles */}
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                        borderRadius: 8,
                        marginTop: 20,
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 26, color: '#FF9309' }}>
                                ${new Intl.NumberFormat("es-CO").format(productPrecio)}
                            </Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            borderLeftWidth: 1,
                            borderColor: '#e5e7eb',
                            paddingHorizontal: 16,
                        }}>
                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13, color: '#111827', lineHeight: 18 }}>
                                {productStock} und{'\n'}disponibles
                            </Text>
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={{ borderTopWidth: 1, borderColor: '#f3f4f6', marginTop: 20 }} />

                    {/* Categoría */}
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827' }}>Categoría:</Text>
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                            {productCategoria || 'General'}
                        </Text>
                    </View>

                    {/* Divider */}
                    <View style={{ borderTopWidth: 1, borderColor: '#f3f4f6', marginTop: 16 }} />

                    {/* Material */}
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827' }}>Material:</Text>
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                            Roca volcánica
                        </Text>
                    </View>

                    {/* Divider */}
                    <View style={{ borderTopWidth: 1, borderColor: '#f3f4f6', marginTop: 16 }} />

                    {/* Color */}
                        {localProductImages.length > 1 && (
                            <View style={{ marginTop: 16 }}>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>Variaciones disponibles:</Text>
                                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                                    {localProductImages.map((img, index) => {
                                        const active = img === selectedImage;
                                        return (
                                            <Pressable
                                                key={index}
                                                onPress={() => setSelectedImage(img)}
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderWidth: active ? 2 : 1,
                                                    borderColor: active ? '#FED20F' : '#9ca3af',
                                                    padding: 3,
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
                    <View style={{ marginTop: 24, marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827', marginBottom: 12 }}>
                            Cantidad
                        </Text>

                        {/* Selector de cantidad */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#e5e7eb',
                            borderRadius: 8,
                            alignSelf: 'flex-start',
                            overflow: 'hidden',
                        }}>
                            <Pressable
                                style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                                onPress={() => setQuantity((c) => Math.max(1, c - 1))}
                            >
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#111827' }}>−</Text>
                            </Pressable>
                            <View style={{
                                paddingHorizontal: 20,
                                justifyContent: 'center',
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderColor: '#e5e7eb',
                            }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 18, color: '#111827' }}>
                                    {quantity}
                                </Text>
                            </View>
                            <Pressable
                                style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                                onPress={() => setQuantity((c) => c + 1)}
                            >
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#111827' }}>+</Text>
                            </Pressable>
                        </View>

                        {/* Botón AGREGAR AL CARRITO */}
                        <Pressable
                            style={{
                                backgroundColor: '#FFD700',
                                paddingVertical: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                marginTop: 20,
                            }}
                            onPress={() => {
                                addItem({
                                    id: id ? String(id) : productNombre,
                                    nombre: productNombre,
                                    precio: productPrecio,
                                    imagen: selectedImage,
                                    cantidad: quantity,
                                });
                            }}
                        >
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#111827', letterSpacing: 1 }}>
                                AGREGAR AL CARRITO
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <BarrNaveg />
        </SafeAreaView>
    );
};

export default DetalleProdMovil;
