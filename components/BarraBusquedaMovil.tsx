import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Pressable, StyleProp, TextInput, View, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { useProductStore, ProductData } from '@/src/store/useProductStore';

const BarraBusquedaMovil = ({ className = "", style }: { className?: string, style?: StyleProp<ViewStyle> }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ProductData[]>([]);
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.trim().length > 0) {
            const filtered = products.filter(p => 
                p.nombre.toLowerCase().includes(text.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectProduct = (producto: ProductData) => {
        setSearchQuery('');
        setSuggestions([]);
        router.push({
            pathname: '/detalleProd',
            params: {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                imagen: producto.imagen,
                categoria: producto.categoria,
                stock: producto.stock
            }
        });
    };

    return (
        <View className={`w-full px-4 py-3 ${className}`} style={[style, { zIndex: 50 }]}>
            <View className="flex-row items-center w-full h-11 px-4 bg-white border border-gray-300 rounded-full z-50">
                <TextInput
                    placeholder="Buscar..."
                    className="flex-1 h-full text-base text-gray-800 font-normal outline-none"
                    placeholderTextColor="quaternary-950"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Pressable className="ml-2">
                    <MaterialIcons name="search" size={20} color="quaternary-500" />
                </Pressable>
            </View>
            
            {/* Dropdown de Sugerencias */}
            {suggestions.length > 0 && (
                <View style={{
                    position: 'absolute',
                    top: 55,
                    left: 16,
                    right: 16,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    zIndex: 60
                }}>
                    {suggestions.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={{ paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                            onPress={() => handleSelectProduct(item)}
                        >
                            <Text style={{ fontFamily: 'OpenSans-Regular', color: '#374151', fontSize: 14 }}>
                                {item.nombre}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default BarraBusquedaMovil;
