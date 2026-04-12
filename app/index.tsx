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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <Header />
        <Catalogo />
        <FlutterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
