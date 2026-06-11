import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import Carrusel from "@/components/Carrusel";
import { promoBanners, sampleProducts, sampleProducts2 } from "@/src/data/mockData";
import { useCartStore } from "@/src/store/useCartStore";
import api from "@/src/services/api";
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
    },
  });

const HomeWeb = () => {
  const { addItem } = useCartStore();
  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 900;

  const [banners, setBanners] = useState<string[]>(() => 
    shuffleArray(promoBanners.map((b) => b.imagen))
  );
  const [featuredProducts, setFeaturedProducts] = useState<any[]>(() => 
    shuffleArray(sampleProducts)
  );
  const [extraProducts, setExtraProducts] = useState<any[]>(() => 
    shuffleArray(sampleProducts2)
  );

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/productos");
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const mapped = response.data.map((p: any) => ({
            id: String(p.id),
            nombre: p.nombre,
            descripcion: p.descripcion || "",
            categoria: p.categoriaNombre || (p.categoria && typeof p.categoria === "object" ? p.categoria.nombre : (p.categoria || "General")),
            precio: Number(p.precio),
            imagen: resolveProductImage(p),
          }));

          const shuffled = shuffleArray(mapped);

          // 1. Carrusel de Banners (arriba): tomamos hasta 3 imágenes de productos aleatorios
          const bannerImages = shuffled.slice(0, 3).map((p) => p.imagen);
          if (bannerImages.length > 0) {
            setBanners(bannerImages);
          }

          // 2. Productos Destacados: tomamos hasta 8 productos aleatorios
          const featured = shuffled.slice(0, Math.min(8, shuffled.length));
          setFeaturedProducts(featured);

          // 3. Más Productos (los 2 destacados al lado del cuadro negro)
          let extra: any[] = [];
          if (shuffled.length >= 2) {
            extra = [shuffled[shuffled.length - 1], shuffled[shuffled.length - 2]];
          } else if (shuffled.length === 1) {
            extra = [shuffled[0], shuffled[0]];
          }
          setExtraProducts(extra);
        }
      } catch (error) {
        console.error("Error al cargar productos en HomeWeb desde la API:", error);
      }
    };
    fetchProductos();
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
          <View style={{ alignItems: 'center', marginVertical: 80 }}>
            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#000000', textTransform: 'uppercase', letterSpacing: 2 }}>
              PRODUCTOS DESTACADOS
            </Text>
          </View>

          <View style={{ marginBottom: 80 }}>
            <Carrusel
              type="products"
              products={featuredProducts}
              onProductPress={goToDetail}
            />
          </View>
        </View>

        {/* 4. SEGUNDA SECCIÓN: 2 PRODUCTOS + CUADRO NEGRO EXTENDIDO */}
        <View style={{ 
            flexDirection: isSmallScreen ? 'column' : 'row', 
            marginBottom: 80, 
            width: '100%',
        }}>
            {/* Espaciador izquierdo - Solo se muestra en desktop */}
            {!isSmallScreen && (
                <View style={{ width: Math.max(0, (windowWidth - 1350) / 2) + 20 }} />
            )}
            
            {/* Los 2 productos */}
            <View style={{ 
                flexDirection: isSmallScreen ? 'column' : 'row', 
                gap: 20, 
                width: isSmallScreen ? '100%' : (Math.min(windowWidth, 1350) - 40) * 0.5,
                paddingHorizontal: isSmallScreen ? 20 : 0
            }}>
                {extraProducts[0] && (
                  <View style={{ flex: 1 }}>
                      <CardProduct producto={extraProducts[0]} />
                  </View>
                )}
                {extraProducts[1] && (
                  <View style={{ flex: 1 }}>
                      <CardProduct producto={extraProducts[1]} />
                  </View>
                )}
            </View>

            {/* Cuadro Negro a la derecha */}
            <View style={{
                flex: 1,
                backgroundColor: '#000000',
                padding: isSmallScreen ? 30 : 50,
                justifyContent: 'center',
                marginLeft: isSmallScreen ? 0 : 20,
                marginTop: isSmallScreen ? 20 : 0
            }}>
                <Text style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Bold',
                    fontSize: isSmallScreen ? 32 : 42,
                    lineHeight: isSmallScreen ? 36 : 46,
                    marginBottom: 20,
                    textTransform: 'uppercase'
                }}>
                    Mas{"\n"}Productos
                </Text>

                <CustomButton
                  onPress={() => router.push("/catalogo")}
                  children="Ver más"
                  className={isSmallScreen ? "w-full text-base" : "w-1/2 text-base"}
                />
            </View>
        </View>

        {/* 5. FOOTER WEB */}
        <AppFooter platform="web" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeWeb;
