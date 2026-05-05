import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import Carrusel from "@/components/Carrusel";
import { promoBanners, sampleProducts, sampleProducts2 } from "@/src/data/mockData";
import { useCartStore } from "@/src/store/useCartStore";

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        {/* 1. HEADER WEB */}
        <AppHeader platform="web" />

        {/* 2. BANNER PROMOCIONAL */}
        <View>
          <Carrusel
            type="images"
            images={promoBanners.map((b) => b.imagen)}
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
              products={sampleProducts}
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
                <View style={{ flex: 1 }}>
                    <CardProduct producto={sampleProducts2[0]} />
                </View>
                <View style={{ flex: 1 }}>
                    <CardProduct producto={sampleProducts2[1]} />
                </View>
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
