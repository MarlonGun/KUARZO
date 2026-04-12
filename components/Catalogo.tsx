import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";

type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  grupo: "NUEVO" | "SPORT";
  precio: number;
  imagen: string;
};

const productos: Producto[] = [
  {
    id: "mochila-ambar",
    nombre: "Mochila Ambar",
    categoria: "Bolsos",
    grupo: "NUEVO",
    precio: 125000,
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "set-ruta",
    nombre: "Set Ruta",
    categoria: "Accesorios",
    grupo: "NUEVO",
    precio: 42000,
    imagen:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gorra-noir",
    nombre: "Gorra Noir",
    categoria: "Accesorios",
    grupo: "NUEVO",
    precio: 36000,
    imagen:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "termo-acero",
    nombre: "Termo Acero",
    categoria: "Accesorios",
    grupo: "NUEVO",
    precio: 58000,
    imagen:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "botas-cumbre",
    nombre: "Botas Cumbre",
    categoria: "Calzado",
    grupo: "NUEVO",
    precio: 168000,
    imagen:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bastones-norte",
    nombre: "Bastones Norte",
    categoria: "Trekking",
    grupo: "SPORT",
    precio: 97000,
    imagen:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "camara-ranger",
    nombre: "Camara Ranger",
    categoria: "Accesorios",
    grupo: "SPORT",
    precio: 210000,
    imagen:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bolsa-sleep",
    nombre: "Bolsa Sleep",
    categoria: "Camping",
    grupo: "SPORT",
    precio: 134000,
    imagen:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "navaja-swiss",
    nombre: "Navaja Swiss",
    categoria: "Camping",
    grupo: "SPORT",
    precio: 49000,
    imagen:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "reloj-sport",
    nombre: "Reloj Sport",
    categoria: "Accesorios",
    grupo: "SPORT",
    precio: 89000,
    imagen:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
];

const secciones = [
  { titulo: "NUEVO", categorias: ["Todos", "Bolsos", "Accesorios", "Calzado"] },
  {
    titulo: "SPORT",
    categorias: ["Todos", "Trekking", "Camping", "Accesorios"],
  },
] as const;

const formatearPrecio = (precio: number) =>
  `$${new Intl.NumberFormat("es-CO").format(precio)}`;

const Catalogo = () => {
  const { addItem, totalItems } = useCart();
  const { width } = useWindowDimensions();
  const [grupoActivo, setGrupoActivo] = useState<"NUEVO" | "SPORT">("NUEVO");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const esDesktop = width >= 980;
  const grillaCompacta = width >= 1220;
  const seccionActiva =
    secciones.find((seccion) => seccion.titulo === grupoActivo) ?? secciones[0];
  const termino = busqueda.trim().toLowerCase();
  const productosFiltrados = productos.filter((producto) => {
    const coincideGrupo = producto.grupo === grupoActivo;
    const coincideCategoria =
      categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
    const coincideBusqueda =
      termino.length === 0 ||
      producto.nombre.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino);

    return coincideGrupo && coincideCategoria && coincideBusqueda;
  });

  return (
    <View className="bg-[#f6f7fb] px-4 py-8">
      <View className="mx-auto w-full max-w-6xl rounded-[28px] bg-white px-5 py-5 shadow-sm">
        <View className={esDesktop ? "flex-row" : "flex-col"}>
          <View
            className={
              esDesktop
                ? "w-52 border-r border-[#eef1f5] pr-5"
                : "border-b border-[#eef1f5] pb-5"
            }
          >
            <View className="mb-8 flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-2xl border border-[#eef1f5] bg-[#fafbfc]">
                <MaterialIcons name="diamond" size={20} color="#111827" />
              </View>
              <View>
                <Text className="font-roboto-bold text-lg text-[#111827]">
                  KUARZO
                </Text>
                <Text className="font-opensans-regular text-xs uppercase text-[#9ca3af]">
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
                    color="#9ca3af"
                  />
                  <Text className="font-roboto-bold text-xs uppercase tracking-[2px] text-[#6b7280]">
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
                          className={`font-opensans-regular text-sm ${
                            categoriaActiva === categoria
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
              <View className="w-full max-w-md flex-row items-center rounded-xl bg-[#f6f7fb] px-4 py-3">
                <MaterialIcons name="search" size={18} color="#c7ccd4" />
                <TextInput
                  value={busqueda}
                  onChangeText={setBusqueda}
                  placeholder="Buscar producto"
                  placeholderTextColor="#b6bdc7"
                  className="flex-1 px-3 font-opensans-regular text-sm text-[#111827] outline-none"
                />
              </View>

              <View className="flex-row items-center gap-3">
                <View className="rounded-lg bg-[#f6f7fb] px-3 py-2">
                  <Text className="font-opensans-regular text-xs text-[#6b7280]">
                    {seccionActiva.titulo} / {categoriaActiva}
                  </Text>
                </View>
                <View className="rounded-lg bg-primary px-3 py-2">
                  <Text className="font-roboto-medium text-xs text-[#111827]">
                    {totalItems} carrito
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="font-roboto-bold text-xl text-[#111827]">
                  Productos
                </Text>
                <Text className="font-opensans-regular text-sm text-[#9ca3af]">
                  {productosFiltrados.length} resultados visibles
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {productosFiltrados.map((producto) => (
                <Pressable
                  key={producto.id}
                  className="mb-5 overflow-hidden rounded-2xl bg-white"
                  style={{
                    width: esDesktop
                      ? grillaCompacta
                        ? "18.6%"
                        : "31.5%"
                      : "48.5%",
                  }}
                  onPress={() =>
                    addItem({
                      id: producto.id,
                      nombre: producto.nombre,
                      precio: producto.precio,
                      imagen: producto.imagen,
                    })
                  }
                >
                  <View className="aspect-square items-center justify-center bg-[#f5f7fa] p-4">
                    <Image
                      source={{ uri: producto.imagen }}
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="gap-1 px-1 py-3">
                    <Text
                      className="text-center font-opensans-regular text-sm text-[#4b5563]"
                      numberOfLines={1}
                    >
                      {producto.nombre}
                    </Text>
                    <Text className="text-center font-roboto-medium text-xs text-[#b6bdc7]">
                      {formatearPrecio(producto.precio)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

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
  );
};

export default Catalogo;
