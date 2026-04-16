import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarrNaveg from "../components/BarrNaveg";
import BarraBusquedaMovil from "../components/BarraBusquedaMovil";
import CustomButton from "../components/CustomButton";
import Header from "../components/header";
import { useCart } from "../context/CartContext";

const CheckoutScreen = () => {
    const { cartItems, subtotal } = useCart();
    const { width } = useWindowDimensions();
    const esMobile = width < 768;
    const [metodoPago, setMetodoPago] = useState("Tarjeta");

    // Estados del formulario
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

    const formatearPrecio = (precio: number) =>
        `$${new Intl.NumberFormat("es-CO").format(precio)}`;

    const costoEnvio = 15000;
    const total = subtotal + (cartItems.length > 0 ? costoEnvio : 0);

    const handlePagar = () => {
        if (cartItems.length === 0) {
            Alert.alert("Carrito vacío", "Agrega productos antes de continuar.");
            return;
        }
        if (!form.nombre || !form.email || !form.direccion || !form.ciudad) {
            Alert.alert("Faltan datos", "Por favor completa los datos obligatorios (Nombre, Email, Dirección, Ciudad).");
            return;
        }

        // Aquí irá la lógica de conversión a pedido para la pasarela de pagos
        Alert.alert(
            "Pedido creado con éxito",
            `Serás redirigido a la pasarela de pagos pronto.\n\nMétodo seleccionado: ${metodoPago}\nTotal a pagar: ${formatearPrecio(total)}`
        );
        console.log("Pedido generado: ", {
            cliente: form,
            productos: cartItems,
            total,
            metodoPago,
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7fb]">
            {esMobile ? (
                <View style={{ backgroundColor: "#FED20F" }}>
                    <BarraBusquedaMovil />
                </View>
            ) : (
                <Header />
            )}

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: esMobile ? 120 : 40 }}>
                <View className="px-4 py-8">
                    <View className="mx-auto w-full max-w-4xl">
                        <Pressable className="mb-6 flex-row items-center gap-2" onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="#111827" />
                            <Text className="font-roboto-bold text-sm text-[#111827]">
                                Volver
                            </Text>
                        </Pressable>

                        <Text className="mb-8 font-roboto-bold text-2xl text-[#111827]">
                            Finalizar Compra (Checkout)
                        </Text>

                        <View className="flex-col gap-6 md:flex-row">
                            {/* LADO IZQUIERDO: FORMULARIOS */}
                            <View className="flex-1 space-y-6">
                                {/* DATOS DEL CLIENTE */}
                                <View className="rounded-2xl bg-white p-6">
                                    <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">
                                        1. Datos Personales
                                    </Text>

                                    <View className="mb-4">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Nombre completo *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                            placeholder="Ej. Juan Pérez"
                                            value={form.nombre}
                                            onChangeText={(t) => setForm({ ...form, nombre: t })}
                                        />
                                    </View>

                                    <View className="mb-4 flex-row gap-4">
                                        <View className="flex-1">
                                            <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Documento (CC/NIT) *</Text>
                                            <TextInput
                                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                                placeholder="Número de documento"
                                                keyboardType="numeric"
                                                value={form.documento}
                                                onChangeText={(t) => setForm({ ...form, documento: t })}
                                            />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Teléfono *</Text>
                                            <TextInput
                                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                                placeholder="Celular"
                                                keyboardType="phone-pad"
                                                value={form.telefono}
                                                onChangeText={(t) => setForm({ ...form, telefono: t })}
                                            />
                                        </View>
                                    </View>

                                    <View className="mb-2">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Correo electrónico *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                            placeholder="tucorreo@ejemplo.com"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={form.email}
                                            onChangeText={(t) => setForm({ ...form, email: t })}
                                        />
                                    </View>
                                </View>

                                {/* DATOS DE ENVÍO */}
                                <View className="mt-6 rounded-2xl bg-white p-6">
                                    <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">
                                        2. Datos de Envío
                                    </Text>

                                    <View className="mb-4">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Dirección completa *</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                            placeholder="Ej. Calle 123 #45-67 Apt 801"
                                            value={form.direccion}
                                            onChangeText={(t) => setForm({ ...form, direccion: t })}
                                        />
                                    </View>

                                    <View className="mb-4 flex-row gap-4">
                                        <View className="flex-1">
                                            <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Ciudad *</Text>
                                            <TextInput
                                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                                placeholder="Ej. Bogotá"
                                                value={form.ciudad}
                                                onChangeText={(t) => setForm({ ...form, ciudad: t })}
                                            />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Departamento</Text>
                                            <TextInput
                                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                                placeholder="Ej. Cundinamarca"
                                                value={form.departamento}
                                                onChangeText={(t) => setForm({ ...form, departamento: t })}
                                            />
                                        </View>
                                    </View>

                                    <View className="mb-2">
                                        <Text className="mb-1 font-opensans-regular text-xs font-bold text-[#4b5563]">Notas para el envío (Opcional)</Text>
                                        <TextInput
                                            className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                            placeholder="Instrucciones especiales de entrega..."
                                            multiline
                                            numberOfLines={3}
                                            textAlignVertical="top"
                                            value={form.notas}
                                            onChangeText={(t) => setForm({ ...form, notas: t })}
                                        />
                                    </View>
                                </View>

                                {/* MEDIOS DE PAGO */}
                                <View className="mt-6 rounded-2xl bg-white p-6">
                                    <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">
                                        3. Método de Pago (A conectar)
                                    </Text>
                                    <View className="flex-col gap-3">
                                        <Pressable
                                            className={`flex-row items-center rounded-xl border p-4 ${metodoPago === 'Tarjeta' ? 'border-[#FED20F] bg-[#fffdf0]' : 'border-[#eef1f5] bg-[#fafbfc]'}`}
                                            onPress={() => setMetodoPago('Tarjeta')}
                                        >
                                            <MaterialIcons name="credit-card" size={24} color={metodoPago === 'Tarjeta' ? '#111827' : '#9ca3af'} />
                                            <Text className={`ml-3 font-roboto-medium ${metodoPago === 'Tarjeta' ? 'text-[#111827]' : 'text-[#6b7280]'}`}>
                                                Tarjeta de Crédito / Débito
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            className={`flex-row items-center rounded-xl border p-4 ${metodoPago === 'Nequi' ? 'border-[#FED20F] bg-[#fffdf0]' : 'border-[#eef1f5] bg-[#fafbfc]'}`}
                                            onPress={() => setMetodoPago('Nequi')}
                                        >
                                            <MaterialIcons name="phone-android" size={24} color={metodoPago === 'Nequi' ? '#111827' : '#9ca3af'} />
                                            <Text className={`ml-3 font-roboto-medium ${metodoPago === 'Nequi' ? 'text-[#111827]' : 'text-[#6b7280]'}`}>
                                                Nequi / Daviplata / PSE
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            {/* LADO DERECHO: RESUMEN DEL PEDIDO */}
                            <View className="mt-6 w-full md:mt-0 md:w-96">
                                <View className="rounded-2xl bg-white p-6">
                                    <Text className="mb-5 font-roboto-bold text-lg text-[#111827]">
                                        Tu Pedido
                                    </Text>

                                    {/* Lista de productos minimizada */}
                                    <ScrollView className="max-h-64 mb-4">
                                        {cartItems.map((item) => (
                                            <View key={item.id} className="mb-4 flex-row items-center border-b border-[#f6f7fb] pb-4">
                                                <View className="h-16 w-16 overflow-hidden rounded-xl bg-[#f5f7fa]">
                                                    <Image
                                                        source={{ uri: item.imagen }}
                                                        className="h-full w-full"
                                                        resizeMode="contain"
                                                    />
                                                </View>
                                                <View className="ml-3 flex-1 flex-col">
                                                    <Text className="font-opensans-regular text-sm text-[#111827]" numberOfLines={2}>
                                                        {item.nombre}
                                                    </Text>
                                                    <Text className="font-opensans-regular text-xs text-[#6b7280] mt-1">
                                                        Cant: {item.cantidad}
                                                    </Text>
                                                </View>
                                                <Text className="font-roboto-bold text-sm text-[#111827]">
                                                    {formatearPrecio(item.precio * item.cantidad)}
                                                </Text>
                                            </View>
                                        ))}
                                    </ScrollView>

                                    {/* Totales */}
                                    <View className="border-t border-[#eef1f5] pt-4">
                                        <View className="mb-3 flex-row justify-between">
                                            <Text className="font-opensans-regular text-sm text-[#6b7280]">
                                                Subtotal ({cartItems.length} items)
                                            </Text>
                                            <Text className="font-roboto-medium text-sm text-[#111827]">
                                                {formatearPrecio(subtotal)}
                                            </Text>
                                        </View>
                                        <View className="mb-3 flex-row justify-between">
                                            <Text className="font-opensans-regular text-sm text-[#6b7280]">Envío</Text>
                                            <Text className="font-roboto-medium text-sm text-[#111827]">
                                                {cartItems.length > 0 ? formatearPrecio(costoEnvio) : "$0"}
                                            </Text>
                                        </View>

                                        <View className="my-4 flex-row justify-between border-t border-[#eef1f5] pt-4">
                                            <Text className="font-roboto-bold text-lg text-[#111827]">Total a Pagar</Text>
                                            <Text className="font-roboto-bold text-lg text-[#FF9E00]">
                                                {formatearPrecio(total)}
                                            </Text>
                                        </View>

                                        <CustomButton
                                            className="mt-4 w-full justify-center items-center rounded-xl bg-primary py-4 shadow-sm"
                                            onPress={handlePagar}
                                        >
                                            PAGAR PEDIDO
                                        </CustomButton>
                                        <Text className="mt-3 text-center font-opensans-regular text-xs text-[#9ca3af]">
                                            Transacción segura y encriptada
                                        </Text>
                                    </View>
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

export default CheckoutScreen;
