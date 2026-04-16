import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const LoginScreen: React.FC = () => {

    const [correo, setCorreo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = (): void => {
        if (!correo || !password) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        console.log({ correo, password });

        // Aquí conectas con PHP después
        Alert.alert('Éxito', 'Inicio de sesión correcto (simulado)');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 20 }} className="bg-white">

                    <View className="bg-white w-full max-w-6xl mx-auto">
                        <Pressable className="flex-row items-center gap-2 self-start mt-6" onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="#111827" />
                            <Text className="font-roboto-bold text-sm text-[#111827]">
                                Volver
                            </Text>
                        </Pressable>
                    </View>

                    {/* Logo */}
                    <Image
                        source={require('../assets/images/logo.png')}
                        className="w-32 h-32 sm:w-40 sm:h-40 self-center mb-8"
                    />

                    {/* Card */}
                    <View className="bg-white rounded-2xl p-6 mx-auto w-full max-w-sm shadow-lg">
                        <Text className="text-2xl font-roboto-bold text-center text-[#111827] mb-6">Iniciar sesión</Text>

                        {/* Correo */}
                        <View className="mb-4">
                            <Text className="mb-1 font-opensans-regular text-sm font-bold text-[#4b5563]">Correo electrónico</Text>
                            <TextInput
                                placeholder="Ej: usuario@email.com"
                                placeholderTextColor="#999"
                                className="rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3 font-opensans-regular text-sm text-[#111827]"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setCorreo}
                            />
                        </View>

                        {/* Contraseña */}
                        <View className="mb-6">
                            <Text className="mb-1 font-opensans-regular text-sm font-bold text-[#4b5563]">Contraseña</Text>
                            <View className="flex-row items-center rounded-lg border border-[#eef1f5] bg-[#fafbfc] px-4 py-3">
                                <TextInput
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor="#999"
                                    className="flex-1 font-opensans-regular text-sm text-[#111827]"
                                    secureTextEntry={!showPassword}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Botón */}
                        <TouchableOpacity className="bg-primary rounded-lg py-3 items-center" onPress={handleLogin}>
                            <Text className="text-white font-roboto-bold text-lg">INICIAR SESIÓN</Text>
                        </TouchableOpacity>

                        {/* Extra */}
                        <TouchableOpacity className="mt-4 items-center">
                            <Text className="text-[#007bff] font-opensans-regular text-sm" onPress={() => router.push('/register')}>¿No tienes cuenta? Regístrate</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputGroup: {
        marginTop: 15,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FFD100',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    link: {
        marginTop: 15,
        alignItems: 'center',
    },
    linkText: {
        color: '#003366',
        fontSize: 14,
    },
});