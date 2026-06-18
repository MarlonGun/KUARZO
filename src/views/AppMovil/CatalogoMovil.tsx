import { CardProduct } from "@/components/CardProduct";
import { MaterialIcons } from "@expo/vector-icons";
import BarrNaveg from "@/components/BarrNaveg";
import api from "@/src/services/api";
import { useAuthStore } from "@/src/store/useAuthStore";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import { resolveProductImage } from "@/src/utils/imageHelper";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
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

const staticProductos: Producto[] = [
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
    imagen: "https://i.postimg.cc/Mp0VvfWq/PULSERA2.jpg",
  },
  {
    id: "pulsera-premium-2",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/y8hck3VB/PULSERA3.jpg",
  },
  {
    id: "pulsera-premium-3",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/2SdhVLzk/PULSERA4.jpg",
  },
  {
    id: "pulsera-premium-4",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/9QPZrwWF/PULSERA5.jpg",
  },
  {
    id: "pulsera-premium-5",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/jS6PLnsS/PULSERA6.jpg",
  },
  {
    id: "pulsera-premium-6",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/hGSxx4jF/PULSERA7.jpg",
  },
  {
    id: "pulsera-premium-7",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/7Lx77P6r/PULSERA8.jpg",
  },
  {
    id: "pulsera-premium-8",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/8C1WWk5V/PULSERA9.jpg",
  },
  {
    id: "pulsera-premium-9",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen: "https://i.postimg.cc/LsHff4XS/PULSERA10.jpg",
  },

  /*Cadenas*/
  {
    id: "cadena-oro-1",
    nombre: "Cadena Oro Rosa",
    descripcion: "Cadena hecha con oro rosa",
    categoria: "Cadenas",
    precio: 120000,
    imagen: "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg",
  },
  {
    id: "cadena-plata-2",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/6q7C3HQh/CADENA2.jpg",
  },
  {
    id: "cadena-plata-3",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/J0yjnTh5/CADENA3.jpg",
  },
  {
    id: "cadena-plata-4",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/SRXcsZKV/CADENA4.jpg",
  },
  {
    id: "cadena-plata-5",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/4yKpd83W/CADENA5.jpg",
  },
  {
    id: "cadena-plata-6",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/GtBv2Mp7/CADENA6.jpg",
  },
  {
    id: "cadena-plata-7",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/Y04Q9XSy/CADENA7.jpg",
  },
  {
    id: "cadena-plata-8",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/2yqn6H5M/CADENA8.jpg",
  },
  {
    id: "cadena-plata-9",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/nrsqzdLN/CADENA9.jpg",
  },
  {
    id: "cadena-plata-10",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen: "https://i.postimg.cc/MHc1TsGC/CADENA10.jpg",
  },

  /*Anillos*/
  {
    id: "anillo-esmeralda-1",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen: "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg",
  },
  {
    id: "anillo-clasico-2",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen: "https://i.postimg.cc/y8RnnNsf/ANILLO2.jpg",
  },
  {
    id: "anillo-esmeralda-3",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen: "https://i.postimg.cc/8zvwwCNZ/ANILLO3.jpg",
  },
  {
    id: "anillo-clasico-4",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen: "https://i.postimg.cc/DwG55zn5/ANILLO4.jpg",
  },
  {
    id: "anillo-esmeralda-5",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen: "https://i.postimg.cc/JzXKKhMv/ANILLO5.jpg",
  },
  {
    id: "anillo-clasico-6",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen: "https://i.postimg.cc/bwnLLvp5/ANILLO6.jpg",
  },
  {
    id: "anillo-esmeralda-7",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen: "https://i.postimg.cc/vZnXXmbN/ANILLO7.jpg",
  },
  {
    id: "anillo-clasico-8",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen: "https://i.postimg.cc/QMrmzrd0/ANILLO8.jpg",
  },
  {
    id: "anillo-esmeralda-9",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen: "https://i.postimg.cc/43TP0TxW/ANILLO9.jpg",
  },
  {
    id: "anillo-clasico-10",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen: "https://i.postimg.cc/HLCzNCkS/ANILLO10.jpg",
  },

  /*Aretes*/
  {
    id: "aretes-perla-1",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen: "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg",
  },
  {
    id: "aretes-cristal-2",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen: "https://i.postimg.cc/d1V2MQPR/ARETE2.jpg",
  },
  {
    id: "aretes-perla-3",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen: "https://i.postimg.cc/VNRqHrTH/ARETE3.jpg",
  },
  {
    id: "aretes-cristal-4",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen: "https://i.postimg.cc/YS36yGVs/ARETE4.jpg",
  },
  {
    id: "aretes-perla-5",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen: "https://i.postimg.cc/V6kqysQW/ARETE5.jpg",
  },
  {
    id: "aretes-cristal-6",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen: "https://i.postimg.cc/wvjXKx82/ARETE6.jpg",
  },
  {
    id: "aretes-perla-7",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen: "https://i.postimg.cc/B6nTWZ9N/ARETE7.jpg",
  },
  {
    id: "aretes-cristal-8",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen: "https://i.postimg.cc/JnzNw7VP/ARETE8.jpg",
  },
  {
    id: "aretes-perla-9",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen: "https://i.postimg.cc/rmw16yXf/ARETE9.jpg",
  },
  {
    id: "aretes-cristal-10",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen: "https://i.postimg.cc/tT430RQS/ARETE10.jpg",
  },

  /*Tobilleras*/
  {
    id: "tobillera-luna-1",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen: "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg",
  },
  {
    id: "tobillera-estrella-2",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen: "https://i.postimg.cc/PxJw36Y2/TOBILLERA2.jpg",
  },
  {
    id: "tobillera-luna-3",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen: "https://i.postimg.cc/ZRnd7fpQ/TOBILLERA3.jpg",
  },
  {
    id: "tobillera-estrella-4",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen: "https://i.postimg.cc/mDkHXdC5/TOBILLERA4.jpg",
  },
  {
    id: "tobillera-luna-5",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen: "https://i.postimg.cc/k4Gb1jK0/TOBILLERA5.jpg",
  },
  {
    id: "tobillera-estrella-6",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen: "https://i.postimg.cc/MTHQPs12/TOBILLERA6.jpg",
  },
  {
    id: "tobillera-luna-7",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen: "https://i.postimg.cc/Tw1D7kn6/TOBILLERA7.jpg",
  },
  {
    id: "tobillera-estrella-8",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen: "https://i.postimg.cc/cHCn9DfW/TOBILLERA8.jpg",
  },
  {
    id: "tobillera-luna-9",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen: "https://i.postimg.cc/MTHQPs1q/TOBILLERA9.jpg",
  },
  {
    id: "tobillera-estrella-10",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen: "https://i.postimg.cc/85c6KyLp/TOBILLERA10.jpg",
  },
];

const categorias = ["Todos", "Pulseras", "Cadenas", "Anillos", "Aretes", "Tobilleras"];

const CatalogoMovil = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productosList, setProductosList] = useState<Producto[]>(staticProductos);
  const scrollY = useRef(new Animated.Value(0)).current;

  const user = useAuthStore((state: any) => state.user);
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const logout = useAuthStore((state: any) => state.logout);

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
          }));
          if (mapped.length > 0) {
            setProductosList(mapped);
          }
        }
      } catch (error) {
        console.error("Error al cargar productos desde la API en móvil:", error);
      }
    };
    fetchProductos();
  }, []);

  const productosFiltrados = productosList.filter((producto) => {
    return categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header fijo con título y navegación */}
      <View style={{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
      }}>
        {/* Título del catálogo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{
              height: 44,
              width: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
              backgroundColor: '#FFF8E1',
            }}>
              <MaterialIcons name="diamond" size={22} color="#FFD700" />
            </View>
            <View>
              <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#111827' }}>
                CATÁLOGO
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#9ca3af' }}>
                {productosFiltrados.length} productos
              </Text>
            </View>
          </View>
          {isAuthenticated && user && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#f97316' }}>
                Hola, {user.primerNombre}
              </Text>
              <Pressable
                onPress={() => logout()}
                style={({ pressed }) => ({
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                  backgroundColor: pressed ? '#fee2e2' : '#fef2f2',
                  borderWidth: 1,
                  borderColor: '#fca5a5',
                })}
              >
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 12, color: '#ef4444' }}>
                  Salir
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Chips de categorías horizontales */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 20 }}
        >
          {categorias.map((cat) => {
            const isActive = categoriaActiva === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategoriaActiva(cat)}
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 25,
                  backgroundColor: isActive ? '#111827' : '#f6f7fb',
                  borderWidth: 1,
                  borderColor: isActive ? '#111827' : '#eef1f5',
                }}
              >
                <Text style={{
                  fontFamily: isActive ? 'Roboto-Bold' : 'OpenSans-Regular',
                  fontSize: 13,
                  color: isActive ? '#FFD700' : '#6b7280',
                }}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Grid de productos */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Breadcrumb */}
        <View style={{
          backgroundColor: '#f6f7fb',
          alignSelf: 'flex-start',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          marginBottom: 16,
          marginLeft: 4,
        }}>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#6b7280' }}>
            TODOS / {categoriaActiva}
          </Text>
        </View>

        {productosFiltrados.length === 0 ? (
          <View style={{
            borderRadius: 16,
            backgroundColor: '#f6f7fb',
            paddingHorizontal: 24,
            paddingVertical: 48,
            alignItems: 'center',
          }}>
            <MaterialIcons name="search-off" size={48} color="#d1d5db" />
            <Text style={{
              fontFamily: 'Roboto-Bold',
              fontSize: 18,
              color: '#111827',
              textAlign: 'center',
              marginTop: 16,
            }}>
              No hay productos para este filtro
            </Text>
            <Text style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              color: '#9ca3af',
              textAlign: 'center',
              marginTop: 8,
            }}>
              Prueba otra categoría
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {productosFiltrados.map((producto) => (
              <View
                key={producto.id}
                style={{
                  width: '50%',
                  paddingHorizontal: 6,
                  marginBottom: 24,
                }}
              >
                <CardProduct producto={producto} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BarrNaveg />
    </SafeAreaView>
  );
};

export default CatalogoMovil;
