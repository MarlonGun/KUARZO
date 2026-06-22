import { useAuthStore } from '@/src/store/useAuthStore';
import { useCartStore } from '@/src/store/useCartStore';
import { MaterialIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';

const Header = () => {
    const { toggleSidebar, items } = useCartStore();
    const totalItems = items.reduce((acc, curr) => acc + curr.cantidad, 0);

    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const handleLogout = async () => {
        await logout();
        router.replace('/');
    };

    const pathname = usePathname();

    const menuItems = [
        { label: 'Inicio', route: '/' },
        { label: 'Catálogo', route: '/catalogo' },
        { label: 'Nosotros', route: '/nosotros' },
        { label: 'Contacto', route: '/contacto' },
    ];

    return (
        <View style={{ backgroundColor: '#fff', width: '100%' }} className="shadow-sm">
            {/* Fila Principal */}
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: isMobile ? 12 : 24,
                    paddingVertical: 16,
                    gap: 12
                }}
            >
                {/* Lado Izquierdo: Logo */}
                <Pressable
                    onPress={() => router.push('/')}
                    style={{ cursor: 'pointer' }}
                    className="flex-row items-center justify-center"
                >
                    <Image
                        source={require('../assets/images/logo_header.png')}
                        style={{ width: 140, height: 40, resizeMode: 'contain' }}
                    />
                </Pressable>

                {/* Si es móvil, mostramos las acciones aquí para que queden al lado del logo */}
                {isMobile && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {isAuthenticated && user ? (
                            <>
                                <Text className="text-base font-roboto-medium text-gray-700">
                                    Hola, {user.primerNombre}
                                </Text>
                                <Pressable onPress={handleLogout}>
                                    <MaterialIcons name="logout" size={22} color="#4B5563" />
                                </Pressable>
                            </>
                        ) : (
                            <Pressable onPress={() => router.push('/login')}>
                                <Text className="text-base font-roboto-medium text-gray-700">Login</Text>
                            </Pressable>
                        )}
                        <Pressable className="ml-2 relative" onPress={toggleSidebar}>
                            <MaterialIcons name="shopping-cart" size={24} color="#4B5563" />
                            {totalItems > 0 && (
                                <View className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                    <Text className="text-white text-xs font-bold">{totalItems}</Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                )}

                {/* Área del Buscador - En móvil ocupará el 100% abajo, en desktop estará al centro */}
                <View style={{ flex: 1, minWidth: isMobile ? '100%' : 200 }} className="px-2 max-w-3xl">
                    <View className="flex-row items-center w-full h-11 px-4 bg-white border border-gray-300 rounded-full">
                        <TextInput
                            placeholder="Buscar..."
                            className="flex-1 h-full text-base text-gray-800 font-normal outline-none"
                            placeholderTextColor='quaternary-950'
                        />
                        <Pressable className="ml-2">
                            <MaterialIcons name="search" size={20} color='quaternary-500' />
                        </Pressable>
                    </View>
                </View>

                {/* Área de Acciones - Solo se muestra aquí en Desktop */}
                {!isMobile && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                        {isAuthenticated && user ? (
                            <>
                                <Text className="text-base font-roboto-medium text-secondary">
                                    Hola, {user.primerNombre}
                                </Text>
                                <Pressable onPress={handleLogout}>
                                    <Text className="text-base font-roboto-medium text-gray-500">
                                        Salir
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable onPress={() => router.push('/login')}>
                                    <Text className="text-base font-roboto-medium text-gray-700 hover:text-gray-900">
                                        Login
                                    </Text>
                                </Pressable>
                                <Pressable onPress={() => router.push('/register')}>
                                    <Text className="text-base font-roboto-medium text-gray-700 hover:text-gray-900">
                                        Sign Up
                                    </Text>
                                </Pressable>
                            </>
                        )}
                        <Pressable className="ml-2 relative" onPress={toggleSidebar}>
                            <MaterialIcons name="shopping-cart" size={24} color="#4B5563" />
                            {totalItems > 0 && (
                                <View className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                    <Text className="text-white text-xs font-bold">{totalItems}</Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                )}
            </View>

            {/* Fila de Menú Horizontal Centrado */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 16,
                    paddingHorizontal: isMobile ? 12 : 24,
                    gap: isMobile ? 16 : 32,
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    paddingTop: 12,
                }}
            >
                {menuItems.map((item, idx) => {
                    const isActive = item.route === '/' ? (pathname === '/' && item.label === 'Inicio') : pathname === item.route;
                    return (
                        <Pressable
                            key={idx}
                            onPress={() => router.push(item.route as any)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Text
                                className={`text-sm md:text-base font-roboto-medium transition-colors duration-200 ${isActive
                                    ? 'text-orange-500 font-bold'
                                    : 'text-gray-600 hover:text-orange-500'
                                    }`}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

export default Header;