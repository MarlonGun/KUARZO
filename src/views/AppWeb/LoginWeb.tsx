import CustomButton from '@/components/CustomButton';
import { authService } from '@/src/services/authService';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

const LoginWeb: React.FC = () => {

    const [correo, setCorreo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginStore = useAuthStore((state: any) => state.login);

    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 800;

    const handleLogin = async (): Promise<void> => {
        if (!correo || !password) {
            window.alert('Completa todos los campos');
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

            router.replace('/');
        } catch (error: any) {
            console.error('Error en LoginWeb:', error);
            const errorMsg = error.response?.data?.error || 'Credenciales incorrectas o error de conexión';
            window.alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

            <View className="px-5 pt-6 bg-white w-full">
                <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={20} color="#111827" />
                    <Text className="font-roboto-bold text-sm text-[#111827]">
                        Volver
                    </Text>
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isSmallScreen ? 20 : 60,
                    width: '100%',
                    maxWidth: 1100
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={[styles.logo, isSmallScreen && { width: 200, height: 200 }]}
                    />
                </View>

                {/* Right Side: Form */}
                <View style={styles.card}>
                    <Text style={styles.title}>Inicia Sesión</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            placeholder="Ej: usuario@email.com"
                            placeholderTextColor="#999"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setCorreo}
                            editable={!isLoading}
                        />
                    </View>

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
                                editable={!isLoading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color="#666"
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
                            fontSize: 13,
                            color: '#f97316',
                            margin: 10
                        }}>
                        </Text>
                    </Pressable>

                    <CustomButton
                        className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
                    </CustomButton>

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
            </View>
        </ScrollView >
    );
};

export default LoginWeb;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    logo: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
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
});
