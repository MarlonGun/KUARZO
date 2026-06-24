import BarrNaveg from '@/components/BarrNaveg';
import { authService } from '@/src/services/authService';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterMovil: React.FC = () => {

    const [primerNombre, setPrimerNombre] = useState<string>('');
    const [segundoNombre, setSegundoNombre] = useState<string>('');
    const [primerApellido, setPrimerApellido] = useState<string>('');
    const [segundoApellido, setSegundoApellido] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const handleRegister = async (): Promise<void> => {
        if (!primerNombre || !primerApellido || !correo || !password) {
            Alert.alert('Error', 'Completa los campos obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'La contraseña debe tener mínimo 8 caracteres');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.register({
                primerNombre,
                segundoNombre: segundoNombre || undefined,
                primerApellido,
                segundoApellido: segundoApellido || undefined,
                correo,
                contrasena: password,
                telefono: telefono || undefined,
                rolId: 1, // Por defecto rol de COMPRADOR
            });

            Alert.alert('Éxito', response.message || 'Usuario registrado correctamente');
            router.push('/login'); // Redirigir al inicio de sesión
        } catch (error: any) {
            console.error('Error en RegisterMovil:', error);
            const errorMsg = error.response?.data?.error || 'No se pudo completar el registro';
            Alert.alert('Error de Registro', errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 13,
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
        backgroundColor: '#fafbfc',
        color: '#111827',
    } as const;

    const labelStyle = {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: '#4b5563',
        marginBottom: 6,
    } as const;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        padding: 24,
                        paddingBottom: 120,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Botón Volver */}
                    <View style={{ width: '100%', maxWidth: 400, marginBottom: 8, marginTop: 8 }}>
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

                    {/* Logo */}
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={{
                            width: 160,
                            height: 160,
                            marginBottom: 8,
                        }}
                        contentFit="contain"
                    />

                    {/* Card */}
                    <View style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        padding: 24,
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.08,
                        shadowRadius: 16,
                        elevation: 10,
                        borderWidth: 1,
                        borderColor: '#f3f4f6',
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 22,
                            color: '#111827',
                            marginBottom: 4,
                        }}>
                            Crea tu cuenta
                        </Text>
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 14,
                            color: '#9ca3af',
                            marginBottom: 20,
                        }}>
                            Regístrate en Kuarzo
                        </Text>

                        {/* Primer Nombre */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Primer nombre *</Text>
                            <TextInput
                                placeholder="Ej: Juan"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                onChangeText={setPrimerNombre}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Segundo Nombre */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Segundo nombre</Text>
                            <TextInput
                                placeholder="Ej: David"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                onChangeText={setSegundoNombre}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Primer Apellido */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Primer apellido *</Text>
                            <TextInput
                                placeholder="Ej: Pérez"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                onChangeText={setPrimerApellido}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Segundo Apellido */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Segundo apellido</Text>
                            <TextInput
                                placeholder="Ej: Gómez"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                onChangeText={setSegundoApellido}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Correo */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Correo electrónico *</Text>
                            <TextInput
                                placeholder="Ej: usuario@email.com"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setCorreo}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Teléfono */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Teléfono</Text>
                            <TextInput
                                placeholder="Ej: 3001234567"
                                placeholderTextColor="#bbb"
                                style={inputStyle}
                                keyboardType="phone-pad"
                                onChangeText={setTelefono}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Contraseña */}
                        <View style={{ marginBottom: 14 }}>
                            <Text style={labelStyle}>Contraseña *</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#e5e7eb',
                                borderRadius: 10,
                                paddingHorizontal: 14,
                                backgroundColor: '#fafbfc',
                            }}>
                                <TextInput
                                    placeholder="Mínimo 8 caracteres"
                                    placeholderTextColor="#bbb"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 13,
                                        fontSize: 16,
                                        fontFamily: 'OpenSans-Regular',
                                        color: '#111827',
                                    }}
                                    secureTextEntry={!showPassword}
                                    onChangeText={setPassword}
                                    value={password}
                                    editable={!isLoading}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={22}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirmar contraseña */}
                        <View style={{ marginBottom: 8 }}>
                            <Text style={labelStyle}>Confirmar contraseña *</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#e5e7eb',
                                borderRadius: 10,
                                paddingHorizontal: 14,
                                backgroundColor: '#fafbfc',
                            }}>
                                <TextInput
                                    placeholder="Repite tu contraseña"
                                    placeholderTextColor="#bbb"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 13,
                                        fontSize: 16,
                                        fontFamily: 'OpenSans-Regular',
                                        color: '#111827',
                                    }}
                                    secureTextEntry={!showPassword2}
                                    onChangeText={setConfirmPassword}
                                    value={confirmPassword}
                                    editable={!isLoading}
                                />
                                <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} disabled={isLoading}>
                                    <Ionicons
                                        name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                                        size={22}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Validación visual */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 4 }}>
                            <View style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderWidth: 2,
                                borderColor: password.length >= 8 ? '#22c55e' : '#d1d5db',
                                backgroundColor: password.length >= 8 ? '#22c55e' : 'transparent',
                                marginRight: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {password.length >= 8 && (
                                    <MaterialIcons name="check" size={10} color="#fff" />
                                )}
                            </View>
                            <Text style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 13,
                                color: password.length >= 8 ? '#22c55e' : '#9ca3af',
                            }}>
                                Mínimo 8 caracteres
                            </Text>
                        </View>

                        {/* Botón Registrar */}
                        <Pressable
                            style={{
                                backgroundColor: isLoading ? '#e5e7eb' : '#FFD700',
                                paddingVertical: 16,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: isLoading ? '#9ca3af' : '#111827',
                                letterSpacing: 1,
                            }}>
                                {isLoading ? 'CARGANDO...' : 'CREA TU CUENTA'}
                            </Text>
                        </Pressable>

                        {/* Link a login */}
                        <Pressable
                            onPress={() => router.push('/login')}
                            disabled={isLoading}
                            style={{ alignItems: 'center', marginTop: 20 }}
                        >
                            <Text style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 14,
                                color: '#f97316',
                            }}>
                                ¿Ya tienes cuenta? <Text style={{ fontFamily: 'Roboto-Bold' }}>Inicia sesión</Text>
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterMovil;