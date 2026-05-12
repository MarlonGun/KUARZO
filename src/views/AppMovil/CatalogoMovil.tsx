import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import { usePlatform } from "@/hooks/usePlatform";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
};

const productos: Producto[] = [
  /*Pulseras*/
  {
    id: "pulsera-volcanica",
    nombre: "Pulsera Volcánica",
    descripcion: "Pulsera hecha con piedras volcánicas",
    categoria: "Pulseras",
    precio: 45000,
    imagen: "/assets/productos/Pulsera/PULSERA1.jpg",
  },
  {
    id: "pulsera-premium-1",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA2.jpg",
  },
  {
    id: "pulsera-premium-2",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA3.jpg",
  },
  {
    id: "pulsera-premium-3",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA4.jpg",
  },
  {
    id: "pulsera-premium-4",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA5.jpg",
  },
  {
    id: "pulsera-premium-5",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA6.jpg",
  },
  {
    id: "pulsera-premium-6",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA7.jpg",
  },
  {
    id: "pulsera-premium-7",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA8.jpg",
  },
  {
    id: "pulsera-premium-8",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA9.jpg",
  },
  {
    id: "pulsera-premium-9",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "/assets/productos/Pulsera/PULSERA10.jpg",
  },

  /*Cadenas*/
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

  /*Anillos*/
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

  /*Aretes*/
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

  /*Tobilleras*/
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

const PRODUCT_GRID_SPACING = {
  itemHorizontalPadding: 8,
  itemVerticalMargin: 32,
  desktopWidth: "18.3%",
  tabletWidth: "48%",
  mobileWidth: "100%",
};

const CatalogoScreen = () => {
  const { width } = useWindowDimensions();
  const platform = usePlatform();
  const [grupoActivo, setGrupoActivo] = useState("TODOS");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const isMobileWidth = width < 680;
  const isTabletWidth = width >= 680 && width < 980;
  const esDesktop = width >= 980;
  const seccionActiva =
    secciones.find((seccion) => seccion.titulo === grupoActivo) ?? secciones[0];

  const productosFiltrados = productos.filter((producto) => {
    return categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        {/* HEADER */}
        <AppHeader platform={platform} />

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
          <View className="w-full bg-white px-5 py-5">
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

              <View className={esDesktop ? "flex-1 pl-6" : "pt-5"}>
                <View
                  className={`mb-6 items-center justify-between gap-4 ${esDesktop ? "flex-row" : "flex-col"}`}
                >

                  <View className="flex-row items-center gap-3">
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
                  className="max-h-[600px]"
                  contentContainerStyle={{ paddingBottom: 140 }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  <View className="flex-row flex-wrap justify-between">
                    {productosFiltrados.map((producto) => {
                      const itemWidth = esDesktop
                        ? PRODUCT_GRID_SPACING.desktopWidth
                        : isTabletWidth
                          ? PRODUCT_GRID_SPACING.tabletWidth
                          : PRODUCT_GRID_SPACING.mobileWidth;

                      const itemPadding = (esDesktop || isTabletWidth)
                        ? PRODUCT_GRID_SPACING.itemHorizontalPadding
                        : 0;

                      return (
                        <View
                          key={producto.id}
                          style={{
                            width: itemWidth,
                            paddingHorizontal: itemPadding,
                            marginBottom: PRODUCT_GRID_SPACING.itemVerticalMargin,
                          }}
                        >
                          <CardProduct producto={producto} />
                        </View>
                      );
                    })}
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
        <AppFooter platform={platform} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatalogoScreen;
