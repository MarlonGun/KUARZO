import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import Carrusel from "@/components/Carrusel";
import api from "@/src/services/api";
import { useCartStore } from "@/src/store/useCartStore";
import { resolveProductImage } from "@/src/utils/imageHelper";

const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const goToDetail = (item: any) =>
  router.push({
    pathname: "/detalleProd",
    params: {
      id: item.id || item.nombre,
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      imagen: item.imagen,
      categoria: item.categoria || "",
      stock: item.stock || 0,
    },
  });

const HomeWeb = () => {
  const { addItem } = useCartStore();
  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 900;

  const banners = [
    require('@/assets/images/joya1.png'),
    require('@/assets/images/joya2.png'),
    require('@/assets/images/joya3.png')
  ];
  const [featuredCarousel1, setFeaturedCarousel1] = useState<any[]>([]);
  const [featuredCarousel2, setFeaturedCarousel2] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Productos DESTACADOS para los carruseles (máximo 10)
        const destacadosRes = await api.get("/productos/destacados");
        if (destacadosRes.data && Array.isArray(destacadosRes.data)) {
          const mappedDestacados = destacadosRes.data.map((p: any) => ({
            id: String(p.id),
            nombre: p.nombre,
            descripcion: p.descripcion || "",
            categoria: p.categoriaNombre || (p.categoria && typeof p.categoria === "object" ? p.categoria.nombre : (p.categoria || "General")),
            precio: Number(p.precio),
            imagen: resolveProductImage(p),
            stock: p.stock ?? p.cantidad ?? 0,
            imagenes: p.imagenes,
          }));
          setFeaturedCarousel1(shuffleArray(mappedDestacados));
          setFeaturedCarousel2(shuffleArray(mappedDestacados));
        }
      } catch (error) {
        console.error("Error al cargar productos en HomeWeb desde la API:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        {/* 1. HEADER WEB */}
        <AppHeader platform="web" />

        {/* 2. BANNER PROMOCIONAL */}
        <View>
          <Carrusel
            type="images"
            images={banners}
            showDots={true}
            autoPlay={true}
          />
        </View>

        {/* CONTENEDOR CENTRADO PARA PRODUCTOS DESTACADOS */}
        <View style={{ maxWidth: 1350, width: '100%', alignSelf: 'center', paddingHorizontal: 20 }}>
          {/* 3. PRODUCTOS DESTACADOS */}
          <View style={{ alignItems: 'center', marginTop: 80, marginBottom: 40 }}>
            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#000000', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center' }}>
              PRODUCTOS DESTACADOS
            </Text>
          </View>

          <View style={{ marginBottom: 40 }}>
            <Carrusel
              type="products"
              products={featuredCarousel1}
              onProductPress={goToDetail}
            />
          </View>
          
          <View style={{ marginBottom: 80 }}>
            <Carrusel
              type="products"
              products={featuredCarousel2}
              onProductPress={goToDetail}
            />
          </View>
        </View>

        {/* 4. CUADRO NEGRO EXTENDIDO FULL WIDTH */}
        <View style={{
          width: '100%',
          backgroundColor: '#111827',
          paddingVertical: isSmallScreen ? 60 : 80,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'Roboto-Bold',
            fontSize: isSmallScreen ? 32 : 48,
            textAlign: 'center',
            marginBottom: 30,
            textTransform: 'uppercase'
          }}>
            Descubre Más Productos
          </Text>

          <CustomButton
            onPress={() => router.push("/catalogo")}
            children="Ir al Catálogo"
            className={isSmallScreen ? "w-full text-base max-w-[300px]" : "w-auto px-16 text-lg"}
          />
        </View>

        {/* 5. FOOTER WEB */}
        <AppFooter platform="web" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeWeb;
