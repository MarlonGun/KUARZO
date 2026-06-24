import BarrNaveg from '@/components/BarrNaveg';
import { authService } from '@/src/services/authService';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const LoginMovil: React.FC = () => {

    const [correo, setCorreo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginStore = useAuthStore((state: any) => state.login);
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
    const user = useAuthStore((state: any) => state.user);
    const logout = useAuthStore((state: any) => state.logout);

    const handleLogin = async (): Promise<void> => {
        if (!correo || !password) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.login({
                correo,
                contrasena: password,
            });

            await AsyncStorage.setItem('user_token', response.token);

            loginStore({
                id: response.usuario.id,
                primerNombre: response.usuario.primerNombre,
                primerApellido: response.usuario.primerApellido,
                correo: response.usuario.correo,
                rol: response.usuario.rol,
            });

            Alert.alert('Éxito', response.message);
            router.replace('/catalogo'); // Redirigir al catálogo
        } catch (error: any) {
            console.error('Error en LoginMovil:', error);
            const errorMsg = error.response?.data?.error || 'Credenciales incorrectas o error de conexión';
            Alert.alert('Error de Inicio de Sesión', errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthenticated && user) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 24,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={{ width: 150, height: 150, marginBottom: 24 }}
                        contentFit="contain"
                    />
                    <View style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        padding: 28,
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.08,
                        shadowRadius: 16,
                        elevation: 10,
                        borderWidth: 1,
                        borderColor: '#f3f4f6',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: '#FFF8E1',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 16
                        }}>
                            <MaterialIcons name="person" size={40} color="#FFD700" />
                        </View>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 24,
                            color: '#111827',
                            marginBottom: 6,
                            textAlign: 'center'
                        }}>
                            ¡Hola, {user.primerNombre}!
                        </Text>
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 14,
                            color: '#9ca3af',
                            marginBottom: 24,
                            textAlign: 'center'
                        }}>
                            Ya has iniciado sesión en tu cuenta
                        </Text>
                        
                        <Pressable
                            style={{
                                backgroundColor: '#111827',
                                paddingVertical: 14,
                                paddingHorizontal: 32,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: 12
                            }}
                            onPress={() => router.push('/catalogo')}
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: '#fff',
                                letterSpacing: 1,
                            }}>
                                IR AL CATÁLOGO
                            </Text>
                        </Pressable>

                        <Pressable
                            style={{
                                backgroundColor: '#fef2f2',
                                paddingVertical: 14,
                                paddingHorizontal: 32,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#fca5a5',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                            onPress={() => {
                                logout();
                            }}
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: '#ef4444',
                                letterSpacing: 1,
                            }}>
                                CERRAR SESIÓN
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <BarrNaveg />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 24,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Botón Volver */}
                    <View style={{ width: '100%', maxWidth: 400, marginBottom: 8 }}>
                        <Pressable
                            onPress={() => router.back()}
                            disabled={isLoading}
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
                            width: 200,
                            height: 200,
                            marginBottom: 8,
                        }}
                        contentFit="contain"
                    />

                    {/* Card */}
                    <View style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        padding: 28,
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
                            fontSize: 24,
                            color: '#111827',
                            marginBottom: 6,
                        }}>
                            Inicia Sesión
                        </Text>
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 14,
                            color: '#9ca3af',
                            marginBottom: 20,
                        }}>
                            Accede a tu cuenta Kuarzo
                        </Text>

                        {/* Correo */}
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 13,
                                color: '#4b5563',
                                marginBottom: 6,
                            }}>
                                Correo electrónico
                            </Text>
                            <TextInput
                                placeholder="Ej: usuario@email.com"
                                placeholderTextColor="#bbb"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#e5e7eb',
                                    borderRadius: 10,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    fontFamily: 'OpenSans-Regular',
                                    backgroundColor: '#fafbfc',
                                    color: '#111827',
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setCorreo}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Contraseña */}
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 13,
                                color: '#4b5563',
                                marginBottom: 6,
                            }}>
                                Contraseña
                            </Text>
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
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor="#bbb"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 14,
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

                        {/* Olvidaste tu contraseña */}
                        <Pressable
                            onPress={() => router.push('/recover')}
                            disabled={isLoading}
                            style={{ alignSelf: 'flex-end', marginTop: 8 }}
                        >
                            <Text style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 13,
                                color: '#f97316',
                            }}>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </Pressable>

                        {/* Botón Login */}
                        <Pressable
                            style={{
                                backgroundColor: isLoading ? '#e5e7eb' : '#FFD700',
                                paddingVertical: 16,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 24,
                            }}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: isLoading ? '#9ca3af' : '#111827',
                                letterSpacing: 1,
                            }}>
                                {isLoading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
                            </Text>
                        </Pressable>

                        {/* Link a registro */}
                        <Pressable
                            onPress={() => router.push('/register')}
                            disabled={isLoading}
                            style={{ alignItems: 'center', marginTop: 20 }}
                        >
                            <Text style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 14,
                                color: '#f97316',
                            }}>
                                ¿No tienes cuenta? <Text style={{ fontFamily: 'Roboto-Bold' }}>Regístrate</Text>
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BarrNaveg />
        </SafeAreaView>
    );
};

export default LoginMovil;
