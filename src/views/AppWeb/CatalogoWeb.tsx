import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import { usePlatform } from "@/hooks/usePlatform";
import api from "@/src/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { resolveProductImage } from "@/src/utils/imageHelper";
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
  const [productosList, setProductosList] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/productos");
        if (response.data && Array.isArray(response.data)) {
          const mapped = response.data.map((p: any) => ({
            id: String(p.id),
            nombre: p.nombre,
            descripcion: p.descripcion || "",
            categoria: p.categoriaNombre || (p.categoria && typeof p.categoria === "object" ? p.categoria.nombre : (p.categoria || "General")),
            precio: Number(p.precio),
            imagen: resolveProductImage(p),
            stock: p.stock ?? p.cantidad ?? 0,
          }));
          setProductosList(mapped);
        }
      } catch (error) {
        console.error("Error al cargar productos desde la API:", error);
      }
    };
    fetchProductos();
  }, []);

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

  const productosFiltrados = productosList.filter((producto) => {
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
