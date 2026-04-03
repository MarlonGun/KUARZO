import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { CardProduct } from '../components/CardProduct';
import Carrusel from '../components/Carrusel';
import CustomButton from '../components/CustomButton';
import FlutterComponent from '../components/Flutter';
import Header from '../components/header';

const App = () => {

  // Datos de prueba para mostrar el CardProduct y el Carrusel
  const sampleProducts = [
    {
      nombre: "Pulsera Piedra Volcánica",
      descripcion: "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop"
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
    }
  ];

  // Datos para el banner promocional
  const promoBanners = [
    { id: 1, imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" }
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>

      {/* 1. HEADER */}
      <View className="mb-4">
        <View className="border-t border-b border-gray-200">
          <Header />
        </View>
      </View>

      {/* BANNER PROMOCIONAL (Carrusel Automático) */}
      <View className="mb-8">
        <Text className="text-gray-500 font-bold px-4 mb-3 text-xs uppercase tracking-widest">Ofertas y Promociones</Text>
        <Carrusel
          data={promoBanners}
          renderItem={(item) => (
            // 👇 AQUÍ PUEDES MODIFICAR LA ALTURA DEL CARRUSEL (ejemplos: h-48, h-64, h-72, h-80) 👇
            <View className="w-full h-80 px-4">
              <Image
                source={{ uri: item.imagen }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      {/* 2. CUSTOM BUTTON */}
      <View className="mb-8 px-4">
        <CustomButton children="Botón Primario" color="primary" className='w-full mb-3' />
        <CustomButton children="Botón Secundario" color="secondary" className='w-full' />
      </View>

      {/* 3. CARD PRODUCT */}
      <View className="mb-8 px-4">
        <View className="items-center">
          <CardProduct producto={sampleProducts[0]} />
        </View>
      </View>

      {/* 5. PIE DE PÁGINA (FooterComponent importado desde Flutter.tsx) 
          Al estar fuera del View con flex-1, siempre se anclará al fondo */}
      <FlutterComponent />

    </ScrollView>
  )
}

export default App
