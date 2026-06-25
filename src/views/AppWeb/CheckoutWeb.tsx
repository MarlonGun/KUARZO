import AppHeader from "@/components/AppHeader";
import CustomButton from "@/components/CustomButton";
import api from "@/src/services/api";
import { useCartStore } from "@/src/store/useCartStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutWeb = () => {
    const { items: cartItems, clearSelectedItems } = useCartStore();
    const { status, cart } = useLocalSearchParams<{ status?: string, cart?: string }>();

    const selectedItems = React.useMemo(() => {
        let urlCart = cart;

        // Fallback robusto para Web: leer exactamente la cadena de búsqueda cruda
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const rawCart = urlParams.get('cart');
            if (rawCart) urlCart = rawCart;
        }

        if (urlCart) {
            try {
                const cartStr = Array.isArray(urlCart) ? urlCart[0] : urlCart;
                
                let decoded = cartStr;
                // Si la cadena aún tiene caracteres codificados como %5B, los decodificamos
                if (decoded.includes('%5B') || decoded.includes('%7B')) {
                    decoded = decodeURIComponent(decoded);
                }
                
                const parsed = JSON.parse(decoded);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed.map(item => ({
                        ...item,
                        precio: Number(item.precio),
                        cantidad: Number(item.cantidad)
                    }));
                }
            } catch (e) {
                console.error("Error parsing cart from URL:", e);
            }
        }
        return cartItems.filter(item => item.selected !== false);
    }, [cart, cartItems]);

    const subtotal = React.useMemo(() => {
        return selectedItems.reduce((acc: number, item: any) => acc + (item.precio * item.cantidad), 0);
    }, [selectedItems]);
    const [metodoPago, setMetodoPago] = useState("Tarjeta");
    const [isProcessing, setIsProcessing] = useState(false);

    // Obtener parámetros de redirección de Mercado Pago

    useEffect(() => {
        if (status === 'success' || status === 'approved') {
            Alert.alert(
                "¡Pago Exitoso!",
                "Tu pedido ha sido creado y pagado correctamente. ¡Muchas gracias por tu compra!",
                [
                    {
                        text: "Ir al inicio",
                        onPress: () => {
                            clearSelectedItems();
                            router.replace('/');
                        }
                    }
                ]
            );
        } else if (status === 'failure') {
            Alert.alert(
                "Pago Fallido",
                "Hubo un problema al procesar el pago. Por favor intenta nuevamente."
            );
        } else if (status === 'pending') {
            Alert.alert(
                "Pago Pendiente",
                "Tu pago está en estado pendiente. Te notificaremos cuando se apruebe.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            clearSelectedItems();
                            router.replace('/');
                        }
                    }
                ]
            );
        }
    }, [status]);

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        documento: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        departamento: "",
        notas: "",
    });

    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 900;
    const horizontalPadding = windowWidth > 1200 ? 80 : windowWidth > 600 ? 40 : 20;

    const formatearPrecio = (precio: number) =>
        `$${new Intl.NumberFormat("es-CO").format(precio)}`;

    const total = subtotal;

    const handlePagar = async () => {
        if (selectedItems.length === 0) {
            Alert.alert("Carrito vacío", "Agrega productos antes de continuar.");
            return;
        }
        if (!form.nombre || !form.email || !form.direccion || !form.ciudad) {
            Alert.alert("Faltan datos", "Por favor completa los datos obligatorios (Nombre, Email, Dirección, Ciudad).");
            return;
        }

        try {
            setIsProcessing(true);

            // 1. Obtener origen de redirección dinámica
            let origin = 'http://localhost:8081';
            if (typeof window !== 'undefined' && window.location && window.location.origin) {
                origin = window.location.origin;
            } else {
                // En móvil nativo, usamos expo-linking para obtener el esquema de la app
                const Linking = require('expo-linking');
                origin = Linking.createURL('');
                // Quitar slash final si existe
                if (origin.endsWith('/')) origin = origin.slice(0, -1);
            }

            // 2. Crear la preferencia de pago en el backend
            const response = await api.post('/payments/crear-preferencia', {
                productos: selectedItems,
                backUrlOrigin: origin,
            });

            const { init_point } = response.data;

            if (init_point) {
                // 3. Redirigir a Mercado Pago en la misma ventana del navegador
                if (typeof window !== 'undefined') {
                    window.location.href = init_point;
                } else {
                    // Fallback para native (no debería llegar aquí desde web)
                    const { Linking } = require('react-native');
                    Linking.openURL(init_point);
                }
            } else {
                throw new Error("No se pudo obtener la URL de pago.");
            }
        } catch (error) {
            console.error("Error al procesar el pago: ", error);
            Alert.alert(
                "Error de Pago",
                "No se pudo conectar con la pasarela de pagos. Por favor intenta más tarde."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <AppHeader platform="web" />
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 32, maxWidth: 1200, alignSelf: 'center', width: '100%' }}>
                    <Pressable className="mb-6 flex-row items-center gap-2" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">
                            Volver
                        </Text>
                    </Pressable>

                    <Text className="mb-8 font-roboto-bold text-3xl text-[#111827]">
                        Finalizar Compra (Checkout)
                    </Text>

                    <View style={{
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        gap: 40
                    }}>
                        {/* LADO IZQUIERDO: FORMULARIOS */}
                        <View style={{ flex: 1, minWidth: isSmallScreen ? '100%' : 350 }}>
                            {/* DATOS DEL CLIENTE */}
                            <View className="rounded-2xl bg-white p-6 mb-6">
                                <Text className="mb-4 font-roboto-bold text-xl text-[#111827]">1. Datos Personales</Text>
                                <View className="mb-4">
                                    <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Nombre completo *</Text>
                                    <TextInput
                                        className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                        placeholder="Ej. Juan Pérez"
                                        value={form.nombre}
                                        onChangeText={(t) => setForm({ ...form, nombre: t })}
                                    />
                                </View>
                                <View className="mb-4 flex-row gap-4">
                                    <View className="flex-1">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Documento (CC/NIT) *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                            keyboardType="numeric"
                                            value={form.documento}
                                            onChangeText={(t) => setForm({ ...form, documento: t })}
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Teléfono *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                            keyboardType="phone-pad"
                                            value={form.telefono}
                                            onChangeText={(t) => setForm({ ...form, telefono: t })}
                                        />
                                    </View>
                                </View>
                                <View className="mb-2">
                                    <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Correo electrónico *</Text>
                                    <TextInput
                                        className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={form.email}
                                        onChangeText={(t) => setForm({ ...form, email: t })}
                                    />
                                </View>
                            </View>

                            {/* DATOS DE ENVÍO */}
                            <View className="rounded-2xl bg-white p-6 mb-6">
                                <Text className="mb-4 font-roboto-bold text-xl text-[#111827]">2. Datos de Envío</Text>
                                <View className="mb-4">
                                    <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Dirección completa *</Text>
                                    <TextInput
                                        className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                        value={form.direccion}
                                        onChangeText={(t) => setForm({ ...form, direccion: t })}
                                    />
                                </View>
                                <View className="mb-4 flex-row gap-4">
                                    <View className="flex-1">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Ciudad *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                            value={form.ciudad}
                                            onChangeText={(t) => setForm({ ...form, ciudad: t })}
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Departamento</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                            value={form.departamento}
                                            onChangeText={(t) => setForm({ ...form, departamento: t })}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* LADO DERECHO: RESUMEN */}
                        <View style={{ width: isSmallScreen ? '100%' : 400 }}>
                            <View className="rounded-2xl bg-white p-6">
                                <Text className="mb-5 font-roboto-bold text-xl text-[#111827]">Tu Pedido</Text>
                                <ScrollView className="max-h-80 mb-4">
                                    {selectedItems.map((item) => (
                                        <View key={item.id} className="mb-4 flex-row items-center border-b border-[#f6f7fb] pb-4">
                                            <View className="h-16 w-16 overflow-hidden rounded-xl bg-[#f5f7fa]">
                                                <Image source={typeof item.imagen === 'string' ? { uri: item.imagen } : item.imagen} className="h-full w-full" resizeMode="contain" />
                                            </View>
                                            <View className="ml-3 flex-1">
                                                <Text className="text-sm text-[#111827]">{item.nombre}</Text>
                                                <Text className="text-xs text-[#6b7280] mt-1">Cant: {item.cantidad}</Text>
                                            </View>
                                            <Text className="font-roboto-bold text-sm text-[#111827]">
                                                {formatearPrecio(item.precio * item.cantidad)}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>

                                <View className="border-t border-[#eef1f5] pt-4">
                                    <View className="mb-3 flex-row justify-between">
                                        <Text className="text-sm text-[#6b7280]">Subtotal ({selectedItems.length} items)</Text>
                                        <Text className="font-roboto-medium text-sm text-[#111827]">{formatearPrecio(subtotal)}</Text>
                                    </View>

                                    <View className="my-4 flex-row justify-between border-t border-[#eef1f5] pt-4">
                                        <Text className="font-roboto-bold text-xl text-[#111827]">Total a Pagar</Text>
                                        <Text className="font-roboto-bold text-xl text-[#FF9E00]">{formatearPrecio(total)}</Text>
                                    </View>
                                    <CustomButton
                                        className={`mt-4 w-full justify-center items-center rounded-xl bg-primary py-4 shadow-sm ${isProcessing ? 'opacity-50' : ''}`}
                                        onPress={handlePagar}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "PROCESANDO..." : "PAGAR PEDIDO"}
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckoutWeb;
