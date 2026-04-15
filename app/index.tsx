import BarrNaveg from "@/components/BarrNaveg";
import BarraBusquedaMovil from "@/components/BarraBusquedaMovil";
import Catalogo from "@/components/Catalogo";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carrusel from "../components/Carrusel";
import FlutterComponent from "../components/Flutter";
import Header from "../components/header";

const App = () => {
  const { width } = useWindowDimensions();
  const esMobile = width < 768;

  // Datos de prueba para mostrar el CardProduct y el Carrusel
  const sampleProducts = [
    {
      nombre: "Pulsera Piedra Volcánica",
      descripcion:
        "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
      precio: 45000,
      imagen:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Premium",
      descripcion:
        "Elegante pulsera con acabados premium para cualquier ocasión.",
      precio: 55000,
      imagen:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen:
        "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen:
        "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Piedra Volcánica",
      descripcion:
        "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
      precio: 45000,
      imagen:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Premium",
      descripcion:
        "Elegante pulsera con acabados premium para cualquier ocasión.",
      precio: 55000,
      imagen:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen:
        "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Clásica",
      descripcion: "Diseño minimalista ideal para el uso diario.",
      precio: 35000,
      imagen:
        "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
    },
  ];

  const sampleProducts2 = [
    {
      nombre: "Pulsera Piedra Volcánica",
      descripcion:
        "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
      precio: 45000,
      imagen:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
    },
    {
      nombre: "Pulsera Premium",
      descripcion:
        "Elegante pulsera con acabados premium para cualquier ocasión.",
      precio: 55000,
      imagen:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  // Datos para el banner promocional
  const promoBanners = [
    {
      id: 1,
      imagen:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      imagen:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={esMobile ? { paddingBottom: 110 } : undefined}
      >
        {esMobile ? (
          <View style={{ backgroundColor: "#FED20F" }}>
            <BarraBusquedaMovil />
          </View>
        ) : (
          <Header />
        )}

        {/* BANNER PROMOCIONAL (Carrusel Automático) */}
        <View>
          <Carrusel
            type="images"
            images={promoBanners.map((b) => b.imagen)}
            showDots={true}
            autoPlay={true}
          />
        </View>

        {/* 3. PRODUCTOS RECOMENDADOS (USANDO CARRUSEL) */}
        <View className="items-center px-4 py-10">
          <Text className="text-gray-500 font-roboto-bold px-4 mb-3 text-xl uppercase tracking-widest">
            PRODUCTOS DESTACADOS
          </Text>
        </View>
        <View className={esMobile ? "mb-8 px-4 py-4" : "mb-8 mx-80 px-8 py-10"}>
          <Carrusel
            type="products"
            products={sampleProducts}
            onProductPress={(item) =>
              router.push({
                pathname: "/detalleProd",
                params: {
                  id: item.id || item.nombre,
                  nombre: item.nombre,
                  descripcion: item.descripcion,
                  precio: item.precio,
                  imagen: item.imagen,
                  categoria: item.categoria || "",
                },
              })
            }
          />
        </View>

        {/* 3. PRODUCTOS RECOMENDADOS SEGUNDA PARTE (USANDO CARRUSEL) */}
        <View
          className={esMobile ? "mb-8 px-4" : "mb-20 mx-80 flex flex-row px-8"}
        >
          <Carrusel
            type="products"
            products={sampleProducts2}
            onProductPress={(item) =>
              router.push({
                pathname: "/detalleProd",
                params: {
                  id: item.id || item.nombre,
                  nombre: item.nombre,
                  descripcion: item.descripcion,
                  precio: item.precio,
                  imagen: item.imagen,
                  categoria: item.categoria || "",
                },
              })
            }
          />
          <View
            className={
              esMobile
                ? "mt-4 w-full bg-quaternary-950 px-4 py-8"
                : "w-full bg-quaternary-950"
            }
          >
            <Text className="text-quaternary-500 font-roboto-bold text-3xl ml-10 mt-20">
              MAS
            </Text>
            <Text className="text-quaternary-500 font-roboto-bold text-5xl ml-10">
              PRODUCTOS
            </Text>
            <CustomButton
              className="bg-primary rounded-md font-roboto-bold w-60 h-10 ml-10 mt-10 justify-center items-center"
              onPress={() => router.push("/catalogo")}
            >
              Ver mas
            </CustomButton>
          </View>
        </View>

        {esMobile ? <Catalogo /> : null}

        {/* 5. PIE DE PÁGINA */}
        {!esMobile ? <FlutterComponent /> : null}
      </ScrollView>
      {esMobile ? <BarrNaveg /> : null}
    </SafeAreaView>
  );
};

export default App;
