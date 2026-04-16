import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BarrNaveg from '@/components/BarrNaveg';
import BarraBusquedaMovil from '@/components/BarraBusquedaMovil';
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
    useWindowDimensions,
    View
} from 'react-native';

const LoginScreen: React.FC = () => {
    const { width } = useWindowDimensions();
    const esMobile = width < 768;

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
            {esMobile ? (
                <View style={{ backgroundColor: '#FED20F' }}>
                    <BarraBusquedaMovil />
                </View>
            ) : null}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={[styles.container, esMobile ? { paddingBottom: 110, justifyContent: 'flex-start' } : null]}>

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
                        style={styles.logo}
                    />

                    {/* Card */}
                    <View style={styles.card}>
                        <Text style={styles.title}>Iniciar sesión</Text>

                        {/* Correo */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <TextInput
                                placeholder="Ej: usuario@email.com"
                                placeholderTextColor="#999"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setCorreo}
                            />
                        </View>

                        {/* Contraseña */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor="#999"
                                    style={styles.inputPassword}
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
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                        </TouchableOpacity>

                        {/* Extra */}
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText} onPress={() => router.push('/register')}>¿No tienes cuenta? Regístrate</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            {esMobile ? <BarrNaveg /> : null}
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
