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
    imagen: "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg",
  },
  {
    id: "pulsera-premium-1",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/Mp0VvfWq/PULSERA2.jpg",
  },
  {
    id: "pulsera-premium-2",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/y8hck3VB/PULSERA3.jpg",
  },
  {
    id: "pulsera-premium-3",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/2SdhVLzk/PULSERA4.jpg",
  },
  {
    id: "pulsera-premium-4",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/9QPZrwWF/PULSERA5.jpg",
  },
  {
    id: "pulsera-premium-5",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/jS6PLnsS/PULSERA6.jpg",
  },
  {
    id: "pulsera-premium-6",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/hGSxx4jF/PULSERA7.jpg",
  },
  {
    id: "pulsera-premium-7",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/7Lx77P6r/PULSERA8.jpg",
  },
  {
    id: "pulsera-premium-8",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/8C1WWk5V/PULSERA9.jpg",
  },
  {
    id: "pulsera-premium-9",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "https://i.postimg.cc/LsHff4XS/PULSERA10.jpg",
  },

  /*Cadenas*/
  {
    id: "cadena-oro-1",
    nombre: "Cadena Oro Rosa",
    descripcion: "Cadena hecha con oro rosa",
    categoria: "Cadenas",
    precio: 120000,
    imagen:
      "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg",
  },
  {
    id: "cadena-plata-2",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/6q7C3HQh/CADENA2.jpg",
  },
  {
    id: "cadena-plata-3",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/J0yjnTh5/CADENA3.jpg",
  },
  {
    id: "cadena-plata-4",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/SRXcsZKV/CADENA4.jpg",
  },
  {
    id: "cadena-plata-5",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/4yKpd83W/CADENA5.jpg",
  },
  {
    id: "cadena-plata-6",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/GtBv2Mp7/CADENA6.jpg",
  },
  {
    id: "cadena-plata-7",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/Y04Q9XSy/CADENA7.jpg",
  },
  {
    id: "cadena-plata-8",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/2yqn6H5M/CADENA8.jpg",
  },
  {
    id: "cadena-plata-9",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/nrsqzdLN/CADENA9.jpg",
  },
  {
    id: "cadena-plata-10",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://i.postimg.cc/MHc1TsGC/CADENA10.jpg",
  },

  /*Anillos*/
  {
    id: "anillo-esmeralda-1",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg",
  },
  {
    id: "anillo-clasico-2",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://i.postimg.cc/y8RnnNsf/ANILLO2.jpg",
  },
  {
    id: "anillo-esmeralda-3",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://i.postimg.cc/8zvwwCNZ/ANILLO3.jpg",
  },
  {
    id: "anillo-clasico-4",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://i.postimg.cc/DwG55zn5/ANILLO4.jpg",
  },
  {
    id: "anillo-esmeralda-5",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://i.postimg.cc/JzXKKhMv/ANILLO5.jpg",
  },
  {
    id: "anillo-clasico-6",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://i.postimg.cc/bwnLLvp5/ANILLO6.jpg",
  },
  {
    id: "anillo-esmeralda-7",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://i.postimg.cc/vZnXXmbN/ANILLO7.jpg",
  },
  {
    id: "anillo-clasico-8",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://i.postimg.cc/QMrmzrd0/ANILLO8.jpg",
  },
  {
    id: "anillo-esmeralda-9",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://i.postimg.cc/43TP0TxW/ANILLO9.jpg",
  },
  {
    id: "anillo-clasico-10",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://i.postimg.cc/HLCzNCkS/ANILLO10.jpg",
  },

  /*Aretes*/
  {
    id: "aretes-perla-1",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg",
  },
  {
    id: "aretes-cristal-2",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://i.postimg.cc/d1V2MQPR/ARETE2.jpg",
  },
  {
    id: "aretes-perla-3",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://i.postimg.cc/VNRqHrTH/ARETE3.jpg",
  },
  {
    id: "aretes-cristal-4",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://i.postimg.cc/YS36yGVs/ARETE4.jpg",
  },
  {
    id: "aretes-perla-5",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://i.postimg.cc/V6kqysQW/ARETE5.jpg",
  },
  {
    id: "aretes-cristal-6",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://i.postimg.cc/wvjXKx82/ARETE6.jpg",
  },
  {
    id: "aretes-perla-7",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://i.postimg.cc/B6nTWZ9N/ARETE7.jpg",
  },
  {
    id: "aretes-cristal-8",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://i.postimg.cc/JnzNw7VP/ARETE8.jpg",
  },
  {
    id: "aretes-perla-9",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://i.postimg.cc/rmw16yXf/ARETE9.jpg",
  },
  {
    id: "aretes-cristal-10",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://i.postimg.cc/tT430RQS/ARETE10.jpg",
  },

  /*Tobilleras*/
  {
    id: "tobillera-luna-1",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg",
  },
  {
    id: "tobillera-estrella-2",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://i.postimg.cc/PxJw36Y2/TOBILLERA2.jpg",
  },
  {
    id: "tobillera-luna-3",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://i.postimg.cc/ZRnd7fpQ/TOBILLERA3.jpg",
  },
  {
    id: "tobillera-estrella-4",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://i.postimg.cc/mDkHXdC5/TOBILLERA4.jpg",
  },
  {
    id: "tobillera-luna-5",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://i.postimg.cc/k4Gb1jK0/TOBILLERA5.jpg",
  },
  {
    id: "tobillera-estrella-6",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://i.postimg.cc/MTHQPs12/TOBILLERA6.jpg",
  },
  {
    id: "tobillera-luna-7",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://i.postimg.cc/Tw1D7kn6/TOBILLERA7.jpg",
  },
  {
    id: "tobillera-estrella-8",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://i.postimg.cc/cHCn9DfW/TOBILLERA8.jpg",
  },
  {
    id: "tobillera-luna-9",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://i.postimg.cc/MTHQPs1q/TOBILLERA9.jpg",
  },
  {
    id: "tobillera-estrella-10",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://i.postimg.cc/85c6KyLp/TOBILLERA10.jpg",
  },
];

const secciones = [
  {
    titulo: "TODOS",
    categorias: [
      "Todos",
      "Pulseras",
      "Cadenas",
      "Anillos",
      "Aretes",
      "Tobilleras",
    ],
  },
] as const;

const PRODUCT_GRID_SPACING = {
  itemHorizontalPadding: 8,
  itemVerticalMargin: 32,
  desktopWidth: "18.3%",
  mobileWidth: "47%",
} as const;

const CatalogoScreen = () => {
  const { width } = useWindowDimensions();
  const platform = usePlatform();
  const [grupoActivo, setGrupoActivo] = useState("TODOS");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const isLargeDesktop = width >= 1200;
  const isDesktop = width >= 980;
  const isTablet = width >= 600 && width < 980;
  const isMobile = width < 600;

  const getProductWidth = () => {
    if (width >= 1200) return "18.3%"; // 5 columnas
    if (width >= 900) return "23%";    // 4 columnas
    if (width >= 600) return "31%";    // 3 columnas
    return "47%";                     // 2 columnas
  };

  const seccionActiva =
    secciones.find((seccion) => seccion.titulo === grupoActivo) ?? secciones[0];

  const productosFiltrados = productos.filter((producto) => {
    return (
      categoriaActiva === "Todos" ||
      producto.categoria === categoriaActiva
    );
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

        <View className="bg-white px-0 py-8">
          <View className="w-full bg-white px-2 py-5">
            <View className={isDesktop ? "flex-row" : "flex-col"}>
              <View
                className={
                  isDesktop
                    ? "w-52 border-r border-[#eef1f5] pr-5"
                    : "border-b border-[#eef1f5] pb-5 mb-5"
                }
              >
                <View className="mb-8 flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-2xl border border-[#f6f7fb] bg-[#FFFFFF]">
                    <MaterialIcons name="diamond" size={20} color="#000000" />
                  </View>
                  <View>
                    <Text className="font-roboto-bold text-lg text-quaternary-950">
                      CATALOGO
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
              {/*   CONTENIDO PRINCIPAL  */}
              <View className={isDesktop ? "flex-1 pl-6" : "pt-0"}>
                <View
                  className={`mb-6 items-center justify-between gap-4 ${isDesktop ? "flex-row" : "flex-col"}`}
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
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  <View className="flex-row flex-wrap">
                    {productosFiltrados.map((producto) => {
                      const itemWidth = getProductWidth();
                      const itemPadding = PRODUCT_GRID_SPACING.itemHorizontalPadding;

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
