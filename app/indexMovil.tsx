import BarrNaveg from '@/components/BarrNaveg';
import { CardProduct } from '@/components/CardProduct';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BarraBusquedaMovil from '../components/BarraBusquedaMovil';
import Carrusel from '../components/Carrusel';

const AppMovil = () => {
    const sampleProducts = [
        {
            nombre: "Pulsera Piedra Volcánica",
            descripcion: "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
            precio: 45000,
            imagen: "https://iconicstr.com/pulsera-con-piedra-volcanica-8mm?srsltid=AfmBOoqfzBtFwmPCE8FxGELbxY2A4BBi5iK9Oj0sWQTYTiVjCw6rtnop"
        },
        {
            nombre: "Pulsera Premium",
            descripcion: "Elegante pulsera con acabados premium para cualquier ocasión.",
            precio: 55000,
            imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop"
        },
        {
            nombre: "Pulsera Clásica",
            descripcion: "Diseño minimalista ideal para el uso diario.",
            precio: 35000,
            imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop"
        },
        {
            nombre: "Pulsera Tejida",
            descripcion: "Diseño sencillo y moderno para el uso diario.",
            precio: 25000,
            imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop"
        }

    ];

    const promoBanners = [
        { id: 1, imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" },
        { id: 2, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" }
    ];

    return (
        <View className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ backgroundColor: 'white', paddingBottom: 120, paddingHorizontal: 16 }}>

                <View className="mb-4 pt-1" style={{ backgroundColor: '#FED20F' }}>
                    <BarraBusquedaMovil />
                </View>

                <View className="mb-8">
                    <Text className="text-gray-500 font-bold mb-3 text-xs uppercase tracking-widest">Ofertas y Promociones</Text>
                    <Carrusel
                        type="images"
                        images={promoBanners.map(b => b.imagen)}
                        showDots={true}
                        autoPlay={true}
                    />
                </View>

                <View className='mb-8'>
                    <Text className='text-gray-500 font-bold mb-3 text-xs uppercase tracking-widest'>Productos Destacados</Text>

                    <View className="flex-col">
                        {sampleProducts.map((prod, index) => (
                            <View key={index} className="w-full mb-4 rounded-2xl">
                                <CardProduct producto={prod} variant="mobile" />
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>

            <BarrNaveg />

        </View>
    );
};

export default AppMovil;
