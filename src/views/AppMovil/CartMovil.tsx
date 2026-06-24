import { useCartStore } from '@/src/store/useCartStore';
import { MaterialIcons } from '@expo/vector-icons';
import BarrNaveg from '@/components/BarrNaveg';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, Image, Linking, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ⚠️ Cambiar esta URL a la URL de producción del sitio web cuando esté desplegado
const WEB_BASE_URL = 'http://localhost:8081';

export default function CartMovil() {
    const {
        items: cartItems,
        updateQuantity,
        removeItem,
        toggleSelectItem,
        toggleAllItems,
        getSelectedTotal,
    } = useCartStore();

    const fmt = (price: number) => '$' + new Intl.NumberFormat('es-CO').format(price);

    const allSelected = cartItems.length > 0 && cartItems.every((i) => i.selected !== false);

    const toggleAll = () => {
        toggleAllItems(!allSelected);
    };

    const toggleItem = (id: number | string) => {
        toggleSelectItem(id);
    };

    // Subtotal solo de los ítems seleccionados
    const selectedSubtotal = useMemo(
        () =>
            cartItems
                .filter((i) => i.selected !== false)
                .reduce((acc, i) => acc + i.precio * i.cantidad, 0),
        [cartItems]
    );

    const selectedCount = useMemo(
        () =>
            cartItems
                .filter((i) => i.selected !== false)
                .reduce((acc, i) => acc + i.cantidad, 0),
        [cartItems]
    );

    const selectedItems = cartItems.filter((i) => i.selected !== false);
    const hasSelected = selectedItems.length > 0;

    const goToDetail = (item: any) => {
        router.push({
            pathname: '/detalleProd',
            params: {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                imagen: item.imagen,
                categoria: item.categoria || '',
            },
        });
    };

    // Redirigir al checkout web en el navegador del teléfono
    const handlePagarPedido = () => {
        if (!hasSelected) return;

        if (Platform.OS === 'web') {
            router.push('/checkout');
        } else {
            Alert.alert(
                '🌐 Redirigir al sitio web',
                'Serás redirigido al sitio web para finalizar tu compra y completar los datos de envío y pago.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Continuar',
                        onPress: () => {
                            const cartPayload = selectedItems.map(item => ({
                                id: item.id,
                                nombre: item.nombre,
                                precio: item.precio,
                                cantidad: item.cantidad,
                                imagen: typeof item.imagen === 'string' ? item.imagen : null,
                            }));
                            const cartJson = encodeURIComponent(JSON.stringify(cartPayload));
                            Linking.openURL(`https://kuarzo.netlify.app/checkout?cart=${cartJson}`);
                        },
                    },
                ]
            );
        }
    };

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
                    paddingBottom: 8,
                }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', marginBottom: 16 }}
                    >
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#111827' }}>
                            Volver
                        </Text>
                    </Pressable>

                    {/* Título */}
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 26, color: '#111827', marginBottom: 20 }}>
                        Carrito de compra
                    </Text>

                    {/* Seleccionar todos */}
                    <Pressable
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                        onPress={toggleAll}
                    >
                        <MaterialIcons
                            name={allSelected ? 'check-box' : 'check-box-outline-blank'}
                            size={22}
                            color={allSelected ? '#FFD700' : '#9ca3af'}
                        />
                        <Text style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 14,
                            color: '#111827',
                            marginLeft: 10,
                        }}>
                            Seleccionar todos los productos
                        </Text>
                    </Pressable>
                    <View style={{ borderBottomWidth: 1, borderColor: '#e5e7eb', marginBottom: 4 }} />
                </View>

                {/* Lista de productos */}
                <View style={{ paddingHorizontal: 20 }}>
                    {cartItems.length === 0 ? (
                        <View style={{
                            paddingVertical: 60,
                            alignItems: 'center',
                        }}>
                            <MaterialIcons name="shopping-cart" size={64} color="#e5e7eb" />
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 18,
                                color: '#9ca3af',
                                marginTop: 16,
                            }}>
                                Tu carrito está vacío
                            </Text>
                            <Pressable
                                onPress={() => router.push('/catalogo')}
                                style={{
                                    marginTop: 20,
                                    backgroundColor: '#FFD700',
                                    paddingHorizontal: 24,
                                    paddingVertical: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#111827' }}>
                                    IR AL CATÁLOGO
                                </Text>
                            </Pressable>
                        </View>
                    ) : (
                        cartItems.map((item) => (
                            <View
                                key={item.id}
                                style={{
                                    paddingVertical: 16,
                                    borderBottomWidth: 1,
                                    borderColor: '#f3f4f6',
                                }}
                            >
                                {/* Fila superior: checkbox + imagen + info */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* Checkbox */}
                                    <Pressable onPress={() => toggleItem(item.id)} style={{ marginRight: 12 }}>
                                        <MaterialIcons
                                            name={item.selected !== false ? 'check-box' : 'check-box-outline-blank'}
                                            size={22}
                                            color={item.selected !== false ? '#FFD700' : '#9ca3af'}
                                        />
                                    </Pressable>

                                    {/* Imagen */}
                                    <Pressable
                                        onPress={() => goToDetail(item)}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderWidth: 1,
                                            borderColor: '#e5e7eb',
                                            borderRadius: 10,
                                            backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 6,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Image
                                            source={typeof item.imagen === 'string' ? { uri: item.imagen } : item.imagen}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="contain"
                                        />
                                    </Pressable>

                                    {/* Precio alineado a la derecha */}
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#111827' }}>
                                            {fmt(item.precio)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Nombre del producto */}
                                <Pressable onPress={() => goToDetail(item)} style={{ marginTop: 12 }}>
                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827' }}>
                                        {item.nombre}
                                    </Text>
                                </Pressable>

                                {/* Fila inferior: cantidad + eliminar */}
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 12,
                                }}>
                                    {/* Selector de cantidad */}
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: '#e5e7eb',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                    }}>
                                        <Pressable
                                            style={{ paddingHorizontal: 14, paddingVertical: 8 }}
                                            onPress={() => updateQuantity(item.id, Math.max(0, item.cantidad - 1))}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827' }}>−</Text>
                                        </Pressable>
                                        <View style={{
                                            paddingHorizontal: 16,
                                            justifyContent: 'center',
                                            borderLeftWidth: 1,
                                            borderRightWidth: 1,
                                            borderColor: '#e5e7eb',
                                        }}>
                                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 15, color: '#111827' }}>
                                                {item.cantidad}
                                            </Text>
                                        </View>
                                        <Pressable
                                            style={{ paddingHorizontal: 14, paddingVertical: 8 }}
                                            onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827' }}>+</Text>
                                        </Pressable>
                                    </View>

                                    {/* Eliminar */}
                                    <Pressable
                                        onPress={() => removeItem(item.id)}
                                        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                                    >
                                        <MaterialIcons name="delete-outline" size={18} color="#ef4444" />
                                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 13, color: '#ef4444' }}>
                                            Eliminar
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {/* Resumen de compra */}
                {cartItems.length > 0 && (
                    <View style={{
                        marginHorizontal: 20,
                        marginTop: 24,
                        backgroundColor: '#fafbfc',
                        borderRadius: 16,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#f3f4f6',
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 18,
                            color: '#111827',
                            marginBottom: 16,
                        }}>
                            Resumen de compra
                        </Text>

                        {/* Lista de productos seleccionados */}
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15,
                            color: '#111827',
                            marginBottom: 10,
                        }}>
                            Productos ({selectedCount})
                        </Text>

                        {selectedItems.map((item) => (
                            <View key={item.id} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 6,
                            }}>
                                <Text style={{
                                    fontFamily: 'OpenSans-Regular',
                                    fontSize: 14,
                                    color: '#6b7280',
                                    flex: 1,
                                }} numberOfLines={1}>
                                    {item.nombre} x{item.cantidad}
                                </Text>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: 14,
                                    color: '#111827',
                                    marginLeft: 8,
                                }}>
                                    {fmt(item.precio * item.cantidad)}
                                </Text>
                            </View>
                        ))}

                        {/* Total */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTopWidth: 1,
                            borderColor: '#e5e7eb',
                            marginTop: 16,
                            paddingTop: 14,
                        }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#111827' }}>
                                Total
                            </Text>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#FF9309' }}>
                                {fmt(selectedSubtotal)}
                            </Text>
                        </View>

                        {/* Botón PAGAR PEDIDO */}
                        <Pressable
                            style={{
                                backgroundColor: hasSelected ? '#FFD700' : '#e5e7eb',
                                paddingVertical: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                borderRadius: 10,
                                flexDirection: 'row',
                                gap: 8,
                            }}
                            onPress={handlePagarPedido}
                            disabled={!hasSelected}
                        >
                            <MaterialIcons
                                name="open-in-new"
                                size={18}
                                color={hasSelected ? '#111827' : '#9ca3af'}
                            />
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: hasSelected ? '#111827' : '#9ca3af',
                                letterSpacing: 1,
                            }}>
                                PAGAR PEDIDO
                            </Text>
                        </Pressable>

                        {hasSelected && (
                            <Text style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 11,
                                color: '#9ca3af',
                                textAlign: 'center',
                                marginTop: 8,
                            }}>
                                Se abrirá el sitio web para finalizar la compra
                            </Text>
                        )}
                    </View>
                )}
            </ScrollView>
            <BarrNaveg />
        </SafeAreaView>
    );
}
