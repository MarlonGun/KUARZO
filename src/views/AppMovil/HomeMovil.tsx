import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CardProduct } from "@/components/CardProduct";
import Carrusel from "@/components/Carrusel";
import { promoBanners, sampleProducts } from "@/src/data/mockData";

const HomeMovil = () => (
  <SafeAreaView className="flex-1 bg-white">
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "white", paddingBottom: 100 }}
    >
      {/* 1. HEADER MÓVIL */}
      <AppHeader platform="movil" />

      {/* 2. BANNER PROMOCIONAL */}
      <View className="mb-8">
        <Text className="text-gray-500 font-bold px-4 mb-3 text-xs uppercase tracking-widest">
          Ofertas y Promociones
        </Text>
        <Carrusel
          type="images"
          images={promoBanners.map((b) => b.imagen)}
          showDots={true}
          autoPlay={true}
        />
      </View>

      {/* 3. PRODUCTOS DESTACADOS EN GRID 2 COLUMNAS */}
      <View className="mb-8">
        <Text className="text-gray-500 font-bold px-4 mb-3 text-xs uppercase tracking-widest">
          Productos Destacados
        </Text>
        <View className="flex-row flex-wrap justify-between px-4">
          {sampleProducts.map((prod, index) => (
            <View key={index} className="w-[48%] mb-4 rounded-2xl">
              <CardProduct producto={prod} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>

    {/* 4. FOOTER MÓVIL (barra flotante) */}
    <AppFooter platform="movil" />
  </SafeAreaView>
);

export default HomeMovil;
