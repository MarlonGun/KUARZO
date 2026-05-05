import AppHeader from '@/components/AppHeader';
import { useCartStore } from '@/src/store/useCartStore';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Image, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartWeb() {
    const { items: cartItems, updateQuantity, removeItem } = useCartStore();
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;

    const fmt = (price: number) => '$' + new Intl.NumberFormat('es-CO').format(price);

    // Inicializar todos seleccionados al entrar o cuando cambia el carrito
    const [selectedIds, setSelectedIds] = React.useState<Set<number | string>>(
        new Set<number | string>(cartItems.map((i) => i.id))
    );
    useEffect(() => {
        setSelectedIds(new Set<number | string>(cartItems.map((i) => i.id)));
    }, [cartItems.length]);

    const allSelected = cartItems.length > 0 && cartItems.every((i) => selectedIds.has(i.id));

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set<number | string>(cartItems.map((i) => i.id)));
        }
    };

    const toggleItem = (id: number | string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // Subtotal solo de los ítems seleccionados
    const selectedSubtotal = useMemo(() =>
        cartItems
            .filter((i) => selectedIds.has(i.id))
            .reduce((acc, i) => acc + i.precio * i.cantidad, 0),
        [cartItems, selectedIds]
    );
    const selectedCount = useMemo(() =>
        cartItems
            .filter((i) => selectedIds.has(i.id))
            .reduce((acc, i) => acc + i.cantidad, 0),
        [cartItems, selectedIds]
    );

    // Comprar: navegar a checkout
    const handleBuy = () => {
        router.push('/checkout');
    };

    const goToDetail = (item: any) => {
        router.push({
            pathname: "/detalleProd",
            params: {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                imagen: item.imagen,
                categoria: item.categoria || ""
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <AppHeader platform="web" />

                {/* Contenido Principal */}
                <View style={{ paddingHorizontal: isSmallScreen ? 20 : 80, paddingTop: 32, maxWidth: 1200, alignSelf: 'center', width: '100%' }}>

                    {/* Título */}
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 26, color: '#000', marginBottom: 24 }}>
                        Carrito de compra
                    </Text>

                    {/* Fila principal: lista + resumen */}
                    <View style={{ flexDirection: isSmallScreen ? 'column' : 'row', gap: 40 }}>

                        {/* ── Columna izquierda: Lista de productos ── */}
                        <View style={{ flex: 1 }}>
                            {/* Seleccionar todos */}
                            <Pressable
                                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                                onPress={toggleAll}
                            >
                                <MaterialIcons
                                    name={allSelected ? 'check-box' : 'check-box-outline-blank'}
                                    size={16}
                                    color={allSelected ? '#FFD700' : '#000'}
                                />
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#000', marginLeft: 10 }}>
                                    Seleccionar todos los productos
                                </Text>
                            </Pressable>
                            <View style={{ borderBottomWidth: 1, borderColor: '#d1d5db', marginBottom: 8 }} />

                            {/* Lista vacía */}
                            {cartItems.length === 0 ? (
                                <View style={{ paddingVertical: 60, alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, color: '#9ca3af' }}>
                                        Tu carrito está vacío
                                    </Text>
                                </View>
                            ) : (
                                cartItems.map((item) => (
                                    <View
                                        key={item.id}
                                        style={{
                                            flexDirection: isSmallScreen ? 'column' : 'row',
                                            alignItems: isSmallScreen ? 'flex-start' : 'center',
                                            paddingVertical: 20,
                                            borderBottomWidth: 1,
                                            borderColor: '#e5e7eb',
                                            gap: isSmallScreen ? 16 : 0
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                            {/* Checkbox */}
                                            <Pressable onPress={() => toggleItem(item.id)}>
                                                <MaterialIcons
                                                    name={selectedIds.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
                                                    size={16}
                                                    color={selectedIds.has(item.id) ? '#FFD700' : '#000'}
                                                />
                                            </Pressable>

                                            {/* Imagen */}
                                            <Pressable 
                                                onPress={() => goToDetail(item)}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderWidth: 1,
                                                    borderColor: '#9ca3af',
                                                    marginLeft: 16,
                                                    backgroundColor: '#fff',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 6,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.imagen }}
                                                    style={{ width: '100%', height: '100%' }}
                                                    resizeMode="contain"
                                                />
                                            </Pressable>

                                            {/* Nombre + selector de cantidad (Desktop) */}
                                            {!isSmallScreen && (
                                                <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                                    <Pressable onPress={() => goToDetail(item)}>
                                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000', marginBottom: 14, cursor: 'pointer' }}>
                                                            {item.nombre}
                                                        </Text>
                                                    </Pressable>

                                                    {/* Selector [ - 1 + ] */}
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#6b7280', alignSelf: 'flex-start' }}>
                                                        <Pressable
                                                            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                                                            onPress={() => updateQuantity(item.id, Math.max(0, item.cantidad - 1))}
                                                        >
                                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: '#000' }}>-</Text>
                                                        </Pressable>
                                                        <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                                                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13, color: '#000' }}>{item.cantidad}</Text>
                                                        </View>
                                                        <Pressable
                                                            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                                                            onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                                                        >
                                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: '#000' }}>+</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            )}
                                        </View>

                                        {/* Mobile Info */}
                                        {isSmallScreen && (
                                            <View style={{ width: '100%' }}>
                                                <Pressable onPress={() => goToDetail(item)}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000', marginBottom: 12 }}>
                                                        {item.nombre}
                                                    </Text>
                                                </Pressable>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#6b7280' }}>
                                                        <Pressable
                                                            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                                                            onPress={() => updateQuantity(item.id, Math.max(0, item.cantidad - 1))}
                                                        >
                                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: '#000' }}>-</Text>
                                                        </Pressable>
                                                        <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                                                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13, color: '#000' }}>{item.cantidad}</Text>
                                                        </View>
                                                        <Pressable
                                                            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                                                            onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                                                        >
                                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: '#000' }}>+</Text>
                                                        </Pressable>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#000' }}>
                                                        {fmt(item.precio)}
                                                    </Text>
                                                </View>
                                                <Pressable style={{ marginTop: 12 }} onPress={() => removeItem(item.id)}>
                                                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ef4444' }}>Eliminar</Text>
                                                </Pressable>
                                            </View>
                                        )}

                                        {/* Desktop Price */}
                                        {!isSmallScreen && (
                                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginLeft: 16 }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 22, color: '#000' }}>
                                                    {fmt(item.precio)}
                                                </Text>
                                                <Pressable style={{ marginTop: 8 }} onPress={() => removeItem(item.id)}>
                                                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 12, color: '#ef4444' }}>Eliminar</Text>
                                                </Pressable>
                                            </View>
                                        )}
                                    </View>
                                ))
                            )}
                        </View>

                        {/* ── Columna derecha: Resumen ── */}
                        <View style={{ width: isSmallScreen ? '100%' : 220, marginBottom: 40 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000', marginBottom: 18 }}>
                                Resumen de compra
                            </Text>

                            {/* Lista de productos SELECCIONADOS en el resumen */}
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#000', marginBottom: 10 }}>
                                Productos ({selectedCount})
                            </Text>

                            {cartItems
                                .filter((item) => selectedIds.has(item.id))
                                .map((item) => (
                                    <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#6b7280', flex: 1 }} numberOfLines={1}>
                                            {item.nombre}
                                        </Text>
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#000', marginLeft: 8 }}>
                                            {fmt(item.precio * item.cantidad)}
                                        </Text>
                                    </View>
                                ))
                            }

                            {/* Total de seleccionados */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#e5e7eb', marginTop: 16, paddingTop: 14 }}>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>Total</Text>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#000' }}>
                                    {fmt(selectedSubtotal)}
                                </Text>
                            </View>

                            {/* Botón COMPRAR: solo compra los seleccionados */}
                            <Pressable
                                style={{
                                    backgroundColor: selectedIds.size > 0 ? '#FFD700' : '#e5e7eb',
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 16,
                                    borderRadius: 5,
                                }}
                                onPress={selectedIds.size > 0 ? handleBuy : undefined}
                            >
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13, color: selectedIds.size > 0 ? '#000' : '#9ca3af' }}>COMPRAR</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
