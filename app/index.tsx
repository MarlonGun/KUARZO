import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Catalogo from "../components/Catalogo";
import FlutterComponent from "../components/Flutter";
import Header from "../components/header";

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
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop"
    },
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
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop"
    }
  ];

  const sampleProducts2 = [
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
    }
  ];

  // Datos para el banner promocional
  const promoBanners = [
    { id: 1, imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" }
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='flex-1 bg-white'>
        {/* 1. HEADER */}
        <Header />

        {/* BANNER PROMOCIONAL (Carrusel Automático) */}
        <View>
          <Carrusel
            type="images"
            images={promoBanners.map(b => b.imagen)}
            showDots={true}
            autoPlay={true}
          />
        </View>

        {/* 3. PRODUCTOS RECOMENDADOS (USANDO CARRUSEL) */}
        <View className="items-center px-4 py-10">
          <Text className="text-gray-500 font-roboto-bold px-4 mb-3 text-xl uppercase tracking-widest">PRODUCTOS DESTACADOS</Text>
        </View>
        <View className="mb-8 mx-80 px-8 py-10">
          <Carrusel
            type="products"
            products={sampleProducts}
            onProductPress={(item) => console.log('Producto seleccionado:', item.nombre)}
          />
        </View>

        {/* 3. PRODUCTOS RECOMENDADOS SEGUNDA PARTE (USANDO CARRUSEL) */}
        <View className="mb-20 mx-80 px-8 flex flex-row">
          <Carrusel
            type="products"
            products={sampleProducts2}
            onProductPress={(item) => console.log('Producto seleccionado:', item.nombre)}
          />
          <View className='bg-quaternary-950 w-full'>
            <Text className='text-quaternary-500 font-roboto-bold text-3xl ml-10 mt-20'>MAS</Text>
            <Text className='text-quaternary-500 font-roboto-bold text-5xl ml-10'>PRODUCTOS</Text>
            <CustomButton children='Ver mas' className='bg-primary rounded-md font-roboto-bold w-60 h-10 ml-10 mt-10 justify-center items-center' />
          </View>
        </View>

        {/* 5. PIE DE PÁGINA */}
        <FlutterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
