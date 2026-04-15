import { CardProduct } from "@/components/CardProduct";
import BarrNaveg from "@/components/BarrNaveg";
import BarraBusquedaMovil from "@/components/BarraBusquedaMovil";
import FlutterComponent from "@/components/Flutter";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import { router } from "expo-router";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
};

const productos: Producto[] = [
  {
    id: "pulsera-volcanica",
    nombre: "Pulsera Volcánica",
    descripcion: "Pulsera hecha con piedras volcánicas",
    categoria: "Pulseras",
    precio: 45000,
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cadena-oro",
    nombre: "Cadena Oro Rosa",
    descripcion: "Cadena hecha con oro rosa",
    categoria: "Cadenas",
    precio: 120000,
    imagen:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cadena-plata",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "anillo-esmeralda",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "anillo-clasico",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aretes-perla",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aretes-cristal",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tobillera-luna",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tobillera-estrella",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
];

const secciones = [
  {
    titulo: "TODOS",
    categorias: ["Pulseras", "Cadenas", "Anillos", "Aretes", "Tobilleras"]
  },
] as const;



const CatalogoScreen = () => {
  const { width } = useWindowDimensions();
  const esMobile = width < 768;
  const [grupoActivo, setGrupoActivo] = useState("TODOS");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const esDesktop = width >= 980;
  const grillaCompacta = width >= 1220;
  const seccionActiva =
    secciones.find((seccion) => seccion.titulo === grupoActivo) ?? secciones[0];
  const productosFiltrados = productos.filter((producto) => {
    return categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white" contentContainerStyle={esMobile ? { paddingBottom: 110 } : undefined}>
        {esMobile ? (
          <View style={{ backgroundColor: "#FED20F" }}>
            <BarraBusquedaMovil />
          </View>
        ) : (
          <Header />
        )}

        <View className="px-5 pt-6 bg-white w-full">
            <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={20} color="#111827" />
                <Text className="font-roboto-bold text-sm text-[#111827]">
                    Volver
                </Text>
            </Pressable>
        </View>

        {/* CATÁLOGO */}
        <View className="bg-white px-4 py-8">
          <View className="mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] bg-white px-4 py-5 shadow-sm md:px-5">
            <View className={esDesktop ? "flex-row" : "flex-col"}>
              <View
                className={
                  esDesktop
                    ? "w-52 border-r border-[#eef1f5] pr-5"
                    : "border-b border-[#eef1f5] pb-5"
                }
              >
                <View className="mb-8 flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-2xl border border-[#f6f7fb] bg-[#FFFFFF]">
                    <MaterialIcons name="diamond" size={20} color="#000000" />
                  </View>
                  <View>
                    <Text className="font-roboto-bold text-lg text-quaternary-950">
                      KUARZO
                    </Text>
                    <Text className="font-opensans-regular text-xs uppercase text-[#000000]">
                      Catalogo
                    </Text>
                  </View>
                </View>

                {secciones.map((seccion) => (
                  <View key={seccion.titulo} className="mb-6">
                    <Pressable
                      className="mb-3 flex-row items-center gap-2"
                      onPress={() => {
                        setGrupoActivo(seccion.titulo);
                        setCategoriaActiva("Todos");
                      }}
                    >
                      <MaterialIcons
                        name={
                          grupoActivo === seccion.titulo
                            ? "keyboard-arrow-down"
                            : "chevron-right"
                        }
                        size={16}
                        color="#000000"
                      />
                      <Text className="font-roboto-bold text-xs uppercase tracking-[2px] text-[#000000]">
                        {seccion.titulo}
                      </Text>
                    </Pressable>

                    {grupoActivo === seccion.titulo ? (
                      <View className="gap-3 pl-6">
                        {seccion.categorias.map((categoria) => (
                          <Pressable
                            key={categoria}
                            onPress={() => setCategoriaActiva(categoria)}
                          >
                            <Text
                              className={`font-opensans-regular text-sm ${categoriaActiva === categoria
                                ? "text-[#111827]"
                                : "text-[#9ca3af]"
                                }`}
                            >
                              {categoria}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>

              <View className={esDesktop ? "flex-1 pl-6" : "w-full pt-5"}>
                <View
                  className={`mb-6 gap-4 ${esDesktop ? "flex-row items-center justify-between" : "flex-col items-stretch"}`}
                >
                  <View className={`gap-3 ${esDesktop ? "flex-row items-center" : "flex-row flex-wrap items-center"}`}>
                    <View className="rounded-lg bg-[#f6f7fb] px-3 py-2">
                      <Text className="font-opensans-regular text-xs text-[#6b7280]">
                        {seccionActiva.titulo} / {categoriaActiva}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mb-4 flex-row items-center justify-between">
                  <View>
                    <Text className="font-roboto-bold text-xl text-[#000000]">
                      Productos
                    </Text>
                    <Text className="font-opensans-regular text-sm text-[#9ca3af]">
                      {productosFiltrados.length} Resultados
                    </Text>
                  </View>
                </View>

                <ScrollView
                  className="max-h-[600px] w-full"
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  <View className="flex-row flex-wrap -mx-[1%]">
                    {productosFiltrados.map((producto) => (
                      <View
                        key={producto.id}
                        style={{
                          width: esDesktop ? (grillaCompacta ? "18%" : "31.33%") : "48%",
                        }}
                        className="mb-8 mx-[1%]"
                      >
                        <CardProduct producto={producto} />
                      </View>
                    ))}
                  </View>
                </ScrollView>
                {productosFiltrados.length === 0 ? (
                  <View className="rounded-2xl bg-[#f6f7fb] px-6 py-12">
                    <Text className="text-center font-roboto-bold text-lg text-[#111827]">
                      No hay productos para este filtro
                    </Text>
                    <Text className="mt-2 text-center font-opensans-regular text-sm text-[#9ca3af]">
                      Prueba otra categoria o cambia el texto de busqueda.
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        {!esMobile ? <FlutterComponent /> : null}
      </ScrollView>
      {esMobile ? <BarrNaveg /> : null}
    </SafeAreaView>
  );
};

export default CatalogoScreen;
