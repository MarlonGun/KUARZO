import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
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

        {/* 3. PRODUCTOS DESTACADOS */}
        <View className="items-center px-4 py-10">
          <Text className="text-gray-500 font-roboto-bold px-4 mb-3 text-xl uppercase tracking-widest">
            PRODUCTOS DESTACADOS
          </Text>
        </View>
        <View className="mb-8 mx-80 px-8 py-10">
          <Carrusel
            type="products"
            products={sampleProducts}
            onProductPress={goToDetail}
          />
        </View>

        {/* 4. SEGUNDA SECCIÓN DE PRODUCTOS */}
        <View className="mb-20 mx-80 px-8 flex flex-row">
          <Carrusel
            type="products"
            products={sampleProducts2}
            onProductPress={goToDetail}
          />
          <View className="bg-quaternary-950 w-full">
            <Text className="text-quaternary-500 font-roboto-bold text-3xl ml-10 mt-20">MAS</Text>
            <Text className="text-quaternary-500 font-roboto-bold text-5xl ml-10">PRODUCTOS</Text>
            <CustomButton
              children="Ver mas"
              className="bg-primary rounded-md font-roboto-bold w-60 h-10 ml-10 mt-10 justify-center items-center"
              onPress={() => router.push("/catalogo")}
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
