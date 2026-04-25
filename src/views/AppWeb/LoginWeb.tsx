import CustomButton from '@/components/CustomButton';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const LoginWeb: React.FC = () => {

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
            <ScrollView contentContainerStyle={styles.container}>
                <View className="bg-white w-full max-w-6xl mx-auto flex-row items-center justify-between">
                    {/* Left Side: Logo or Image */}
                    <View className="flex-1 items-center justify-center">
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={styles.logo}
                        />
                    </View>

                    {/* Right Side: Form */}
                    <View className="flex-1 items-center">
                        <Pressable className="flex-row items-center gap-2 self-start mb-6" onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="#111827" />
                            <Text className="font-roboto-bold text-sm text-[#111827]">
                                Volver
                            </Text>
                        </Pressable>

                        <View style={styles.card}>
                            <Text style={styles.title}>Iniciar sesión en la Web</Text>

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

                            <CustomButton
                                children='INICIAR SESIÓN'
                                className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                                onPress={handleLogin}
                            />

                            <CustomButton
                                onPress={() => router.push('/register')}
                                variant="text-only"
                                color="secondary"
                            >
                                ¿No tienes cuenta? Regístrate
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
