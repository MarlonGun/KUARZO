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

const RegisterScreen: React.FC = () => {
    const { width } = useWindowDimensions();
    const esMobile = width < 768;

    const [primerNombre, setPrimerNombre] = useState<string>('');
    const [segundoNombre, setSegundoNombre] = useState<string>('');
    const [primerApellido, setPrimerApellido] = useState<string>('');
    const [segundoApellido, setSegundoApellido] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const handleRegister = (): void => {
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

        Alert.alert('Éxito', 'Usuario registrado correctamente');
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

                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                    />

                    <View style={styles.card}>
                        <Text style={styles.title}>Crea tu cuenta</Text>

                        {/* Primer Nombre */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Primer nombre</Text>
                            <TextInput
                                placeholder="Ej: Juan"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={setPrimerNombre}
                            />
                        </View>

                        {/* Segundo Nombre */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Segundo nombre</Text>
                            <TextInput
                                placeholder="Ej: David"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={setSegundoNombre}
                            />
                        </View>

                        {/* Primer Apellido */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Primer apellido</Text>
                            <TextInput
                                placeholder="Ej: Pérez"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={setPrimerApellido}
                            />
                        </View>

                        {/* Segundo Apellido */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Segundo apellido</Text>
                            <TextInput
                                placeholder="Ej: Gómez"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={setSegundoApellido}
                            />
                        </View>

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

                        {/* Teléfono */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Teléfono</Text>
                            <TextInput
                                placeholder="Ej: 3001234567"
                                placeholderTextColor="#999"
                                style={styles.input}
                                keyboardType="phone-pad"
                                onChangeText={setTelefono}
                            />
                        </View>

                        {/* Contraseña */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    placeholder="Mínimo 8 caracteres"
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

                        {/* Confirmar contraseña */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar contraseña</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    placeholder="Repite tu contraseña"
                                    placeholderTextColor="#999"
                                    style={styles.inputPassword}
                                    secureTextEntry={!showPassword2}
                                    onChangeText={setConfirmPassword}
                                    value={confirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                                    <Ionicons
                                        name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Validación */}
                        <View style={styles.requirementRow}>
                            <View style={[
                                styles.circle,
                                password.length >= 8 && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
                            ]} />
                            <Text style={styles.requirementText}>Mínimo 8 caracteres</Text>
                        </View>

                        {/* Botón */}
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>CREA TU CUENTA</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {esMobile ? <BarrNaveg /> : null}
        </SafeAreaView>
    );
};

export default RegisterScreen;

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
        maxWidth: 400, // 👈 LIMITE PARA WEB
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
        fontSize: 20,
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
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    circle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#999',
        marginRight: 8,
    },
    requirementText: {
        fontSize: 13,
        color: '#666',
    },
    button: {
        backgroundColor: '#FFD100',
        paddingVertical: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        fontWeight: 'bold',
    },
});
