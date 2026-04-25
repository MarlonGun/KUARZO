import CustomButton from '@/components/CustomButton';
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

const LoginMovil: React.FC = () => {

    const [correo, setCorreo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = (): void => {
        if (!correo || !password) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }
        console.log({ correo, password });
        Alert.alert('Éxito', 'Inicio de sesión correcto (simulado)');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>

                    <View className="bg-white w-full mx-auto">
                        <Pressable className="flex-row items-center gap-2 self-start mt-6" onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="#111827" />
                            <Text className="font-roboto-bold text-sm text-[#111827]">
                                Volver
                            </Text>
                        </Pressable>
                    </View>

                    {/* Logo */}
                    <Image
                        source={require('@/assets/images/logo.png')}
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
                        <CustomButton
                            children='INICIAR SESIÓN'
                            className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                            onPress={handleLogin}
                        />

                        {/* Extra */}
                        <CustomButton
                            onPress={() => router.push('/register')}
                            variant="text-only"
                            color="secondary"
                        >
                            ¿No tienes cuenta? Regístrate
                        </CustomButton>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginMovil;

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
});
