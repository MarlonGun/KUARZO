import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

const BarrNaveg = () => {
    const pathname = usePathname();
    // Estado para saber qué pestaña está activa
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        { id: 'home', icon: 'home', route: '/' },
        { id: 'catalog', icon: 'apps', route: '/catalogo' }, // 'apps' o 'grid' funcionan genial para catálogos
        { id: 'cart', icon: 'cart', route: '/cart' },
        { id: 'profile', icon: 'person', route: '/login' },
    ];

    useEffect(() => {
        const active = tabs.find(tab => tab.route === pathname)?.id || 'home';
        setActiveTab(active);
    }, [pathname]);

    return (
        <View
            className="absolute bottom-4 left-4 right-4 rounded-full flex-row justify-around items-center py-1/2 border-[1.5px] border-orange-500"
            style={{ backgroundColor: '#FED20F', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 }}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                // Usamos la variante outline cuando está inactivo
                const iconName = isActive ? tab.icon : `${tab.icon}-outline`;

                return (
                    <Pressable
                        key={tab.id}
                        onPress={() => {
                            setActiveTab(tab.id);
                            router.push(tab.route);
                        }}
                        className={`p-3 rounded-full transition-all duration-200 ${isActive ? 'bg-orange-100' : 'bg-transparent'}`}
                    >
                        <Ionicons
                            name={iconName as any}
                            size={26}
                            // Naranja vibrante para el activo, contorno negro para inactivos
                            color={isActive ? "#f97316" : "#000000"}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};

export default BarrNaveg;
