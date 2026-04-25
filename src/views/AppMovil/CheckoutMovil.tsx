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
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import AppHeader from "@/components/AppHeader";
import { useCartStore } from "@/src/store/useCartStore";

const CheckoutMovil = () => {
    const { items: cartItems, getTotal } = useCartStore();
    const subtotal = getTotal();
    const [metodoPago, setMetodoPago] = useState("Tarjeta");

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
            Alert.alert("Faltan datos", "Por favor completa los datos obligatorios.");
            return;
        }

        Alert.alert(
            "Pedido creado con éxito",
            `Serás redirigido a la pasarela de pagos pronto.\n\nMétodo seleccionado: ${metodoPago}\nTotal a pagar: ${formatearPrecio(total)}`
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7fb]">
            <AppHeader platform="movil" />

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="px-4 py-4">
                    <Pressable className="mb-6 flex-row items-center gap-2" onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="#111827" />
                        <Text className="font-roboto-bold text-sm text-[#111827]">Volver</Text>
                    </Pressable>

                    <Text className="mb-6 font-roboto-bold text-2xl text-[#111827]">Checkout</Text>

                    <View className="space-y-6">
                        {/* DATOS DEL CLIENTE */}
                        <View className="rounded-2xl bg-white p-5 mb-4">
                            <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">1. Datos Personales</Text>
                            <TextInput
                                className="mb-4 rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Nombre completo *"
                                value={form.nombre}
                                onChangeText={(t) => setForm({ ...form, nombre: t })}
                            />
                            <TextInput
                                className="mb-4 rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Documento (CC/NIT) *"
                                keyboardType="numeric"
                                value={form.documento}
                                onChangeText={(t) => setForm({ ...form, documento: t })}
                            />
                            <TextInput
                                className="mb-4 rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Teléfono *"
                                keyboardType="phone-pad"
                                value={form.telefono}
                                onChangeText={(t) => setForm({ ...form, telefono: t })}
                            />
                            <TextInput
                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Correo electrónico *"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={form.email}
                                onChangeText={(t) => setForm({ ...form, email: t })}
                            />
                        </View>

                        {/* DATOS DE ENVÍO */}
                        <View className="rounded-2xl bg-white p-5 mb-4">
                            <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">2. Datos de Envío</Text>
                            <TextInput
                                className="mb-4 rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Dirección completa *"
                                value={form.direccion}
                                onChangeText={(t) => setForm({ ...form, direccion: t })}
                            />
                            <TextInput
                                className="mb-4 rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Ciudad *"
                                value={form.ciudad}
                                onChangeText={(t) => setForm({ ...form, ciudad: t })}
                            />
                            <TextInput
                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 text-sm text-[#111827]"
                                placeholder="Departamento"
                                value={form.departamento}
                                onChangeText={(t) => setForm({ ...form, departamento: t })}
                            />
                        </View>

                        {/* MEDIOS DE PAGO */}
                        <View className="rounded-2xl bg-white p-5 mb-4">
                            <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">3. Método de Pago</Text>
                            <View className="flex-col gap-3">
                                <Pressable
                                    className={`flex-row items-center rounded-xl border p-4 ${metodoPago === 'Tarjeta' ? 'border-[#FED20F] bg-[#fffdf0]' : 'border-[#eef1f5] bg-[#fafbfc]'}`}
                                    onPress={() => setMetodoPago('Tarjeta')}
                                >
                                    <MaterialIcons name="credit-card" size={24} color={metodoPago === 'Tarjeta' ? '#111827' : '#9ca3af'} />
                                    <Text className={`ml-3 font-roboto-medium ${metodoPago === 'Tarjeta' ? 'text-[#111827]' : 'text-[#6b7280]'}`}>Tarjeta</Text>
                                </Pressable>
                                <Pressable
                                    className={`flex-row items-center rounded-xl border p-4 ${metodoPago === 'Nequi' ? 'border-[#FED20F] bg-[#fffdf0]' : 'border-[#eef1f5] bg-[#fafbfc]'}`}
                                    onPress={() => setMetodoPago('Nequi')}
                                >
                                    <MaterialIcons name="phone-android" size={24} color={metodoPago === 'Nequi' ? '#111827' : '#9ca3af'} />
                                    <Text className={`ml-3 font-roboto-medium ${metodoPago === 'Nequi' ? 'text-[#111827]' : 'text-[#6b7280]'}`}>Nequi/PSE</Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* RESUMEN */}
                        <View className="rounded-2xl bg-white p-5 mt-2">
                            <Text className="mb-4 font-roboto-bold text-lg text-[#111827]">Resumen</Text>
                            <View className="border-t border-[#eef1f5] pt-4">
                                <View className="mb-2 flex-row justify-between">
                                    <Text className="text-sm text-[#6b7280]">Subtotal</Text>
                                    <Text className="font-roboto-medium text-sm text-[#111827]">{formatearPrecio(subtotal)}</Text>
                                </View>
                                <View className="mb-2 flex-row justify-between">
                                    <Text className="text-sm text-[#6b7280]">Envío</Text>
                                    <Text className="font-roboto-medium text-sm text-[#111827]">{cartItems.length > 0 ? formatearPrecio(costoEnvio) : "$0"}</Text>
                                </View>
                                <View className="my-4 flex-row justify-between border-t border-[#eef1f5] pt-4">
                                    <Text className="font-roboto-bold text-lg text-[#111827]">Total a Pagar</Text>
                                    <Text className="font-roboto-bold text-lg text-[#FF9E00]">{formatearPrecio(total)}</Text>
                                </View>
                                <CustomButton className="w-full justify-center items-center rounded-xl bg-primary py-4 shadow-sm" onPress={handlePagar}>
                                    PAGAR PEDIDO
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckoutMovil;
