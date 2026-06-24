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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
  imagenes?: any;
};

const categorias = ["Todos", "Pulseras", "Cadenas", "Anillos", "Aretes", "Tobilleras"];

const CatalogoMovil = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productosList, setProductosList] = useState<Producto[]>([]);
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
            stock: p.stock ?? p.cantidad ?? 0,
            imagenes: p.imagenes,
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
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6, paddingTop: 16, paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <View style={{
            backgroundColor: '#f6f7fb',
            alignSelf: 'flex-start',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginBottom: 16,
            marginLeft: 6,
          }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#6b7280' }}>
              TODOS / {categoriaActiva}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{
            borderRadius: 16,
            backgroundColor: '#f6f7fb',
            paddingHorizontal: 24,
            paddingVertical: 48,
            alignItems: 'center',
            marginHorizontal: 6,
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
        )}
        renderItem={({ item }) => (
          <View
            style={{
              width: '50%',
              paddingHorizontal: 6,
              marginBottom: 24,
            }}
          >
            <CardProduct producto={item} />
          </View>
        )}
      />
      <BarrNaveg />
    </SafeAreaView>
  );
};

export default CatalogoMovil;
